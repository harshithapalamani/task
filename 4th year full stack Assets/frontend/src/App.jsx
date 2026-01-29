import { Link, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white/90 backdrop-blur shadow">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.svg" alt="Logo" className="h-8 w-auto" />
          </Link>
          <nav className="space-x-4">
            <Link className="text-gray-700 hover:text-gray-900" to="/">Home</Link>
            <Link className="text-gray-700 hover:text-gray-900" to="/admin">Admin</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
