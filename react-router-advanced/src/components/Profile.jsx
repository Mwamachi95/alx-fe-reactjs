import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// Nested Profile Components
const ProfileDetails = () => (
  <div>
    <h2>Profile Details</h2>
    <p>User: John Doe</p>
    <p>Email: john.doe@example.com</p>
    <p>Member since: January 2023</p>
  </div>
);

const ProfileSettings = () => (
  <div>
    <h2>Profile Settings</h2>
    <form>
      <div>
        <label>Name:</label>
        <input type="text" defaultValue="John Doe" />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" defaultValue="john.doe@example.com" />
      </div>
      <div>
        <label>Notifications:</label>
        <input type="checkbox" defaultChecked />
      </div>
      <button type="button">Save Changes</button>
    </form>
  </div>
);

const ProfileActivity = () => (
  <div>
    <h2>Recent Activity</h2>
    <ul>
      <li>Posted a comment on "React Router Techniques" - 2 days ago</li>
      <li>Updated profile picture - 1 week ago</li>
      <li>Joined "React Developers" group - 3 weeks ago</li>
    </ul>
  </div>
);

// Main Profile component with nested routes
const Profile = () => {
  const navigate = useNavigate();
  
  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      
      {/* Sub-navigation */}
      <nav className="subnav">
        <ul>
          <li><Link to="/profile">Details</Link></li>
          <li><Link to="/profile/settings">Settings</Link></li>
          <li><Link to="/profile/activity">Activity</Link></li>
        </ul>
      </nav>
      
      {/* Nested routes */}
      <div className="profile-content">
        <Routes>
          <Route index element={<ProfileDetails />} />
          <Route path="settings" element={<ProfileSettings />} />
          <Route path="activity" element={<ProfileActivity />} />
        </Routes>
      </div>
      
      <button onClick={() => navigate('/')}>Back to Home</button>
    </div>
  );
};

export default Profile;