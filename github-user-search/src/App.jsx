import Search from './components/Search'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">GitHub User Search</h1>
          <p className="text-gray-600">Find and explore GitHub profiles with advanced search options</p>
        </header>
        
        <main>
          <Search />
        </main>
        
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>Powered by the GitHub API</p>
        </footer>
      </div>
    </div>
  )
}

export default App