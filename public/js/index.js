import 'bootstrap/dist/css/bootstrap.min.css';
import './app';
import axios from 'axios';
import { API_BASE_URL } from './constants';
import { formatDate } from './utils/date';
import { getLoggedUserName, getToken, getUser } from './services/auth';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

/*
const meeting1 = [
    {
        "attendees": [
            "dhruv@telstra.com",
            "divya@telstra.com",
            "piyush@telstra.com",
            "jane.doe@example.com"
        ],
        "_id": "345678901234567890123414",
        "name": "Admin features",
        "description": "Meeting to discuss implementation of Admin features, and assign tasks",
        "date": "2020-09-17T00:00:00.000Z",
        "startTime": {
            "hours": 9,
            "minutes": 30
        },
        "endTime": {
            "hours": 10,
            "minutes": 0
        }
    }
]
*/

async function fetchMeetingsByDate( meetingDate ) {
    // if you use fetch then use response.json()
    // if you use axios then use response.data
    const response = await axios.get(
        `${API_BASE_URL}/calendar`,
        {
            params: {
                date: `${meetingDate}`,
            },
            headers: {
                Authorization: `${getToken()}`,
            },
        },
    );

    return response.data.data;
}


function renderMeetings( meetings ) {
    const meetingsListEl = document.getElementById( 'meetings-list' );
    meetingsListEl.innerHTML="";
    meetings.forEach( ( meeting ) => {
        meetingsListEl.innerHTML += 
            `<div class="col-12 col-md-4 d-flex mb-3 js-card-meeting-col">
                <div class="card js-card-meeting text-left text-reset text-decoration-none p-3">
                    <div class="card-body">
                        <h4 class="card-title">${meeting.name}</h4>
                        <p class="card-text  text-info">
                            <b>${meeting.startTime.hours}:${meeting.startTime.minutes} - ${meeting.endTime.hours}:${meeting.endTime.minutes}</b>
                        </p>
                        <p class="card-text">
                           <strong>Attendees: </strong>
                           <i>${meeting.attendees.join( ', ' )}</i>
                        </p
                        
                    </div>
                </div>
            </div>`
    } );
}

async function selectedDateCalDisply() {
    const user= getLoggedUserName();
    document.getElementById('current_user').innerHTML= `Welcome <b>${user}</b>`;
    
    const findMeeting = document.getElementById( 'search-form' );
   
    /* eslint-disable-next-line */
    findMeeting.addEventListener( 'submit', async function( event ) {
        // this -> loginForm

        // we shall submit via an Ajax POST request
        event.preventDefault();

        const dateEl = document.querySelector( '#cal-date' );
        const date= dateEl.value;
        document.getElementById('day-name').innerHTML=formatDate(date);
        console.log("Test");
        console.log(date);

        try {
            //const date= new Date();
            //const date= new Date("2020-09-19");
            const meetings = await fetchMeetingsByDate(date);
            ///location.reload();
            renderMeetings( meetings );
        } catch ( error ) {
            // eslint-disable-next-line
            alert( error.message );
        } 
    })
}
 

async function init() { 
    var today = new Date();
    document.getElementById('day-name').innerHTML=formatDate(today);
    today=today.toISOString().slice(0,10);
    console.log(today);

    try {
        //const date= new Date();
        //const date= new Date("2020-09-19");
        const meetings = await fetchMeetingsByDate(today);
        ///location.reload();
        renderMeetings( meetings );
    } catch ( error ) {
        // eslint-disable-next-line
        alert( error.message );
    } 
    selectedDateCalDisply();
}


init();


