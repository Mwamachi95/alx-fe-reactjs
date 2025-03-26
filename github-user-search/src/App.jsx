import { useState } from 'react'
import Search from './components/Search'
import './App.css'

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>GitHub User Search</h1>
        <p className="subtitle">Find and explore GitHub profiles</p>
      </header>
      
      <main>
        <Search />
      </main>
      
      <footer>
        <p>Using the GitHub API to search users</p>
      </footer>
    </div>
  )
}

export default App