import { useState, useEffect } from "react";
import { eventsFetch } from "../Endpoints";
import EventForm from "./EventForm";

import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { Calendar as Cal, dateFnsLocalizer } from "react-big-calendar";

import { customToast, customToastContainer } from "./CustomAlert";

import '../styles/Calendar.css';
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {'en-IE': require('date-fns/locale/en-IE')};
const localizer = dateFnsLocalizer({format, parse, startOfWeek, getDay, locales});

function Calendar() {
    const [events, setEvents] = useState([]);
    const [eventForm, setEventForm] = useState(null);  // This is for the event form which pops up when you try to add/edit an event

    const getEvents = async () => { setEvents(await eventsFetch()); };
    // Just a function to handle the form success (if successful, close the form (setEventForm back to null))
    const handleFormSuccess = (message) => {
        setEventForm(null);
        customToast(message, 'success');
        getEvents();  // Load the events again
    }

    useEffect(() => {
        getEvents();
    }, [])

    return (
        <div>
            {eventForm == null ? (
                <button className="openCloseForm" onClick={() => setEventForm(
                    <EventForm
                        heading="Add Event"
                        onSuccess={(message) => handleFormSuccess(message)}
                        onError={() => customToast('Error creating event', 'error')}
                    />
                )}>+</button>
            ) : (
                <button className="openCloseForm" onClick={() => setEventForm(null)}>x</button>
            )}
            {eventForm}
            <div className='calendar'>
                <Cal
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    views={['month']}
                    onSelectEvent={eventForm !== null ? null : (id) => setEventForm(
                        <EventForm
                            heading="Edit Event"
                            event={id}
                            onSuccess={(message) => handleFormSuccess(message)}
                            onError={() => customToast('Error updating event', 'error')}
                        />
                    )}
                />
            </div>
            {customToastContainer()}
        </div>
    );
}

export default Calendar;