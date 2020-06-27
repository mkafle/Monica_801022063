const { validationResult } = require('express-validator/check');
exports.errorCollector = (req,res,next)=>{
    let error = validationResult(req);
    let errorCollections = [];
     for (const key in error.array()) {
         if (error.array().hasOwnProperty(key)) {
             const errorOBJ = error.array()[key];
               let dublicateIndex = errorCollections.findIndex(element => element.id == errorOBJ.param )
                if (dublicateIndex === -1) {
                    errorCollections.push({
                        id: errorOBJ.param,
                        msg: errorOBJ.msg,
                    })      
                }   
         }
     }
    if (errorCollections.length > 0) {
        return res.json({
            status: false,
            error: errorCollections
        });
    }else{
        next();
    }
}