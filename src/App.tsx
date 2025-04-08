import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Button } from "./components/ui/button"
import { ComponentsLibrary } from "./pages/ComponentsLibrary"
import { HomeScreen } from "./pages/HomeScreen"
import './App.css'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Hello World</h1>
      <div className="flex gap-4">
        <Link to="/components">
          <Button>Components library</Button>
        </Link>
        <Link to="/home">
          <Button>Home screen</Button>
        </Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/components" element={<ComponentsLibrary />} />
        <Route path="/home" element={<HomeScreen />} />
      </Routes>
    </Router>
  )
}

export default App
