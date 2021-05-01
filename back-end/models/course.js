const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    details: {
        type: String
    }
}, {timestamps: true});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
