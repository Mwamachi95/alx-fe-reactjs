// components/Search.jsx
import { useState } from 'react';
import { fetchUserData, advancedSearchUsers } from '../services/githubService';

function Search() {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: '',
    minFollowers: '',
    type: 'user'
  });
  
  // Change from single userData to multiple searchResults
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMorePages, setHasMorePages] = useState(false);
  const resultsPerPage = 10;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchParams.username.trim()) return;
    
    // Reset pagination and selected user when performing a new search
    setCurrentPage(1);
    setSelectedUser(null);
    setSearchResults([]);
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Use advanced search API for all searches
      const advancedCriteria = {
        username: searchParams.username,
        location: searchParams.location || undefined,
        minRepos: searchParams.minRepos ? parseInt(searchParams.minRepos) : undefined,
        language: searchParams.language || undefined,
        minFollowers: searchParams.minFollowers ? parseInt(searchParams.minFollowers) : undefined,
        type: searchParams.type || 'user',
        perPage: resultsPerPage,
        page: 1
      };
      
      const response = await advancedSearchUsers(advancedCriteria);
      
      if (response.items && response.items.length > 0) {
        setSearchResults(response.items);
        setTotalResults(response.total_count);
        setHasMorePages(response.total_count > resultsPerPage);
      } else {
        setError("No users match search criteria");
      }
    } catch (err) {
      setError("Looks like we cant find the user");
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreResults = async () => {
    if (isLoading || !hasMorePages) return;
    
    setIsLoading(true);
    
    try {
      const nextPage = currentPage + 1;
      
      const advancedCriteria = {
        username: searchParams.username,
        location: searchParams.location || undefined,
        minRepos: searchParams.minRepos ? parseInt(searchParams.minRepos) : undefined,
        language: searchParams.language || undefined,
        minFollowers: searchParams.minFollowers ? parseInt(searchParams.minFollowers) : undefined,
        type: searchParams.type || 'user',
        perPage: resultsPerPage,
        page: nextPage
      };
      
      const response = await advancedSearchUsers(advancedCriteria);
      
      if (response.items && response.items.length > 0) {
        setSearchResults(prev => [...prev, ...response.items]);
        setCurrentPage(nextPage);
        setHasMorePages(response.total_count > nextPage * resultsPerPage);
      } else {
        setHasMorePages(false);
      }
    } catch (err) {
      console.error("Error loading more results:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const viewUserProfile = async (username) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const userData = await fetchUserData(username);
      setSelectedUser(userData);
    } catch (err) {
      setError(`Error loading profile for ${username}`);
    } finally {
      setIsLoading(false);
    }
  };

  const backToResults = () => {
    setSelectedUser(null);
  };

  const toggleAdvanced = () => {
    setShowAdvanced(prev => !prev);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              GitHub Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              value={searchParams.username}
              onChange={handleInputChange}
              placeholder="Search GitHub users..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              type="submit" 
              className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={toggleAdvanced}
            className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            {showAdvanced ? 'Hide Advanced Search' : 'Show Advanced Search'}
          </button>
        </div>
        
        {showAdvanced && (
          <div className="border-t border-gray-200 pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={searchParams.location}
                  onChange={handleInputChange}
                  placeholder="Filter by location"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Repositories
                </label>
                <input
                  id="minRepos"
                  type="number"
                  name="minRepos"
                  value={searchParams.minRepos}
                  onChange={handleInputChange}
                  placeholder="Minimum number of repos"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Programming Language
                </label>
                <input
                  id="language"
                  type="text"
                  name="language"
                  value={searchParams.language}
                  onChange={handleInputChange}
                  placeholder="e.g. JavaScript, Python"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="minFollowers" className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Followers
                </label>
                <input
                  id="minFollowers"
                  type="number"
                  name="minFollowers"
                  value={searchParams.minFollowers}
                  onChange={handleInputChange}
                  placeholder="Minimum number of followers"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Account Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={searchParams.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="user">User</option>
                  <option value="org">Organization</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>

      <div className="mt-8">
        {isLoading && !selectedUser && searchResults.length === 0 && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}
        
        {/* Display selected user profile */}
        {selectedUser && (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
            <div className="p-6">
              <button 
                onClick={backToResults} 
                className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to results
              </button>
              
              <div className="text-center">
                <img 
                  src={selectedUser.avatar_url} 
                  alt={`${selectedUser.login}'s avatar`} 
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto mb-4 border-4 border-gray-100"
                />
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                  {selectedUser.name || selectedUser.login}
                </h2>
                <p className="text-blue-600 mb-2">@{selectedUser.login}</p>
                
                {selectedUser.bio && (
                  <p className="text-gray-600 mb-4 max-w-md mx-auto">
                    {selectedUser.bio}
                  </p>
                )}
                
                <div className="flex justify-center space-x-6 mb-4">
                  <div className="text-center">
                    <span className="block text-2xl font-bold">{selectedUser.followers}</span>
                    <span className="text-sm text-gray-500">Followers</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold">{selectedUser.following}</span>
                    <span className="text-sm text-gray-500">Following</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold">{selectedUser.public_repos}</span>
                    <span className="text-sm text-gray-500">Repos</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {selectedUser.location && (
                    <p className="text-gray-600">
                      <span className="font-medium">Location:</span> {selectedUser.location}
                    </p>
                  )}
                  {selectedUser.company && (
                    <p className="text-gray-600">
                      <span className="font-medium">Company:</span> {selectedUser.company}
                    </p>
                  )}
                  {selectedUser.blog && (
                    <p className="text-gray-600">
                      <span className="font-medium">Website:</span>{' '}
                      <a href={selectedUser.blog} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {selectedUser.blog}
                      </a>
                    </p>
                  )}
                  {selectedUser.email && (
                    <p className="text-gray-600">
                      <span className="font-medium">Email:</span> {selectedUser.email}
                    </p>
                  )}
                  {selectedUser.created_at && (
                    <p className="text-gray-600">
                      <span className="font-medium">Joined:</span> {new Date(selectedUser.created_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
                
                <a 
                  href={selectedUser.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-block mt-6 px-6 py-2 bg-gray-800 text-white font-medium rounded-md hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  View GitHub Profile
                </a>
              </div>
            </div>
          </div>
        )}
        
        {/* Display search results list */}
        {!selectedUser && searchResults.length > 0 && (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">
                Found {totalResults} user{totalResults !== 1 ? 's' : ''}
              </h3>
              <p className="text-sm text-gray-500">
                Showing {searchResults.length} of {totalResults}
              </p>
            </div>
            
            <div className="space-y-4">
              {searchResults.map(user => (
                <div 
                  key={user.id} 
                  className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row items-center md:items-start gap-4 hover:shadow-md transition-shadow"
                >
                  <img 
                    src={user.avatar_url} 
                    alt={`${user.login}'s avatar`}
                    className="w-16 h-16 rounded-full"
                  />
                  
                  <div className="flex-1 text-center md:text-left">
                    <h4 className="text-lg font-semibold">{user.login}</h4>
                    <p className="text-gray-500">ID: {user.id}</p>
                    
                    <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                      {user.type && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {user.type}
                        </span>
                      )}
                      {user.site_admin && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Admin
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => viewUserProfile(user.login)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      View Profile
                    </button>
                    <a
                      href={user.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              ))}
            </div>
            
            {hasMorePages && (
              <div className="mt-6 text-center">
                <button
                  onClick={loadMoreResults}
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300"
                >
                  {isLoading ? 'Loading...' : 'Load More Results'}
                </button>
              </div>
            )}
          </div>
        )}
        
        {/* No results message */}
        {!isLoading && !error && searchResults.length === 0 && currentPage === 1 && (
          <p className="text-center text-gray-500">
            Enter a search term to find GitHub users.
          </p>
        )}
      </div>
    </div>
  );
}

export default Search;