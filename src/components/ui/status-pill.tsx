import { Check, Clock, XCircle, ArrowUpRight } from "lucide-react"

export type TransactionStatus = "pending_approval" | "action_required" | "scheduled" | "in_progress" | "completed" | "canceled"

interface StatusPillProps {
  status: TransactionStatus
  showIcon?: boolean
  className?: string
}

export function StatusPill({ status, showIcon = true, className = "" }: StatusPillProps) {
  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
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
        return <XCircle className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusStyle = (status: TransactionStatus) => {
    switch (status) {
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
        return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium border truncate ${getStatusStyle(status)} ${className}`}>
      {showIcon && getStatusIcon(status)}
      <span className="truncate">{status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
    </div>
  )
} 