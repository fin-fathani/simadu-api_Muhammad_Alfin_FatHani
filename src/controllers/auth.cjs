const service=require('../services/auth.cjs');const {ok}=require('../utils/http.cjs');
module.exports={login:(req,res)=>ok(res,200,service.login(req.body))};
