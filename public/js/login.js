import 'bootstrap/dist/css/bootstrap.min.css';
import './app';
import { login } from './services/auth';

function init() {
    const loginForm = document.getElementById( 'login-form' );

    /* eslint-disable-next-line */
    loginForm.addEventListener( 'submit', function( event ) {
        // this -> loginForm

        // we shall submit via an Ajax POST request
        event.preventDefault();

        const emailEl = document.querySelector( '#email' );
        const passwordEl = document.querySelector( '#password' );

        const email = emailEl.value;
        const password = passwordEl.value;

        console.log(email, password);
        login( { email, password } )
            .then( () => {
                window.location = '/';
            } )
            .catch( ( error ) => {
                alert( error.message );
            } );
    });
}

init();