const {productschema, reviewschema} =require('./schema');

const validateProduct=(req,res,next)=>{
    const {name,img,price,desc}=req.body;
    const{error}= productschema.validate({name,img,price,desc}) // gives 2 things error, value we dont need value here
    if(error){
        return res.render('error');
    }
    next();
}
// agar koi error nahi h to next vala middleware chal jae matlab next pr chale jaaye
// matlab validate ke next step pr move kar jae agar koi error nahi h to


const validateReview=(req,res,next)=>{
    const {rating,comment}=req.body;
    const{error}= reviewschema.validate({rating,comment}) // gives 2 things error, value we dont need value here
    if(error){
        return res.render('error' , {err:error});
    }
    next();
}

module.exports={validateProduct,validateReview}















