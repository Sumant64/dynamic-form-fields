const mongoose = require('mongoose');

const connectDB = async() => {
    mongoose.set("strictQuery", false);

    mongoose.connect("mongodb://127.0.0.1:27017/dynamicform").then(() => {
        console.log("connection successfull to db");
    }).catch((err) => {
        console.log(err);
    })
}

module.exports = connectDB;