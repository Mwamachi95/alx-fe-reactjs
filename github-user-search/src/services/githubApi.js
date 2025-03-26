// services/githubApi.js
import axios from 'axios'

// Create base axios instance for GitHub API
const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Content-Type': 'application/json',
  }
})

// Add authorization if API key is available
if (import.meta.env.VITE_APP_GITHUB_API_KEY) {
  githubApi.defaults.headers.common['Authorization'] = `token ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
}

// Search for users
export const searchUsers = async (query) => {
  try {
    const response = await githubApi.get(`/search/users?q=${query}&per_page=10`)
    return response.data
  } catch (error) {
    console.error('Error searching GitHub users:', error)
    throw error
  }
}

// Get user details
export const getUserDetails = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching details for user ${username}:`, error)
    throw error
  }
}

export default {
  searchUsers,
  getUserDetails
}