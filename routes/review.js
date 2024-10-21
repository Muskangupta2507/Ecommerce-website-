const express =require('express');
const router=express.Router(); //mini instance instead of app.js
const Review=require('../models/Review');
const Product = require('../models/Product');
const {validateReview}=require('../middleware')

router.post('/products/:id/review', validateReview ,async(req,res)=>{
    try{
        let {id} =req.params;
        let {rating,comment}=req.body;
        const product=await Product.findById(id);
        // review ko banane ke 2 ways :-  through model or through js ,,, we are making through js here
        const review= new Review({rating,comment});

        product.reviews.push(review);

        await review.save();
        await product.save();
        // req.flash('msg','Review added successfully');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        // console.log(e.message)
        res.status(500).render('error',{err:e.message});
    }

})






module.exports=router;