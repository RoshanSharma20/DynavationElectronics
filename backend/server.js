const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRouter');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const categoryRouter = require('./routes/categoryRouter');
const productRouter = require('./routes/productRouter')

//configuring env
dotenv.config();//since env file is in root directory no need to add path of the file


//configure database
connectDB();//call to establish connection with database

const app = express();

const PORT = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));//used in development phase to check the api calls being made


app.listen(PORT);
app.use(cookieParser());


//all routes
app.use('/auth', authRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);




app.get('/', (req, res) => {
    res.json("HELLO universe");
})

console.log(`listening on port ${PORT}`);