const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    // courses: [
    //     { type: Schema.Types.ObjectId, ref: 'Course' }
    // ],
    created: {type: Date, default: Date.now},
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;