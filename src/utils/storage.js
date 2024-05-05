/**
 * 
 * Storage utils
 * @author - NA 
 * @date - 5th May, 2024
 * 
 */

// ADD STORAGE BY KEY AND VALUE FUNCTION
export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

// GET STORAGE VALUE BY KEY FUNCTION
export const getItem = (key) => {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : '';
}