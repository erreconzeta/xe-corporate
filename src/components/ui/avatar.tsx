import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "primary" | "secondary" | "outline"
  countryCode?: string
  showFlag?: boolean
}

const sizeClasses = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base",
  xl: "h-12 w-12 text-lg"
}

const flagSizeClasses = {
  sm: "w-3 h-3 -bottom-0.5 -right-0.5",
  md: "w-4 h-4 -bottom-1 -right-1",
  lg: "w-5 h-5 -bottom-1 -right-1",
  xl: "w-6 h-6 -bottom-1 -right-1"
}

const variantClasses = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-muted text-muted-foreground",
  outline: "bg-background text-foreground border border-input"
}

export function Avatar({ 
  initials, 
  size = "md",
  variant = "secondary",
  countryCode,
  showFlag = false,
  className,
  ...props 
}: AvatarProps) {
  return (
    <div className="relative inline-flex w-[2.75rem]">
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-medium",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {initials}
      </div>
      {showFlag && countryCode && (
        <div className={cn(
          "absolute rounded-full overflow-hidden border-2 border-background",
          flagSizeClasses[size]
        )}>
          <img 
            src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
            alt={`${countryCode} flag`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  )
} 