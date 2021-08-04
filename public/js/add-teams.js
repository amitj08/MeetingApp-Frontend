import 'bootstrap/dist/css/bootstrap.min.css';
import './app';
import { getToken, getLoggedUserName } from './services/auth';

import axios from 'axios';
import { API_BASE_URL } from './constants';

function register( registerData ) {
    // if you use fetch then use response.json()
    // if you use axios then use response.data
    return axios.post(
        `${API_BASE_URL}/teams`,
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
    const user= getLoggedUserName();
    document.getElementById('current_user').innerHTML= `Welcome <b>${user}</b>`;

    const registerForm = document.getElementById( 'add-team-form' );

    /* eslint-disable-next-line */
    registerForm.addEventListener( 'submit', function( event ) {
        // this -> loginForm

        // we shall submit via an Ajax POST request
        event.preventDefault();

        const membersEl = document.querySelector( '#members' );
        const nameEl = document.querySelector( '#name' );
        const shortNameEl = document.querySelector( '#shortname' );
        const descriptionEl = document.querySelector( '#description' );

        const name = nameEl.value;
        const shortName = shortNameEl.value;
        const description = descriptionEl.value;
        const members= membersEl.value;

        const membersArray = members.split(',');

        console.log(name);
        console.log(shortName);
        console.log(description);
        console.log(membersArray);


        const dataToPost= { 
            "name": name, 
            "shortName": shortName,
            "description": description,
            "members": membersArray
         };


        register( dataToPost )
            .then( () => {
                window.alert("Successfully Added Team");
                window.location = '/add-teams';
            } )
            .catch( ( error ) => {
                alert( error.message );
            } );
    });
}

init();