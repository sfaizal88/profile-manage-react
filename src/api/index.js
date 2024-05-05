/**
 * 
 * API  file
 * @author - NA 
 * @date - 5th May, 2024
 * 
 */
// API URL IMPORT
import * as API  from './constants';

export const saveProfileListPost = (data) => {
    fetch(API.SAVE_PROFILE_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log("Response: ", data))
    .catch(error => console.error(error));
}