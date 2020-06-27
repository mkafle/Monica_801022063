exports.sessionTrue = (req,res,next)=>{
    if (req.session.status == "active") {
       return res.redirect('/list_post');
    }
    return next();
}
exports.sessionFalse = (req,res,next)=>{
    if (req.session.status != "active") {
       return res.redirect('/login');
    }
    return next();
}