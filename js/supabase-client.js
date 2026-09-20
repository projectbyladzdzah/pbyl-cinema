/* ==========================================================================
   SUPABASE INTEGRATION MODULE — PBYL CINEMA
   Cloud Database & Storage Connector for Zero-Config Real-Time Exhibition
   ========================================================================== */

function getCreateClientFn() {
  if (typeof window !== "undefined" && window.supabase && typeof window.supabase.createClient === "function") {
    return window.supabase.createClient;
  }
  return null;
}

// Config Keys (Can be configured here or via Admin UI localStorage)
const DEFAULT_SUPABASE_URL = "";
const DEFAULT_SUPABASE_ANON_KEY = "";

export function getSupabaseConfig() {
  const url = localStorage.getItem("pbyl_supabase_url") || DEFAULT_SUPABASE_URL;
  const key = localStorage.getItem("pbyl_supabase_key") || DEFAULT_SUPABASE_ANON_KEY;
  return { url: url.trim(), key: key.trim() };
}

export function saveSupabaseConfig(url, key) {
  localStorage.setItem("pbyl_supabase_url", url.trim());
  localStorage.setItem("pbyl_supabase_key", key.trim());
}

let supabaseInstance = null;

export function getSupabaseClient() {
  const { url, key } = getSupabaseConfig();
  if (!url || !key) return null;
  if (!supabaseInstance || supabaseInstance.supabaseUrl !== url) {
    try {
      const createClient = getCreateClientFn();
      if (!createClient) {
        return null;
      }
      supabaseInstance = createClient(url, key);
    } catch (err) {
      console.error("Gagal menginisialisasi Supabase:", err);
      return null;
    }
  }
  return supabaseInstance;
}

export function isSupabaseConnected() {
  const client = getSupabaseClient();
  return client !== null;
}

// ============================================================================
// DATA FETCHING (Albums & Photos)
// ============================================================================

export async function fetchCloudAlbums() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("albums")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return null;

    return data.map((a) => ({
      id: a.id,
      title: a.title,
      subtitle: a.subtitle || "",
      year: a.year || "2026",
      location: a.location || "INDONESIA",
      coverImage: a.cover_image || "",
      filmStock: a.film_stock || "35MM SILVER HALIDE",
      curatorNote: a.curator_note || "",
    }));
  } catch (err) {
    console.warn("Supabase fetch albums error (fallback to local):", err.message);
    return null;
  }
}

export async function fetchCloudPhotos() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("photos")
      .select("*")
      .order("order_idx", { ascending: true });

    if (error) throw error;
    if (!data || data.length === 0) return null;

    return data.map((p) => {
      const words = (p.title || "").split(" ");
      let titleLines = [p.title || "UNTITLED"];
      if (words.length >= 2) {
        const half = Math.ceil(words.length / 2);
        titleLines = [words.slice(0, half).join(" "), words.slice(half).join(" ")];
      }

      return {
        id: p.id,
        albumId: p.album_id,
        orientation: p.orientation || "landscape",
        category: p.category || "FINE ART",
        titleLines,
        year: p.year || "2026",
        director: p.director || "PBYL CINEMA",
        filmCode: p.film_code || "KODAK 5219",
        customUrl: p.image_url,
        description: p.description || "",
        stats: {
          format: p.format || "35MM CINEMA",
          aspect: p.aspect || (p.orientation === "portrait" ? "4:5" : "2.39:1"),
        },
      };
    });
  } catch (err) {
    console.warn("Supabase fetch photos error (fallback to local):", err.message);
    return null;
  }
}

// ============================================================================
// CLOUD STORAGE UPLOAD (Direct to 'photos' bucket)
// ============================================================================

export async function uploadImageToSupabase(file) {
  const supabase = getSupabaseClient();
  if (!supabase) throw new Error("Supabase belum terhubung.");

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `exhibition/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("photos")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage.from("photos").getPublicUrl(filePath);
  return data.publicUrl;
}

// ============================================================================
// CLOUD MUTATIONS (Photos CRUD)
// ============================================================================

export async function insertCloudPhoto(photo) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const row = {
    id: photo.id,
    album_id: photo.albumId,
    title: Array.isArray(photo.titleLines) ? photo.titleLines.join(" ") : photo.title,
    year: photo.year || "2026",
    category: photo.category || "FINE ART",
    director: photo.director || "PBYL CINEMA",
    description: photo.description || "",
    orientation: photo.orientation || "landscape",
    image_url: photo.customUrl,
    film_code: photo.filmCode || "35MM",
    aspect: photo.stats?.aspect || (photo.orientation === "portrait" ? "4:5" : "2.39:1"),
    format: photo.stats?.format || "35MM CINEMA",
  };

  const { data, error } = await supabase.from("photos").insert([row]).select();
  if (error) throw error;
  return data;
}

export async function updateCloudPhoto(id, photo) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const row = {
    album_id: photo.albumId,
    title: Array.isArray(photo.titleLines) ? photo.titleLines.join(" ") : photo.title,
    year: photo.year,
    category: photo.category,
    director: photo.director,
    description: photo.description,
    orientation: photo.orientation,
    image_url: photo.customUrl,
    film_code: photo.filmCode,
    aspect: photo.stats?.aspect,
    format: photo.stats?.format,
  };

  const { data, error } = await supabase.from("photos").update(row).eq("id", id).select();
  if (error) throw error;
  return data;
}

export async function deleteCloudPhoto(id) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { error } = await supabase.from("photos").delete().eq("id", id);
  if (error) throw error;
  return true;
}

// ============================================================================
// CLOUD MUTATIONS (Albums CRUD)
// ============================================================================

export async function insertCloudAlbum(album) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const row = {
    id: album.id,
    title: album.title,
    subtitle: album.subtitle || "",
    year: album.year || "2026",
    location: album.location || "INDONESIA",
    cover_image: album.coverImage || "",
    film_stock: album.filmStock || "35MM SILVER HALIDE",
    curator_note: album.curatorNote || "",
  };

  const { data, error } = await supabase.from("albums").insert([row]).select();
  if (error) throw error;
  return data;
}

export async function updateCloudAlbum(id, album) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const row = {
    title: album.title,
    subtitle: album.subtitle,
    year: album.year,
    location: album.location,
    cover_image: album.coverImage,
    film_stock: album.filmStock,
    curator_note: album.curatorNote,
  };

  const { data, error } = await supabase.from("albums").update(row).eq("id", id).select();
  if (error) throw error;
  return data;
}

export async function deleteCloudAlbum(id) {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { error } = await supabase.from("albums").delete().eq("id", id);
  if (error) throw error;
  return true;
}
