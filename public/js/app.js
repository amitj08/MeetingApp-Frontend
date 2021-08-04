import { logout } from './services/auth';

function setNavbar() {
    document.getElementById( 'logout-link' ).addEventListener( 'click', function() {
        logout();

        window.location = '/login';
    });
}

function showBodyOnLoad() {
    document.addEventListener( 'DOMContentLoaded', function() {
        document.body.classList.remove( 'hide' );
    });
}

showBodyOnLoad();
//setNavbar();