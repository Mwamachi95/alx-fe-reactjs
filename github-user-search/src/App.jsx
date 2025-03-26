import { useState } from 'react'
import { searchUsers } from './services/githubApi'
import UserCard from './components/UserCard'
import './App.css'

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) return

    setIsLoading(true)
    setError(null)
    
    try {
      const response = await searchUsers(searchQuery)
      setUsers(response.items || [])
      
      if (response.items.length === 0) {
        setError('No users found. Try a different search term.')
      }
    } catch (err) {
      setError('Failed to search users. Please try again.')
      console.error(err)
      setUsers([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <header>
        <h1>GitHub User Search</h1>
      </header>
      
      <main>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search GitHub users..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}
        
        <div className="results-container">
          {users.length > 0 ? (
            <div className="users-grid">
              {users.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <p className="no-results">
              {isLoading ? 'Searching...' : 'No users to display. Try searching for a GitHub username.'}
            </p>
          )}
        </div>
      </main>
    </div>
  )
}

export default App