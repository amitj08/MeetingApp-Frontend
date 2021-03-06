import 'bootstrap/dist/css/bootstrap.min.css';
import './app';
import axios from 'axios';
import { API_BASE_URL } from './constants';
import { getToken , getLoggedUserName} from './services/auth';
import { formatDate } from './utils/date';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function fetchMeetingsByFilter( {period,search} ) {
    // if you use fetch then use response.json()
    // if you use axios then use response.data

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
            headers: {
                Authorization: `${getToken()}`,
            },
        },
    );

    return response.data.data;
}

async function addAttendee( mid, attendeeToAdd ) {
    const response = await axios.patch(
        `${API_BASE_URL}/meetings/${mid}/${attendeeToAdd}`,
        null, // send data here or null if there is no data to send
        {

            headers: {
                Authorization: `${getToken()}`,
            },
        },
    );

    return response.data.data;
}

function setupListeners( meetings ) {
    
    const items2 = document.querySelectorAll( '.add-member' );

    items2.forEach( ( item, idx ) => {
        item.addEventListener( 'click', function(event) {
            event.preventDefault();
            const email=document.querySelector('.new-member').value;
            console.log(email);
            addAttendee( meetings[idx]._id, email ).then(() => {
                alert("You have succesfully added in the meeting");
            });
        })  

    });   

    const items1 = document.querySelectorAll( '.remove-self' );

    items1.forEach( ( item, idx ) => {
        item.addEventListener( 'click', function(event) {
            event.preventDefault();
            removeSelf( meetings[idx]._id ).then(() => {
                alert("You have succesfully removed from the meeting");
            });
        })  

    });

}


function renderMeetings( meetings ) {
    const meetingsListEl = document.getElementById( 'search-results' );
    meetingsListEl.innerHTML="";
    meetingsListEl.innerHTML += meetings.map( meeting => (
        `<div class="col-12 col-md-4 d-flex mb-3" "meeting-item">
         <div class="card p-3">
            <div class="card-body">
                <h5 class="card-title">${meeting.name}</h5>
                <p class="card-text">${formatDate(meeting.date)}</p>
                <button class="remove-self btn btn-danger">Excuse yourself</button>
                <hr class="my-3" />
                <p id="meeting_attendees"><strong>Members:</strong> ${meeting.attendees.join( ', ' )}</p>
                <div class="row gy-2 gx-3 align-items-center">
                    <div class="col-auto">
                    <input type="text" class="new-member" placeholder="Enter attendee email" value= "" /> 
                    </div>
                    <div class="col-auto">
                        <button class="add-member btn btn-secondary">Add</button>
                    </div>
                </div>
            </div>
        </div>
        </div>`
    )).join( '' );
    setupListeners( meetings );
}

async function init() {
    const user= getLoggedUserName();
    document.getElementById('current_user').innerHTML= `Welcome <b>${user}</b>`;

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
