# SIMADU API — UTS Web Service Engineering

REST API Node.js + Express 5 dengan JWT, hash password, otorisasi berdasarkan role/kepemilikan data, validasi, Swagger UI dan pengujian.

## Prasyarat
Node.js 20+, npm, VS Code, dan (opsional) ekstensi REST Client / Postman.

## Instalasi Windows (Terminal VS Code / PowerShell)

```powershell
npm install
Copy-Item .env.example .env
```

Edit `.env`, ganti `JWT_SECRET` menjadi string acak panjang minimal 32 karakter. Jangan unggah `.env` ke GitHub.

```powershell
npm start
```

Buka `http://localhost:4000/health` dan `http://localhost:4000/docs`.

## Kredensial latihan (jangan dipakai pada sistem nyata)

| Akun | Username | Password | ID |
|---|---|---|---|
| Mahasiswa 1 | `mhs1` | `Mahasiswa123!` | M001 |
| Mahasiswa 2 | `mhs2` | `Mahasiswa456!` | M002 |
| Admin | `admin` | `Admin123!` | A001 |

Password hanya disimpan sebagai hash bcrypt di repositori pengguna. JWT memiliki masa berlaku 1 jam (bisa diubah melalui `.env`). Data pengaduan menggunakan array dan akan **reset saat server restart**.

## Cara uji otomatis

```powershell
npm test
```

Pengujian ini menjalankan 12 skenario wajib + PUT/DELETE + pemeriksaan field ilegal dan menampilkan hasil aktual. Untuk bukti screenshot penilaian, gunakan `tests/skenario.http` dengan VS Code REST Client atau Swagger UI/Postman. Ambil gambar permintaan dan respons nyata.

Untuk REST Client: login mhs1, salin `accessToken` ke `mhsToken`; login admin, salin token ke `adminToken`, kemudian kirim setiap request. **Jangan mengunggah token nyata ke GitHub atau memperlihatkannya tanpa disensor dalam laporan.**

## Kontrak dan keamanan

Lihat `docs/ARSITEKTUR.md` untuk arsitektur, matriks endpoint, contoh JSON dan status HTTP. Lihat `docs/openapi.json` untuk spesifikasi OpenAPI 3 dan halaman `/docs` untuk Swagger UI.

Respons sukses: `{ "success": true, "data": ... }`.
Respons gagal: `{ "success": false, "error": { "code": 403, "message": "..." } }`.

## Struktur kode

- `src/routes/`: peta endpoint
- `src/controllers/`: request dan response HTTP
- `src/services/`: validasi, aturan bisnis, hak akses
- `src/repositories/`: penyimpanan array dan pengguna demo
- `src/middleware/`: verifikasi JWT dan error handler
- `tests/`: skenario dan uji otomatis
- `docs/`: OpenAPI, arsitektur, jawaban demonstrasi
- `bukti_screenshot/`: panduan penamaan screenshot (bukti asli diisi setelah pengujian)

## Batasan dan keamanan

Hanya untuk ujian lokal. Sebelum produksi diperlukan database nyata, HTTPS, secret management, rate limiting, audit logging aman, kebijakan token, dan pengujian komprehensif.
