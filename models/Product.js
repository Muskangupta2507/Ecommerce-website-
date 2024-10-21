const mongoose=require('mongoose');
const {ObjectId} =require('mongodb');
const {Review} =require('./Review');

let productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim:true
    },
    img:{
        type: String,
        trim:true,
        // default:
    },
    price:{
        type: Number,
        // min:0,
        required:true
    },
    desc:{
        type: String,
        trim:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]

});
//ObjectID :- uniquely identify the review 1:many i.e product-many-reviews
// ref:- reference of the model ki is model se aapko objectid leni h


// middleware jo behind the scene mongodb operations karwane pr use hote h and iske andar pre and post middleware 
// hote h which are basically used over the schema and before the model(model is js class).

// ab hum yahan pre daale ya post daale usko pata h ki pehle kya karna h 

productSchema.post('findOneAndDelete',async function(product){
    if(product.reviews.length > 0){
        await  Review.deleteMany({_id:{$in:product.reviews}})
    }
})

let Product=mongoose.model('Product',productSchema);
module.exports=Product;








