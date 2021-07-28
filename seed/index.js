const mongoose = require("mongoose");
const Campground = require('../models/campground');
const cities= require('./cities');
const {places,descriptors} = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
     useNewUrlParser:true,
     useCreateIndex: true,
     useUnifiedTopology:true
});

const db= mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});
const sample = (array)=>{
    return array[Math.floor(Math.random()*array.length)];
} 
const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++)
    {    const price = Math.floor(Math.random()*5000);
        const random =Math.floor(Math.random()*1000);
       const camp= new Campground({
            location:`${cities[random].city}, ${cities[random].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/collection/483251',
            description:'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum, possimus similique officiis rem at eaque doloremque ipsam ullam. Tempore alias fugit consequuntur officiis asperiores eaque quasi fugiat voluptatum quisquam laboriosam.',
            price:price
        });
        await camp.save();
    }
}
seedDB().then(()=>{
  mongoose.connection.close();
});