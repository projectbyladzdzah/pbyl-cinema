/* ==========================================================================
   PORTFOLIO MANAGER — ALBUMS & SLIDES DATA LAYER (v3)
   Bespoke Cinema Atelier Architecture with Multi-Album Organization
   ========================================================================== */

export const DEFAULT_ALBUMS = [
  {
    id: "album-nocturnes",
    title: "Nocturnes in Kyoto",
    subtitle: "Medium Format Nocturnal Studies",
    year: "2025",
    location: "Kyoto · Tokyo",
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1200&h=800&fit=crop&q=75",
    curatorNote: "Eksplorasi hening malam kota tua Jepang dalam format medium monokrom. Membedah interaksi antara bayangan gelap, lampion kertas, dan refleksi air hujan pada jalan berbatu.",
    filmStock: "KODAK TRI-X 400 · 120 FILM",
  },
  {
    id: "album-verite",
    title: "Cinema Vérité",
    subtitle: "Observational Street & Urban Intimacy",
    year: "2024",
    location: "London · Berlin",
    coverImage: "https://images.unsplash.com/photo-1610847455028-9e55e62bac33?w=1200&h=800&fit=crop&q=75",
    curatorNote: "Catatan visual spontan tentang kehidupan perkotaan modern. Kamera menangkap momen-momen rapuh di mana orang-orang asing melintas seperti satu organisme tunggal.",
    filmStock: "16MM & 35MM CINEMA STILLS",
  },
  {
    id: "album-portraiture",
    title: "Archival Portraiture",
    subtitle: "Chiaroscuro & Natural Light Faces",
    year: "2025",
    location: "Milan · Jakarta",
    coverImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&h=800&fit=crop&q=75",
    curatorNote: "Koleksi potret studio dan pencahayaan alami dengan teknik Rembrandt klasik. Tatapan subjek menjadi jangkar emosional yang menghentikan laju waktu.",
    filmStock: "HASSELBLAD 500C · ZEISS 80MM",
  },
  {
    id: "album-solitude",
    title: "Solitude of Land",
    subtitle: "Atmospheric Nordic & Alpine Passes",
    year: "2023",
    location: "Central Asia · Scandinavia",
    coverImage: "https://images.unsplash.com/photo-1596956708072-8ca0c2973887?w=1200&h=800&fit=crop&q=75",
    curatorNote: "Perjalanan melintasi celah gunung tinggi di mana langit menjadi tokoh utama. Komposisi luas yang menempatkan manusia dalam skala agung alam semesta.",
    filmStock: "65MM PANAVISION EXPEDITION",
  },
];

