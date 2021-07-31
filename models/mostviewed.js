const mongoose = require('mongoose')

const viewedSchema = new mongoose.Schema(
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
        },
        Cart: {
            type: Boolean,
            default: false,
            required: false
        }
    }
)

const ViewedCourses = mongoose.model('ViewedCourses',viewedSchema)

module.exports = ViewedCourses