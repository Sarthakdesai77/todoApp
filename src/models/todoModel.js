const mongoose = require('mongoose')

let date = new Date()

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    date: {
        type: String,
        required: true,
        default: date.toLocaleDateString(),
    },
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: String,
        default: false,
    }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('todo', todoSchema)