const express = require  ('express');
const env = require ('dotenv');
const app= express (); //creates an app
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');//mongodb library for schema

//importing router here as authRoutes
const authRoutes= require ('./routes/auth'); //user
const adminRoutes= require ('./routes/admin/auth');//admin

env.config();//environment variable or constant

//mongodb connection
//mongodb+srv://admin:<password>@cluster0.g1oup.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.g1oup.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(()=> {
    console.log('Database Connected');   
});


//add middleware to pass data

/*app.use(express.json());//cause we sending json data
*/

// using body-parse library cause its better for this purpose
app.use(bodyParser());
app.use('/api', authRoutes);
app.use('/api',adminRoutes);
//prefex all api with keyword "api"
//btw making and handling req, if data is manipulated based on requirement we neeed middleware



/*
//first hello api
app.get('/',(req, res, next) => {
    res.status(200).json({// 200 is status code for successfull req
        message: "hello from server"
    });
});
 
app.post('/data',(req, res, next) =>{
    res.status(200).json({
        message: req.body
    });
});
*/


app.listen

(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});//going to listen at port 2000
