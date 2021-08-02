import 'bootstrap/dist/css/bootstrap.min.css';
import { getToken, getUser } from './services/auth';

import axios from 'axios';
import { API_BASE_URL } from './constants';

function register( registerData ) {
    // if you use fetch then use response.json()
    // if you use axios then use response.data
    return axios.post(
        `${API_BASE_URL}/meetings`,
         registerData,
        {
            headers: {
                'Content-Type': 'application/json',
                 Authorization: `${getToken()}`,
            },
        },
    )
        .then( ( response ) => response.data )
        .then( ( data ) => {
            console.log(data);
            return data;
        } );
}


function init() {
    const registerForm = document.getElementById( 'add-team-form' );

    /* eslint-disable-next-line */
    registerForm.addEventListener( 'submit', function( event ) {
        // this -> loginForm

        // we shall submit via an Ajax POST request
        event.preventDefault();

        const nameEl = document.querySelector( '#name' );
        const dateEl = document.querySelector( '#date' );
        const startTimeEl = document.querySelector( '#meeting_start_time' );
        const endTimeEl = document.querySelector( '#meeting_end_time' );
        const descriptionEl = document.querySelector( '#description' );
        const attendeesEl = document.querySelector( '#emailid_of_attendees' );

        const name = nameEl.value;
        const date = dateEl.value;
        const description = descriptionEl.value;
        const attendees= attendeesEl.value;

        const startTime = document.getElementById("meeting-start-time").value;
        const endTime = document.getElementById("meeting-end-time").value;
        const attendeesArray = attendees.split(',');

        //console.log(email, name,password);
        const dataToPost= { name, date, startTime, description , attendeesArray };
        register( dataToPost )
            .then( () => {
                window.alert("Successfully Added Meeting");
            } )
            .catch( ( error ) => {
                alert( error.message );
            } );
    });
}

init();