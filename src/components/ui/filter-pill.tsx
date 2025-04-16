import { TransactionStatus } from "./status-pill"

type FilterStatus = TransactionStatus | "all"

interface FilterPillProps {
  status: FilterStatus
  count: number
  isSelected: boolean
  onClick: () => void
}

export function FilterPill({ status, count, isSelected, onClick }: FilterPillProps) {
  const getLabel = (status: FilterStatus) => {
    if (status === 'all') return 'All'
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start w-full px-3 py-2 rounded-md border text-sm ${
        isSelected 
          ? 'bg-accent text-accent-foreground border-primary' 
          : 'border-input text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      }`}
    >
      <span className={`whitespace-nowrap ${isSelected ? 'font-medium' : ''}`}>{getLabel(status)}</span>
      <span className={`inline-flex items-center justify-center rounded-full w-5 h-5 text-xs mt-1.5 font-medium ${
        isSelected 
          ? 'bg-accent-foreground/5 text-accent-foreground' 
          : 'border border-input text-muted-foreground'
      }`}>
        {count}
      </span>
    </button>
  )
} 