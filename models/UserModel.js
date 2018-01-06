const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseModel = require('./CourseModel');

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true },
    password: {type: String, required: true},
    created: {type: Date, default: Date.now, required: true},
});

userSchema.methods.courses = function() {
    return CourseModel.find({ 'user': this });
}

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
