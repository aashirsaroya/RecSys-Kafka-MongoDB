const UserPurchase = require('../models/mostpurchased')
const ViewedCourses = require('../models/mostviewed')
const express = require('express')
require('../db/mongoose')
const router = new express.Router()
// POST request which gets the most viewed courses
router.post('/mostviewed', async (req, res) => {
    try
    {
        async function run(){
            const ctr2 = await ViewedCourses.aggregate([{ $sortByCount : '$CourseId' }])
            res.status(200).send(ctr2)
        }
        run()
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

// POST request which gets the most purchased courses
router.post('/mostpurchased', async (req, res) => {
    try
    {
        async function run(){
            const ctr = await UserPurchase.aggregate([ { $sortByCount : '$CourseId'}])
            res.status(200).send(ctr)
        }
        run()
    }
    catch(e)
    {
        res.status(400).send(e)
    }
})

//POST request for non-logged in user for whom we have set cookie
router.post('/contentbased',async (req, res) => {
    if(req.query.userid != undefined)
    {
        //User is logged in, have to give personalized recommendations (Content Based Recommendation)
        const viewed = await ViewedCourses.find({UserId: req.query.userid},{CourseId:1,_id:0})
        var SeenCourses = []
        const trial = new Set() //Using Set to only send unique Course IDs
        viewed.forEach(element => {
            SeenCourses.push(element.CourseId)
        });
        for(let i in SeenCourses) trial.add(SeenCourses[i])
        var Reqans = []
        for(let i of trial) Reqans.push(i)
        res.status(200).send(Reqans)

    }
    else
    {
        //userid not in query means that we have to get the set-cookie and give recommendations accordingly
        const viewed = await ViewedCourses.find({ServerUserId: req.cookies.UserId},{CourseId:1,_id:0})
        var SeenCourses = []
        const trial = new Set() //Using Set to only send unique Course IDs
        viewed.forEach(element => {
            SeenCourses.push(element.CourseId)
        });
        for(let i in SeenCourses) trial.add(SeenCourses[i])
        var Reqans = []
        for(let i of trial) Reqans.push(i)
        res.status(200).send(Reqans)
    }
})



module.exports = router