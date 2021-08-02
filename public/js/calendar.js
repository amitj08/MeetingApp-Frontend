import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { API_BASE_URL } from './constants';
import { getToken } from './services/auth';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

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

async function fetchMeetingsByDate( meetingDate ) {
    // if you use fetch then use response.json()
    // if you use axios then use response.data
    const response = await axios.get(
        `${API_BASE_URL}/auth/calendar`,
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

    meetings.forEach( ( meeting ) => {
        meetingsListEl.innerHTML += `
            <div class="col-12 col-md-4 d-flex mb-3 js-card-workshop-col">
                <a class="card js-card-workshop text-left text-reset text-decoration-none p-3">
                    <div class="card-body">
                        <h4 class="card-title">${meeting.name}</h4>
                        <p class="card-text">
                            ${meeting.description}
                        </p>
                        <p class="card-text">
                            ${meeting.date}
                        </p
                        
                    </div>
                </a>
            </div>
        `;
    } );
}

async function init() {

    try {
        const date= new Date();
        const meetings = await fetchMeetingsByDate(date);
        renderMeetings( meeting1 );
    } catch ( error ) {
        // eslint-disable-next-line
        alert( error.message );
    }
}

init();

