import { useState } from "react";
import { createEventFetch, updateEventFetch, deleteEventFetch } from "../Endpoints";
import Datetime from 'react-datetime';

import '../styles/Calendar.css';

const EventForm = ({ heading, event = null, onSuccess = () => {}, onError= () => {} }) => {
    // Event set to null, if creating new event. Otherwise, has data if editing existing event
    const [title, setTitle] = useState(event ? event.title : '');
    const [description, setDescription] = useState(event ? event.description : '');
    const [start, setStart] = useState(event ? event.start : '');
    const [end, setEnd] = useState(event ? event.end : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // If event doesn't exist, create new event. Otherwise, update existing event
        if(event === null) {
            createEventFetch({ title, start, end, description })
                .then((res) => {
                    if(res.status === 200) {
                        onSuccess('Event created successfully');
                    } else onError();
                })
        } else {
            updateEventFetch({ id: event._id, title, start, end, description })
                .then((res) => {
                    if(res.status === 200) {
                        onSuccess('Event updated successfully');
                    } else onError();
                })
        }
    };

    const deleteEvent = async () => {
        deleteEventFetch(event._id)
            .then((res) => {
                if(res.status === 200) {
                    onSuccess('Event deleted successfully');
                } else onError();
            })
    }

    return (
        <div>
            {heading && <h1 className="h1">{heading}</h1>}
            <form onSubmit={handleSubmit} className="eventForm">
                <input type='text' placeholder="Title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
                <input type='text' placeholder="Description" defaultValue={description} onChange={(e) => setDescription(e.target.value)} />
                <Datetime label={"start"} value={start} onChange={(val) => setStart(val)}/>
                <Datetime label={"end"} value={end} onChange={(val) => setEnd(val)}/>
                <button className="btn">Submit</button>
            </form>
            {event && <button className="delete" onClick={() => deleteEvent()}>Delete</button>}
        </div>
    );
}

export default EventForm;