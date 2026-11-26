require('dotenv').config();
const {test}=require('node:test');const assert=require('node:assert/strict');
const http=require('node:http');const crypto=require('node:crypto');
process.env.JWT_SECRET=process.env.JWT_SECRET?.length>=32&&!process.env.JWT_SECRET.includes('GANTI_DENGAN')?process.env.JWT_SECRET:crypto.randomBytes(32).toString('hex');
const app=require('../app.cjs');
const server=http.createServer(app);
let url,mhsToken,adminToken,newId;
const req=async(method,path,body,token)=>{
 const res=await fetch(url+path,{method,headers:{...(body?{'Content-Type':'application/json'}:{}),...(token?{'Authorization':'Bearer '+token}:{})},body:body?JSON.stringify(body):undefined});
 return {status:res.status,data:await res.json()};
};
const login=async(username,password)=>(await req('POST','/api/auth/login',{username,password}));
test('SIMADU: 12 skenario wajib dan PUT DELETE',async(t)=>{
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));url='http://127.0.0.1:'+server.address().port;
 try{
 await t.test('01 login benar 200',async()=>{const x=await login('mhs1','Mahasiswa123!');assert.equal(x.status,200);mhsToken=x.data.data.accessToken;assert.ok(mhsToken)});
 await t.test('02 login salah 401',async()=>assert.equal((await login('mhs1','salah')).status,401));
 await t.test('03 tanpa token 401',async()=>assert.equal((await req('GET','/api/pengaduan')).status,401));
 await t.test('04 token invalid 401',async()=>assert.equal((await req('GET','/api/pengaduan',undefined,'invalid')).status,401));
 await t.test('05 buat 201',async()=>{const x=await req('POST','/api/pengaduan',{judul:'Wifi rusak',kategori:'TI',deskripsi:'Sinyal wifi terputus'},mhsToken);assert.equal(x.status,201);newId=x.data.data.id;assert.equal(x.data.data.mahasiswaId,'M001')});
 await t.test('06 lihat milik sendiri 200',async()=>assert.equal((await req('GET','/api/pengaduan/1',undefined,mhsToken)).status,200));
 await t.test('07 lihat orang lain 403',async()=>assert.equal((await req('GET','/api/pengaduan/2',undefined,mhsToken)).status,403));
 await t.test('08 mahasiswa ubah status 403',async()=>assert.equal((await req('PATCH','/api/pengaduan/1/status',{status:'diproses'},mhsToken)).status,403));
 await t.test('09 admin lihat semua 200',async()=>{const x=await login('admin','Admin123!');assert.equal(x.status,200);adminToken=x.data.data.accessToken;assert.equal((await req('GET','/api/pengaduan',undefined,adminToken)).status,200)});
 await t.test('10 admin ubah status 200',async()=>assert.equal((await req('PATCH','/api/pengaduan/1/status',{status:'diproses'},adminToken)).status,200));
 await t.test('11 field kosong 400',async()=>assert.equal((await req('POST','/api/pengaduan',{judul:'',kategori:'TI',deskripsi:'Tes'},mhsToken)).status,400));
 await t.test('12 ID tidak ada 404',async()=>assert.equal((await req('GET','/api/pengaduan/999999',undefined,mhsToken)).status,404));
 await t.test('13 PUT milik sendiri 200',async()=>assert.equal((await req('PUT','/api/pengaduan/'+newId,{judul:'Wifi diperbaiki',kategori:'TI',deskripsi:'Detail diperbarui'},mhsToken)).status,200));
 await t.test('14 DELETE milik sendiri 200',async()=>assert.equal((await req('DELETE','/api/pengaduan/'+newId,undefined,mhsToken)).status,200));
 await t.test('15 larang field mahasiswaId 400',async()=>assert.equal((await req('POST','/api/pengaduan',{judul:'X',kategori:'TI',deskripsi:'X',mahasiswaId:'M002'},mhsToken)).status,400));
 }finally{await new Promise(resolve=>server.close(resolve));}
});
