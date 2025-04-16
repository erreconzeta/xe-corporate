import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/Sidebar"
import { Send, Plus, RefreshCcw, Calendar, Download } from "lucide-react"
import { AlertWithClose, AlertDescription } from "@/components/ui/alert"
import { TransactionTable } from "@/components/TransactionTable"
import { Avatar } from "@/components/ui/avatar"
import { useState } from "react"

export function TransactionsScreen() {
  const [showAlert, setShowAlert] = useState(true)

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col">
        <Sidebar />
        
        <div className="flex-1 md:ml-[240px]">
          {/* User Profile Bar */}
          <div className="border-b border-input md:block hidden">
            <div className="flex h-14 items-center">
              <div className="max-w-[960px] w-full mx-auto px-4">
                <div className="flex items-center gap-0 justify-end">
                  <Avatar initials="JM" variant="outline" />
                  <div className="flex flex-col ml-3">
                    <span className="text-sm font-medium">Sky Compass Media LLC</span>
                    <span className="text-xs text-muted-foreground">James Mitchell</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 lg:p-4 md:p-6 sm:p-4 w-full max-w-[960px] mx-auto">
            {/* Header */}
            <div className="mb-8 text-left">
              <h1 className="text-2xl font-semibold">Transactions</h1>
            </div>

            {/* Action Buttons */}
            <div className="overflow-x-auto mb-8">
              <div className="flex items-center gap-4">
                <Button variant="default" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Quick transfer
                </Button>
                <Button variant="secondary" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add funds
                </Button>
                <Button variant="secondary" className="flex items-center gap-2">
                  <RefreshCcw className="h-4 w-4" />
                  Convert
                </Button>
                <Button variant="secondary" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Schedule
                </Button>
                <Button variant="outline" className="ml-auto flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Alert */}
            <div className="transition-[height,margin,opacity] duration-300 ease-in-out overflow-hidden"
                 style={{ 
                   height: showAlert ? '88px' : '0',
                   marginBottom: showAlert ? '1rem' : '0',
                   opacity: showAlert ? 1 : 0
                 }}>
              <AlertWithClose 
                variant="warning"
                onClose={() => setShowAlert(false)}
              >
                <div className="font-medium mb-1">1 transaction(s) require your attention</div>
                <AlertDescription>
                  Please <span className="underline cursor-pointer">review these transactions</span> to avoid processing delays
                </AlertDescription>
              </AlertWithClose>
            </div>

            {/* Table (includes filter pills) */}
            <TransactionTable />
          </div>
        </div>
      </div>
    </div>
  )
} 