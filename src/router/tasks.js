const express = require('express')
const Tasks = require('../models/tasks')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/tasks',auth,async (req,res)=>{

    //const Task = new Tasks(req.body)
    const Task = new Tasks({
        ...req.body,
        owner:req.user._id
    })
    try {
        await Task.save()
        res.status(201).send(Task)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks/:id',auth,async (req,res)=>{

    const _id = req.params.id
    try {

        const task = await Tasks.findOne({_id,owner:req.user._id})
        if(!task)
        {
            res.status(404).send()
        }
        res.status(200).send(result)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/tasks',auth,async (req,res)=>{

    const match={}
    if(req.query.completed)
    {
       match.completed = req.query.completed === 'true'
    }
    try {
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip)
            }
        }).execPopulate()
        res.status(200).send(req.user.tasks)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.patch('/tasks/:id',auth,async (req,res)=>{
    const Updates = Object.keys(req.body)
    const Allowed = ["completed","description"]
    const isValid = Updates.every(entry => Allowed.includes(entry))
    if(!isValid)
    {
        return res.status(400).send('Invalid request')
    }
    try {

        const task = await Tasks.findOne({_id: req.params.id,owner:req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        Updates.forEach(update => task[update]=req.body[update] )
        await task.save()
        res.status(200).send(task)
    }
    catch (e) {
        res.status(400).send(e)
    }
})



router.delete('/tasks/:id',auth,async (req,res)=>{
    try {
        const task = await Tasks.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if(!task)
        {
            return res.status(404).send()
        }
        res.status(200).send(task)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router