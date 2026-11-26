const bcrypt=require('bcryptjs');
// Pengguna demo; password disimpan sebagai hash, bukan plaintext.
const users=[
 {id:'M001',username:'mhs1',role:'mahasiswa',passwordHash:bcrypt.hashSync('Mahasiswa123!',10)},
 {id:'M002',username:'mhs2',role:'mahasiswa',passwordHash:bcrypt.hashSync('Mahasiswa456!',10)},
 {id:'A001',username:'admin',role:'admin',passwordHash:bcrypt.hashSync('Admin123!',10)}
];
module.exports={findByUsername:(name)=>users.find(u=>u.username===name)};
