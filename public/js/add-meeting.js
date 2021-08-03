import 'bootstrap/dist/css/bootstrap.min.css';
import { getToken, getUser } from './services/auth';

import axios from 'axios';
import { API_BASE_URL } from './constants';
//import { startsWith } from 'core-js/core/string';

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
            //console.log(data);
            return data;
        } );
}


function init() {
    const registerForm = document.getElementById( 'add-meeting-form' );

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

        const startTime = startTimeEl.value;
        const endTime = endTimeEl.value;
        const startTimehr = parseInt(startTime.split(':')[0]);
        const startTimemin = parseInt(startTime.split(':')[1]);
        const endTimehr = parseInt(endTime.split(':')[0]);
        const endTimemin = parseInt(endTime.split(':')[1]);
        const attendeesArray = attendees.split(',');

        //console.log("Date "+date);
        //console.log("starttime "+startTime);
        //console.log("endTime "+endTime);
        console.log("attendees ",attendeesArray);
        //console.log("startTimehr "+ startTimehr);
        //console.log("startTimemin "+ startTimemin);
        console.log(`${getToken()}`);

        
        const dataToPost= { 
            "name": name, 
            "date": date, 
            "description": description,
            "startTime": {
                hours: startTimehr,
                minutes: startTimemin
            },
            "endTime": {
                hours: endTimehr,
                minutes: endTimemin
            },
            attendees: attendeesArray
           
         };
      
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