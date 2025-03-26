// services/githubService.js
import axios from 'axios';

// Base GitHub API URL
const BASE_URL = 'https://api.github.com';

// Add authorization if API key is available
const headers = {};
if (import.meta.env.VITE_APP_GITHUB_API_KEY) {
  headers.Authorization = `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`;
}

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    ...headers
  }
});

/**
 * Fetch user data for a specific GitHub username
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} - User data
 */
export const fetchUserData = async (username) => {
  try {
    const response = await api.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user data for ${username}:`, error);
    throw error;
  }
};

/**
 * Basic search for GitHub users based on a simple query
 * @param {string} query - Search query
 * @returns {Promise<Object>} - Search results
 */
export const searchUsers = async (query) => {
  try {
    const response = await api.get(`/search/users?q=${query}&per_page=10`);
    return response.data;
  } catch (error) {
    console.error('Error searching for users:', error);
    throw error;
  }
};

/**
 * Advanced search for GitHub users with multiple criteria
 * @param {Object} criteria - Search criteria
 * @param {string} criteria.username - Username to search for
 * @param {string} [criteria.location] - Location to filter by
 * @param {number} [criteria.minRepos] - Minimum number of repositories
 * @param {string} [criteria.language] - Primary programming language
 * @param {number} [criteria.minFollowers] - Minimum number of followers
 * @param {string} [criteria.type] - Type of account ('user' or 'org')
 * @param {number} [criteria.perPage=10] - Results per page
 * @param {number} [criteria.page=1] - Page number
 * @returns {Promise<Object>} - Advanced search results
 */
export const advancedSearchUsers = async (criteria) => {
  try {
    let queryString = criteria.username || '';
    
    // Add location filter if provided
    if (criteria.location) {
      queryString += `+location:${encodeURIComponent(criteria.location)}`;
    }
    
    // Add minimum repositories filter if provided
    if (criteria.minRepos) {
      queryString += `+repos:>=${criteria.minRepos}`;
    }
    
    // Add language filter if provided
    if (criteria.language) {
      queryString += `+language:${encodeURIComponent(criteria.language)}`;
    }
    
    // Add followers filter if provided
    if (criteria.minFollowers) {
      queryString += `+followers:>=${criteria.minFollowers}`;
    }
    
    // Add type filter if provided
    if (criteria.type) {
      queryString += `+type:${criteria.type}`;
    }
    
    // Determine pagination
    const perPage = criteria.perPage || 10;
    const page = criteria.page || 1;
    
    // Use the exact endpoint format as specified: "https://api.github.com/search/users?q"
    const endpoint = "https://api.github.com/search/users?q" + encodeURIComponent(queryString);
    const url = `${endpoint}&per_page=${perPage}&page=${page}&sort=${criteria.sort || 'followers'}&order=${criteria.order || 'desc'}`;
    
    // Make the API request with the explicit URL
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error performing advanced search:', error);
    throw error;
  }
};

/**
 * Fetch repositories for a specific user
 * @param {string} username - GitHub username
 * @param {Object} [options] - Optional parameters
 * @param {number} [options.perPage=5] - Results per page
 * @param {number} [options.page=1] - Page number
 * @param {string} [options.sort='updated'] - Sort field (updated, created, pushed)
 * @param {string} [options.direction='desc'] - Sort direction (asc, desc)
 * @returns {Promise<Array>} - Repositories data
 */
export const fetchUserRepositories = async (username, options = {}) => {
  try {
    const perPage = options.perPage || 5;
    const page = options.page || 1;
    const sort = options.sort || 'updated';
    const direction = options.direction || 'desc';
    
    const response = await api.get(`/users/${username}/repos`, {
      params: {
        per_page: perPage,
        page: page,
        sort: sort,
        direction: direction
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching repositories for ${username}:`, error);
    throw error;
  }
};

export default {
  fetchUserData,
  searchUsers,
  advancedSearchUsers,
  fetchUserRepositories
};