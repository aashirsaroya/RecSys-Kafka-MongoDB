const mongoose = require('mongoose')

// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// })
mongoose 
 .connect('mongodb://127.0.0.1:27017/kafka-practice', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("Database connected!"))
 .catch(err => console.log(err));
