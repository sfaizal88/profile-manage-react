/**
 * 
 * MODAL
 * @author - NA 
 * @date - 5th May, 2024
 * 
 */
// GENERIC IMPORT
import { useRef, useEffect } from 'react';

// STYLE
import './styles.css';

const Modal = (props) => {
    // DECLARE REF
    const excludedRef = useRef(null);

    useEffect(() => {
        // CLICK EVENT
        const handleClick = (event) => {
            if (excludedRef.current && !excludedRef.current.contains(event.target)  && event.target.id !== 'removeIconId') {
                props.setShowDeleteModal();
            }
        };
        // ADDING LISTENER
        document.addEventListener('click', handleClick);
        return () => {
            // REMOVING LISTENER
            document.removeEventListener('click', handleClick);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <div className="modal" ref={excludedRef}>
            <div className="modal-title">delete eq</div>
            <div className="modal-body-text">{props.title}</div>
            <button className='delete-btn' onClick={props.onDelete}>Delete</button>
        </div>
    )
}

export default Modal;