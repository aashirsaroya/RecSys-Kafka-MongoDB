const UserPurchase = require('../models/mostpurchased')
const ViewedCourses = require('../models/mostviewed')
const express = require('express')
require('../db/mongoose')
const router = new express.Router()

router.post('/results',async (req, res) => {
    if(req.cookies.UserId != undefined) //Means that Cookie already set, implies User is either Revisitor or Logged in User
    {
        if(req.query.userid != undefined) //Logged in Registered User
        {
            //Sending Courses Viewed by User + Courses in Cart 
            //Optionally will send most popular & most purchased if the above doesn't include enough recommendations
            try
            {
        async function run(){
            const viewed = await ViewedCourses.find({ServerUserId: req.cookies.UserId},{CourseId:1,_id:0})
            const cartCourses = await ViewedCourses.find({Cart: true},{CourseId:1,_id:0})  
            var partOne = []
            cartCourses.forEach(element => {
                partOne.push(element.CourseId)
            });
            viewed.forEach(element => {
                partOne.push(element.CourseId)
            });
            // ctr.forEach(element => {
            //    partOne.push(element._id) 
            // });
            // ctr2.forEach(element => {
            //     partOne.push(element._id)
            // });
            const partTwo = new Set()
            for(let i in partOne) partTwo.add(partOne[i])
            var results = []
            for(let i of partTwo) results.push(i)
            res.status(200).send(results)
        }
        run()
    }
    catch(e)
    {
        res.status(400).send(e)
    }
        }
        else // Cookie set, but not a logged in User
        {
            //Sending Courses Viewed by the User + Most Popular + Most Viewed
            try
            {
        async function run(){
            const ctr = await UserPurchase.aggregate([ { $sortByCount : '$CourseId'}]) 
            const ctr2 = await ViewedCourses.aggregate([{ $sortByCount : '$CourseId' }])
            const viewed = await ViewedCourses.find({ServerUserId: req.cookies.UserId},{CourseId:1,_id:0})  
            var partOne = []
            viewed.forEach(element => {
                partOne.push(element.CourseId)
            });
            ctr.forEach(element => {
               partOne.push(element._id) 
            });
            ctr2.forEach(element => {
                partOne.push(element._id)
            });
            const partTwo = new Set()
            for(let i in partOne) partTwo.add(partOne[i])
            var results = []
            for(let i of partTwo) results.push(i)
            res.status(200).send(results)
        }
        run()
    }
    catch(e)
    {
        res.status(400).send(e)
    }
        }
    }
    else //First Time User
    {
        //Since we have no previous record of visits of user we send him our most popular and most viewed courses
        try
    {
        async function run(){
            const ctr = await UserPurchase.aggregate([ { $sortByCount : '$CourseId'}]) 
            const ctr2 = await ViewedCourses.aggregate([{ $sortByCount : '$CourseId' }])  
            var partOne = []
            ctr.forEach(element => {
               partOne.push(element._id) 
            });
            ctr2.forEach(element => {
                partOne.push(element._id)
            });
            const partTwo = new Set()
            for(let i in partOne) partTwo.add(partOne[i])
            var results = []
            for(let i of partTwo) results.push(i)
            res.status(200).send(results)
        }
        run()
    }
    catch(e)
    {
        res.status(400).send(e)
    }
    }
})

module.exports = router