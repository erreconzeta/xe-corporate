import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Button } from "./components/ui/button"
import { ComponentsLibrary } from "./pages/ComponentsLibrary"
import { HomeScreen } from "./pages/HomeScreen"
import { QuickTransfer } from "./pages/QuickTransfer"
import { Send } from "lucide-react"
import './App.css'

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Xe Corporate</h1>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/quick-transfer">
          <Button 
            variant="default" 
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Quick Transfer
          </Button>
        </Link>
        <Link to="/home">
          <Button variant="default">Home screen</Button>
        </Link>
        <Link to="/components">
          <Button>Components library</Button>
        </Link>
        <Link to="/new">
          <Button>New Components</Button>
        </Link>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/components" element={<ComponentsLibrary />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/quick-transfer" element={<QuickTransfer />} />
      </Routes>
    </Router>
  )
}

export default App
