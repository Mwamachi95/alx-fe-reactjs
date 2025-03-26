// components/UserCard.jsx
import { useState, useEffect } from 'react'
import { getUserDetails } from '../services/githubApi'

function UserCard({ user }) {
  const [userDetails, setUserDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true)
        const details = await getUserDetails(user.login)
        setUserDetails(details)
      } catch (err) {
        setError('Failed to load user details')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserDetails()
  }, [user.login])

  if (loading) {
    return <div className="user-card loading">Loading user details...</div>
  }

  if (error) {
    return <div className="user-card error">{error}</div>
  }

  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={userDetails?.avatar_url} alt={`${userDetails?.login}'s avatar`} />
      </div>
      <div className="user-info">
        <h3>{userDetails?.name || userDetails?.login}</h3>
        <p className="user-login">@{userDetails?.login}</p>
        {userDetails?.bio && <p className="user-bio">{userDetails.bio}</p>}
        <div className="user-stats">
          <span>Followers: {userDetails?.followers || 0}</span>
          <span>Repos: {userDetails?.public_repos || 0}</span>
        </div>
        <a 
          href={userDetails?.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="profile-link"
        >
          View Profile
        </a>
      </div>
    </div>
  )
}

export default UserCard