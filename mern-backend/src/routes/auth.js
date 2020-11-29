const express = require ('express');
const { signup, signin, requireSignin } = require('../controller/auth'); // to get the signup,signin func from user controller
const router = express.Router(); //function

//attaching POST method functions with router
//userRoutes called  based on requests we are making are available here
router.post('/signup', signup);
router.post('/signin', signin);

/*
router.post('/profile', requireSignin, (req,res)=>{//to navigate to profile page
    res.status(200).json({user: 'profile'})
});
*/

module.exports =router; //exporting the router
