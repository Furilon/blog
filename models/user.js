const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true, 
    },
    password: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
        default: "Mykyta Medvediev",
    },
    admin: {
        type: Boolean,
        default: true,
    },
})

module.exports = mongoose.model("User", userSchema)