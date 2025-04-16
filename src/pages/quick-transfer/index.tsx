"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "../../components/ui/label"
import { X, ChevronDown, Search, Plus, ChevronRight } from "lucide-react"
import { useLocation } from "react-router-dom"
import * as Select from '@radix-ui/react-select'
import * as Dialog from '@radix-ui/react-dialog'
import { useState } from "react"
import { startOfToday } from 'date-fns'
import { DE, FR, ES, IT, PL, US, EU, GB, JP, CH } from 'country-flag-icons/react/3x2'
import React from 'react'
import { DayPicker } from 'react-day-picker'
import { format, isBefore } from 'date-fns'
import 'react-day-picker/dist/style.css'
import { cn } from "../../lib/utils"
import { getCountryFlag } from "../../components/flags"

const CountryFlags: Record<string, React.ComponentType<any>> = {
  DE,
  FR,
  ES,
  IT,
  PL,
  US,
  EU,
  GB,
  JP,
  CH
}

interface Recipient {
  id: number
  name: string
  accountNumber: string
  country: string
  email: string
}

interface Reason {
  id: string
  name: string
  description: string
}

const recipients: Recipient[] = [
  {
    id: 1,
    name: "John Smith",
    accountNumber: "**** **** **** 1234",
    country: "US",
    email: "john@example.com"
  },
  {
    id: 2,
    name: "Marie Dubois",
    accountNumber: "**** **** **** 5678",
    country: "FR",
    email: "maria@example.com"
  },
  {
    id: 3,
    name: "Hans Schmidt",
    accountNumber: "**** **** **** 9012",
    country: "DE",
    email: "james@example.com"
  },
  {
    id: 4,
    name: "Isabella Romano",
    accountNumber: "**** **** **** 3456",
    country: "IT",
    email: "sophie@example.com"
  },
  {
    id: 5,
    name: "Pablo Garcia",
    accountNumber: "**** **** **** 7890",
    country: "ES",
    email: "maria@example.com"
  }
]

const reasons: Reason[] = [
  { id: "1", name: "Salary", description: "" },
  { id: "2", name: "Business expenses", description: "" },
  { id: "3", name: "Services", description: "" },
  { id: "4", name: "Goods", description: "" },
  { id: "5", name: "Investment", description: "" }
]

