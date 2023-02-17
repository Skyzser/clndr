// With async/await, you have to use try/catch, but with express-async-handler, you can just use the error handler
const asyncHandler = require('express-async-handler');
const moment = require("moment");
const Event = require('../models/eventModel');
const User = require('../models/userModel');
const check = require('../middleware/checkConstraints');

/*
    @desc - Get events
    @route - GET /api/events
    @access - Private
*/
const getEvents = asyncHandler(async (req, res) => {
    // To get only the specific user's events
    // user field in Event model is a reference to the User model
    // now can access req.user.id because of the protect middleware
    const events = await Event.find({ user: req.user._id });
    res.status(200).json(events);
});

/*
    @desc - Set event
    @route - POST /api/events
    @access - Private
*/
const eventConstraints = (req) => {
    return {
        title: {
            test: (s) => s && s.length > 0 && s.length < 20,
            error: "Title must be between 1 and 20 characters"
        },
        description: {
            test: (s) => s && s.length > 0 && s.length < 100,
            error: "Description must be between 1 and 100 characters"
        },
        start: {
            test: (s) => s && moment(s).isValid(),
            error: "Start date is not valid"
        },
        end: {
            test: (s) => s && moment(s).isValid() && checkDate(req.body.start, s),
            error: "End date is not valid/end date should not be before start date"
        }
    }
}
// To check if the start date is before the end date
const checkDate = (start, end) => {
    var startDate = moment(start);
    var endDate = moment(end);
    return startDate.isBefore(endDate);
}
const setEvent = asyncHandler(async (req, res) => {
    // Error handling
    let checkResult = check(req.body, eventConstraints(req));
    if(checkResult !== '') {
        res.status(400);
        throw new Error(checkResult);
    }

    const event = await Event.create({
        user: req.user._id,
        title: req.body.title,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end
    });
    res.status(200).json({ message: 'Event created', event });
});

/*
    @desc - Update event
    @route - PUT /api/events/:id
    @access - Private
*/
const updateEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if(!event) {
        res.status(404);
        throw new Error('Event not found');
    }
    
    // Get user and check for user
    const user = await User.findById(req.user.id);
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure only the user who created the event can update it
    if(event.user.toString() !== user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    // new: true returns the updated goal if it does not return the old goal
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ updatedEvent });
});

/*
    @desc - Delete event
    @route - DELETE /api/events/:id
    @access - Private
*/
const deleteEvent = asyncHandler(async (req, res) => {
    const event = await Event.findById(req.params.id);

    if(!event) {
        res.status(404);
        throw new Error('Event not found');
    }

    // Get user and check for user
    const user = await User.findById(req.user.id);
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure only the user who created the event can delete it
    if(event.user.toString() !== user.id) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await event.remove();
    res.status(200).json({ id: req.params.id });
});

module.exports = { getEvents, setEvent, updateEvent, deleteEvent };