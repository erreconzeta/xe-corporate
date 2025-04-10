import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  initials: string
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "primary" | "secondary"
}

const sizeClasses = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-10 w-10 text-base",
  xl: "h-12 w-12 text-lg"
}

const variantClasses = {
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-muted text-muted-foreground"
}

export function Avatar({ 
  initials, 
  size = "md",
  variant = "secondary",
  className,
  ...props 
}: AvatarProps) {
  return (
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
  )
} 