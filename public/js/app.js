import { logout } from './services/auth';

function setNavbar() {
    document.getElementById( 'logout-link' ).addEventListener( 'click', function() {
        logout();

        window.location = '/login';
    });
}

setNavbar();