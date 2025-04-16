import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { Menu, X, ArrowLeftRight } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

interface SidebarContentProps {
  className?: string;
  isMobile?: boolean;
}

function SidebarContent({ className, isMobile = false }: SidebarContentProps) {
  const location = useLocation();
  const isHome = location.pathname === '/home';
  const isTransactions = location.pathname === '/transactions';
  
  return (
    <div className={`flex flex-col ${className} h-full`}>
      {/* Logo section - hidden on mobile */}
      {!isMobile && (
        <div className="p-2 shrink-0">
          <Link to="/" className="block">
            <div className="w-14 h-14">
              <img src="/XE logo.svg" alt="XE Logo" className="w-full h-full" />
            </div>
          </Link>
        </div>
      )}

      {/* Send Money Button */}
      <div className={`p-4 shrink-0 ${isMobile ? "mt-12" : ""}`}>
        <Button className="w-full transition-colors duration-200" size="lg">Send Money</Button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto">
        <div className={`space-y-3 p-4 ${isMobile ? "max-h-[calc(100vh-180px)] overflow-y-auto overflow-x-auto" : ""}`}>
          <Link to="/home" className={`flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md ${isMobile ? "min-w-[200px] whitespace-nowrap" : ""} ${isHome ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'} transition-colors duration-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </Link>
          <Link to="/balances" className={`flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md ${isMobile ? "min-w-[200px] whitespace-nowrap" : ""} text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            Balances
          </Link>
          <Link to="/transactions" className={`flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md ${isMobile ? "min-w-[200px] whitespace-nowrap" : ""} ${isTransactions ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'} transition-all duration-200`}>
            <ArrowLeftRight className="h-5 w-5" />
            Transactions
          </Link>
          <Link to="/recipients" className={`flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md ${isMobile ? "min-w-[200px] whitespace-nowrap" : ""} text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            Recipients
          </Link>
          <Link to="/payment-methods" className={`flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md ${isMobile ? "min-w-[200px] whitespace-nowrap" : ""} text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
            Payment Methods
          </Link>
          <Link to="/rate-alerts" className={`flex items-center gap-2 px-3 py-3 text-sm font-medium rounded-md ${isMobile ? "min-w-[200px] whitespace-nowrap" : ""} text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Rate Alerts
          </Link>
        </div>
      </nav>

      {/* Help Link at bottom */}
      <div className="py-3 px-4 border-t border-input shrink-0">
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
  );
}

export function Sidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <div className="w-[240px] border-r border-input fixed top-0 bottom-0 flex flex-col h-screen">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between h-14 px-4 border-b border-input w-full">
        {/* Logo */}
        <Link to="/" className="block">
          <div className="w-10 h-10">
            <img src="/XE logo.svg" alt="XE Logo" className="w-full h-full" />
          </div>
        </Link>

        {/* Menu Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0 w-[240px] [&>button:not(:first-child)]:hidden">
            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </SheetClose>
            <SidebarContent isMobile className="h-full" />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
} 