export default function QuickTransfer() {
  const location = useLocation()
  const initialRecipient = location.state?.selectedRecipient || recipients[0]
  const [selectedRecipient, setSelectedRecipient] = useState(initialRecipient)
  const [currentStep, setCurrentStep] = useState<'initial' | 'recipient' | 'calculator'>('initial')
  const [recipientSearch, setRecipientSearch] = useState("")
  const [sendCurrency, setSendCurrency] = useState("USD")
  const [receiveCurrency, setReceiveCurrency] = useState("EUR")
  const [sendAmount, setSendAmount] = useState("1000.00")
  const [receiveAmount, setReceiveAmount] = useState("908.70")
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [selectedReason, setSelectedReason] = useState<Reason | null>(null)

  const euCountries = ["ES", "DE", "FR", "IT", "NL"]

  const formatAmount = (value: string) => {
    // Remove all non-numeric characters except decimal point
    let number = value.replace(/[^\d.]/g, '')
    
    // Ensure only one decimal point
    const parts = number.split('.')
    if (parts.length > 2) number = parts[0] + '.' + parts.slice(1).join('')
    
    // Limit to 2 decimal places
    if (parts[1]?.length > 2) {
      number = parts[0] + '.' + parts[1].slice(0, 2)
    }
    
    // Add commas for thousands
    const [whole, decimal] = number.split('.')
    const formattedWhole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    
    return decimal ? `${formattedWhole}.${decimal}` : formattedWhole
  }

  const handleSendAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, '')
    if (value === '') {
      setSendAmount('')
      setReceiveAmount('')
      return
    }
    
    const numericValue = parseFloat(value)
    if (!isNaN(numericValue)) {
      const formattedSend = formatAmount(value)
      setSendAmount(formattedSend)
      // Calculate receive amount (using exchange rate 0.9087)
      const calculatedReceive = (numericValue * 0.9087).toFixed(2)
      setReceiveAmount(formatAmount(calculatedReceive))
    }
  }

  const handleReceiveAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, '')
    if (value === '') {
      setSendAmount('')
      setReceiveAmount('')
      return
    }
    
    const numericValue = parseFloat(value)
    if (!isNaN(numericValue)) {
      const formattedReceive = formatAmount(value)
      setReceiveAmount(formattedReceive)
      // Calculate send amount (using exchange rate 0.9087)
      const calculatedSend = (numericValue / 0.9087).toFixed(2)
      setSendAmount(formatAmount(calculatedSend))
    }
  }

  const disabledDays = { before: startOfToday() }

  const filteredRecipients = recipients.filter(recipient => 
    recipient.name.toLowerCase().includes(recipientSearch.toLowerCase()) ||
    recipient.email.toLowerCase().includes(recipientSearch.toLowerCase())
  )

  const handleRecipientSelect = (recipient: Recipient | string) => {
    if (typeof recipient === 'string') {
      const found = recipients.find(r => r.id.toString() === recipient)
      if (found) {
        setSelectedRecipient(found)
        setCurrentStep('calculator')
        // Set receive currency based on recipient's country
        if (found.country === "GB") {
          setReceiveCurrency("GBP")
        } else if (["ES", "FR"].includes(found.country)) {
          setReceiveCurrency("EUR")
        }
      }
    } else {
      setSelectedRecipient(recipient)
      setCurrentStep('calculator')
      // Set receive currency based on recipient's country
      if (recipient.country === "GB") {
        setReceiveCurrency("GBP")
      } else if (["ES", "FR"].includes(recipient.country)) {
        setReceiveCurrency("EUR")
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Topbar - always visible */}
      <div className="w-full border-b">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex justify-between items-center">
          <img src="/XE logo.svg" alt="XE" className="h-[60px]" />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-full hover:bg-gray-100"
            onClick={() => {
              if (currentStep === 'calculator') setCurrentStep('recipient')
              else if (currentStep === 'recipient') setCurrentStep('initial')
              else if (currentStep === 'initial') {/* Handle navigation back */}
            }}
          >
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>

      {currentStep === 'initial' && (
        <div className="max-w-[600px] mx-auto px-4 py-8">
          <h1 className="text-[28px] font-semibold text-gray-900 mb-6">Book a Forward Contract</h1>
          <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 text-[15px]"
            onClick={() => setCurrentStep('recipient')}
          >
            Book a Forward
          </Button>
        </div>
      )}

      {currentStep === 'recipient' && (
        <div className="max-w-[600px] mx-auto px-4 py-8">
          <h1 className="text-[28px] font-semibold text-gray-900 mb-6">Who are you sending money to?</h1>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search existing recipients"
              value={recipientSearch}
              onChange={(e) => setRecipientSearch(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-full border border-gray-200 text-[15px] placeholder:text-gray-500 focus:outline-none focus:border-gray-400"
            />
          </div>

          {/* Add Recipient Button */}
          <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg mb-6 pl-6 pr-6">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center relative">
              <Plus className="h-5 w-5 text-gray-600" />
            </div>
            <span className="text-[15px] font-medium text-gray-900">Add a recipient</span>
            <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
          </button>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            <button className="px-4 py-2 rounded-full bg-gray-900 text-white text-[14px] font-medium">All</button>
            <button className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-[14px] font-medium">My accounts</button>
          </div>

          {/* Recently Used Recipients */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-900 mb-2 pl-6">Recently used</h2>
            <div className="h-[1px] bg-gray-200 w-full mb-4" />
            <div className="space-y-2">
              {recipients.slice(0, 2).map((recipient) => (
                <button
                  key={recipient.id}
                  onClick={() => handleRecipientSelect(recipient)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 pl-6 pr-6"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                      {recipient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                      {getCountryFlag(recipient.country)}
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[15px] font-medium text-gray-900">{recipient.name}</span>
                    <span className="text-sm text-gray-500">{recipient.accountNumber.split(' - ')[0]} ••4222</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                </button>
              ))}
            </div>
          </div>

          {/* All Recipients */}
          <div>
            <h2 className="text-sm font-medium text-gray-900 mb-2 pl-6">All recipients</h2>
            <div className="h-[1px] bg-gray-200 w-full mb-4" />
            <div className="space-y-2">
              {filteredRecipients.map((recipient) => (
                <button
                  key={recipient.id}
                  onClick={() => handleRecipientSelect(recipient)}
                  className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 pl-6 pr-6"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                      {recipient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                      {getCountryFlag(recipient.country)}
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-[15px] font-medium text-gray-900">{recipient.name}</span>
                    <span className="text-sm text-gray-500">{recipient.accountNumber.split(' - ')[0]} ••4222</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                </button>
              ))}
            </div>
          </div>

          {/* Available balances */}
          <div>
            <h2 className="text-sm font-medium text-gray-900 mb-2 pl-6">Available balances</h2>
            <div className="h-[1px] bg-gray-200 w-full mb-4" />
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 pl-6 pr-6">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  {React.createElement(CountryFlags["US"], { className: "w-5 h-5" })}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[15px] font-medium text-gray-900">USD Balance</span>
                  <span className="text-[15px] text-gray-500">10,000.00 USD</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep === 'calculator' && (
        <div className="p-4 pt-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Quick Transfer</h1>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                {/* Recipient Selection */}
                <div className="space-y-3 -mx-4">
                  <div className="px-4">
                    <Select.Root value={selectedRecipient.id.toString()} onValueChange={handleRecipientSelect}>
                      <Select.Trigger 
                        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            {getCountryFlag(selectedRecipient.country)}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-gray-500">Recipient</span>
                            <span className="text-[15px] text-gray-900">{selectedRecipient.name}</span>
                          </div>
                        </div>
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      </Select.Trigger>
                    </Select.Root>
                  </div>

                  <div className="px-4">
                    {/* Amount Input */}
                    <div className="flex h-[60px] border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 focus-within:border-gray-400 transition-colors">
                      <div className="flex-1 relative">
                        <label className="absolute top-2 left-3 text-sm text-gray-500">You send</label>
                        <input 
                          type="text" 
                          placeholder="0.00"
                          value={sendAmount}
                          onChange={handleSendAmountChange}
                          className="w-full h-full pt-7 pb-1 px-3 text-[20px] font-semibold text-gray-900 outline-none border-0"
                        />
                      </div>
                      <Select.Root 
                        value={sendCurrency}
                        onValueChange={setSendCurrency}
                      >
                        <Select.Trigger asChild>
                          <Button variant="ghost" className="h-full px-3 hover:bg-gray-50 transition-colors focus-visible:ring-0 focus-visible:ring-offset-0">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center">
                                {React.createElement(CountryFlags[sendCurrency === "EUR" ? "EU" : sendCurrency === "GBP" ? "GB" : sendCurrency === "JPY" ? "JP" : sendCurrency === "CHF" ? "CH" : "US"], { className: "absolute w-9 h-9" })}
                              </div>
                              <span className="text-[15px] font-medium text-gray-900">{sendCurrency}</span>
                              <ChevronDown className="h-5 w-5 text-gray-500" />
                            </div>
                          </Button>
                        </Select.Trigger>
                      </Select.Root>
                    </div>
                  </div>

                  <div className="px-4">
                    {/* Exchange Rate */}
                    <div className="text-sm text-gray-600 p-3 rounded-md">
                      <div className="flex justify-between">
                        <span>Send Rate</span>
                        <span className="font-medium">1 {sendCurrency} = 0.9087 {receiveCurrency}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4">
                    {/* Recipient Gets */}
                    <div className="relative">
                      <div className="flex h-[60px] border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 focus-within:border-gray-400 transition-colors">
                        <div className="flex-1 relative">
                          <label className="absolute top-2 left-3 text-sm text-gray-500">Recipients gets</label>
                          <input 
                            type="text" 
                            placeholder="0.00"
                            value={receiveAmount}
                            onChange={handleReceiveAmountChange}
                            className="w-full h-full pt-7 pb-1 px-3 text-xl font-semibold outline-none border-0"
                          />
                        </div>
                        <div className="flex items-center px-3 border-l border-gray-200">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full overflow-hidden relative flex items-center justify-center">
                              {React.createElement(CountryFlags[receiveCurrency === "EUR" ? "EU" : receiveCurrency === "GBP" ? "GB" : receiveCurrency === "JPY" ? "JP" : receiveCurrency === "CHF" ? "CH" : "US"], { className: "absolute w-9 h-9" })}
                            </div>
                            <span className="text-[15px] font-medium text-gray-900">{receiveCurrency}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method and Reason sections without padding */}
                  <Dialog.Root open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
                    <Dialog.Trigger asChild>
                      <div className="cursor-pointer">
                        <div className="flex h-[52px] items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
                              <div>
                                <div className="flex items-center gap-3">
                                  <img 
                                    src="/bank-of-america-logo.svg" 
                                    alt="Bank of America" 
                                    className="w-[50px] h-[50px] rounded-full object-cover" 
                                  />
                                  <div className="flex flex-col">
                                    <p className="text-sm text-gray-500">Bank account</p>
                                    <span className="text-[15px] font-medium text-gray-900">Bank of America ••4222</span>
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" className="text-[14px] font-medium text-gray-600 bg-gray-100 px-4 py-2.5 rounded-lg">
                                Change
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Trigger>

                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                      <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-[400px] bg-white rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                          <Dialog.Title className="text-xl font-semibold">Select payment method</Dialog.Title>
                          <Dialog.Close asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                              <X className="h-5 w-5 text-gray-500" />
                            </Button>
                          </Dialog.Close>
                        </div>
                        
                        <div>
                          <div className="p-4 cursor-pointer">
                            <div className="flex items-center gap-3">
                              <img 
                                src="/bank-of-america-logo.svg" 
                                alt="Bank of America" 
                                className="w-[50px] h-[50px] rounded-full bg-gray-100 object-contain p-2" 
                              />
                              <div>
                                <p className="text-[15px] font-medium text-gray-900">Bank of America ••4222</p>
                                <p className="text-sm text-gray-500">Checking account</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>

                  {/* Reason of Transfer */}
                  <div className="cursor-pointer">
                    <div className="flex h-[52px] items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-[50px] h-[50px] rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          <ChevronDown className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex flex-col">
                          <p className="text-sm text-gray-500">Reason of transfer</p>
                          <span className="text-[15px] font-medium text-gray-900">{selectedReason?.name || 'Select reason of transfer'}</span>
                        </div>
                      </div>
                      <Button variant="ghost" className="text-[14px] font-medium text-gray-600 bg-gray-100 px-4 py-2.5 rounded-lg">
                        Change
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col h-full">
                <h2 className="text-2xl font-semibold mb-6">Summary</h2>
                
                <div className="flex-1">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-[15px] text-gray-600">Should arrive</span>
                      <span className="text-[15px]">Within 24 hours</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-[15px] text-gray-600">Transfer fees</span>
                      <span className="text-[15px]">20.00 USD</span>
                    </div>

                    <div className="pt-4 border-t">
                      <div className="flex justify-between">
                        <span className="text-[15px] font-semibold">Total to pay</span>
                        <span className="text-[15px] font-semibold">{sendAmount} {sendCurrency}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-2 mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                    />
                    <label htmlFor="terms" className="text-[14px] text-gray-600">
                      I agree to XE Money Transfer's{' '}
                      <a href="#" className="text-blue-600 underline hover:text-blue-700">Terms & Conditions</a>.
                    </label>
                  </div>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 text-[15px]" 
                    disabled={!termsAccepted}
                  >
                    Confirm and send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}