import 'bootstrap/dist/css/bootstrap.min.css';
import './app';
import axios from 'axios';
import { API_BASE_URL } from './constants';
import { getToken, getLoggedUserName } from './services/auth';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function fetchTeams( ) {
    // if you use fetch then use response.json()
    // if you use axios then use response.data
    const response = await axios.get(
        `${API_BASE_URL}/teams`,
        {
            headers: {
                Authorization: `${getToken()}`,
            },
        },
    );

    return response.data.data;
}

async function removeSelf( mid ) {
    const response = await axios.patch(
        `${API_BASE_URL}/teams/${mid}`,
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
        `${API_BASE_URL}/teams/${mid}/${attendeeToAdd}`,
        null, // send data here or null if there is no data to send
        {
            params: {
                id: mid ,
                email: attendeeToAdd ,
            },
            headers: {
                Authorization: `${getToken()}`,
            },
        },
    );

    return response.data.data;
}

function setupListeners( meetings ) {
    const items1 = document.querySelectorAll( '.remove-self' );

    items1.forEach( ( item, idx ) => {
        item.addEventListener( 'click', function(event) {
            event.preventDefault();
            removeSelf( meetings[idx]._id ).then(() => {
                alert("You have succesfully removed from the team");
                window.location = '/teams';
            });
        })  

    });

    const items2 = document.querySelectorAll( '.add-member' );

    items2.forEach( ( item, idx ) => {
        item.addEventListener( 'click', function(event) {
            event.preventDefault();
            const email=document.querySelector('.new-member').value;
            console.log(email);
            addAttendee( meetings[idx]._id, email ).then(() => {
                alert("You have succesfully added in the team");
                window.location = '/teams';
            });
        })  

    });   

}

function renderMeetings( teams ) {
    const meetingsListEl = document.getElementById( 'search-results' );

    meetingsListEl.innerHTML += teams.map( team => (
        `<div class="col-12 col-md-4 d-flex mb-3" "meeting-item">
         <div class="card p-3">
            <div class="card-body">
                <h5 class="card-title">${team.name}</h5>
                <p class="card-text">${team.shortName}</p>
                <button class="remove-self btn btn-danger">Excuse yourself</button>
                <hr class="my-3" />
                <p id="meeting_attendees"><strong>Members: </strong>${team.members.join( ', ' )}</p>
                <form class="row gy-2 gx-3 align-items-center">
                    <div class="col-auto">
                    <input type="text" class="new-member" placeholder="Enter attendee email" value= "" /> 
                    </div>
                    <div class="col-auto">
                        <button class="add-member  btn btn-secondary">Add</button>
                    </div>
                </form>
            </div>
        </div>
        </div>`
    )).join( '' );
    setupListeners( teams );
}


async function init() {
    const user= getLoggedUserName();
    document.getElementById('current_user').innerHTML= `Welcome <b>${user}</b>`;

    try {

        const teams = await fetchTeams();
        renderMeetings( teams );
    } catch ( error ) {
        // eslint-disable-next-line
        alert( error.message );
    }
}

init();
