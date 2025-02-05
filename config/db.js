const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.MONGODB_URI)
    .on('open', ()=>{
        console.log("Connected to MongoDB");
    })
    .on('error',()=>{
        console.log("DB connection error");
    });

module.exports = connection;