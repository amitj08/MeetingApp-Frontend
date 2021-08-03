import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { API_BASE_URL } from './constants';
import { getToken , getUser} from './services/auth';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function fetchMeetingsByFilter( {period,search} ) {
    // if you use fetch then use response.json()
    // if you use axios then use response.data

    //const period = criteria.period;
    //const search = criteria.search;

    const response = await axios.get(
        `${API_BASE_URL}/meetings`,
        {
            params: {
                period: `${period}` ,
                search:  `${search}`
            },
            headers: {
                Authorization: `${getToken()}`,
            },
        },
    );

    return response.data.data;
}

async function removeSelf( mid ) {
    const response = await axios.patch(
        `${API_BASE_URL}/meetings/${mid}`,
        null, // send data here or null if there is no data to send
        {
            params: {
                id: mid,
            },
            headers: {
                Authorization: `${getToken()}`,
            },
        },
    );

    return response.data.data;
}

async function addAttendee( mid, attendeeToAdd ) {
    const response = await axios.patch(
        `${API_BASE_URL}/meetings/${id}/${attendeeToAdd}`,
        null, // send data here or null if there is no data to send
        {
            params: {
                id: mid ,
                email: attendeeToAdd ,
            },
            headers: {
                Authorization: getToken(),
            },
        },
    );

    return response.data.data;
}


function renderMeetings( meetings ) {
    const meetingsListEl = document.getElementById( 'search-results' );

    meetings.forEach( ( meeting ) => {
        meetingsListEl.innerHTML += `
        <div class="col-12 col-md-4 d-flex mb-3">
        <div class="card p-3">
            <div class="card-body">
                <h5 class="card-title">${meeting.name}</h5>
                <p class="card-text">${meeting.date}</p>
                <a href="/meetings?id=${meeting._id}" data-id="${meeting._id}" class="btn btn-danger">Excuse yourself</a>
                <hr class="my-3" />
                <p id="meeting_attendees"><strong>Members: </strong>${meeting.attendees}</p>
                <form class="row gy-2 gx-3 align-items-center">
                    <div class="col-auto">
                        <label class="visually-hidden" for="select_member">Select Member</label>
                        <select class="form-select" id="select_member" aria-label="Select Member">
                            <option selected>Select member</option>
                            <option value="1">m1@example.com</option>
                            <option value="2">m2@example.com</option>
                            <option value="3">m4@example.com</option>
                        </select>
                    </div>
                    <div class="col-auto">
                        <button class="btn btn-info text-white">Add</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
        `;
    } );
}

async function init() {
    const searchCriteria = document.getElementById( 'search-form' );
    //const attendee = document.getElementById('attendee');

    /* eslint-disable-next-line */
    searchCriteria.addEventListener( 'submit', async function( event ) {
        // this -> loginForm

        // we shall submit via an Ajax POST request
        event.preventDefault();

        const periodEl = document.querySelector( '#search-date' );
        const searchEl = document.querySelector( '#search-keywords'); 

        const period=periodEl.value;
        const search = searchEl.value;

        console.log(period);
        console.log(search);

        try {
            const date= new Date();

            const meetings = await fetchMeetingsByFilter({period, search});
            renderMeetings( meetings );
        } catch ( error ) {
            // eslint-disable-next-line
            alert( error.message );
        } 
    })
}
    init();
