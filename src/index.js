const express = require('express')
const UserRouter = require('./router/users')
const TasksRouter = require('./router/tasks')
const mongoose = require('mongoose')


mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useCreateIndex:true
})

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(UserRouter)
app.use(TasksRouter)

app.listen(PORT,()=>{
    console.log('server running on ',PORT)
})

const multer = require('multer')
const upload = multer({
    dest:'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docx)$/))
        {
            return cb(new Error('Please upload Word Doc'))
        }
        cb(undefined,true)
        // cb(undefined,false)
    }
})
app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
},(error,req,res,next)=>{
    res.send({error:error.message})
})

// //const Task = require('./models/tasks')
// const User = require('./models/users')
// const main = async ()=>{
//     const user = await User.findById('5e82dae6877fba2428010cf7')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
//     // const task = await Task.findById('5e82dca442e05c358405dbec')
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)
// }
// main()

