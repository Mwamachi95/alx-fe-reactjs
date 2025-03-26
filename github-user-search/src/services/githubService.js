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
 * Search for GitHub users based on a query
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

export default {
  fetchUserData,
  searchUsers
};