export const DEFAULT_SLIDES = [
  {
    id: "blueprint-no-seven",
    albumId: "album-verite",
    badge: "true.false",
    orientation: "landscape",
    eyebrow: "TRUE/FALSE · TRUE LIFE FUND 2024",
    category: "HYBRID DOCUMENTARY",
    titleLines: ["BLUEPRINT", "NO. 7"],
    year: "2024",
    director: "SAM BINNS",
    filmCode: "KODAK 5219 · 188 0214",
    frameNumber: "▲ 12A",
    imageId: "1610847455028-9e55e62bac33",
    awards: [
      { stars: 5, label: "TRUE LIFE FUND", quote: "A PORTRAIT OF NOW" },
      { stars: 4, label: "BEST FIRST FEATURE", quote: "RAW & UNNERVING" },
      { stars: 5, label: "CRITICS PRIZE", quote: "ESSENTIAL VIEWING" },
    ],
    description:
      "An architect of the everyday traces seven anonymous lives across a single city block. Captured in long, unblinking takes, the film constructs an atlas of urban intimacy — strangers passing as a single organism, separated only by the gravity of their private orbits.",
    stats: { critics: 94, audience: 81, runtime: "1h 38m", format: "16MM ARRI SR3", country: "UK · GERMANY", language: "ENGLISH", aspect: "1.66:1 EURO" },
  },
  {
    id: "portrait-monochrome-muse",
    albumId: "album-portraiture",
    badge: "editorial.fineart",
    orientation: "portrait",
    eyebrow: "SOLO EXHIBITION · KYOTO 2025",
    category: "EDITORIAL PORTRAIT",
    titleLines: ["SOLITUDE IN", "MONOCHROME"],
    year: "2025",
    director: "PBYL CINEMA",
    filmCode: "ILFORD HP5 PLUS · 400",
    frameNumber: "▲ 08",
    imageId: "1534528741775-53994a69daeb",
    awards: [
      { stars: 5, label: "GOLDEN EYE", quote: "POETRY IN SHADOW" },
      { stars: 5, label: "PORTRAIT PRIZE", quote: "A TIMELESS GAZE" },
      { stars: 4, label: "JURY CITATION", quote: "EXQUISITE GRAIN" },
    ],
    description:
      "Studi mendalam tentang pencahayaan natural dan ekspresi manusia yang hening. Difoto dalam format medium hitam-putih dengan kontras halus, mengeksplorasi batas antara kerapuhan dan keteguhan batin seorang subjek.",
    stats: { critics: 97, audience: 92, runtime: "PORTRAIT SERIES", format: "HASSELBLAD 500C", country: "INDONESIA · JAPAN", language: "SILENT", aspect: "4:5 PORTRAIT" },
  },
  {
    id: "atlas-unfolds",
    albumId: "album-solitude",
    badge: "berlinale",
    orientation: "landscape",
    eyebrow: "BERLINALE · ENCOUNTERS 2023",
    category: "ESSAY FILM",
    titleLines: ["ATLAS", "UNFOLDS"],
    year: "2023",
    director: "ELIAS NORÉN",
    filmCode: "KODAK VISION3 250D",
    frameNumber: "▲ 24B",
    imageId: "1596956708072-8ca0c2973887",
    awards: [
      { stars: 5, label: "BEST CINEMATOGRAPHY", quote: "AN OPULENT CANVAS" },
      { stars: 4, label: "ENCOUNTERS PRIZE", quote: "STUNNING IN RESTRAINT" },
      { stars: 5, label: "FIPRESCI PRIZE", quote: "A QUIET MASTERWORK" },
    ],
    description:
      "A four-year journey across the high passes of Central Asia, charted entirely on foot. Norén trades narration for breath and footstep — the sky is the protagonist, the path is the verse, and what unfolds is less a documentary than an epic poem to scale.",
    stats: { critics: 96, audience: 87, runtime: "2h 12m", format: "65MM PANAVISION", country: "SWEDEN · KAZAKHSTAN", language: "SILENT", aspect: "2.20:1 70MM" },
  },
  {
    id: "kyoto-rain-alley",
    albumId: "album-nocturnes",
    badge: "kyoto.nocturne",
    orientation: "landscape",
    eyebrow: "NIGHT ARCHIVES · GION 2025",
    category: "ATMOSPHERIC NOCTURNE",
    titleLines: ["REFLECTIONS OF", "GION"],
    year: "2025",
    director: "PBYL CINEMA",
    filmCode: "FUJIFILM PROVIA 100F",
    frameNumber: "▲ 15",
    customUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=1920&h=1080&fit=crop&q=75",
    awards: [
      { stars: 5, label: "NIGHT AESTHETICS", quote: "SHADOWS WHISPER" },
      { stars: 5, label: "EXHIBITION HONOR", quote: "A HAUNTING DRIFT" },
      { stars: 4, label: "ATMOSPHERE PRIZE", quote: "CINEMATIC PURITY" },
    ],
    description:
      "Lorong sempit Gion yang basah setelah hujan malam. Pantulan lentera merah pada batu basah menciptakan kontras warna yang hangat terhadap dinginnya kegelapan kota kuno.",
    stats: { critics: 98, audience: 95, runtime: "NIGHT SERIES", format: "LEICA M11 · NOCTILUX 50", country: "JAPAN", language: "SILENT", aspect: "2.39:1 SCOPE" },
  },
  {
    id: "portrait-silent-gaze",
    albumId: "album-portraiture",
    badge: "vogue.lens",
    orientation: "portrait",
    eyebrow: "MILAN FASHION ARCHIVE 2024",
    category: "CINEMATIC PORTRAIT",
    titleLines: ["THE SILENT", "GAZE"],
    year: "2024",
    director: "PBYL CINEMA",
    filmCode: "KODAK PORTRA 400",
    frameNumber: "▲ 04A",
    imageId: "1506794778202-cad84cf45f1d",
    awards: [
      { stars: 5, label: "CURATOR PRIZE", quote: "RAW & RESONANT" },
      { stars: 5, label: "LIGHT AWARD", quote: "CINEMATIC PERFECTION" },
      { stars: 4, label: "BEST OF SHOW", quote: "UNFORGETTABLE CHARM" },
    ],
    description:
      "Potret sinematik dengan pencahayaan Rembrandt klasik berpadu dengan tekstur film 35mm. Menghadirkan karakter yang kuat, tatapan misterius, dan bayangan dramatis yang membingkai emosi secara intens.",
    stats: { critics: 95, audience: 90, runtime: "STUDIO SERIES", format: "LEICA M6 · 50MM", country: "ITALY · INDONESIA", language: "SILENT", aspect: "2:3 PORTRAIT" },
  },
  {
    id: "the-long-quiet",
    albumId: "album-verite",
    badge: "tiff.docs",
    orientation: "landscape",
    eyebrow: "TIFF DOCS · PLATFORM 2024",
    category: "OBSERVATIONAL",
    titleLines: ["THE LONG", "QUIET"],
    year: "2024",
    director: "AMARA OKAFOR",
    filmCode: "EASTMAN DOUBLE-X 5222",
    frameNumber: "▲ 19",
    imageId: "1633885274919-04b5af171f8c",
    awards: [
      { stars: 5, label: "PLATFORM PRIZE", quote: "DEEPLY MOVING" },
      { stars: 5, label: "BEST DIRECTOR", quote: "QUIETLY DEVASTATING" },
      { stars: 4, label: "AUDIENCE AWARD", quote: "A PORTRAIT OF SILENCE" },
    ],
    description:
      "On the eve of a six-month return to silence, four Carmelite nuns open their shutters and their letters. Okafor's patient gaze finds devotion in the smallest gestures — the way light moves across a refectory, the way silence holds a room together long after the bell has rung.",
    stats: { critics: 93, audience: 89, runtime: "1h 47m", format: "DIGITAL 4K", country: "NIGERIA · SPAIN", language: "ENGLISH · SPANISH", aspect: "1.85:1 FLAT" },
  },
  {
    id: "ember-and-ash",
    albumId: "album-verite",
    badge: "venezia",
    orientation: "landscape",
    eyebrow: "VENICE · ORIZZONTI 2025",
    category: "CHARACTER STUDY",
    titleLines: ["EMBER &", "ASH"],
    year: "2025",
    director: "MILO HAVERSTEIN",
    filmCode: "KODAK VISION3 500T",
    frameNumber: "▲ 31A",
    imageId: "1636766812350-c2842e8c6b76",
    awards: [
      { stars: 5, label: "BEST ACTRESS", quote: "SHE BURNS THE FRAME" },
      { stars: 5, label: "ORIZZONTI PRIZE", quote: "HAUNTING & PRECISE" },
      { stars: 4, label: "BEST EDITING", quote: "BURNS LONG AFTER" },
    ],
    description:
      "A wildfire memoirist returns to the village she once burned down — to face the woman she was. Haverstein's chamber drama burns at one steady temperature, then explodes. A career-defining lead carries the entire frame on the slow inhale of a final cigarette.",
    stats: { critics: 92, audience: 84, runtime: "1h 56m", format: "35MM ARRIFLEX", country: "GERMANY · ITALY", language: "GERMAN · ITALIAN", aspect: "2.39:1 SCOPE" },
  },
  {
    id: "cavern",
    albumId: "album-solitude",
    badge: "rotterdam",
    orientation: "landscape",
    eyebrow: "TIGER COMPETITION · IFFR 2022",
    category: "EXPERIMENTAL",
    titleLines: ["CAVERN"],
    year: "2022",
    director: "SØREN HOLT",
    filmCode: "AGFA SCALA 200X",
    frameNumber: "▲ 02",
    imageId: "1665426520283-33b35e81bbc7",
    awards: [
      { stars: 5, label: "TIGER AWARD", quote: "ARCHITECTURE OF FEELING" },
      { stars: 4, label: "VPRO BIG SCREEN", quote: "OBSESSIVELY COMPOSED" },
      { stars: 5, label: "FIPRESCI PRIZE", quote: "A NEW LANGUAGE" },
    ],
    description:
      "Eight composers, eight subterranean chambers, one resonant frequency. Holt's experimental documentary descends literally into the earth to record what stone remembers when struck. The result: a film you don't watch so much as feel from the diaphragm out.",
    stats: { critics: 89, audience: 76, runtime: "1h 24m", format: "DIGITAL 4K", country: "DENMARK · NORWAY", language: "DANISH", aspect: "1.43:1 IMAX" },
  },
];

