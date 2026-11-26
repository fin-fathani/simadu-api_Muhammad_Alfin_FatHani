# Draft jawaban 10 pertanyaan demonstrasi (pahami dan jelaskan dengan kalimat sendiri)

1. **Autentikasi** memastikan siapa pengguna melalui login dan JWT (`src/services/auth.cjs` dan `src/middleware/auth.cjs`), sedangkan **otorisasi** memastikan apa yang boleh dilakukan (`src/services/pengaduan.cjs`).
2. Login hanya membuktikan identitas. Role mahasiswa hanya boleh melihat dan mengelola miliknya; admin mempunyai kewenangan lain.
3. HTTP **401** berarti token/kredensial tidak ada atau tidak sah. **403** berarti identitas sah tetapi tidak memiliki izin.
4. `mahasiswaId` diambil dari `req.user.id` token, bukan body. Pengaduan dicocokkan dengan pemilik sebelum PUT atau DELETE dan hanya dapat diubah saat berstatus `diajukan`.
5. Password harus di-hash agar data mentah tidak tersimpan. Token tidak dicatat ke log sebab orang lain dapat memakai token tersebut selama masih valid.
6. Body diparsing oleh `express.json`; service memeriksa field wajib dan field ilegal; error handler mengubah kesalahan menjadi respons JSON 400/401/403/404/500 yang konsisten.
7. **HTTPS** mengenkripsi koneksi data di jaringan. **Bearer JWT** menentukan identitas dan otorisasi pengguna aplikasi; keduanya berbeda fungsi.
8. Kirim request yang harus ditolak, lalu GET data yang sama sebelum dan sesudah untuk membuktikan tidak ada perubahan; cek status dan isi respons.
9. Swagger menunjukkan deskripsi kontrak, bukan jaminan server bekerja. Bukti memerlukan request nyata dan respons aktual termasuk skenario penolakan.
10. Untuk produksi, gunakan HTTPS, database persisten, manajemen secret aman, rate limit, refresh/revocation token, logging aman, pengujian lebih luas, monitoring dan deployment yang diawasi.
