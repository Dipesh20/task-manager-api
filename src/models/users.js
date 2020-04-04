const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./tasks')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required:true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Invalid Email')
            }
        }
    },
    age:{
        type: Number,
        default: 0,
        validate(value){
            if(value<0)
                throw new Error('Age must be greater than zero')
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password'))
            {
                throw new Error("Password should not include password")
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

UserSchema.virtual('tasks',{
    ref: 'Tasks',
    localField:'_id',
    foreignField:'owner'
})

UserSchema.methods.generateAuthToken  = async function(){
        const user = this
        const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
        user.tokens = user.tokens.concat({token})
        await user.save()
        return token

}
UserSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}
UserSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user)
    {
        throw new Error('Unable to log in')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)
    {
        throw new Error('Wrong password')
    }
    return user
}


UserSchema.pre('save',async function (next) {
    const user = this
    if(user.isModified('password'))
    {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})

UserSchema.pre('remove',async function(next) {
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})
const  User = mongoose.model('User',UserSchema)


module.exports = User