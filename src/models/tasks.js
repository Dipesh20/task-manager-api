const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    description:{
        type: String
    },
    completed:{
        type: Boolean,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectID,
        required:true,
        ref: 'User'
    }
},{
    timestamps:true
})
TaskSchema.pre('save',async function(next){
    const task = this
    if(task.isModified('description'))
    {
        task.description = task.description
    }
    if(task.isModified('completed'))
    {
        task.completed = task.completed
    }
    next()
})

const Tasks = mongoose.model('Tasks',TaskSchema)

module.exports = Tasks