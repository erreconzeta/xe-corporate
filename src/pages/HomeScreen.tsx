import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import { Sidebar } from "../components/Sidebar"
import { Send, PlusCircle, RefreshCcw, Calendar, Clock, Check, XCircle } from "lucide-react"
import BalanceCard from "../components/BalanceCard"
import { Avatar } from "@/components/ui/avatar"

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
                  <Avatar initials="JM" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Sky Compass Media LLC</span>
                    <span className="text-xs text-muted-foreground">James Mitchell</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-4 lg:p-4 md:p-6 sm:p-4 w-full max-w-[960px] mx-auto overflow-x-hidden">
            {/* Welcome Header */}
            <div className="mb-8 text-left">
              <h1 className="text-2xl font-semibold">Welcome, James Mitchell</h1>
              
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
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Balances</h2>
                  <Button variant="link">See all</Button>
                </div>
                <div className="mt-1 border-b border-input"></div>
              </div>
              <div className="overflow-x-auto">
                <div className="flex gap-6 pb-4 min-w-max">
                  <BalanceCard
                    title="Total Balance"
                    amount="12,345.67"
                    currency="USD"
                    countryCode="US"
                  />
                  <BalanceCard
                    title="EUR Balance"
                    amount="8,901.23"
                    currency="EUR"
                    countryCode="DE"
                  />
                  <BalanceCard
                    title="GBP Balance"
                    amount="5,678.90"
                    currency="GBP"
                    countryCode="GB"
                  />
                  <BalanceCard
                    title="JPY Balance"
                    amount="150,432.00"
                    currency="JPY"
                    countryCode="JP"
                  />
                  <BalanceCard
                    title="CAD Balance"
                    amount="7,890.45"
                    currency="CAD"
                    countryCode="CA"
                  />
                  <BalanceCard
                    title="AUD Balance"
                    amount="9,123.78"
                    currency="AUD"
                    countryCode="AU"
                  />
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
              
              {/* Transaction List */}
              <div className="space-y-3">
                {/* In Progress Transaction */}
                <div className="flex justify-between items-center px-0 py-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border border-input flex items-center justify-center">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">Michael Anderson</div>
                      <div className="text-sm text-muted-foreground">In progress · January 18, 2025</div>
                    </div>
                  </div>
                  <div className="w-[128px] text-left">
                    <div className="font-medium text-left">1,000 AUD</div>
                    <div className="text-sm text-muted-foreground text-left">632.20 USD</div>
                  </div>
                  <div className="w-[100px] flex justify-end">
                    <Button variant="secondary">See details</Button>
                  </div>
                </div>

                {/* Completed Transaction */}
                <div className="flex justify-between items-center px-0 py-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border border-input flex items-center justify-center">
                      <Check className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">Sarah Thompson</div>
                      <div className="text-sm text-muted-foreground">Completed · January 18, 2025</div>
                    </div>
                  </div>
                  <div className="w-[128px] text-left">
                    <div className="font-medium text-left">1,000 AUD</div>
                    <div className="text-sm text-muted-foreground text-left">632.20 USD</div>
                  </div>
                  <div className="w-[100px] flex justify-end">
                    <Button variant="secondary">Resend</Button>
                  </div>
                </div>

                {/* Canceled Transaction */}
                <div className="flex justify-between items-center px-0 py-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border border-input flex items-center justify-center">
                      <XCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">David Wilson</div>
                      <div className="text-sm text-muted-foreground">Canceled · January 18, 2025</div>
                    </div>
                  </div>
                  <div className="w-[128px] text-left">
                    <div className="font-medium text-left">1,000 AUD</div>
                    <div className="text-sm text-muted-foreground text-left">632.20 USD</div>
                  </div>
                  <div className="w-[100px] flex justify-end">
                    <Button variant="secondary">See details</Button>
                  </div>
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

              <div className="overflow-x-auto">
                <div className="flex gap-4 pb-4 min-w-max">
                  {/* Robert Johnson */}
                  <div className="p-4 border rounded-lg w-[280px]">
                    <div className="flex flex-col gap-2">
                      <Avatar initials="RJ" variant="secondary" size="lg" />
                      <div className="font-medium">Robert Johnson</div>
                      <div className="text-sm text-muted-foreground">Chase Bank ···· 4554</div>
                      <div className="mt-2">🇻🇪</div>
                    </div>
                  </div>

                  {/* Emily Davis */}
                  <div className="p-4 border rounded-lg w-[280px]">
                    <div className="flex flex-col gap-2">
                      <Avatar initials="ED" variant="secondary" size="lg" />
                      <div className="font-medium">Emily Davis</div>
                      <div className="text-sm text-muted-foreground">Wells Fargo ···· 1123</div>
                      <div className="mt-2">🇪🇺</div>
                    </div>
                  </div>

                  {/* Christopher Brown */}
                  <div className="p-4 border rounded-lg w-[280px]">
                    <div className="flex flex-col gap-2">
                      <Avatar initials="CB" variant="secondary" size="lg" />
                      <div className="font-medium">Christopher Brown</div>
                      <div className="text-sm text-muted-foreground">Bankamai ···· 4565</div>
                      <div className="mt-2">🇨🇦</div>
                    </div>
                  </div>

                  {/* Jennifer Taylor */}
                  <div className="p-4 border rounded-lg w-[280px]">
                    <div className="flex flex-col gap-2">
                      <Avatar initials="JT" variant="secondary" size="lg" />
                      <div className="font-medium">Jennifer Taylor</div>
                      <div className="text-sm text-muted-foreground">Banco Santander ···· 2233</div>
                      <div className="mt-2">🇨🇱</div>
                    </div>
                  </div>

                  {/* William Martinez */}
                  <div className="p-4 border rounded-lg w-[280px]">
                    <div className="flex flex-col gap-2">
                      <Avatar initials="WM" variant="secondary" size="lg" />
                      <div className="font-medium">William Martinez</div>
                      <div className="text-sm text-muted-foreground">Chase Bank ···· 1324</div>
                      <div className="mt-2">🇨🇱</div>
                    </div>
                  </div>
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