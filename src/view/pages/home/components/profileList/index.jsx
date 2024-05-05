/**
 * 
 * Profile details component
 * @author - NA 
 * @date - 5th May, 2024
 * 
 */
// GENERIC IMPORT
import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// USER LEVEL IMPORT
import { Modal } from '../../../../atoms';
import {ActionTypes} from '../../../../../redux/actions';
import {useHook} from '../../useHook';

// STYLES
import './styles.css';

const ProfileList = (props) => {
    // DECLARE REF
    const inputRef = useRef(null);
    const excludedRef = useRef(null);
    const scrollableDivRef = useRef(null);

    // SELECTOR
    const selectedProfile = useSelector(state => state.selectedProfile);
    const currentAction = useSelector(state => state.currentAction);
    const isEditMode = useSelector(state => state.editMode);
    const showDeleteModal = useSelector(state => state.showDeleteModal);

    // LOCAL VARIABLE
    const list = props.list;
    const dispatch = useDispatch();

    // DELCARE HOOKS
    const {
        onUpOrder, 
        onDownOrder, 
        onAdd, 
        onRename, 
        onDelete,
        onUpdatedSelectedProfile,
        editModeHandler,
        onUpdateDeleteModal,
        scrollToProfile
    } = useHook(selectedProfile, list, isEditMode, dispatch);

    // USE EFFECT WILL BE TRIGGERED 
    // WHEN INPUT FIELD IS ENABLED THEN VALUE WILL BE SELECTED.
    useEffect(() => {
        if (isEditMode && inputRef.current) {
            inputRef.current.select();
        }
        // eslint-disable-next-line
    }, [isEditMode]);

    // USEEFFECT CREATE FOR BELOW POINTS
    // CREATED EVENT HANDLER TO CHECK WHETHER USER CLICKING OUTSIDE THE TEXT FIELD TO DISBALE THE TEXT FIELD
    // IT WILL BE ENABLED STILL WHEN USER CLICK INSIDE TEXT FIELD
    useEffect(() => {
        const handleClick = (event) => {
            if (excludedRef.current && !excludedRef.current.contains(event.target) && event.target.className !== 'input-field') {
                dispatch({ type: ActionTypes.ON_UPDATE_EDIT_MODE, payload: {
                    editMode: false,
                }});
            }
        };
        // ADDING CLICK EVENT LISTENER
        document.addEventListener('click', handleClick);
        return () => {
            // REMOVING CLICK EVENT LISTENER
            document.removeEventListener('click', handleClick);
        }
        // eslint-disable-next-line
    }, []);

    // USEEFFECT CREATE FOR THE BELOW POINTS
    // WHEN USER TRY TO ADD NEW ITEM, SCOLLBAR WILL BE SCROLLED TO THE BOTTOM
    useEffect(() => {
        // SCROLLED TO THAT SPECIFIC CHILD TAG WHEN ACTION CHANGED
        scrollToProfile(selectedProfile.id, scrollableDivRef)
        if (scrollableDivRef.current && currentAction === 'ADD') {
            scrollableDivRef.current.scrollTop = scrollableDivRef.current.scrollHeight
        }
        // eslint-disable-next-line
    }, [list, currentAction]);

    return (
        <div className="profile-list-container">
            <div className="main-title">Profile List</div>
            <div className='profile-box'>
                <div className='profile-list' ref={scrollableDivRef}>
                    {list.map((item, index) => (
                        <div id={`profile-${item.id}`} key={`profile-${index}`} onClick={() => onUpdatedSelectedProfile(item)} className={['profile-item', item.className, selectedProfile.id === item.id && 'active'].join(' ')}>
                            {selectedProfile.id === item.id && isEditMode ? <input ref={inputRef} className='input-field' value={item.name} onChange={(event) => onRename(event.target.value)}/> : item.name}
                        </div>
                    ))}
                </div>
                <div className="toolbar">
                    <div className="icon add" onClick={onAdd}></div>
                    {selectedProfile.isEditable && <div ref={excludedRef} className="icon edit" onClick={editModeHandler}></div>}
                    {selectedProfile.isDeletable && <div id="removeIconId" className="icon delete" onClick={() => onUpdateDeleteModal(!showDeleteModal)}></div>}
                    <div className={["icon", "down", selectedProfile.order === list.length && 'disabled'].join(" ")} {...(selectedProfile.order !== list.length && {onClick: onDownOrder})}></div>
                    <div className={["icon", "up", selectedProfile.order === 1 && 'disabled'].join(" ")} {...(selectedProfile.order !== 1 && {onClick: onUpOrder})}></div>
                </div>
            </div>
            {showDeleteModal && <Modal setShowDeleteModal={() => onUpdateDeleteModal(false)} title={selectedProfile.name} onDelete={() => onDelete(selectedProfile.id)}/>}
        </div>
    )
};

export default ProfileList;