const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
{
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }, 
    title: { type: String, required: false },
    description: { type: String, required: false },
    start: { type: Date, required: true },
    end: { type: Date, required: false },
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;