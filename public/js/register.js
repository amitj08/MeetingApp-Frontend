import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { API_BASE_URL } from './constants';

function register( registerData ) {
    // if you use fetch then use response.json()
    // if you use axios then use response.data
    return axios.post(
        `${API_BASE_URL}/auth/register`,
         registerData,
        {
            headers: {
                'Content-Type': 'application/json',
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
    const registerForm = document.getElementById( 'register-form' );

    /* eslint-disable-next-line */
    registerForm.addEventListener( 'submit', function( event ) {
        // this -> loginForm

        // we shall submit via an Ajax POST request
        event.preventDefault();

        const emailEl = document.querySelector( '#email' );
        const nameEl = document.querySelector( '#name' );
        const passwordEl = document.querySelector( '#password' );

        const name = nameEl.value;
        const email = emailEl.value;
        const password = passwordEl.value;

        //console.log(email, name,password);
        register( { name, email, password } )
            .then( () => {
                window.location = '/teams';
            } )
            .catch( ( error ) => {
                alert( error.message );
            } );
    });
}

init();