const Product=require('./models/Product');
const mongose=require('mongoose');


let products=[
    {
        name:"IPhone13" ,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnTHiQYg8_MCYqoAGPYkYJ8IiOIUzizAaUeSl7isYeaIkFx0X4lGDwx0lLrbpTXec-G2M&usqp=CAU",
        price: 75000 ,
        desc: "Good product."
    },{
        name:"Samsung",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr6JClPJalOGE1Cfe-ETPxRrrHkooAsh5WGcZn7qvK4yax35Hi7Oib9ceSNB4qnemeXCM&usqp=CAU",
        price: 10000,
        desc: "Good product."
    },{
        name:"Sasta Iphone" ,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRosSoivCTpMsHd4Am-yx5_0bhr2I2IaYj7PA&usqp=CAU",
        price: 550,
        desc:"Good product."
    },
    {
        name:"Oneplus" ,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnTHiQYg8_MCYqoAGPYkYJ8IiOIUzizAaUeSl7isYeaIkFx0X4lGDwx0lLrbpTXec-G2M&usqp=CAU",
        price: 2500,
        desc:"Good product."
    },
    {
        name:"iPhone15" ,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZWh1ggq2Ll6ci96vixS2nVwsTL8UvPhkh1Zk8fNMJfL8YZb-cS_0Bh8NoS4ylLx-JyjI&usqp=CAU",
        price: 200000,
        desc:"Good product."
    }
]


async function seedDB(){
    // await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("Data Seeded");
}


module.exports = seedDB;