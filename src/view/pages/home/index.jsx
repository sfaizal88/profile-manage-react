/**
 * 
 * Home style
 * @author - NA 
 * @date - 5th May, 2024
 * 
 */
// GENERIC IMPORT
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// USER LEVEL IMPORT
import ProfileList from './components/profileList';
import ProfileDetails from './components/profileDetails';
import * as storage from '../../../utils/storage';

// STYLE
import './styles.css';

const HomePage = () => {
    // DECLARE SELECTOR
    const selectedProfile = useSelector(state => state.selectedProfile);
    const list = useSelector(state => state.list);
    const lastRenamed = useSelector(state => state.lastRenamed);

    useEffect(() => {
        // ONLOADING SAVING THE LIST INTO LOCAL STORAGE
        storage.setItem("allProfile", list);
        // ONLOADING SAVING THE SELECTED PROFILE INTO LOCAL STORAGE
        storage.setItem("selectedProfile", list[0]);
        // eslint-disable-next-line
    }, [])

    return (
        <div className='main-container'>
            <ProfileList list={list} lastRenamed={lastRenamed}/>
            <ProfileDetails title={selectedProfile.name}/>
        </div>
    )
};

export default HomePage;