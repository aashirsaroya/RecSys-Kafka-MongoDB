const { Kafka } = require('kafkajs')

const express = require('express')
const cookie = require('cookie')
const { nanoid } = require('nanoid')
const rip = require('request-ip')
const router = new express.Router()

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'] 
})
 
const producer = kafka.producer()
const topic_purchased  = 'aptech-testing-one'
const topic_viewed = 'courses-viewed'

// GET request to fetch the course_id of course viewed by any user

router.get('/coursesviewed/:id', async (req, res) => {

  if(req.query.userid === undefined) //Not a registered User
  {
    const crsid = req.params['id']
    if(req.cookies.UserId != undefined)// Unregistered Revisting User
      {
      const up = {
        "CourseId" : crsid,
        "ServerUserId" : req.cookies.UserId,
        "UserId" : req.query.userid,
        "IP" : rip.getClientIp(req),
        "Category" : req.query.category,
        "Cart" : req.query.cart
      }
      try
      {
        await producer.connect()
        await producer.send({
                    topic : topic_viewed,
                    messages: [
                      { value: JSON.stringify(up) },
                    ],
                  })
        console.log(up)
        res.status(201).send('Course ID successfully received!')
      }
      catch(e)
      {
        res.status(400).send(e)
      }
    }
    else //First Time User
    {
      const serverUid = nanoid(10)
      res.setHeader("Set-Cookie",cookie.serialize('UserId',serverUid,{
        httpOnly: true,
        maxAge: 315569260, //No of seconds in 10 years
        path: '/'
        }))
        const up = {
          "CourseId" : crsid,
          "ServerUserId" : serverUid,
          "UserId" : req.query.userid,
          "IP" : rip.getClientIp(req),
          "Category" : req.query.category,
          "Cart" : req.query.cart
        }
        try
        {
          await producer.connect()
          await producer.send({
                      topic : topic_viewed,
                      messages: [
                        { value: JSON.stringify(up) },
                      ],
                    })
          console.log(up)
          res.status(201).send('Course ID successfully received!')
        }
        catch(e)
        {
          res.status(400).send(e)
        }
    }
  }
  else //A Registered User
  {
    const cid = req.params['id']
    const up = {
      "CourseId" : cid,
      "ServerUserId" : req.cookies.UserId,
      "UserId" : req.query.userid,
      "IP" : rip.getClientIp(req),
      "Category" : req.query.category,
      "Cart" : req.query.cart
    }
    try
    {
      await producer.connect()
      await producer.send({
                  topic : topic_viewed,
                  messages: [
                    { value: JSON.stringify(up) },
                  ],
                })
      console.log(up)
      res.status(201).send('Course ID successfully received!')
    }
    catch(e)
    {
      res.status(400).send(e)
    }
  }
  
})

// GET request to fetch the course_id of course purchased by any  user

router.get('/coursespurchased/:id', async (req, res) => {
  if(req.query.userid === undefined) //Not a registered User
  {
    const crsid = req.params['id']
    if(req.cookies.UserId != undefined)// Unregistered Revisting User
      {
      const up = {
        "CourseId" : crsid,
        "ServerUserId" : req.cookies.UserId,
        "UserId" : req.query.userid,
        "IP" : rip.getClientIp(req),
        "Category" : req.query.category,
        "Cart" : req.query.cart
      }
      try
      {
        await producer.connect()
        await producer.send({
                    topic : topic_purchased,
                    messages: [
                      { value: JSON.stringify(up) },
                    ],
                  })
        console.log(up)
        res.status(201).send('Course ID successfully received!')
      }
      catch(e)
      {
        res.status(400).send(e)
      }
    }
    else //First Time User
    {
      const serverUid = nanoid(10)
      res.setHeader("Set-Cookie",cookie.serialize('UserId',serverUid,{
        httpOnly: true,
        maxAge: 315569260, //No of seconds in 10 years
        path: '/'
        }))
        const up = {
          "CourseId" : crsid,
          "ServerUserId" : serverUid,
          "UserId" : req.query.userid,
          "IP" : rip.getClientIp(req),
          "Category" : req.query.category,
          "Cart" : req.query.cart
        }
        try
        {
          await producer.connect()
          await producer.send({
                      topic : topic_purchased,
                      messages: [
                        { value: JSON.stringify(up) },
                      ],
                    })
          console.log(up)
          res.status(201).send('Course ID successfully received!')
        }
        catch(e)
        {
          res.status(400).send(e)
        }
    }
  }
  else //A Registered User
  {
    const cid = req.params['id']
    const up = {
      "CourseId" : cid,
      "ServerUserId" : req.cookies.UserId,
      "UserId" : req.query.userid,
      "IP" : rip.getClientIp(req),
      "Category" : req.query.category,
      "Cart" : req.query.cart
    }
    try
    {
      await producer.connect()
      await producer.send({
                  topic : topic_purchased,
                  messages: [
                    { value: JSON.stringify(up) },
                  ],
                })
      console.log(up)
      res.status(201).send('Course ID successfully received!')
    }
    catch(e)
    {
      res.status(400).send(e)
    }
  }
})
module.exports = router

