const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');//lib used to hash password

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        trim: true//remove whitespace if present
    },
    lastName:{
        type: String,
        required: true,
        trim: true
    },
    username:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true, //indexing based on username
        lowercase: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password:{
        type: String,
        require: true,
    },
    role:{
        type: String,
        enum:['user', 'admin'],
        default: 'user',
    },
    contactNumber:{
        type: String
    },
    profilePicture:{
        type: String
    },
},{timestamps:true});//for dates, predefined second object timestamp is added

userSchema.virtual('password')//virtual field creation possible in mongoose lib
.set(function(password){//take pwd as input
    this.hash_password=bcrypt.hashSync(password, 10);//before setting password, we can set it from here
});

userSchema.virtual('fullName')//function to create fullname by joining first and last name
.get(function(){
    return `${this.firstName} ${this.lastName}`;
})

userSchema.methods ={ //method created to check if the passwords are correct or not
    authenticate: function(password){
        return bcrypt.compareSync(password, this.hash_password);
    }
}
module.exports = mongoose.model('User', userSchema);// User model exported here

