const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    name:String,
    email: {type: String,unique: true},
    password: String,
    token:String,
    verified:{type:Boolean, default:false},
    parent: { type: Schema.Types.ObjectId, ref: 'User', default: null } // Add parent reference

});

const User = mongoose.model('User', userSchema);

module.exports = User;
