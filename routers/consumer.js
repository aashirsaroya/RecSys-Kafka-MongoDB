const { Kafka } = require('kafkajs')
const UserPurchase = require('../models/mostpurchased')
const ViewedCourses = require('../models/mostviewed')
require('../db/mongoose') 

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092']
})
 

const topic_purchased  = 'aptech-testing-one'
const topic_viewed = 'courses-viewed'
const consumer = kafka.consumer({ groupId: 'kafka-practice-group-two' })
 
const run = async () => {
  // Producing
  await consumer.connect()
  await consumer.subscribe({ topic: topic_purchased })
  await consumer.subscribe({topic: topic_viewed})
 
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const r = message.value.toString()
      const req = JSON.parse(r)
      //JSON.parse(message.value)
      // console.log(js)
      // const req = {
      //   "CourseId" : "123"
      // }
      if(topic === topic_purchased)
      { 
        if(req.UserId != undefined && req.ServerUserId != undefined)
        {
          //Updating the Cookies aasigned folks's clicks when they finally become a registered user, might help with recommendations :)
          const filter = { ServerUserId : req.ServerUserId }
          const updateDocs = {
                  $set: {
                      UserId : req.UserId
                        }
                    }
           await UserPurchase.updateMany(filter,updateDocs)
           console.log('Purchased table Updation done')
        }
        const userpurchase = new UserPurchase(req)
        try
        {
          await userpurchase.save()
          console.log('Course Purchased',userpurchase)
        }
        catch(e)
        {
          console.log(e)
        }
      }
      else if(topic === topic_viewed)
      {
        if(req.UserId != undefined && req.ServerUserId != undefined)
        {
          //Updating the Cookies aasigned folks's clicks when they finally become a registered user, might help with recommendations :)
          const filter = { ServerUserId : req.ServerUserId }
          const updateDocs = {
                  $set: {
                      UserId : req.UserId
                        }
                    }
           await ViewedCourses.updateMany(filter,updateDocs)
           console.log('Viewed Table Updation done')
        }
         const viewedcourses = new ViewedCourses(req)
         try
        {
          await viewedcourses.save()
          console.log('Course Viewed',viewedcourses)
        }
        catch(e)
        {
          console.log(e)
        }
      }
    },
  })

  
}

run().catch(console.error)