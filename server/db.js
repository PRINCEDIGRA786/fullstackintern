const mongoose = require('mongoose')
// const mongoURI = "mongodb://127.0.0.1:27017/fullstack"
const mongoURI = "mongodb+srv://digraprince7:ZJ1WgPW7afqpol0T@cluster0.gbkz1kn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// ZJ1WgPW7afqpol0T
const connectToMongo = async () => {
    // mongoose.set('strictQuery', true)
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoURI)
        console.log('Mongo connected successfully')
    } catch (error) {
        console.log(error)
    }
}


module.exports = connectToMongo;