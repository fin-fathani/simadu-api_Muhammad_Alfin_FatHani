let entries=[
 {id:1,mahasiswaId:'M001',judul:'Proyektor kelas bermasalah',kategori:'Fasilitas',deskripsi:'Proyektor tidak menampilkan gambar.',status:'diajukan',createdAt:'2026-11-19T08:00:00.000Z'},
 {id:2,mahasiswaId:'M002',judul:'Portal akademik lambat',kategori:'Akademik',deskripsi:'Portal akademik sulit diakses.',status:'diajukan',createdAt:'2026-11-19T09:00:00.000Z'}
];
let nextId=3;
const all=()=>entries.map(x=>({...x}));
const find=id=>entries.find(x=>x.id===id);
const add=data=>{const row={id:nextId++,...data};entries.push(row);return {...row};};
const update=(id,patch)=>{const x=find(id);Object.assign(x,patch);return {...x};};
const remove=id=>{entries=entries.filter(x=>x.id!==id)};
module.exports={all,find,add,update,remove};
