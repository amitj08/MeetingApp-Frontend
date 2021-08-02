import axios from 'axios';
import { API_BASE_URL, TOKEN, EMAIL } from '../constants';

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
            localStorage.setItem( TOKEN, data.authToken );
            localStorage.setItem( EMAIL, data.email );

            return data;
        } );
}

function logout() {
    localStorage.removeItem( TOKEN );
    localStorage.removeItem( EMAIL );
}

/**
 * Returns the authorization token for logged in user, or null if no one is logged in
 * @returns The authorization token for logged in user, or null if no one is logged in
 */
function getToken() {
    return localStorage.getItem( TOKEN );
}

export {
    // eslint-disable-next-line
    login,
    logout,
    getToken
};