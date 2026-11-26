class HttpError extends Error { constructor(status,message){super(message);this.status=status;} }
const ok=(res,status,data)=>res.status(status).json({success:true,data});
module.exports={HttpError,ok};