const STORAGE_SLIDES_KEY = "cinema_atelier_slides_v3";
const STORAGE_ALBUMS_KEY = "cinema_atelier_albums_v3";

/* ==========================================================================
   ALBUMS CRUD
   ========================================================================== */
export function loadAlbums() {
  try {
    const saved = localStorage.getItem(STORAGE_ALBUMS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Could not read local storage albums:", e);
  }
  return DEFAULT_ALBUMS;
}

export function saveAlbums(albums) {
  try {
    localStorage.setItem(STORAGE_ALBUMS_KEY, JSON.stringify(albums));
  } catch (e) {
    console.error("Failed to save albums to localStorage:", e);
  }
}

export function createAlbum(albumData) {
  const albums = loadAlbums();
  albums.push(albumData);
  saveAlbums(albums);
  return albums;
}

export function updateAlbum(id, updatedData) {
  const albums = loadAlbums();
  const index = albums.findIndex((a) => a.id === id);
  if (index !== -1) {
    albums[index] = { ...albums[index], ...updatedData };
    saveAlbums(albums);
  }
  return albums;
}

export function deleteAlbum(id) {
  let albums = loadAlbums();
  albums = albums.filter((a) => a.id !== id);
  if (albums.length === 0) albums = [...DEFAULT_ALBUMS];
  saveAlbums(albums);

  // Re-assign orphaned slides to first remaining album
  const slides = loadSlides();
  const fallbackId = albums[0].id;
  slides.forEach((s) => {
    if (s.albumId === id) s.albumId = fallbackId;
  });
  saveSlides(slides);

  return albums;
}

/* ==========================================================================
   SLIDES CRUD
   ========================================================================== */
export function loadSlides() {
  try {
    const saved = localStorage.getItem(STORAGE_SLIDES_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((s) => ({
          ...s,
          orientation: s.orientation || "landscape",
          albumId: s.albumId || "album-verite",
          filmCode: s.filmCode || "KODAK 5219 · 188 0214",
          frameNumber: s.frameNumber || "▲ 24A",
        }));
      }
    }
  } catch (e) {
    console.warn("Could not read local storage slides:", e);
  }
  return DEFAULT_SLIDES;
}

