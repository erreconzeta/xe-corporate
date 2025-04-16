import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select"
import { Link } from "react-router-dom"

const buttonVariants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const
const buttonSizes = ["default", "sm", "lg", "icon"] as const
const badgeVariants = ["default", "secondary", "destructive", "outline"] as const
const badgeSizes = ["sm", "default", "lg"] as const

export function ComponentsLibrary() {
  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link to="/">
            <Button variant="ghost">Back to Main page</Button>
          </Link>
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-8">Components Library</h1>
        
        <div className="space-y-8">
          {/* Buttons Card */}
          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Button Combinations</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Variant</th>
                    {buttonSizes.map((size) => (
                      <th key={size} className="text-left p-2">
                        {size}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {buttonVariants.map((variant) => (
                    <tr key={variant} className="border-t">
                      <td className="p-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          variant="{variant}"
                        </code>
                      </td>
                      {buttonSizes.map((size) => (
                        <td key={size} className="p-2">
                          <div className="flex justify-start">
                            <Button variant={variant} size={size}>
                              {size === "icon" ? "🔍" : variant}
                            </Button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Badges Card */}
          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Badge Combinations</h2>
            <div className="text-sm text-muted-foreground mb-4">
              Note: Size variants are custom extensions, not native to shadcn/ui
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Variant</th>
                    {badgeSizes.map((size) => (
                      <th key={size} className="text-left p-2">
                        {size}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {badgeVariants.map((variant) => (
                    <tr key={variant} className="border-t">
                      <td className="p-2">
                        <code className="text-sm bg-muted px-2 py-1 rounded">
                          variant="{variant}"
                        </code>
                      </td>
                      {badgeSizes.map((size) => (
                        <td key={size} className="p-2">
                          <div className="flex justify-start">
                            <Badge variant={variant} size={size}>
                              {variant}
                            </Badge>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inputs Card */}
          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Input Examples</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Default Input</h3>
                <Input type="text" placeholder="Enter your text here" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Disabled Input</h3>
                <Input disabled type="text" placeholder="Disabled input" />
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">With Label</h3>
                <label className="text-sm text-muted-foreground mb-2 block">Email address</label>
                <Input type="email" placeholder="name@example.com" />
              </div>
            </div>
          </div>

          {/* Select Card */}
          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Select Examples</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Default Select</h3>
                <Select>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="grape">Grape</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">With Label</h3>
                <label className="text-sm text-muted-foreground mb-2 block">Choose a country</label>
                <Select>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Disabled Select</h3>
                <Select disabled>
                  <SelectTrigger className="w-[280px]">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option">Option</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Alerts Card */}
          <div className="rounded-lg border p-6 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Alert Examples</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Default Alert</h3>
                <Alert>
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is the default alert style.
                  </AlertDescription>
                </Alert>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Success Alert</h3>
                <Alert variant="success">
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Your transaction has been processed successfully.
                  </AlertDescription>
                </Alert>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Warning Alert</h3>
                <Alert variant="warning">
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Please review your transaction details before proceeding.
                  </AlertDescription>
                </Alert>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Info Alert</h3>
                <Alert variant="info">
                  <AlertTitle>Note</AlertTitle>
                  <AlertDescription>
                    Your transaction is being processed.
                  </AlertDescription>
                </Alert>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Destructive Alert</h3>
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    There was a problem processing your request.
                  </AlertDescription>
                </Alert>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Compact Alert</h3>
                <Alert className="py-2">
                  <AlertTitle>Compact Style</AlertTitle>
                  <AlertDescription>
                    This alert uses custom padding for a more compact look.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 