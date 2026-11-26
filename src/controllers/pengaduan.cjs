const service=require('../services/pengaduan.cjs');const {ok}=require('../utils/http.cjs');
module.exports={
 list:(req,res)=>ok(res,200,service.list(req.user)),
 detail:(req,res)=>ok(res,200,service.detail(req.params.id,req.user)),
 create:(req,res)=>ok(res,201,service.create(req.body,req.user)),
 edit:(req,res)=>ok(res,200,service.edit(req.params.id,req.body,req.user)),
 remove:(req,res)=>ok(res,200,service.remove(req.params.id,req.user)),
 status:(req,res)=>ok(res,200,service.status(req.params.id,req.body,req.user))
};
