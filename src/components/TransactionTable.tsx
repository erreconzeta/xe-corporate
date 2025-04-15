import { Button } from "@/components/ui/button"
import { ArrowUpRight, MoreHorizontal, Check, Clock, XCircle, Filter, ChevronDown, ChevronRight, ChevronsUpDown } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

interface Transaction {
  id: string
  status: "all" | "pending_approval" | "action_required" | "scheduled" | "in_progress" | "completed" | "canceled"
  valueDate: string
  contractType: string
  recipient: {
    name: string
    accountNumber: string
  }
  sendCurrency: string
  sendAmount: string
  receiveCurrency: string
  receiveAmount: string
  rate: string
  fee: string
  reference: string
}

type SortConfig = {
  key: keyof Transaction | 'recipient.name' | null
  direction: 'asc' | 'desc' | null
}

const transactions: Transaction[] = [
  {
    id: "1",
    status: "completed",
    valueDate: "Mar 20, 2024",
    contractType: "Spot",
    recipient: {
      name: "John Smith",
      accountNumber: "•••• 4523"
    },
    sendCurrency: "USD",
    sendAmount: "2,500.00",
    receiveCurrency: "EUR",
    receiveAmount: "2,300.45",
    rate: "1.0869",
    fee: "15.00",
    reference: "REF-20240320-001"
  },
  {
    id: "2",
    status: "in_progress",
    valueDate: "Mar 19, 2024",
    contractType: "Forward",
    recipient: {
      name: "ABC Corporation",
      accountNumber: "•••• 7890"
    },
    sendCurrency: "EUR",
    sendAmount: "1,800.00",
    receiveCurrency: "GBP",
    receiveAmount: "1,542.86",
    rate: "1.1667",
    fee: "12.00",
    reference: "REF-20240319-002"
  },
  {
    id: "3",
    status: "canceled",
    valueDate: "Mar 18, 2024",
    contractType: "Spot",
    recipient: {
      name: "Sarah Johnson",
      accountNumber: "•••• 1234"
    },
    sendCurrency: "GBP",
    sendAmount: "3,200.00",
    receiveCurrency: "USD",
    receiveAmount: "4,073.60",
    rate: "1.2730",
    fee: "18.00",
    reference: "REF-20240318-003"
  },
  {
    id: "4",
    status: "pending_approval",
    valueDate: "Mar 21, 2024",
    contractType: "Spot",
    recipient: {
      name: "Tech Solutions Ltd",
      accountNumber: "•••• 9876"
    },
    sendCurrency: "USD",
    sendAmount: "5,000.00",
    receiveCurrency: "JPY",
    receiveAmount: "750,000.00",
    rate: "150.00",
    fee: "25.00",
    reference: "REF-20240321-004"
  },
  {
    id: "5",
    status: "action_required",
    valueDate: "Mar 22, 2024",
    contractType: "Forward",
    recipient: {
      name: "Global Imports Inc",
      accountNumber: "•••• 5432"
    },
    sendCurrency: "EUR",
    sendAmount: "10,000.00",
    receiveCurrency: "USD",
    receiveAmount: "10,800.00",
    rate: "1.0800",
    fee: "30.00",
    reference: "REF-20240322-005"
  },
  {
    id: "6",
    status: "scheduled",
    valueDate: "Mar 25, 2024",
    contractType: "Forward",
    recipient: {
      name: "Future Payments LLC",
      accountNumber: "•••• 3210"
    },
    sendCurrency: "GBP",
    sendAmount: "7,500.00",
    receiveCurrency: "EUR",
    receiveAmount: "8,625.00",
    rate: "1.1500",
    fee: "28.00",
    reference: "REF-20240325-006"
  }
]

