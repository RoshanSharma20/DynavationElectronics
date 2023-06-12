const mogoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mogoose.connect(process.env.MONGO_URL);
        console.log("connection with mongo database established");
    }
    catch (err) {
        console.log("error in connecting to mongo database");
    }
}

module.exports = connectDB;