# carilirik
PWA buat cari dan bookmark lirik

## Struktur

- `index.html` — markup aplikasi
- `css/style.css` — stylesheet dan font
- `css/tailwind.input.css` — sumber utility CSS
- `css/tailwind.min.css` — hasil build CSS untuk runtime
- `script/app.js` — logika aplikasi
- `assets/fonts/` — berkas font Silka
- `manifest.webmanifest` — metadata instalasi PWA
- `service-worker.js` — cache aplikasi dan dukungan offline
- `assets/icons/` — ikon aplikasi
- `supabase/schema.sql` — tabel profil dan data akun, trigger pendaftaran, dan kebijakan RLS

Jalankan `npm install` sekali untuk memasang Tailwind CLI. `npm run build` membangun CSS dan menyalin situs statis ke `dist/`. Jalankan ulang setelah mengubah utility class atau aset aplikasi.

## Login Supabase

Login menggunakan Supabase Auth dengan email dan password; username dibuat saat pendaftaran dan disimpan sebagai profil. Password tidak disimpan di tabel aplikasi. Frontend menggunakan project URL dan publishable key Supabase di `script/app.js`; publishable key memang boleh berada di client, tetapi jangan pernah memasukkan `service_role` atau secret key ke aplikasi.

Jalankan seluruh isi `supabase/schema.sql` melalui Supabase SQL Editor untuk membuat tabel profil dan `account_data`, menyimpan username/email saat akun Auth dibuat, dan mengaktifkan Row Level Security. Data koleksi, folder, riwayat, ranking, lagu terakhir dilihat, dan preferensi disimpan per pengguna di Supabase dan dimuat saat login. Jika ada data lokal lama sebelum migrasi, data itu dipindahkan ke akun pertama yang login setelah pembaruan. Pastikan Email Auth diaktifkan di Supabase. Jika konfirmasi email aktif, pengguna perlu mengonfirmasi email sebelum login; jika nonaktif, akun langsung masuk setelah pendaftaran.

## Deploy dan instalasi PWA

Service worker dan prompt instalasi memerlukan origin HTTPS (atau `localhost` saat pengembangan); membuka `index.html` sebagai berkas lokal tidak mendukung instalasi PWA. Vercel dikonfigurasi untuk menjalankan `npm run build` dan menerbitkan folder `dist/`. Untuk GitHub Pages, publikasikan repository ini melalui **Settings → Pages** dari branch dan folder yang berisi `index.html`, lalu buka URL HTTPS situs tersebut di browser. Gunakan menu **Install app** atau **Add to Home Screen** di browser untuk memasang aplikasi.

Saat offline, aplikasi menyajikan app shell yang tersimpan dan fitur pencarian memakai data contoh lokal. Pencarian LRCLIB dan kamus transliterasi eksternal tetap memerlukan koneksi.

CSS utility dibuat menjadi stylesheet statis ter-minify agar browser tidak perlu mengunduh dan menjalankan Tailwind CDN. Service worker hanya menyimpan app shell di awal; font dan pustaka transliterasi disimpan saat pertama kali benar-benar dipakai. Pinyin dan Kuroshiro hanya dimuat ketika pengguna memilih transliterasi.
