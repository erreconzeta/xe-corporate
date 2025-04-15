import { Button } from "@/components/ui/button"
import { ArrowUpRight, MoreHorizontal, Check, Clock, XCircle, Filter, ChevronDown, ChevronRight } from "lucide-react"
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
  status: "completed" | "in_progress" | "canceled"
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
  }
]

export function TransactionTable() {
  const [statusFilter, setStatusFilter] = useState<Transaction['status'][]>(['completed', 'in_progress', 'canceled'])
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const filteredTransactions = transactions.filter(transaction => 
    statusFilter.includes(transaction.status)
  )

  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-green-600" />
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-600" />
      case 'canceled':
        return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusStyle = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'in_progress':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'canceled':
        return 'bg-red-50 text-red-700 border-red-200'
    }
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>
                  <div className="flex items-center gap-2">
                    Status
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-48">
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('completed')}
                          onCheckedChange={(checked) => {
                            setStatusFilter(prev => 
                              checked 
                                ? [...prev, 'completed']
                                : prev.filter(s => s !== 'completed')
                            )
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>Completed</span>
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('in_progress')}
                          onCheckedChange={(checked) => {
                            setStatusFilter(prev => 
                              checked 
                                ? [...prev, 'in_progress']
                                : prev.filter(s => s !== 'in_progress')
                            )
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-blue-600" />
                            <span>In Progress</span>
                          </div>
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem
                          checked={statusFilter.includes('canceled')}
                          onCheckedChange={(checked) => {
                            setStatusFilter(prev => 
                              checked 
                                ? [...prev, 'canceled']
                                : prev.filter(s => s !== 'canceled')
                            )
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <span>Canceled</span>
                          </div>
                        </DropdownMenuCheckboxItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableHead>
                <TableHead>Value Date</TableHead>
                <TableHead>Contract Type</TableHead>
                <TableHead>Recipients</TableHead>
                <TableHead>Send Currency</TableHead>
                <TableHead>Send Amount</TableHead>
                <TableHead>Receive Currency</TableHead>
                <TableHead>Receive Amount</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead>Reference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction, index) => (
                <>
                  <TableRow 
                    key={transaction.id}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      index === filteredTransactions.length - 1 && !expandedRows.has(transaction.id) ? 'border-b-0' : ''
                    }`}
                    onClick={() => toggleRow(transaction.id)}
                  >
                    <TableCell>
                      {expandedRows.has(transaction.id) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusStyle(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        {transaction.status.replace('_', ' ')}
                      </div>
                    </TableCell>
                    <TableCell>{transaction.valueDate}</TableCell>
                    <TableCell>{transaction.contractType}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{transaction.recipient.name}</span>
                        <span className="text-sm text-gray-500">{transaction.recipient.accountNumber}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.sendCurrency}</TableCell>
                    <TableCell>{transaction.sendAmount}</TableCell>
                    <TableCell>{transaction.receiveCurrency}</TableCell>
                    <TableCell>{transaction.receiveAmount}</TableCell>
                    <TableCell>{transaction.rate}</TableCell>
                    <TableCell>{transaction.fee}</TableCell>
                    <TableCell className="font-mono">{transaction.reference}</TableCell>
                  </TableRow>
                  <TableRow className={`bg-gray-50 transition-all duration-300 ${
                    expandedRows.has(transaction.id) 
                      ? 'opacity-100 border-t' 
                      : 'opacity-0 h-0 border-none'
                    } ${
                      index === filteredTransactions.length - 1 && !expandedRows.has(transaction.id) ? 'border-t-0' : ''
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