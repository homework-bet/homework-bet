const mongoose = require('mongoose'), 
      bcrypt = require('bcryptjs'),
      Schema = mongoose.Schema,
      SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    email: {type: String, unique: true, required: true, trim: true},
    password: {type: String, required: true},
    // courses: [
    //     { type: Schema.Types.ObjectId, ref: 'Course' }
    // ],
    created: {type: Date, default: Date.now, required: true},
});

/*
 * adapted from devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
 */

UserSchema.pre('save', function(next) {
    var user = this;
        
    if( !user.isModified('password') ) return next();

    // generate salt
    bcrypt.genSalt( SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
            return next(err);
        } 

        // hash password 
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) { 
                return next(err);
            }

            // finally, override password with hash
            user.password = hash;
            next();
        });
    });
});


var reasons = UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    INVALID_PASS: 1
};

UserSchema.methods.comparePassword = function( candidate, callback ) {

    // compare supplied password to stored password hash
    bcrypt.compare(candidate, this.password, function(err, isMatch) {
        if(err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

UserSchema.statics.getAuthenticated = function(email, pass, callback) {

    // check if email exists in our database 
    this.findOne({email: email}, function(err, user) {
        if(err) {
            return callback(err);
        }

        // if user not found
        if(!user) {
            return callback(null, null, reasons.NOT_FOUND);
        }
        
        // otherwise, compare supplied password with stored
        user.comparePassword( pass, function(err, isMatch) {
            if(err) {
                return callback(err);
            }
            else if(!isMatch) {    // if 
                return callback(null, null, reasons.INVALID_PASS);
            }
            else {
                return callback(null, user);
            }
        });
    });
};

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
