import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { Send, PlusCircle, RefreshCcw, Calendar } from "lucide-react"

export function HomeScreen() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <Sidebar />
        
        <div className="flex-1 ml-[240px]">
          {/* User Profile Bar */}
          <div className="border-b border-input">
            <div className="flex h-14 items-center">
              <div className="max-w-[960px] w-full mx-auto px-4">
                <div className="flex items-center gap-2 justify-end">
                  <span className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    SL
                  </span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Sky Compass Media LLC</span>
                    <span className="text-xs text-muted-foreground">Daniel Moore</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 max-w-[960px] w-full mx-auto">
            {/* Welcome Header */}
            <div className="mb-8 text-left">
              <h1 className="text-2xl font-semibold">Welcome, Sky Compass Media LLC</h1>
              
              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <Button variant="default" className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Quick transfer
                </Button>
                <Button variant="secondary" className="flex items-center gap-2">
                  <PlusCircle className="h-4 w-4" />
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
              </div>
            </div>

            {/* Balances Section */}
            <div className="mb-8">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-left">Balances</h2>
                <div className="mt-1 border-b border-input"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* USD Balance */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🇺🇸</span>
                    <span className="text-sm text-muted-foreground">Total balance</span>
                  </div>
                  <div className="font-semibold">10,000.00 USD</div>
                  <div className="text-sm text-muted-foreground">10,000.00 available</div>
                </div>

                {/* EUR Balance */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🇪🇺</span>
                    <span className="text-sm text-muted-foreground">Total balance</span>
                  </div>
                  <div className="font-semibold">500.00 EUR</div>
                  <div className="text-sm text-muted-foreground">500.00 available</div>
                </div>

                {/* CAD Balance */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🇨🇦</span>
                    <span className="text-sm text-muted-foreground">Total balance</span>
                  </div>
                  <div className="font-semibold">2,000.00 CAD</div>
                  <div className="text-sm text-muted-foreground">2,000.00 available</div>
                </div>

                {/* AUD Balance */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🇦🇺</span>
                    <span className="text-sm text-muted-foreground">Total balance</span>
                  </div>
                  <div className="font-semibold">1,200.00 AUD</div>
                  <div className="text-sm text-muted-foreground">1,200.00 available</div>
                </div>

                {/* MXN Balance */}
                <div className="rounded-lg border p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🇲🇽</span>
                    <span className="text-sm text-muted-foreground">Total balance</span>
                  </div>
                  <div className="font-semibold">10.00 MXN</div>
                  <div className="text-sm text-muted-foreground">10.00 available</div>
                </div>
              </div>
            </div>

            {/* Transactions Section */}
            <div className="mb-8">
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Transactions</h2>
                  <Button variant="link">See all</Button>
                </div>
                <div className="mt-1 border-b border-input"></div>
              </div>
              
              <div className="space-y-4">
                {/* Transaction Items */}
                <div className="flex justify-between items-center p-4 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                      <span className="font-medium">Stephanie Sharkey</span>
                    </div>
                    <div className="text-sm text-muted-foreground">In progress · January 18, 2025</div>
                  </div>
                  <div className="text-right">
                    <div>1,000 AUD</div>
                    <div className="text-sm text-muted-foreground">632.20 USD</div>
                  </div>
                  <Button variant="secondary" size="sm">See details</Button>
                </div>

                {/* Completed Transaction */}
                <div className="flex justify-between items-center p-4 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="font-medium">Stephanie Sharkey</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Completed · January 18, 2025</div>
                  </div>
                  <div className="text-right">
                    <div>1,000 AUD</div>
                    <div className="text-sm text-muted-foreground">632.20 USD</div>
                  </div>
                  <Button variant="secondary" size="sm">Resend</Button>
                </div>
              </div>
            </div>

            {/* Recipients Section */}
            <div className="mb-8">
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Recipients</h2>
                  <Button variant="link">See all</Button>
                </div>
                <div className="mt-1 border-b border-input"></div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {/* Recipient Cards */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-2xl">AS</div>
                  </div>
                  <div className="font-medium">Alfred Skin</div>
                  <div className="text-sm text-muted-foreground">Chase Bank ···· 4554</div>
                  <div className="mt-2">🇻🇪</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-2xl">MT</div>
                  </div>
                  <div className="font-medium">Marcos Torres</div>
                  <div className="text-sm text-muted-foreground">Wells Fargo ···· 1123</div>
                  <div className="mt-2">🇪🇺</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-2xl">CF</div>
                  </div>
                  <div className="font-medium">Constantin Finkbeiner</div>
                  <div className="text-sm text-muted-foreground">Bankamai ···· 4565</div>
                  <div className="mt-2">🇨🇦</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-2xl">PB</div>
                  </div>
                  <div className="font-medium">Patricia Barrientos</div>
                  <div className="text-sm text-muted-foreground">Banco Santander ···· 2233</div>
                  <div className="mt-2">🇨🇱</div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="text-2xl">JS</div>
                  </div>
                  <div className="font-medium">John Sibert</div>
                  <div className="text-sm text-muted-foreground">Chase Bank ···· 1324</div>
                  <div className="mt-2">🇨🇱</div>
                </div>
              </div>
            </div>

            {/* Transfer Calculator Section */}
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Transfer calculator</h2>
                  <Button variant="link">See all</Button>
                </div>
                <div className="mt-1 border-b border-input"></div>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    {/* Graph placeholder */}
                    <div className="h-40 bg-muted rounded-md mb-4"></div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Feb 13</span>
                      <span>Today</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="text-sm text-muted-foreground">You send</label>
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-semibold">$1,000</div>
                        <Button variant="outline" size="sm">USD</Button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Send Rate</span>
                        <span>1 USD = 20,367.00 MXN</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-muted-foreground">Recipient gets</label>
                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-semibold">20,367.00</div>
                        <Button variant="outline" size="sm">MXN</Button>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      This tradable rate applies upon transfer completion for bank-to-bank transfers.
                    </div>

                    <Button className="w-full">Send Money</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 