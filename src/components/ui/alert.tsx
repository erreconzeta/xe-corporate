import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { Button } from "./button"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: 
          "border-green-500/50 text-green-700 bg-green-50 dark:border-green-500 [&>svg]:text-green-600",
        warning:
          "border-yellow-500/50 text-yellow-700 bg-yellow-50 dark:border-yellow-500 [&>svg]:text-yellow-600",
        info:
          "border-blue-500/50 text-blue-700 bg-blue-50 dark:border-blue-500 [&>svg]:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

type AlertWithCloseProps = React.HTMLAttributes<HTMLDivElement> & 
  VariantProps<typeof alertVariants> & {
    onClose?: () => void
  }

const AlertWithClose = React.forwardRef<HTMLDivElement, AlertWithCloseProps>(
  ({ className, variant, onClose, children, ...props }, ref) => (
    <Alert 
      ref={ref} 
      variant={variant} 
      className={cn("transition-all duration-300 ease-in-out", className)} 
      {...props}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">{children}</div>
        {onClose && (
          <Button variant="ghost" size="icon" className="h-6 w-6 -mr-2" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Alert>
  )
)
AlertWithClose.displayName = "AlertWithClose"

export { Alert, AlertTitle, AlertDescription, AlertWithClose } 