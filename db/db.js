const mongoose = require('mongoose');


module.exports = async function () {
    try {
        await mongoose.connect('mongodb://localhost:27017/oauth2');
        console.log(`MongoDB is connected succssfully`)

    } catch (error) {
        console.log(`Faild to connect to MongoDB:\n ${error}`)

    }
}