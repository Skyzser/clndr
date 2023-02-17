const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'Please provide a username value'] },
    email: { type: String, required: [true, 'Please provide an email value'], unique: true },
    password: { type: String, required: [true, 'Please provide a password value'] },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);