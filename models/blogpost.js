const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Comment = require('./comment')

const blogpostSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100, 
    },
    content: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now(),
    },
    published: {
        type: Boolean,
        default: false,
    },
})

blogpostSchema.virtual('url').get(function(){
    return '/posts/' + this._id
})

module.exports = mongoose.model("Blogpost", blogpostSchema)