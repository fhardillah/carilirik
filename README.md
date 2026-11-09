# carilirik
PWA buat cari dan bookmark lirik

## Struktur

- `index.html` — markup aplikasi
- `css/style.css` — stylesheet dan font
- `script/app.js` — logika aplikasi
- `assets/fonts/` — berkas font Silka
- `manifest.webmanifest` — metadata instalasi PWA
- `service-worker.js` — cache aplikasi dan dukungan offline
- `assets/icons/` — ikon aplikasi

## Deploy dan instalasi PWA

Service worker dan prompt instalasi memerlukan origin HTTPS (atau `localhost` saat pengembangan); membuka `index.html` sebagai berkas lokal tidak mendukung instalasi PWA. Untuk GitHub Pages, publikasikan repository ini melalui **Settings → Pages** dari branch dan folder yang berisi `index.html`, lalu buka URL HTTPS situs tersebut di browser. Gunakan menu **Install app** atau **Add to Home Screen** di browser untuk memasang aplikasi.

Saat offline, aplikasi menyajikan app shell yang tersimpan dan fitur pencarian memakai data contoh lokal. Pencarian LRCLIB dan kamus transliterasi eksternal tetap memerlukan koneksi.
