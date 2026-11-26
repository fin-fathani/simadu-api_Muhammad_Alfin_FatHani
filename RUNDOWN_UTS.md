# Rundown UTS SIMADU API

1. Siapkan Node.js, npm, VS Code dan buka folder simadu-api.
2. `npm install`, buat `.env` dari `.env.example` dan isi JWT_SECRET rahasia.
3. Jalankan `npm start`, uji `/health` dan `/docs`.
4. Pelajari `docs/ARSITEKTUR.md` dan tujuh endpoint.
5. Jalankan `npm test` dan periksa hasil 12 skenario wajib.
6. Jalankan ulang manual dengan `tests/skenario.http` untuk mengumpulkan screenshot nyata.
7. Kumpulkan 18 screenshot menurut `bukti_screenshot/DAFTAR_SCREENSHOT.md`.
8. Buat laporan PDF `UTS_WSE_NIM_Nama.pdf`: identitas, tujuan, analisis, desain, arsitektur, implementasi, keamanan, 12+ skenario dan screenshot, jawaban 10 pertanyaan demonstrasi, kesimpulan.
9. Commit/push GitHub (jangan ikutkan `.env`, token dan `node_modules`), lalu kumpulkan URL repository serta PDF sebelum 26 Nov 2026, 23.00 WITA.
