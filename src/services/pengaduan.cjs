const repo=require('../repositories/pengaduan.cjs');
const {HttpError}=require('../utils/http.cjs');
const allowed=['judul','kategori','deskripsi'];
const reject=(status,msg)=>{throw new HttpError(status,msg)};
function idNumber(raw){if(!/^[1-9]\d*$/.test(raw))reject(400,'ID harus bilangan bulat positif');return Number(raw)}
function getAccessible(raw,user){const item=repo.find(idNumber(raw));if(!item)reject(404,'Pengaduan tidak ditemukan');if(user.role==='mahasiswa'&&item.mahasiswaId!==user.id)reject(403,'Tidak berhak mengakses pengaduan ini');return item}
function validateDetails(body){
 if(!body||typeof body!=='object'||Array.isArray(body))reject(400,'Body harus objek JSON');
 if(Object.keys(body).some(k=>!allowed.includes(k))||allowed.some(k=>!(k in body)))reject(400,'Field tidak diperbolehkan atau field wajib belum lengkap');
 for(const k of allowed)if(typeof body[k]!=='string'||!body[k].trim()||body[k].length>1000)reject(400,`${k} harus berupa teks tidak kosong (maksimal 1000 karakter)`);
 if(!['Fasilitas','Akademik','TI'].includes(body.kategori))reject(400,'Kategori harus Fasilitas, Akademik, atau TI');
 return Object.fromEntries(allowed.map(k=>[k,body[k].trim()]));
}
function list(user){return user.role==='admin'?repo.all():repo.all().filter(x=>x.mahasiswaId===user.id)}
function detail(id,user){return {...getAccessible(id,user)}}
function create(body,user){if(user.role!=='mahasiswa')reject(403,'Hanya mahasiswa dapat membuat pengaduan');return repo.add({...validateDetails(body),mahasiswaId:user.id,status:'diajukan',createdAt:new Date().toISOString()})}
function edit(id,body,user){if(user.role!=='mahasiswa')reject(403,'Hanya mahasiswa dapat mengubah pengaduan');const row=getAccessible(id,user);if(row.status!=='diajukan')reject(403,'Pengaduan tidak dapat diubah setelah diproses');return repo.update(row.id,validateDetails(body))}
function remove(id,user){if(user.role!=='mahasiswa')reject(403,'Hanya mahasiswa dapat menghapus pengaduan');const row=getAccessible(id,user);if(row.status!=='diajukan')reject(403,'Pengaduan tidak dapat dihapus setelah diproses');repo.remove(row.id);return {message:'Pengaduan dihapus'}}
function status(id,body,user){if(user.role!=='admin')reject(403,'Hanya admin dapat mengubah status');const row=getAccessible(id,user);if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).length!==1||!['diproses','selesai'].includes(body.status))reject(400,'Field status wajib diproses atau selesai');if(row.status==='selesai'||(row.status==='diajukan'&&body.status!=='diproses')||(row.status==='diproses'&&body.status!=='selesai'))reject(400,'Transisi status tidak diperbolehkan');return repo.update(row.id,{status:body.status})}
module.exports={list,detail,create,edit,remove,status};
