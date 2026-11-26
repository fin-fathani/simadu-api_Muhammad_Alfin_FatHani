const jwt=require('jsonwebtoken');
const {HttpError}=require('../utils/http.cjs');
const authenticate=(req,res,next)=>{
 const header=req.headers.authorization||'';
 if(!/^Bearer\s+\S+$/i.test(header))return next(new HttpError(401,'Token Bearer diperlukan'));
 try {
  const payload=jwt.verify(header.replace(/^Bearer\s+/i,''),process.env.JWT_SECRET,{algorithms:['HS256']});
  if(!payload.sub||!['admin','mahasiswa'].includes(payload.role))throw new Error('Invalid token');
  req.user={id:payload.sub,role:payload.role};next();
 } catch {next(new HttpError(401,'Token tidak valid atau kedaluwarsa'));}
};
module.exports={authenticate};
