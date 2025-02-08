const mongoose = require('mongoose');
const mongooseURI = "mongodb://127.0.0.1:27017/inotebook"

const connectToMongo = async()=>{
    await mongoose.connect(mongooseURI);
    console.log("connect");
    
}

module.exports = connectToMongo