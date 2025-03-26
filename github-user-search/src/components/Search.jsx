// components/Search.jsx
import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError("Looks like we can't find the user");
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={isLoading}>
          Search
        </button>
      </form>

      <div className="results-container">
        {isLoading && <p className="loading-message">Loading...</p>}
        
        {error && <p className="error-message">{error}</p>}
        
        {userData && !isLoading && !error && (
          <div className="user-profile">
            <img 
              src={userData.avatar_url} 
              alt={`${userData.login}'s avatar`} 
              className="user-avatar" 
            />
            <h2 className="user-name">{userData.name || userData.login}</h2>
            <p className="user-login">@{userData.login}</p>
            {userData.bio && <p className="user-bio">{userData.bio}</p>}
            <div className="user-stats">
              <span>Followers: {userData.followers}</span>
              <span>Following: {userData.following}</span>
              <span>Repos: {userData.public_repos}</span>
            </div>
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="profile-link"
            >
              View Profile
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;