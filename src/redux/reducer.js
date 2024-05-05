/**
 * 
 * Reducer
 * @author - NA 
 * @date - 5th May, 2024
 * 
 */
// USER LEVEL IMPORT
import {ActionTypes} from './actions';
import DataJson from '../view/pages/home/data/profile-list.json';
import * as storage from '../utils/storage';

// INITIAL STATE
const initialState = {
    selectedProfile: storage.getItem("selectedProfile") || DataJson[0], // STORE SELECTED PROFILE
    list: storage.getItem("allProfile") || DataJson, // STORE ALL PROFILE
    currentAction: null, // STORE CURRENT ACTION 
    editMode: false, // STORE WHETHER ITS EDIT MODE OR NOT
    showDeleteModal: false, // STORE DELTE MODAL VISIBLE FLAG
    lastRenamed: storage.getItem("selectedProfile")?.name || "", // STORE LAST NAME OF THE PROFILE BEFORE RENAME
};

// GPROFILE REDUCER
const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        // WHEN USER CLICK UP AND DOWN BUTTON
        case ActionTypes.UPDATE_ORDER:
            return {
                ...state,
                list: action.payload.list
            };
        // WHEN USER CREATE NEW PROFILE
        case ActionTypes.ADD_PROFILE:
            return {
                ...state,
                list: action.payload.list, 
                selectedProfile: action.payload.selectedProfile, 
                currentAction: action.payload.currentAction
            };
        // WHEN USER RENAME THE PROFILE NAME
        case ActionTypes.RENAME_PROFILE:
            return {
                ...state,
                list: action.payload.list, 
                selectedProfile: action.payload.selectedProfile, 
                editMode: action.payload.editMode
            };
        // WHEN USER REMOVE THE PROFILE
        case ActionTypes.REMOVE_PROFILE:
            return {
                ...state,
                list: action.payload.list, 
                selectedProfile: action.payload.selectedProfile, 
                editMode: action.payload.editMode, 
                currentAction: action.payload.currentAction, 
                showDeleteModal: action.payload.showDeleteModal, 
            };
        // WHEN USER SELECT THE PROFILE BY CLICKING
        case ActionTypes.ON_UPDATE_SELECTED_PROFILE:
            return {
                ...state,
                selectedProfile: action.payload.selectedProfile, 
                lastRenamed: action.payload.selectedProfile.name
            };
        // WHEN USER TOGGLE BETWEEN EDIT MODE
        case ActionTypes.ON_UPDATE_EDIT_MODE:
            // PULL THE PROFILE LIST
            const updatedList = state.list.map(item => ({...item, name: item.name.trim()}));
            // FINDING THE SELECTED PROFILE ORDER NO
            const selectedProfileOrder = state.selectedProfile.order;
            // FINDING THE SEELCTED PROFILE NAME
            const selectedProfileName = updatedList[selectedProfileOrder - 1].name;
            // UPDATING THE SELECTED PROFILE NAME IN THE LIST, 
            // IF ITS EMPTY, UPDATE WITH LAST NAMED OF THAT PROFILE
            updatedList[selectedProfileOrder - 1].name = selectedProfileName || state.lastRenamed;
            // STORE THE PROFILE LIST IN THE LOCAL STORAGE
            storage.setItem("allProfile", updatedList);
            // STORE THE CURRENTLY SELECTED PROFILE IN THE LOCAL STORAGE
            storage.setItem("selectedProfile", updatedList[selectedProfileOrder - 1]);
            return {
                ...state,
                list: updatedList, 
                selectedProfile: updatedList[selectedProfileOrder - 1], 
                editMode: action.payload.editMode, 
            };
        // WHEN USER TOGGLE BETWEEN DELETE MODAL POPUP
        case ActionTypes.ON_UPDATE_DELETE_MODAL:
            return {
                ...state,
                showDeleteModal: action.payload.showDeleteModal, 
            };
      default:
        return state;
    }
};

export default profileReducer;