const UserPurchase = require('./models/mostpurchased')
const ViewedCourses = require('./models/mostviewed')
require('./db/mongoose')

async function run(){
    const ctr = await UserPurchase.aggregate([ { $sortByCount : '$CourseId'}])
    const ctr2 = await ViewedCourses.aggregate([ { $sortByCount : '$CourseId'}])
    const query = { ServerUserId : 'Uchq2A9DJ0' }
    const ctr3 = await ViewedCourses.find(query,{CourseId:1,_id:0})
    //console.log(ctr3)
    const trial = new Set()
    ctr3.forEach(element => {
        await trial.add(element._id)
        console.log(element.CourseId)
    });
    console.log(trial)




    
    //console.log(ctr3)
    //const ans = JSON.parse(ctr)
    // const filter = { ServerUserId : '92D-2AtKw9'}
    // const updateDocs = {
    //     $set: {
    //         UserId : 'Postman'
    //     }
    // }
    // const ans = await ViewedCourses.updateMany(filter,updateDocs)
    // console.log(ans)
    // console.log(ctr)
    // console.log(ctr2)
}
run().catch(console.error)
// let express = require('express');
// const session = require('express-session')
// //setup express app
// const cookie = require('cookie')
// const app = express()
// const cookieParser = require('cookie-parser')
// const RequestIp = require('request-ip')
// const { nanoid } = require('nanoid')
// app.use(cookieParser())
// app.use(RequestIp.mw())

// // app.use(session({
// //     secret: 'some secret',
// //     cookie: {maxAge: 30000},
// //     saveUninitialized: false,
// //     resave: false
// // }))
// //basic route for homepage
// app.get('/', (req, res)=>{
//      res.setHeader("Set-Cookie",cookie.serialize('UserId','User1',{
//       httpOnly: true,
//       maxAge: 3000
//     }))
//   res.send('welcome to express app');
//   console.log(req.cookies.UserId)
//   console.log(req.clientIp)
//   console.log(nanoid(10))
// });

// const users = {
//     name: "Aashir",
//     age: "20"
// }
// app.get('/setuser', (req, res) => {
//     // res.cookie("userData", users)
//     res.send('User Data added to cookie')
// })

// app.get('/getuser', (req,res) => {
//     res.send(req.cookies)
// })

// app.get('/clear', (req,res) => {
//     // res.clearCookie("userData")
//     res.send('Cookie cleared')
// })

// function validateCookie(req, res, next) {
// //     const { cookies } = req
// //     console.log(cookies)
// //     if('session_id' in cookies)
// // {
// //         console.log('Session ID Exists.')
// //         if( cookies.session_id === '123456')
// //     {
// //         next()
// //     }
// //     else
// //     {
// //         res.status(403).send({msg: 'Not Authenticated'})
// //     }
// // }
// // else
// // {
// //     res.status(403).send({msg: 'Not Authenticated'})
// // }
    
// }

// app.get('/signin' , (req, res) => {
//     // res.cookie('session_id','123456')
   

//     res.status(200).send({msg: 'Logged In :)'})
// } )

// app.get('/protected',validateCookie, (req,res) => {
//     res.status(200).json({msg : 'You are authorized'})
// })

// app.post('/login', (req, res) => {
    
//     console.log(req.sessionID)
//     const { username, password } = req.body
//     if( username && password)
//     {
//         if(req.session.authenticated)
//         {
//             res.json(req.session)
//         }
//         else
//         {
//             if(password === '123')
//             {
//                 req.session.authenticated = true
//                 req.session.user = {
//                     username, password
//                 }
//                 res.send(req.session)
//             }
//             else
//             {
//                 res.status(403).json({msg : 'Bad Credentials'})
//             }
//         }
//     }
//     else
//     {
//         res.status(403).json({msg : 'Bad Credentials'})
//     }
//     res.status(200).send()
// })
  
//server listens to port 3000
// app.listen(3000, (err)=>{
// if(err)
// throw err;
// console.log('listening on port 3000');
// })
