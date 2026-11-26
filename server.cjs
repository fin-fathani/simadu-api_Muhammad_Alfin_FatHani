require('dotenv').config();
if(!process.env.JWT_SECRET||process.env.JWT_SECRET.length<32||process.env.JWT_SECRET.includes('GANTI_DENGAN')){
 console.error('ERROR: isi JWT_SECRET minimal 32 karakter acak pada file .env');process.exit(1);
}
const app=require('./app.cjs');
const port=Number(process.env.PORT||4000);
app.listen(port,()=>console.log(`SIMADU API berjalan di http://localhost:${port} | Swagger http://localhost:${port}/docs`));
