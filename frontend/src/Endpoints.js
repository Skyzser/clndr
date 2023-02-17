const API_URL = 'http://localhost:9000/api';

/*
    @desc - Register a new user
    @route - POST /api/users
    @access - Public
*/
const registerFetch = async ({username, email, password}) => {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }, 
        body: JSON.stringify({
            username,
            email,
            password
        })
    })
    return response.json();
}

/*
    @desc - Authenticate (login) a user
    @route - POST /api/users/login
    @access - Public
*/
const loginFetch = async ({email, password}) => {
    const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    return response.json();
}

/*
    @desc - Get user data
    @route - GET /api/users/
    @access - Private
*/
const userDataFetch = async () => {
    const response = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

/*
    @desc - Get events
    @route - GET /api/events
    @access - Private
*/
const eventsFetch = async () => {
    const response = await fetch(`${API_URL}/events`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

/*
    @desc - Create event
    @route - POST /api/events
    @access - Private
*/
const createEventFetch = async ({title, description, start, end}) => {
    return await fetch(`${API_URL}/events`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            title,
            description,
            start,
            end
        })
    });
}

/*
    @desc - Update event
    @route - PUT /api/events/:id
    @access - Private
*/
const updateEventFetch = async ({id, title, description, start, end}) => {
    return await fetch(`${API_URL}/events/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            title,
            description,
            start,
            end
        })
    });
}

/*
    @desc - Delete event
    @route - DELETE /api/events/:id
    @access - Private
*/
const deleteEventFetch = async (id) => {
    return await fetch(`${API_URL}/events/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    });
}


export { registerFetch, loginFetch, userDataFetch, eventsFetch, createEventFetch, updateEventFetch, deleteEventFetch };