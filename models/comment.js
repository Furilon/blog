const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50, 
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    },
    post: {
        type: Schema.Types.ObjectId,
        reference: "Blogpost"
    }
})

module.exports = mongoose.model("Comment", commentSchema)