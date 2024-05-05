/**
 * 
 * useHook for the manage profile
 * @author - NA 
 * @date - 5th May, 2024
 * 
 */
// GENERIC IMPORT
import { useState } from 'react';

// USER LEVEL IMPORT
import {saveProfileListPost} from '../../../api';
import {ActionTypes} from '../../../redux/actions';
import {generateUniqueId} from '../../../utils';
import * as storage from '../../../utils/storage';

export function useHook(
    selectedProfile, list, 
    editMode, dispatch
) {
    // DECLARE TIMER STATE
    const [timer, setTimer] = useState(null);
    
    // SETTING-UP API CALL WITH TIMER FOR 3s

    const callSaveProfileAPI = (data) => {
        // SAVING PROFILES INSIDE LOCAL STORAGE
        storage.setItem("allProfile", data);
        // CLEARING TIMER IF ITS CALLED BEFORE THE TIMER ENDS 3s
        clearTimeout(timer);
        // TIMER INITIATED AND COUNTDOWN AS 3s
        const newTimer = setTimeout(() => {
            // AFTER 3s, BELOW API FUNC WILL BE CALLED
            saveProfileListPost(data);
        }, 3000);
        // UPDATING THE STATE WITH TIMER, CAN BE USED TO CLEAR THE TIMEOUT IN FUTURE
        setTimer(newTimer);
    }

    // WHEN USER CLICK UP BUTTON
    const onUpOrder = () => {
        // FETCHING SELECTED PROFILE ORDER NO
        const currentProfileOrder = selectedProfile.order;
        // CLOING THE ALL PROFILE LIST
        const newList = [...list];
        // FETCHING THE PROFILE WHICH IS ABOVE THE SELECTED PROFILE
        const temp = newList[currentProfileOrder - 2];
        // UPDATING THE ORDER OF THE PROFILE WHICH IS ABOVE THE SELECTED PROFILE
        temp.order = temp.order + 1;
        // UPDATING THE ORDER OF THE SELECTED PROFILE BY MINUS 1
        selectedProfile.order = selectedProfile.order - 1;
        // SWAPPING BETWEEN TWO PROFILE POSITION AND UPDATING THE ORDER
        newList[currentProfileOrder - 2] = selectedProfile;
        newList[currentProfileOrder - 1] = temp;
        // CALLING THE DISPATCH REDUCER WITH NEW STATE.
        dispatch({ type: ActionTypes.UPDATE_ORDER, payload: {list: newList} });
        // UPDATING THE SELECTED PROFILE DATA IN THE LOCAL STORAGE
        storage.setItem("selectedProfile", selectedProfile);
        // CALLING DUMMY API
        callSaveProfileAPI(newList);
    }

    // WHEN USER CLICK DOWN BUTTON
    const onDownOrder = () => {
        // FETCHING SELECTED PROFILE ORDER NO
        const currentProfileOrder = selectedProfile.order;
        // CLOING THE ALL PROFILE LIST
        const newList = [...list];
        // FETCHING THE PROFILE WHICH IS BELOW THE SELECTED PROFILE
        const temp = newList[currentProfileOrder];
        // UPDATING THE ORDER OF THE PROFILE WHICH IS BELOW THE SELECTED PROFILE
        temp.order = temp.order - 1;
        // UPDATING THE ORDER OF THE SELECTED PROFILE BY PLUS 1
        selectedProfile.order = selectedProfile.order + 1;
        // SWAPPING BETWEEN TWO PROFILE POSITION AND UPDATING THE ORDER
        newList[currentProfileOrder] = selectedProfile;
        newList[currentProfileOrder - 1] = temp;
        // CALLING THE DISPATCH REDUCER WITH NEW STATE.
        dispatch({ type: ActionTypes.UPDATE_ORDER, payload: {list: newList} });
        // UPDATING THE SELECTED PROFILE DATA IN THE LOCAL STORAGE
        storage.setItem("selectedProfile", selectedProfile);
        // CALLING DUMMY API
        callSaveProfileAPI(newList);
    }

    // WHEN USER CREATE NEW PROFILE
    const onAdd = () => {
        // GENERATING UNIQUE ID FOR NEW PROFILE CREATION
        const newProfileId = generateUniqueId();
        // CREATING NEW PROFILE OBJECT
        const newProfileObject = {
            id: newProfileId, 
            name: "New Profile", 
            className: "default",
            isEditable: true,
            isDeletable: true,
            order: list.length + 1
        };
        // PUSHING THE NEW PROFILE INTO PROFILE LIST
        const newList = [...list, newProfileObject];
        // CALLING THE DISPATCH REDUCER WITH NEW STATE.
        dispatch({ type: ActionTypes.ADD_PROFILE, payload: {
            list: newList, 
            selectedProfile: newProfileObject, 
            currentAction: 'ADD'
        }});
        // UPDATING THE SELECTED PROFILE DATA IN THE LOCAL STORAGE
        storage.setItem("selectedProfile", newProfileObject);
        // CALLING DUMMY API
        callSaveProfileAPI(newList);
    }

    // WHEN USER RENAME THE PROFILE NAME
    const onRename = (newName) => {
        // CLOING THE ALL PROFILE LIST
        const updatedList = [...list];
        // UPDATING THE PROFILE RENAMED TO THE SELECTED PROFILE
        updatedList[selectedProfile.order - 1].name = newName;
        // CALLING THE DISPATCH REDUCER WITH NEW STATE.
        dispatch({ type: ActionTypes.RENAME_PROFILE, payload: {
            list: updatedList, 
            selectedProfile: updatedList[selectedProfile.order - 1], 
            editMode: true
        }});
        // UPDATING THE SELECTED PROFILE DATA IN THE LOCAL STORAGE
        storage.setItem("selectedProfile", updatedList[selectedProfile.order - 1]);
        // CALLING DUMMY API
        callSaveProfileAPI(updatedList);
    }

    // WHEN USER REMOVE THE PROFILE
    const onDelete = (profileId) => {
        // FETCHING SELECTED PROFILE ORDER NO
        const currentSelectedOrder = selectedProfile.order;
        // FILTER AND REMOVED THE DELETED PROFILE BY ID FROM THE LIST
        const updatedList = list.filter(item => item.id !== profileId).map((item, index) => ({...item, order: index + 1}));
        // CALLING THE DISPATCH REDUCER WITH NEW STATE.
        dispatch({ type: ActionTypes.REMOVE_PROFILE, payload: {
            list: updatedList, 
            selectedProfile: updatedList[currentSelectedOrder - 2 < 0 ? 0 : currentSelectedOrder - 2], 
            editMode: false,
            currentAction: 'REMOVE',
            showDeleteModal: false
        }});
        // UPDATING THE SELECTED PROFILE DATA IN THE LOCAL STORAGE
        storage.setItem("selectedProfile", updatedList[currentSelectedOrder - 2 < 0 ? 0 : currentSelectedOrder - 2]);
        // CALLING DUMMY API
        callSaveProfileAPI(updatedList);
    }

    // WHEN USER SELECT THE PROFILE BY CLICKING
    const onUpdatedSelectedProfile = (profile) => {
        // CALLING THE DISPATCH REDUCER WITH NEW STATE.
        dispatch({ type: ActionTypes.ON_UPDATE_SELECTED_PROFILE, payload: {
            selectedProfile: profile, 
        }});
        // UPDATING THE SELECTED PROFILE DATA IN THE LOCAL STORAGE
        storage.setItem("selectedProfile", profile);
    }

    // WHEN USER TOGGLE BETWEEN EDIT MODE
    const editModeHandler = () => {
        // CALLING THE DISPATCH REDUCER WITH NEW STATE.
        dispatch({ type: ActionTypes.ON_UPDATE_EDIT_MODE, payload: {
            editMode: !editMode,
        }});
    }

    // WHEN USER TOGGLE BETWEEN DELETE MODAL POPUP
    const onUpdateDeleteModal = (flag) => {
        // CALLING THE DISPATCH REDUCER WITH NEW STATE.
        dispatch({ type: ActionTypes.ON_UPDATE_DELETE_MODAL, payload: {
            showDeleteModal: flag,
        }});
    }

    return {
        onUpOrder,
        onDownOrder,
        onAdd,
        onRename,
        onDelete,
        onUpdatedSelectedProfile,
        editModeHandler,
        onUpdateDeleteModal
    }
}