import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';
import { API_BASE_URL } from './constants';
import { getToken , getUser} from './services/auth';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

async function fetchMeetingsByDate( meetingDate ) {
    // if you use fetch then use response.json()
    // if you use axios then use response.data
    const response = await axios.get(
        `${API_BASE_URL}/meeting`,
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
        //const meetings = await fetchMeetingsByDate(date);
        renderMeetings( meeting1 );
    } catch ( error ) {
        // eslint-disable-next-line
        alert( error.message );
    }
}

//init();
