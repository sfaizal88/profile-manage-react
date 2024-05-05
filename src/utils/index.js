/**
 * 
 * Generic utils
 * @author - NA 
 * @date - 5th May, 2024
 * 
 */
// GENERATE UNIQUE ID WITH 6 DIGIT
export const generateUniqueId = () => {
    return Math.floor(100000 + Math.random() * 900000);
}