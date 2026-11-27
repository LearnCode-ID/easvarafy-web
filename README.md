# Easvarafy Music — Web

Landing page statis untuk unduhan APK Easvarafy Music (Android).
Sudah dipisah menjadi HTML, CSS, dan JS terpisah — siap deploy ke **Cloudflare Pages** tanpa build step.
APK di-host di **GitHub Releases**, bukan di repo (agar tidak kena batas 25 MiB Cloudflare Pages).

## Struktur

```
.
├── index.html                  # HTML murni (tanpa <style> / <script> inline)
├── assets/
│   ├── css/
│   │   └── style.css           # Semua CSS (sebelumnya inline di <style>)
│   ├── js/
│   │   └── main.js             # Semua JS (dimuat dengan defer)
│   └── img/
│       └── logo.png            # Logo (sebelumnya base64 data-URI di HTML)
├── _headers                    # Header & cache khusus Cloudflare Pages
└── README.md
```

> Logo sebelumnya tersimpan sebagai base64 di dalam HTML (2× duplikat, ~145 KB).
> Sekarang disimpan sekali sebagai `assets/img/logo.png` (72 KB) dan di-cache
> oleh Cloudflare, sehingga HTML menyusut dari ~199 KB menjadi ~2,5 KB.

## APK — GitHub Releases

APK (`easvarafy-music.apk`, ~25 MB) **tidak** disimpan di repo. Ia di-host sebagai
asset di GitHub Release:

- Release saat ini: <https://github.com/LearnCode-ID/easvarafy-web/releases/tag/v1.0.0>
- Link unduhan yang dipakai website (selalu menunjuk ke rilis terbaru):
  `https://github.com/LearnCode-ID/easvarafy-web/releases/latest/download/easvarafy-music.apk`

### Rilis versi baru

1. Build APK baru di komputer Anda.
2. Buat release baru di GitHub (tag `v1.0.1`, `v1.1.0`, dst.) dan lampirkan
   `easvarafy-music.apk` sebagai asset.
3. Selesai — website otomatis menunjuk ke versi terbaru lewat URL
   `releases/latest/download/...`, tanpa perlu mengubah `index.html`.

## Deploy ke Cloudflare Pages

### Opsi A — lewat Dashboard (Git integration, disarankan)

1. Push repo ini ke GitHub.
2. Buka [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Pilih repo `easvarafy-web`, branch `main`.
4. Pengaturan build:
   - **Framework preset:** `None`
   - **Build command:** *(kosongkan)*
   - **Build output directory:** `/` (root)
5. Klik **Create project** → deploy selesai, situs live di `*.pages.dev`.

### Opsi B — lewat Wrangler CLI

```bash
npm i -g wrangler
wrangler pages deploy . --project-name=easvarafy-web
```

## Catatan

- **Batas ukuran file Cloudflare Pages: 25 MiB per file.** Karena APK (~25 MB)
  di-host di GitHub Releases, repo ini bebas dari batas tersebut dan APK bisa
  membesar tanpa masalah.
- Tidak ada build step / bundler — edit file langsung, push, Cloudflare akan
  deploy ulang otomatis.
- File di `assets/` diberi cache `immutable` 1 tahun via `_headers`.
  Jika mengubah CSS/JS, ganti nama file (mis. `style.v2.css`) atau hapus
  header cache tersebut agar perubahan langsung terlihat.
