/**
 * 
 * Profile details component
 * @author - NA 
 * @date - 5th May, 2024
 * 
 */
// STYLES
import './styles.css';

const ProfileDetails = (props) => (
    <div className="profile-content-container">
        <h1 className="eq-title">{props.title}</h1>
    </div>
);

export default ProfileDetails;