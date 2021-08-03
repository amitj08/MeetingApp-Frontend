import axios from 'axios';
import { API_BASE_URL, TOKEN, EMAIL, NAME } from '../constants';

/**
 * 
 * @param {object} credentials An object with email and password
 * @returns A promise that resolves with the login response data, or rejects if requests to login fails
 * 
 * @example credentials
 * {
 *  "email": "john.doe@example.com",
 *  "password": "Password123#"
 * }
 */
function login( credentials ) {
    // if you use fetch then use response.json()
    // if you use axios then use response.data
    return axios.post(
        `${API_BASE_URL}/auth/login`,
        credentials,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        },
    )
        .then( ( response ) => response.data )
        .then( ( data ) => {
            // store the token and other user details in local storage
            localStorage.setItem( TOKEN, data.data.token );
            localStorage.setItem( EMAIL, data.data.email );
            localStorage.setItem( NAME, data.data.name );


            return data;
        } );
}

function logout() {
    localStorage.removeItem( TOKEN );
    localStorage.removeItem( EMAIL );
    localStorage.removeItem( NAME );
}

/**
 * Returns the authorization token for logged in user, or null if no one is logged in
 * @returns The authorization token for logged in user, or null if no one is logged in
 */
function getToken() {
    return localStorage.getItem( TOKEN );
}

function getUser() {
    return localStorage.getItem( EMAIL );
}

function getLoggedUserName() {
    return localStorage.getItem( NAME );
}

export {
    // eslint-disable-next-line
    login,
    logout,
    getToken,
    getUser,
    getLoggedUserName
};