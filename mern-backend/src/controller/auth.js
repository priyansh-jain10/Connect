const User = require ('../models/user');//importing User.js from models
const jwt = require ('jsonwebtoken')//json web token library, default algo= HS256
const bcrypt = require("bcrypt");

exports.signup =(req, res) =>{//signup function called in user route from here
    User.findOne({email: req.body.email})//check if the user already exists
    .exec((err, user)=>{
        if (user) return res.status(400).json({
            message: "User Already registered"
        });

        const { //required fields of signup process
            firstName,
            lastName,
            email,
            password
        } = req.body;
        
        const _user = new User({
            firstName,
            lastName,
            email,
            password,
            username: Math.random().toString()//random username str for now
        });

        _user.save((err, data)=>{//after user is saved
            if(err){
                return res.status(400).json({
                    message: 'Something went Wrong!'
                });
            }
            if (data){
                return res.status(201).json({
                    //user: data
                    message: "User Created Successfully!"
                })
            }
        });
    })
}

//func for signin
exports.signin =(req,res) =>{
    User.findOne({email: req.body.email }) //find the user in the table
    .exec ((err, user)=>{
        if(err) return res.status(400).json({err});
        if(user){//if user exists, authenticate by matching with password
            if(user.authenticate(req.body.password))
            {
                //if authentication success, create token to manage user session
                //when user logs in, sends request which we can verify from backend
                const token = jwt.sign({_id: user._id},process.env.JWT_SECRET,{expiresIn: '1h'}) // first payload = _id, user: pwd true || token expires in 1 hr
                const {_id, firstName, lastName, email, role, fullName } = user; //to give user data, it is destructured first
                res.status (200).json({
                    token,
                    user:{_id, firstName, lastName, email, role, fullName}
                });
            }else{// if pwd doesnt match
                return res.status(400).json({
                    message: "Invalid Password"
                })
            }

        }else{
            return res.status(400).json({message: "Something went wrong!"});
        }
        });
}

//middleware function to verify login user request 
exports.requireSignin = (req, res, next)=>{ // authorization in header will be request and accessed here
    const token = req.headers.authorization.split(" ")[1];//cause it's in format Bearer Token
    const user = jwt.verify(token, process.env.JWT_SECRET); // user info, _id issued at token issuer/expiry time
    req.user = user // attaching user with req so that we can access it in next function call
    next();
}
