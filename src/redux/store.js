/**
 * 
 * sTORE
 * @author - NA 
 * @date - 5th May, 2024
 * 
 */
// GENERIC IMPORT
import { createStore } from 'redux';

// USER LEVEL IMPORT
import profileReducer from './reducer';

const store = createStore(profileReducer);

export default store;
