const express=require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const dotenv=require('dotenv');
const seedDB=require('./seed');
dotenv.config();
const ProductsRoutes=require('./routes/product')
const ReviewRoutes=require('./routes/review')
const ejsMate=require('ejs-mate');
const methodOverride=require("method-override");
const flash=require('connect-flash');
const session= require('express-session');

mongoose.connect(process.env.Mongo_DB)
.then(()=>{console.log("DB connected successfully");})
.catch((error)=>{console.log("DB error",error);})

//session
let configSession={
    secret:'keyword cat',
    resave:false,
    saveUninitialized:true,
    // cokkie:{secure : true}
}

app.set('view engine','ejs'); //view engines work is to read the ejs file only
//view engine is present inside express by default so we can change it to ejs mate :- ejs template engine
// ejs is not a enjine it is a templating language
app.engine('ejs',ejsMate); //konsi file ko , konsa engine read kar raha h
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session(configSession));
// app.use(flash());

// seedDB();

app.use(ProductsRoutes); //har incomming req ke liye path check kiya jaega
app.use(ReviewRoutes);

const PORT=8080;
app.listen(PORT,()=>{
    console.log(`Server connected at port ${PORT}`);
})