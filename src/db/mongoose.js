const mongoose = require('mongoose')
// const validator = require('validator')

const  connectionURL = 'mongodb://127.0.0.1:27017/task-manager-api'
mongoose.connect(connectionURL,{
    useNewUrlParser:true,
    useCreateIndex:true
})

    // const  User = mongoose.model('User',{
    //     name:{
    //         type: String,
    //         required: true
    //     },
    //     email:{
    //         type: String,
    //         trim: true,
    //         lowercase: true,
    //         required:true,
    //         validate(value) {
    //           if(!validator.isEmail(value))
    //           {
    //               throw new Error('Invalid Email')
    //           }
    //         }
    //     },
    //     age:{
    //         type: Number,
    //         default: 0,
    //         validate(value){
    //             if(value<0)
    //                 throw new Error('Age must be greater than zero')
    //         }
    //     },
    //     password:{
    //         type:String,
    //         required:true,
    //         minlength:6,
    //         trim: true,
    //         validate(value){
    //             if(value.toLowerCase().includes('password'))
    //             {
    //                 throw new Error("Password should not include password")
    //             }
    //         }
    //     }
    // })

    // const me = new User({
    //     name: 'Varinder Jindal',
    //     email: 'DIPE@g.com',
    //     password: 'passwordDi'
    // })
    // me.save().then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })


    const Tasks = mongoose.model('Tasks',{
        description:{
            type: String
        },
        completed:{
            type: Boolean
        }
    })

    const task1 = new Tasks({
        description: 'New Task is Initialized',
        completed: true
    })
    //
    // task1.save().then((result)=>{
    //     console.log(result)
    // }).catch((error)=>{
    //     console.log(error)
    // })
