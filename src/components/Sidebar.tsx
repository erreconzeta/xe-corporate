import { Link } from "react-router-dom"
import { Button } from "./ui/button"

export function Sidebar() {
  return (
    <div className="w-[240px] border-r border-input fixed top-0 bottom-0 flex flex-col">
      {/* Logo section */}
      <div className="p-2 shrink-0">
        <Link to="/" className="block">
          <div className="w-14 h-14">
            <img src="/XE logo.svg" alt="XE Logo" className="w-full h-full" />
          </div>
        </Link>
      </div>

      {/* Send Money Button */}
      <div className="p-4 shrink-0">
        <Button className="w-full transition-colors duration-200" size="lg">Send Money</Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto">
        <div className="space-y-3 p-4">
          <Link to="/" className="flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md bg-accent transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </Link>
          <Link to="/balances" className="flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Balances
          </Link>
          <Link to="/transactions" className="flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Transactions
          </Link>
          <Link to="/recipients" className="flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Recipients
          </Link>
          <Link to="/payment-methods" className="flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Payment Methods
          </Link>
          <Link to="/rate-alerts" className="flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Rate Alerts
          </Link>
          <Link to="/components-new" className="flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <line x1="3" y1="9" x2="21" y2="9" />
              <line x1="9" y1="21" x2="9" y2="9" />
            </svg>
            Components
          </Link>
        </div>
      </nav>

      {/* Help Link at bottom */}
      <div className="p-4 border-t border-input shrink-0">
        <Link to="/help" className="flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          Help
        </Link>
      </div>
    </div>
  )
} 