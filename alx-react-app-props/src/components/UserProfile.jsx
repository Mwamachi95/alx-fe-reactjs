import { useContext } from 'react';
import UserContext from './UserContext';

const UserProfile = () => {
    const userData = useContext(UserContext);
    return (
        <div>
            <h1>User Profile</h1>
            <p>Age: {userData.name}</p>
            <p>Email: {userData.email}</p>
        </div>
    );
}

export default UserProfile;