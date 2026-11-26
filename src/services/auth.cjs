const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const users=require('../repositories/users.cjs');
const {HttpError}=require('../utils/http.cjs');
function login(body){
 if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(k=>!['username','password'].includes(k))||typeof body.username!=='string'||typeof body.password!=='string'||!body.username.trim()||!body.password)throw new HttpError(400,'username dan password wajib diisi');
 const user=users.findByUsername(body.username);
 if(!user||!bcrypt.compareSync(body.password,user.passwordHash))throw new HttpError(401,'Kredensial tidak valid');
 return {accessToken:jwt.sign({role:user.role},process.env.JWT_SECRET,{subject:user.id,expiresIn:process.env.JWT_EXPIRES_IN||'1h',algorithm:'HS256'}),tokenType:'Bearer',expiresIn:process.env.JWT_EXPIRES_IN||'1h',user:{id:user.id,role:user.role}};
}
module.exports={login};
