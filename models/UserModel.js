const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true },
    password: {type: String, required: true},
    // courses: [
    //     { type: Schema.Types.ObjectId, ref: 'Course' }
    // ],
    created: {type: Date, default: Date.now, required: true},
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
