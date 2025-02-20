import React from 'react';

const UserProfile = (props) => {
    return (
        <div>
            <h1>{props.name}</h1>
            <p>Age: {props.age}</p>
            <p>Bio: {props.bio}</p>
        </div>
    );
}

export default UserProfile;