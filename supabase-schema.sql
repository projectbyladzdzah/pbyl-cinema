-- ========================================================================
-- PBYL CINEMA — SUPABASE SCHEMA & STORAGE INITIALIZER
-- Jalankan skrip ini di SQL Editor di dashboard Supabase Anda.
-- ========================================================================

-- 1. Buat Tabel Albums
CREATE TABLE IF NOT EXISTS public.albums (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  year TEXT DEFAULT '2026',
  location TEXT DEFAULT 'INDONESIA',
  cover_image TEXT,
  film_stock TEXT DEFAULT '35MM SILVER HALIDE',
  curator_note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Buat Tabel Photos
CREATE TABLE IF NOT EXISTS public.photos (
  id TEXT PRIMARY KEY,
  album_id TEXT REFERENCES public.albums(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  year TEXT DEFAULT '2026',
  category TEXT DEFAULT 'FINE ART',
  director TEXT DEFAULT 'PBYL CINEMA',
  description TEXT,
  orientation TEXT DEFAULT 'landscape', -- 'landscape' atau 'portrait'
  image_url TEXT NOT NULL,
  film_code TEXT DEFAULT 'KODAK 5219',
  aspect TEXT DEFAULT '2.39:1',
  format TEXT DEFAULT '35MM CINEMA',
  order_idx INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Atur Keamanan Data (Row Level Security)
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;

-- Izinkan semua orang membaca (Public Read)
CREATE POLICY "Public Read Albums" ON public.albums FOR SELECT USING (true);
CREATE POLICY "Public Read Photos" ON public.photos FOR SELECT USING (true);

-- Izinkan Admin mengubah data lewat anon key
CREATE POLICY "Admin Insert Albums" ON public.albums FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Update Albums" ON public.albums FOR UPDATE USING (true);
CREATE POLICY "Admin Delete Albums" ON public.albums FOR DELETE USING (true);

CREATE POLICY "Admin Insert Photos" ON public.photos FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Update Photos" ON public.photos FOR UPDATE USING (true);
CREATE POLICY "Admin Delete Photos" ON public.photos FOR DELETE USING (true);

-- 4. Buat Storage Bucket untuk File Foto ('photos')
INSERT INTO storage.buckets (id, name, public)
VALUES ('photos', 'photos', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Policy Storage: Izinkan publik melihat foto
CREATE POLICY "Public Read Storage"
ON storage.objects FOR SELECT
USING (bucket_id = 'photos');

-- Policy Storage: Izinkan upload & hapus foto dari web
CREATE POLICY "Admin Upload Storage"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'photos');

CREATE POLICY "Admin Delete Storage"
ON storage.objects FOR DELETE
USING (bucket_id = 'photos');

-- 5. Masukkan Album Awal (Seed Data)
INSERT INTO public.albums (id, title, subtitle, year, location, cover_image, film_stock, curator_note)
VALUES
  ('album-verite', 'Cinéma Vérité & Stillness', 'Observational realism captured on continuous 35mm motion picture negative.', '2024–2026', 'INDONESIA · ASIA', 'https://images.unsplash.com/photo-1610847455028-9e55e62bac33?w=1200&h=800&fit=crop&q=75', 'EASTMAN DOUBLE-X · KODAK 5219', 'Koleksi karya observasional yang menangkap keheningan dan emosi natural manusia tanpa rekayasa panggung.'),
  ('album-portraits', 'Human Light & Shadows', 'Kajian karakter wajah, keheningan tatapan, dan pencahayaan studio.', '2025–2026', 'STUDIO ATELIER', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&h=1600&fit=crop&q=75', 'LEICA 50MM · ILFORD HP5', 'Seri potret vertikal dengan rasio klasik 4:5 yang menonjolkan tekstur optik dan kedalaman karakter.')
ON CONFLICT (id) DO NOTHING;

-- 6. Masukkan Foto Awal (Seed Data)
INSERT INTO public.photos (id, album_id, title, year, category, director, description, orientation, image_url, film_code, aspect, format, order_idx)
VALUES
  ('the-long-quiet', 'album-verite', 'THE LONG QUIET', '2024', 'OBSERVATIONAL', 'LADZDZAH', 'Kamera menatap dengan tenang pada ritme kehidupan yang melambat. Mengamati bagaimana cahaya merayapi dinding dan keheningan mengikat ruang.', 'landscape', 'https://images.unsplash.com/photo-1633885274919-04b5af171f8c?w=1920&h=1080&fit=crop&q=75', 'EASTMAN DOUBLE-X 5222', '1.85:1 FLAT', '35MM SILVER', 1),
  ('ember-and-ash', 'album-verite', 'EMBER AND ASH', '2024', 'DOCUMENTARY', 'LADZDZAH', 'Matahari terbenam di atas lanskap industri yang mulai mendingin. Sebuah studi tentang peralihan era dan jejak aktivitas manusia.', 'landscape', 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1920&h=1080&fit=crop&q=75', 'KODAK VISION3 500T', '2.39:1 SCOPE', '35MM CINEMA', 2),
  ('monolith-dawn', 'album-verite', 'MONOLITH DAWN', '2025', 'LANDSCAPE', 'LADZDZAH', 'Dinding tebing granit menyerap cahaya keemasan fajar pertama. Bentuk masif yang berdiri tak tergoyahkan melintasi pergantian waktu.', 'landscape', 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&h=1080&fit=crop&q=75', 'FUJIFILM ETERNA 250D', '2.39:1 SCOPE', '65MM LARGE FORMAT', 3),
  ('rembrandt-shadow', 'album-portraits', 'REMBRANDT SHADOW', '2026', 'PORTRAIT', 'LADZDZAH', 'Potret sinematik dengan pencahayaan Rembrandt klasik berpadu dengan tekstur film 35mm. Menghadirkan karakter yang kuat dan tatapan misterius.', 'portrait', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1200&h=1600&fit=crop&q=75', 'ILFORD HP5 PLUS', '4:5 PORTRAIT', 'LEICA M6 · 50MM', 4)
ON CONFLICT (id) DO NOTHING;
