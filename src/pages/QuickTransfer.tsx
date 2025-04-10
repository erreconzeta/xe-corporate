import { Button } from "../components/ui/button"
import { X, Calendar, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import * as Select from '@radix-ui/react-select'
import { useState } from 'react'
import { DE, FR, ES, IT, PL, US, EU } from 'country-flag-icons/react/3x2'
import React from 'react'

const FlagComponent: Record<string, React.ComponentType<any>> = {
  DE,
  FR,
  ES,
  IT,
  PL,
  US,
  EU
}

const recipients = [
  {
    id: 1,
    name: "John Smith",
    accountNumber: "**** **** **** 1234",
    country: "US"
  },
  {
    id: 2,
    name: "Marie Dubois",
    accountNumber: "**** **** **** 5678",
    country: "FR"
  },
  {
    id: 3,
    name: "Hans Schmidt",
    accountNumber: "**** **** **** 9012",
    country: "DE"
  },
  {
    id: 4,
    name: "Isabella Romano",
    accountNumber: "**** **** **** 3456",
    country: "IT"
  },
  {
    id: 5,
    name: "Pablo Garcia",
    accountNumber: "**** **** **** 7890",
    country: "ES"
  }
]

export function QuickTransfer() {
  const [selectedRecipient, setSelectedRecipient] = useState(recipients[0])

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <img src="/xe-logo.svg" alt="XE" className="h-8 mb-6" />
            <h1 className="text-2xl font-bold text-gray-900">Book a forward</h1>
          </div>
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-gray-100">
              <X className="h-5 w-5 text-gray-500" />
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Transfer Type Tabs */}
            <div className="flex gap-2 mb-6">
              <Button variant="default" className="bg-blue-50 text-blue-700 hover:bg-blue-100 flex-1">
                Pay to recipient
              </Button>
              <Button variant="outline" className="text-gray-600 flex-1">
                Pay to balance
              </Button>
            </div>

            {/* Recipient Selection */}
            <div>
              <Select.Root 
                value={selectedRecipient.id.toString()}
                onValueChange={(value) => {
                  const recipient = recipients.find(r => r.id.toString() === value)
                  if (recipient) setSelectedRecipient(recipient)
                }}
              >
                <Select.Trigger className="w-full">
                  <div className="h-[52px] border rounded-lg overflow-hidden hover:bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 relative bg-white transition-colors">
                    <div className="flex h-full items-center justify-between w-full px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center">
                          {React.createElement(FlagComponent[selectedRecipient.country], { className: "absolute w-9 h-9" })}
                        </div>
                        <div className="flex flex-col items-start">
                          <p className="text-sm text-gray-500">Recipient</p>
                          <p className="text-[15px] font-medium text-gray-900">
                            {selectedRecipient.name}
                            <span className="ml-2">••{selectedRecipient.accountNumber.slice(-4)}</span>
                          </p>
                        </div>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content position="popper" className="bg-white rounded-lg shadow-lg border mt-1 z-50 w-[var(--radix-select-trigger-width)] p-1">
                    <Select.Viewport>
                      {recipients.map((recipient) => (
                        <Select.Item
                          key={recipient.id}
                          value={recipient.id.toString()}
                          className="flex items-center justify-between w-full outline-none cursor-pointer rounded-lg data-[highlighted]:bg-gray-100"
                        >
                          <div className="flex items-center gap-3 px-3 py-2.5">
                            <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center">
                              {React.createElement(FlagComponent[recipient.country], { className: "absolute w-9 h-9" })}
                            </div>
                            <p className="text-[15px] font-medium text-gray-900">
                              {recipient.name}
                              <span className="ml-2">••{recipient.accountNumber.slice(-4)}</span>
                            </p>
                          </div>
                          <div className="px-3">
                            <Select.ItemIndicator>
                              <div className="h-2 w-2 rounded-full bg-blue-600" />
                            </Select.ItemIndicator>
                          </div>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </div>

            {/* Amount Input */}
            <div>
              <div className="flex h-[60px] border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 focus-within:border-gray-400 transition-colors">
                <div className="flex-1 relative">
                  <label className="absolute top-2 left-3 text-sm text-gray-500">You send</label>
                  <input 
                    type="text" 
                    placeholder="0.00"
                    defaultValue="1,000"
                    className="w-full h-full pt-7 pb-1 px-3 text-[20px] font-semibold text-gray-900 outline-none border-0"
                  />
                </div>
                <Select.Root defaultValue="USD">
                  <Select.Trigger asChild>
                    <Button variant="ghost" className="h-full px-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center">
                          {React.createElement(FlagComponent["US"], { className: "absolute w-9 h-9" })}
                        </div>
                        <span className="text-[15px] font-medium text-gray-900">USD</span>
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      </div>
                    </Button>
                  </Select.Trigger>

                  <Select.Portal>
                    <Select.Content position="popper" className="bg-white rounded-lg shadow-lg border mt-1 z-50 min-w-[120px] p-1">
                      <Select.Viewport>
                        <Select.Item value="USD" className="flex items-center gap-2 px-3 py-2.5 outline-none cursor-pointer rounded-lg data-[highlighted]:bg-gray-100">
                          <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center">
                            {React.createElement(FlagComponent["US"], { className: "absolute w-9 h-9" })}
                          </div>
                          <span className="text-[15px] font-medium text-gray-900">USD</span>
                          <Select.ItemIndicator className="ml-auto">
                            <div className="h-2 w-2 rounded-full bg-blue-600" />
                          </Select.ItemIndicator>
                        </Select.Item>
                        <Select.Item value="EUR" className="flex items-center gap-2 px-3 py-2.5 outline-none cursor-pointer rounded-lg data-[highlighted]:bg-gray-100">
                          <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center">
                            {React.createElement(FlagComponent["EU"], { className: "absolute w-9 h-9" })}
                          </div>
                          <span className="text-[15px] font-medium text-gray-900">EUR</span>
                          <Select.ItemIndicator className="ml-auto">
                            <div className="h-2 w-2 rounded-full bg-blue-600" />
                          </Select.ItemIndicator>
                        </Select.Item>
                      </Select.Viewport>
                    </Select.Content>
                  </Select.Portal>
                </Select.Root>
              </div>
            </div>

            {/* Exchange Rate */}
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between">
                <span>Send Rate</span>
                <span className="font-medium">1 USD = 0.9087 EUR</span>
              </div>
            </div>

            {/* Recipient Gets */}
            <div>
              <div className="flex h-[60px] border rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
                <div className="flex-1 relative">
                  <label className="absolute top-2 left-3 text-sm text-gray-600">Recipients gets</label>
                  <input 
                    type="text" 
                    placeholder="0.00"
                    defaultValue="908.7"
                    className="w-full h-full pt-7 pb-1 px-3 text-xl font-semibold outline-none border-0"
                  />
                </div>
                <Button variant="ghost" className="h-full px-3 hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center">
                      {React.createElement(FlagComponent["EU"], { className: "absolute w-9 h-9" })}
                    </div>
                    <span>EUR</span>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  </div>
                </Button>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Send on</label>
              <Button variant="outline" className="w-full justify-between text-left font-normal">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>June 17, 2025</span>
                </div>
                <span className="text-blue-600">Change</span>
              </Button>
            </div>

            {/* Transfer Reason */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Reason of transfer</label>
              <Button variant="outline" className="w-full justify-between text-left font-normal">
                <span>Salary</span>
                <span className="text-blue-600">Change</span>
              </Button>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-gray-50 p-6 rounded-lg space-y-6 border border-gray-200">
            <h2 className="text-xl font-semibold">Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Recipient</span>
                <span>Johann Müller</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Recipient gets</span>
                <span>908.7 EUR</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Settled on</span>
                <span>June 17, 2025</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Margin cost</span>
                <span>100.00 USD (10%)</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Remaining amount</span>
                <span>900.00 USD (90%)</span>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span>1,000.00 USD</span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
              Continue to payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 