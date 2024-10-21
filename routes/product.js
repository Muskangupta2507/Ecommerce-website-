const express =require('express');
const router=express.Router(); //mini instance instead of app.js
const Product=require('../models/Product')
const {validateProduct}=require('../middleware')


// to show all the products
router.get('/products',async(req,res)=>{
    try{
        let products=await Product.find({});
        res.render("products/index",{products});
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//to show the form for new Product
router.get('/product/new',(req,res)=>{
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

// to actually add in db
router.post('/products', validateProduct, async(req,res)=>{
    try{
        let {name,img,price,desc}=req.body;
        await Product.create({name,img,price,desc});
        res.redirect('products');
    }catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

// to show a particular product
router.get('/products/:id', async(req,res)=>{
    try{
        let{id}=req.params;
        let foundproduct=await Product.findById(id).populate('reviews');
        res.render('products/show',{foundproduct });
    }catch(e){
        res.status(500).render('error',{err:e.message});
}
})

// form to edit the product
router.get('/products/:id/edit', async(req,res)=>{
    try{
        let {id}=req.params;
        let foundproduct=await Product.findById(id);
        res.render('products/edit',{foundproduct});
    }catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//to actually edit the data in db
router.patch('/products/:id', validateProduct ,async(req,res)=>{
    try{
        let {id}=req.params;
        let {name,img,price,desc}=req.body;
        await Product.findByIdAndUpdate(id,{name,img,price,desc});
        // req.flash('msg','Product edited successfully');
        res.redirect(`/products/${id}`);
    }catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

//to delete the product
router.delete('/products/:id', async(req,res)=>{
    try{
        let {id}=req.params;
        const product=await Product.findById(id);

        // // for(let pid of product.reviews){
        // //     await Review.findByIdAndDelete(pid);
        // // }
        
        await Product.findByIdAndDelete(id);
        // // is middleware ki vajah se hi humara behind the scene vala middleware chal paa raha h
        res.redirect('/products');
    }catch(e){
        res.status(500).render('error',{err:e.message});
    }
})

module.exports=router;