export function saveSlides(slides) {
  try {
    localStorage.setItem(STORAGE_SLIDES_KEY, JSON.stringify(slides));
  } catch (e) {
    console.error("Failed to save slides to localStorage:", e);
  }
}

export function addCustomSlide(slideData) {
  const slides = loadSlides();
  slides.unshift(slideData);
  saveSlides(slides);
  return slides;
}

export function updateSlide(id, updatedData) {
  const slides = loadSlides();
  const index = slides.findIndex((s) => s.id === id);
  if (index !== -1) {
    slides[index] = { ...slides[index], ...updatedData };
    saveSlides(slides);
  }
  return slides;
}

export function deleteSlide(id) {
  let slides = loadSlides();
  slides = slides.filter((s) => s.id !== id);
  if (slides.length === 0) {
    slides = [...DEFAULT_SLIDES];
  }
  saveSlides(slides);
  return slides;
}

export function reorderSlide(id, direction) {
  const slides = loadSlides();
  const index = slides.findIndex((s) => s.id === id);
  if (index === -1) return slides;

  const targetIndex = direction === "up" ? index - 1 : index + 1;
  if (targetIndex >= 0 && targetIndex < slides.length) {
    const temp = slides[index];
    slides[index] = slides[targetIndex];
    slides[targetIndex] = temp;
    saveSlides(slides);
  }
  return slides;
}

export function resetToDefaultSlides() {
  saveSlides(DEFAULT_SLIDES);
  saveAlbums(DEFAULT_ALBUMS);
  return { slides: DEFAULT_SLIDES, albums: DEFAULT_ALBUMS };
}

export function getPhotosByAlbum(albumId) {
  const allSlides = loadSlides();
  if (!albumId || albumId === "all") return allSlides;
  return allSlides.filter((s) => s.albumId === albumId);
}

export function getSlideImageUrl(slide, w = 1920, h = 1080) {
  if (slide.customUrl) {
    return slide.customUrl;
  }
  if (slide.imageId) {
    return `https://images.unsplash.com/photo-${slide.imageId}?w=${w}&h=${h}&fit=crop&q=75&auto=format`;
  }
  return "https://images.unsplash.com/photo-1610847455028-9e55e62bac33?w=1920&h=1080&fit=crop&q=75&auto=format";
}