export function TransactionTable() {
  const [filterPills, setFilterPills] = useState<Transaction['status'][]>(['all'])
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: null })

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows)
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id)
    } else {
      newExpandedRows.add(id)
    }
    setExpandedRows(newExpandedRows)
  }

  const filteredTransactions = transactions.filter(transaction => {
    if (filterPills.includes('all')) return true
    return filterPills.includes(transaction.status)
  })

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (!sortConfig.key || !sortConfig.direction) return 0

    let aValue: any
    let bValue: any

    if (sortConfig.key === 'recipient.name') {
      aValue = a.recipient.name
      bValue = b.recipient.name
    } else {
      aValue = a[sortConfig.key]
      bValue = b[sortConfig.key]
    }

    // Handle numeric values (amount, rate, fee)
    if (['sendAmount', 'receiveAmount', 'rate', 'fee'].includes(sortConfig.key)) {
      aValue = parseFloat(aValue.replace(/,/g, ''))
      bValue = parseFloat(bValue.replace(/,/g, ''))
    }

    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig(currentSort => {
      if (currentSort.key === key) {
        if (currentSort.direction === 'asc') {
          return { key, direction: 'desc' }
        }
        if (currentSort.direction === 'desc') {
          return { key: null, direction: null }
        }
      }
      return { key, direction: 'asc' }
    })
  }

  const getSortIcon = (key: SortConfig['key']) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />
    }
    if (sortConfig.direction === 'asc') {
      return <ChevronsUpDown className="h-4 w-4 text-foreground" />
    }
    if (sortConfig.direction === 'desc') {
      return <ChevronsUpDown className="h-4 w-4 text-foreground" />
    }
    return <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />
  }

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'all':
        return <Filter className="h-4 w-4 text-gray-600" />
      case 'pending_approval':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'action_required':
        return <ArrowUpRight className="h-4 w-4 text-orange-600" />
      case 'scheduled':
        return <Clock className="h-4 w-4 text-purple-600" />
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'completed':
        return <Check className="h-4 w-4 text-green-600" />
      case 'canceled':
        return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusStyle = (status: Transaction['status']) => {
    switch (status) {
      case 'all':
        return 'bg-gray-50 text-gray-700 border-gray-200'
      case 'pending_approval':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'action_required':
        return 'bg-orange-50 text-orange-700 border-orange-200'
      case 'scheduled':
        return 'bg-purple-50 text-purple-700 border-purple-200'
      case 'in_progress':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'canceled':
        return 'bg-red-50 text-red-700 border-red-200'
    }
  }

  return (
    <div className="w-full">
      {/* Filter Pills - Moved outside of scrollable container */}
      <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: '80px repeat(6, 1fr)' }}>
        <button
          onClick={() => setFilterPills(['all'])}
          className={`flex flex-col items-start w-full px-3 py-2 rounded-md border text-sm ${
            filterPills.includes('all') 
              ? 'bg-accent text-accent-foreground border-primary' 
              : 'border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          <span className="whitespace-nowrap">All</span>
          <span className="inline-flex items-center justify-center rounded-full border border-input w-5 h-5 text-xs">
            {transactions.length}
          </span>
        </button>
        {(['pending_approval', 'action_required', 'scheduled', 'in_progress', 'completed', 'canceled'] as const).map((status) => (
          <button
            key={status}
            onClick={() => {
              setFilterPills(prev => {
                if (prev.includes(status)) {
                  const newPills = prev.filter(p => p !== status && p !== 'all')
                  return newPills.length === 0 ? ['all'] : newPills
                } else {
                  return [...prev.filter(p => p !== 'all'), status]
                }
              })
            }}
            className={`flex flex-col items-start w-full px-3 py-2 rounded-md border text-sm ${
              filterPills.includes(status) 
                ? 'bg-accent text-accent-foreground border-primary' 
                : 'border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            <span className="whitespace-nowrap">{status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
            <span className="inline-flex items-center justify-center rounded-full border border-input w-5 h-5 text-xs">
              {transactions.filter(t => t.status === status).length}
            </span>
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          <Table>
            <TableHeader className="[&_tr]:border-b-0">
              <TableRow className="bg-accent/50">
                <TableHead className="w-[50px] h-11 text-sm font-medium text-muted-foreground rounded-l-lg">
                  {/* Empty header cell for expand/collapse column */}
                </TableHead>
                <TableHead className="w-[140px] h-11 text-sm font-medium text-muted-foreground">
                  <button 
                    className="flex items-center gap-2 hover:text-foreground"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {getSortIcon('status')}
                  </button>
                </TableHead>
                <TableHead className="w-[120px] h-11 text-sm font-medium text-muted-foreground whitespace-nowrap">
                  <button 
                    className="flex items-center gap-2 hover:text-foreground"
                    onClick={() => handleSort('valueDate')}
                  >
                    Value Date
                    {getSortIcon('valueDate')}
                  </button>
                </TableHead>
                <TableHead className="w-[120px] h-11 text-sm font-medium text-muted-foreground whitespace-nowrap">
                  <button 
                    className="flex items-center gap-2 hover:text-foreground"
                    onClick={() => handleSort('contractType')}
                  >
                    Contract Type
                    {getSortIcon('contractType')}
                  </button>
                </TableHead>
                <TableHead className="w-[180px] h-11 text-sm font-medium text-muted-foreground whitespace-nowrap">
                  <button 
                    className="flex items-center gap-2 hover:text-foreground"
                    onClick={() => handleSort('recipient.name')}
                  >
                    Recipients
                    {getSortIcon('recipient.name')}
                  </button>
                </TableHead>
                <TableHead className="w-[120px] h-11 text-sm font-medium text-muted-foreground whitespace-nowrap">
                  <button 
                    className="flex items-center gap-2 hover:text-foreground"
                    onClick={() => handleSort('sendCurrency')}
                  >
                    Send Currency
                    {getSortIcon('sendCurrency')}
                  </button>
                </TableHead>
                <TableHead className="w-[120px] h-11 text-sm font-medium text-muted-foreground whitespace-nowrap">
                  <button 
                    className="flex items-center gap-2 hover:text-foreground"
                    onClick={() => handleSort('sendAmount')}
                  >
                    Send Amount
                    {getSortIcon('sendAmount')}
                  </button>
                </TableHead>
                <TableHead className="w-[120px] h-11 text-sm font-medium text-muted-foreground whitespace-nowrap">
                  <button 
                    className="flex items-center gap-2 hover:text-foreground"
                    onClick={() => handleSort('receiveCurrency')}
                  >
                    Receive Currency
                    {getSortIcon('receiveCurrency')}
                  </button>
                </TableHead>
                <TableHead className="w-[120px] h-11 text-sm font-medium text-muted-foreground whitespace-nowrap">
                  <button 
                    className="flex items-center gap-2 hover:text-foreground"
                    onClick={() => handleSort('receiveAmount')}
                  >
                    Receive Amount
                    {getSortIcon('receiveAmount')}
                  </button>
                </TableHead>
                <TableHead className="w-[100px] h-11 text-sm font-medium text-muted-foreground whitespace-nowrap">
                  <button 
                    className="flex items-center gap-2 hover:text-foreground"
                    onClick={() => handleSort('rate')}
                  >
                    Rate
                    {getSortIcon('rate')}
                  </button>
                </TableHead>
                <TableHead className="w-[100px] h-11 text-sm font-medium text-muted-foreground whitespace-nowrap">
                  <button 
                    className="flex items-center gap-2 hover:text-foreground"
                    onClick={() => handleSort('fee')}
                  >
                    Fee
                    {getSortIcon('fee')}
                  </button>
                </TableHead>
                <TableHead className="w-[160px] h-11 text-sm font-medium text-muted-foreground whitespace-nowrap">
                  <button 
                    className="flex items-center gap-2 hover:text-foreground"
                    onClick={() => handleSort('reference')}
                  >
                    Reference
                    {getSortIcon('reference')}
                  </button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.map((transaction, index) => (
                <>
                  <TableRow 
                    key={transaction.id}
                    className={`cursor-pointer hover:bg-accent/30 ${
                      index === sortedTransactions.length - 1 && !expandedRows.has(transaction.id) ? 'border-b-0' : ''
                    }`}
                    onClick={() => toggleRow(transaction.id)}
                  >
                    <TableCell className="w-[50px]">
                      {expandedRows.has(transaction.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="w-[140px]">
                      <div className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium border truncate ${getStatusStyle(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        <span className="truncate">{transaction.status.replace('_', ' ')}</span>
                      </div>
                    </TableCell>
                    <TableCell className="w-[120px] whitespace-nowrap">{transaction.valueDate}</TableCell>
                    <TableCell className="w-[120px] whitespace-nowrap">{transaction.contractType}</TableCell>
                    <TableCell className="w-[180px]">
                      <div className="flex flex-col truncate">
                        <span className="font-medium truncate">{transaction.recipient.name}</span>
                        <span className="text-sm text-gray-500 truncate">{transaction.recipient.accountNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell className="w-[120px] whitespace-nowrap">{transaction.sendCurrency}</TableCell>
                    <TableCell className="w-[120px] whitespace-nowrap">{transaction.sendAmount}</TableCell>
                    <TableCell className="w-[120px] whitespace-nowrap">{transaction.receiveCurrency}</TableCell>
                    <TableCell className="w-[120px] whitespace-nowrap">{transaction.receiveAmount}</TableCell>
                    <TableCell className="w-[100px] whitespace-nowrap">{transaction.rate}</TableCell>
                    <TableCell className="w-[100px] whitespace-nowrap">{transaction.fee}</TableCell>
                    <TableCell className="w-[160px] font-mono whitespace-nowrap">{transaction.reference}</TableCell>
                  </TableRow>
                  <TableRow className={`bg-accent/50 transition-all duration-300 ${
                    expandedRows.has(transaction.id) 
                      ? 'opacity-100 border-t' 
                      : 'opacity-0 h-0 border-none'
                    } ${
                      index === sortedTransactions.length - 1 && !expandedRows.has(transaction.id) ? 'border-t-0' : ''
                    }`}>
                    <TableCell colSpan={12} className="p-0 border-b-0">
                      <div 
                        className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                          expandedRows.has(transaction.id) 
                            ? 'grid-rows-[1fr] opacity-100' 
                            : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="min-h-0">
                          <div className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium mb-2">Transaction Details</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Transaction ID:</span>
                                    <span className="font-mono">{transaction.id}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Created:</span>
                                    <span>{transaction.valueDate}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Last Updated:</span>
                                    <span>{transaction.valueDate}</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Payment Details</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Payment Method:</span>
                                    <span>Bank Transfer</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-gray-500">Payment Reference:</span>
                                    <span className="font-mono">{transaction.reference}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}