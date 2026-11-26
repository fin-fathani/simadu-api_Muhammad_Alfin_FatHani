const {HttpError}=require('../utils/http.cjs');
const notFound=(req,res,next)=>next(new HttpError(404,'Endpoint tidak ditemukan'));
const errorHandler=(err,req,res,next)=>{
 if(res.headersSent)return next(err);
 const code=err.status|| (err.type==='entity.parse.failed'?400:500);
 const status=[400,401,403,404,500].includes(code)?code:500;
 const message=status===500?'Terjadi kesalahan internal server':err.message;
 // Jangan menulis token, password, atau body sensitif ke log.
 if(status===500)console.error('Internal server error:',err.name);
 res.status(status).json({success:false,error:{code:status,message}});
};
module.exports={notFound,errorHandler};
