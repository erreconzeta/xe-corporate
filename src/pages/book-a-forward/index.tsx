"use client"

import { Button } from "../../components/ui/button"
import { X, Calendar, ChevronDown, Search, Plus, ChevronRight, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import * as Select from '@radix-ui/react-select'
import * as Popover from '@radix-ui/react-popover'
import { useState } from 'react'
import { DE, FR, ES, IT, PL, US, EU, GB, JP, CH } from 'country-flag-icons/react/3x2'
import React from 'react'
import { DayPicker } from 'react-day-picker'
import { format, isBefore, startOfToday } from 'date-fns'
import 'react-day-picker/dist/style.css'
import { cn } from "../../lib/utils"
import { getCountryFlag } from "../../components/flags"

const FlagComponent: Record<string, React.ComponentType<any>> = {
  DE,
  FR,
  ES,
  IT,
  PL,
  US,
  EUR: EU,
  GB,
  JP,
  CH
}

const recipients = [
  {
    id: 1,
    name: "John Smith",
    accountNumber: "Bank of America ••4222",
    country: "US"
  },
  {
    id: 2,
    name: "Marie Dubois",
    accountNumber: "BNP Paribas ••7891",
    country: "EUR"
  },
  {
    id: 3,
    name: "Hans Schmidt",
    accountNumber: "Deutsche Bank ••3456",
    country: "EUR"
  },
  {
    id: 4,
    name: "Isabella Romano",
    accountNumber: "UniCredit ••9012",
    country: "EUR"
  },
  {
    id: 5,
    name: "Pablo Garcia",
    accountNumber: "Santander ••5678",
    country: "EUR"
  }
]

const balances = [
  { id: 1, currency: "USD", amount: "10,000.00" },
  { id: 2, currency: "EUR", amount: "8,500.00" },
  { id: 3, currency: "GBP", amount: "7,200.00" },
  { id: 4, currency: "JPY", amount: "1,500,000.00" },
  { id: 5, currency: "CHF", amount: "9,300.00" }
]

type PaymentType = "recipient" | "balance"

export function BookaForward() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState<'recipient' | 'calculator'>('recipient')
  const [recipientSearch, setRecipientSearch] = useState("")
  const [selectedRecipient, setSelectedRecipient] = useState(recipients[0])
  const [selectedBalance, setSelectedBalance] = useState(balances[0])
  const [sendCurrency, setSendCurrency] = useState("USD")
  const [receiveCurrency, setReceiveCurrency] = useState("EUR")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date('2025-06-17'))
  const [sendAmount, setSendAmount] = useState("1000.00")
  const [receiveAmount, setReceiveAmount] = useState("908.70")
  const [paymentType, setPaymentType] = useState<PaymentType>("recipient")
  const [isOpen, setIsOpen] = useState(false)
  
  const filteredRecipients = recipients.filter(recipient => 
    recipient.name.toLowerCase().includes(recipientSearch.toLowerCase())
  )

  const recentRecipients = [
    {
      id: 1,
      name: "John Smith",
      accountNumber: "Bank of America ••4222",
      country: "US"
    },
    {
      id: 2,
      name: "Marie Dubois",
      accountNumber: "BNP Paribas ••7891",
      country: "EUR"
    }
  ]

  const handleRecipientSelect = (recipient: typeof recipients[0]) => {
    setSelectedRecipient(recipient)
    setCurrentStep('calculator')
    // Set receive currency based on recipient's country
    const euCountries = ["ES", "IT", "DE", "FR"]
    if (euCountries.includes(recipient.country)) {
      setReceiveCurrency("EUR")
    } else if (recipient.country === "GB") {
      setReceiveCurrency("GBP")
    }
  }

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

  const handleClose = () => {
    navigate('/')
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
            onClick={handleClose}
          >
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </div>

      {currentStep === 'recipient' && (
        <div className="max-w-[600px] mx-auto">
          <div className="px-6 py-8">
            <h1 className="text-[28px] font-semibold text-gray-900 mb-6">Who are you sending money to?</h1>
          
            {/* Transfer Type Tabs */}
            <div className="inline-flex h-10 items-center justify-center rounded-lg bg-gray-100 p-1 w-full mb-6">
              <button
                onClick={() => setPaymentType("recipient")}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1",
                  paymentType === "recipient"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                Pay to recipient
              </button>
              <button
                onClick={() => setPaymentType("balance")}
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1",
                  paymentType === "balance"
                    ? "bg-white text-gray-900 shadow"
                    : "text-gray-600 hover:bg-gray-50"
                )}
              >
                Pay to balance
              </button>
            </div>

            {/* Search Bar - Common for both modes */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={paymentType === "recipient" ? "Search existing recipients" : "Search balances"}
                value={recipientSearch}
                onChange={(e) => setRecipientSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-200 text-[15px] placeholder:text-gray-500 focus:outline-none focus:border-gray-400"
              />
            </div>

            {paymentType === "recipient" ? (
              <>
                {/* Add Recipient Button */}
                <div className="relative">
                  <button className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 absolute inset-x-0">
                    <div className="flex items-center gap-3 pl-0">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center relative">
                        <Plus className="h-5 w-5 text-gray-600" />
                      </div>
                      <span className="text-[15px] font-medium text-gray-900">Add a recipient</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                  </button>
                  <div className="h-[72px]"></div>
                </div>

                {/* Recently Used Recipients */}
                <div>
                  <h2 className="text-sm font-medium text-gray-900 mb-2">Recently used</h2>
                  <div className="h-[1px] bg-gray-200 w-full mb-4" />
                  <div className="space-y-2">
                    {recentRecipients.map((recipient) => (
                      <div key={recipient.id} className="relative">
                        <button
                          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 absolute inset-x-0"
                          onClick={() => handleRecipientSelect(recipient)}
                        >
                          <div className="flex items-center gap-3 pl-0">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                {recipient.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                {getCountryFlag(recipient.country === "EUR" ? "EU" : recipient.country)}
                              </div>
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="text-[15px] font-medium text-gray-900">{recipient.name}</span>
                              <span className="text-sm text-gray-500">{recipient.accountNumber}</span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                        </button>
                        <div className="h-[72px]"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Recipients */}
                <div className="mt-6">
                  <h2 className="text-sm font-medium text-gray-900 mb-2">All recipients</h2>
                  <div className="h-[1px] bg-gray-200 w-full mb-4" />
                  <div className="space-y-2">
                    {filteredRecipients.map((recipient) => (
                      <div key={recipient.id} className="relative">
                        <button
                          className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 absolute inset-x-0"
                          onClick={() => handleRecipientSelect(recipient)}
                        >
                          <div className="flex items-center gap-3 pl-0">
                            <div className="relative">
                              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                {recipient.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                {getCountryFlag(recipient.country === "EUR" ? "EU" : recipient.country)}
                              </div>
                            </div>
                            <div className="flex flex-col items-start">
                              <span className="text-[15px] font-medium text-gray-900">{recipient.name}</span>
                              <span className="text-sm text-gray-500">{recipient.accountNumber}</span>
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                        </button>
                        <div className="h-[72px]"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Balances List */
              <div>
                <h2 className="text-sm font-medium text-gray-900 mb-2">Available balances</h2>
                <div className="h-[1px] bg-gray-200 w-full mb-4" />
                <div className="space-y-2">
                  {balances.map((balance) => (
                    <button
                      key={balance.id}
                      onClick={() => {
                        setSelectedBalance(balance)
                        setCurrentStep('calculator')
                        setSendCurrency(balance.currency)
                      }}
                      className="w-full flex items-center gap-3 p-4 hover:bg-gray-50"
                    >
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                          {balance.currency === "EUR" ? "EU" : 
                           balance.currency === "GBP" ? "GB" :
                           balance.currency === "JPY" ? "JP" :
                           balance.currency === "CHF" ? "CH" : "US"}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                          {getCountryFlag(balance.currency === "EUR" ? "EU" :
                                        balance.currency === "GBP" ? "GB" :
                                        balance.currency === "JPY" ? "JP" :
                                        balance.currency === "CHF" ? "CH" : "US")}
                        </div>
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="text-[15px] font-medium text-gray-900">{balance.currency} Balance</span>
                        <span className="text-sm text-gray-500">{balance.amount} {balance.currency}</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 ml-auto" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {currentStep === 'calculator' && (
        <div className="p-4 pt-8">
          <div className="max-w-4xl mx-auto">
            <Button 
              onClick={() => setCurrentStep('recipient')}
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-gray-100 mb-2"
            >
              <ArrowLeft className="h-5 w-5 text-gray-500" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900 mb-8">Book a forward</h1>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                {/* Recipient/Balance Selection */}
                <div>
                  {paymentType === "recipient" ? (
                    <Select.Root 
                      value={selectedRecipient.id.toString()}
                      onValueChange={(value) => {
                        const recipient = recipients.find(r => r.id.toString() === value)
                        if (recipient) {
                          setSelectedRecipient(recipient)
                          // Set receive currency based on recipient's country
                          const euCountries = ["ES", "IT", "DE", "FR"]
                          if (euCountries.includes(recipient.country)) {
                            setReceiveCurrency("EUR")
                          } else if (recipient.country === "US") {
                            setReceiveCurrency("USD")
                          }
                        }
                      }}
                    >
                      <Select.Trigger className="w-full">
                        <div className="h-[52px] border rounded-lg overflow-hidden hover:bg-gray-50 relative bg-white transition-colors">
                          <div className="flex h-full items-center justify-between w-full pl-3 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                  {selectedRecipient.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                  {getCountryFlag(selectedRecipient.country === "EUR" ? "EU" : selectedRecipient.country)}
                                </div>
                              </div>
                              <div className="flex flex-col items-start">
                                <p className="text-sm text-gray-500">Recipient</p>
                                <p className="text-[15px] font-medium text-gray-900">
                                  {selectedRecipient.name}
                                  <span className="text-gray-500 ml-2">••{selectedRecipient.accountNumber.split(' ••')[1]}</span>
                                </p>
                              </div>
                            </div>
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content position="popper" className="bg-white rounded-lg shadow-lg border mt-1 z-50 w-[var(--radix-select-trigger-width)] p-1">
                          <div className="p-2 border-b">
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search recipients..."
                                className="w-full h-9 px-3 pl-8 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-400"
                              />
                              <svg
                                className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                              </svg>
                            </div>
                          </div>
                          <Select.Viewport>
                            {recipients.map((recipient) => (
                              <Select.Item
                                key={recipient.id}
                                value={recipient.id.toString()}
                                className="flex items-center justify-between w-full outline-none focus:outline-none cursor-pointer rounded-lg hover:bg-gray-50 transition-colors"
                              >
                                <div className="flex items-center gap-3 pl-3 pr-3 py-3">
                                  <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                      {recipient.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                      {getCountryFlag(recipient.country === "EUR" ? "EU" : recipient.country)}
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-start">
                                    <span className="text-[15px] font-medium text-gray-900">{recipient.name}</span>
                                    <span className="text-sm text-gray-500">{recipient.accountNumber}</span>
                                  </div>
                                </div>
                                <div className="px-3">
                                  <Select.ItemIndicator>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M13.3332 4.66667L5.99984 12L2.6665 8.66667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                  </Select.ItemIndicator>
                                </div>
                              </Select.Item>
                            ))}
                          </Select.Viewport>
                          <div className="p-1 border-t mt-1">
                            <button className="flex items-center gap-2 w-full px-3 py-2.5 text-[15px] font-medium text-blue-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 4.16667V15.8333M4.16667 10H15.8333" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Add a new recipient
                            </button>
                          </div>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  ) : (
                    <Select.Root 
                      value={selectedBalance.id.toString()}
                      onValueChange={(value) => {
                        const balance = balances.find(b => b.id.toString() === value)
                        if (balance) setSelectedBalance(balance)
                      }}
                    >
                      <Select.Trigger className="w-full">
                        <div className="h-[52px] border rounded-lg overflow-hidden hover:bg-gray-50 relative bg-white transition-colors">
                          <div className="flex h-full items-center justify-between w-full pl-3 pr-4">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                  {selectedBalance.currency === "EUR" ? "EU" : 
                                   selectedBalance.currency === "GBP" ? "GB" :
                                   selectedBalance.currency === "JPY" ? "JP" :
                                   selectedBalance.currency === "CHF" ? "CH" : "US"}
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                  {getCountryFlag(selectedBalance.currency === "EUR" ? "EU" :
                                                selectedBalance.currency === "GBP" ? "GB" :
                                                selectedBalance.currency === "JPY" ? "JP" :
                                                selectedBalance.currency === "CHF" ? "CH" : "US")}
                                </div>
                              </div>
                              <div className="flex flex-col items-start">
                                <p className="text-sm text-gray-500">Balance</p>
                                <p className="text-[15px] font-medium text-gray-900">
                                  {selectedBalance.currency} Balance
                                  <span className="text-gray-500 ml-2">{selectedBalance.amount}</span>
                                </p>
                              </div>
                            </div>
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          </div>
                        </div>
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content position="popper" className="bg-white rounded-lg shadow-lg border mt-1 z-50 w-[var(--radix-select-trigger-width)] p-1">
                          <div className="p-2 border-b">
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search currencies..."
                                className="w-full h-9 px-3 pl-8 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-400"
                              />
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            </div>
                          </div>
                          <Select.Viewport>
                            <Select.Item value="USD" className="flex items-center justify-between w-full outline-none focus:outline-none cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3 pl-3 pr-3 py-3">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                    US
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                    {getCountryFlag("US")}
                                  </div>
                                </div>
                                <span className="text-[15px] font-medium text-gray-900">USD - United States Dollar</span>
                              </div>
                              <div className="px-3">
                                <Select.ItemIndicator>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3332 4.66667L5.99984 12L2.6665 8.66667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Select.ItemIndicator>
                              </div>
                            </Select.Item>
                            <Select.Item value="EUR" className="flex items-center justify-between w-full outline-none focus:outline-none cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3 pl-3 pr-3 py-3">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                    EU
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                    {getCountryFlag("EU")}
                                  </div>
                                </div>
                                <span className="text-[15px] font-medium text-gray-900">EUR - Euro</span>
                              </div>
                              <div className="px-3">
                                <Select.ItemIndicator>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3332 4.66667L5.99984 12L2.6665 8.66667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Select.ItemIndicator>
                              </div>
                            </Select.Item>
                            <Select.Item value="GBP" className="flex items-center justify-between w-full outline-none focus:outline-none cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3 pl-3 pr-3 py-3">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                    GB
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                    {getCountryFlag("GB")}
                                  </div>
                                </div>
                                <span className="text-[15px] font-medium text-gray-900">GBP - British Pound</span>
                              </div>
                              <div className="px-3">
                                <Select.ItemIndicator>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3332 4.66667L5.99984 12L2.6665 8.66667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Select.ItemIndicator>
                              </div>
                            </Select.Item>
                            <Select.Item value="JPY" className="flex items-center justify-between w-full outline-none focus:outline-none cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3 pl-3 pr-3 py-3">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                    JP
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                    {getCountryFlag("JP")}
                                  </div>
                                </div>
                                <span className="text-[15px] font-medium text-gray-900">JPY - Japanese Yen</span>
                              </div>
                              <div className="px-3">
                                <Select.ItemIndicator>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3332 4.66667L5.99984 12L2.6665 8.66667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Select.ItemIndicator>
                              </div>
                            </Select.Item>
                            <Select.Item value="CHF" className="flex items-center justify-between w-full outline-none focus:outline-none cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3 pl-3 pr-3 py-3">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                    CH
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                    {getCountryFlag("CH")}
                                  </div>
                                </div>
                                <span className="text-[15px] font-medium text-gray-900">CHF - Swiss Franc</span>
                              </div>
                              <div className="px-3">
                                <Select.ItemIndicator>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3332 4.66667L5.99984 12L2.6665 8.66667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Select.ItemIndicator>
                              </div>
                            </Select.Item>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  )}
                </div>

                {/* Amount Input */}
                <div>
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
                              {React.createElement(FlagComponent[sendCurrency === "EUR" ? "EUR" : sendCurrency === "GBP" ? "GB" : sendCurrency === "JPY" ? "JP" : sendCurrency === "CHF" ? "CH" : "US"], { className: "absolute w-9 h-9" })}
                            </div>
                            <span className="text-[15px] font-medium text-gray-900">{sendCurrency}</span>
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          </div>
                        </Button>
                      </Select.Trigger>

                      <Select.Portal>
                        <Select.Content position="popper" className="bg-white rounded-lg shadow-lg border mt-1 z-50 w-[var(--radix-select-trigger-width)] p-1">
                          <div className="p-2 border-b">
                            <div className="relative">
                              <input
                                type="text"
                                placeholder="Search currencies..."
                                className="w-full h-9 px-3 pl-8 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-400"
                              />
                              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            </div>
                          </div>
                          <Select.Viewport>
                            <Select.Item value="USD" className="flex items-center justify-between w-full outline-none focus:outline-none cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3 pl-3 pr-3 py-3">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                    US
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                    {getCountryFlag("US")}
                                  </div>
                                </div>
                                <span className="text-[15px] font-medium text-gray-900">USD - United States Dollar</span>
                              </div>
                              <div className="px-3">
                                <Select.ItemIndicator>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3332 4.66667L5.99984 12L2.6665 8.66667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Select.ItemIndicator>
                              </div>
                            </Select.Item>
                            <Select.Item value="EUR" className="flex items-center justify-between w-full outline-none focus:outline-none cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3 pl-3 pr-3 py-3">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                    EU
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                    {getCountryFlag("EU")}
                                  </div>
                                </div>
                                <span className="text-[15px] font-medium text-gray-900">EUR - Euro</span>
                              </div>
                              <div className="px-3">
                                <Select.ItemIndicator>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3332 4.66667L5.99984 12L2.6665 8.66667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Select.ItemIndicator>
                              </div>
                            </Select.Item>
                            <Select.Item value="GBP" className="flex items-center justify-between w-full outline-none focus:outline-none cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3 pl-3 pr-3 py-3">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                    GB
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                    {getCountryFlag("GB")}
                                  </div>
                                </div>
                                <span className="text-[15px] font-medium text-gray-900">GBP - British Pound</span>
                              </div>
                              <div className="px-3">
                                <Select.ItemIndicator>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3332 4.66667L5.99984 12L2.6665 8.66667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Select.ItemIndicator>
                              </div>
                            </Select.Item>
                            <Select.Item value="JPY" className="flex items-center justify-between w-full outline-none focus:outline-none cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3 pl-3 pr-3 py-3">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                    JP
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                    {getCountryFlag("JP")}
                                  </div>
                                </div>
                                <span className="text-[15px] font-medium text-gray-900">JPY - Japanese Yen</span>
                              </div>
                              <div className="px-3">
                                <Select.ItemIndicator>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3332 4.66667L5.99984 12L2.6665 8.66667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Select.ItemIndicator>
                              </div>
                            </Select.Item>
                            <Select.Item value="CHF" className="flex items-center justify-between w-full outline-none focus:outline-none cursor-pointer rounded-lg hover:bg-gray-50 transition-colors">
                              <div className="flex items-center gap-3 pl-3 pr-3 py-3">
                                <div className="relative">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[15px] font-medium">
                                    CH
                                  </div>
                                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-white">
                                    {getCountryFlag("CH")}
                                  </div>
                                </div>
                                <span className="text-[15px] font-medium text-gray-900">CHF - Swiss Franc</span>
                              </div>
                              <div className="px-3">
                                <Select.ItemIndicator>
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3332 4.66667L5.99984 12L2.6665 8.66667" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </Select.ItemIndicator>
                              </div>
                            </Select.Item>
                          </Select.Viewport>
                        </Select.Content>
                      </Select.Portal>
                    </Select.Root>
                  </div>
                </div>

                {/* Exchange Rate */}
                <div className="text-sm text-gray-600 p-3 rounded-md">
                  <div className="flex justify-between">
                    <span>Send Rate</span>
                    <span className="font-medium">1 {sendCurrency} = 0.9087 {receiveCurrency}</span>
                  </div>
                </div>

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
                          {React.createElement(FlagComponent[receiveCurrency === "EUR" ? "EUR" : receiveCurrency === "GBP" ? "GB" : receiveCurrency === "JPY" ? "JP" : receiveCurrency === "CHF" ? "CH" : "US"], { className: "absolute w-9 h-9" })}
                        </div>
                        <span className="text-[15px] font-medium text-gray-900">{receiveCurrency}</span>
                        <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
                          <Popover.Trigger asChild>
                            <div 
                              onMouseEnter={() => setIsOpen(true)}
                              onMouseLeave={() => setIsOpen(false)}
                            >
                              <svg
                                className="h-5 w-5 text-gray-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                          </Popover.Trigger>
                          <Popover.Portal>
                            <Popover.Content 
                              className="bg-gray-900 text-white text-sm rounded-lg py-2 px-3 w-[280px] z-[100]"
                              onMouseEnter={() => setIsOpen(true)}
                              onMouseLeave={() => setIsOpen(false)}
                              sideOffset={5}
                            >
                              <p className="leading-snug">Recipient's currency is linked to their account and will update if the recipient is changed</p>
                              <Popover.Arrow className="fill-gray-900" />
                            </Popover.Content>
                          </Popover.Portal>
                        </Popover.Root>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <div className="flex items-center justify-between p-4 rounded-lg">
                    <div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <Calendar className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-[14px] text-gray-500">Send on</p>
                          <span className="text-[14px] font-medium text-gray-900">{format(selectedDate, 'MMMM d, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    <Popover.Root>
                      <Popover.Trigger asChild>
                        <Button variant="ghost" className="text-[14px] font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-lg">
                          Change
                        </Button>
                      </Popover.Trigger>
                      <Popover.Portal>
                        <Popover.Content className="bg-white rounded-lg shadow-lg border p-2 z-50" sideOffset={5}>
                          <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              if (date) {
                                setSelectedDate(date)
                                // Find and click the close button
                                const closeButton = document.querySelector('[data-radix-popover-close]')
                                if (closeButton instanceof HTMLElement) {
                                  closeButton.click()
                                }
                              }
                            }}
                            disabled={disabledDays}
                            className="p-2"
                          />
                          <Popover.Close className="hidden" />
                        </Popover.Content>
                      </Popover.Portal>
                    </Popover.Root>
                  </div>
                </div>

                {/* Transfer Reason */}
                <div className="mb-8">
                  <div className="flex items-center justify-between p-4 rounded-lg">
                    <div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6663 5.83333L7.49967 15L3.33301 10.8333" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-[14px] text-gray-500">Reason of transfer</p>
                          <span className="text-[14px] font-medium text-gray-900">Salary</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-[14px] font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 px-4 py-2.5 rounded-lg">
                      Change
                    </Button>
                  </div>
                </div>
              </div>

              {/* Summary Section */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col">
                <h2 className="text-2xl font-semibold mb-6">Summary</h2>
                
                <div className="space-y-4 flex-1">
                  <div className="flex justify-between">
                    <span className="text-[14px] text-gray-500">{paymentType === "recipient" ? "Recipient" : "Balance"}</span>
                    <span className="text-[14px]">{paymentType === "recipient" ? selectedRecipient.name : `${selectedBalance.currency} Balance`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-[14px] text-gray-500">Recipient gets</span>
                    <span className="text-[14px]">{receiveAmount} {receiveCurrency}</span>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-[14px] text-gray-500">Settled on</span>
                      <span className="text-[14px]">{format(selectedDate, 'MMMM d, yyyy')}</span>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[14px] text-gray-500">Margin cost</span>
                    <span className="text-[14px]">{(parseFloat(sendAmount) * 0.1).toFixed(2)} {sendCurrency} (10%)</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[14px] text-gray-500">Remaining amount</span>
                    <span className="text-[14px]">{(parseFloat(sendAmount) * 0.9).toFixed(2)} {sendCurrency} (90%)</span>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-[14px] font-semibold">Subtotal</span>
                      <span className="text-[14px] font-semibold">{sendAmount} {sendCurrency}</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium h-11 text-[14px] mt-6">
                  Continue to payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 