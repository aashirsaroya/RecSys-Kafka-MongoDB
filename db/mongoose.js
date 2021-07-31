const mongoose = require('mongoose')

//const uri = "mongodb+srv://aashir:aashir@cluster0.xv3jd.mongodb.net/Kafka-Practice?retryWrites=true&w=majority";

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