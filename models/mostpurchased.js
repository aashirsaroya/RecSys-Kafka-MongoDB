const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        CourseId: {
            type: String,
            required: true
        },
        
        ServerUserId: {
            type: String,
            required: false
        },
        UserId: {
            type: String,
            required: false
        },
        IP: {
            type: String,
            required: false
        },
        Category: {
            type: String,
            required: false
        }
    }
)

const UserPurchase = mongoose.model('UserPurchase',userSchema)

module.exports = UserPurchase