import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { Button } from "./components/ui/button"
import { ComponentsLibrary } from "./pages/ComponentsLibrary"
import { HomeScreen } from "./pages/HomeScreen"
import { BookAForward } from "./pages/book-a-forward"
import QuickTransfer from "./pages/quick-transfer"
import { Send, ListFilter } from "lucide-react"
import { ComponentsScreen } from "./pages/ComponentsScreen"
import { TransactionsScreen } from "./pages/TransactionsScreen"
import './App.css'

function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Xe Corporate</h1>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/book-a-forward">
          <Button 
            variant="default" 
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Book a forward
          </Button>
        </Link>
        <Link to="/quick-transfer">
          <Button 
            variant="default" 
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Quick Transfer
          </Button>
        </Link>
        <Link to="/home">
          <Button variant="default">Home screen</Button>
        </Link>
        <Link to="/transactions">
          <Button variant="default" className="flex items-center gap-2">
            <ListFilter className="h-4 w-4" />
            Transactions
          </Button>
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
        <Route path="/new" element={<ComponentsScreen />} />
        <Route path="/transactions" element={<TransactionsScreen />} />
        <Route path="/book-a-forward" element={<BookAForward />} />
      </Routes>
    </Router>
  )
}

export default App
