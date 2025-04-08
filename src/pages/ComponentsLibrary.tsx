import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"

const variants = ["default", "destructive", "outline", "secondary", "ghost", "link"] as const
const sizes = ["default", "sm", "lg", "icon"] as const

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
        
        <div className="rounded-lg border p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Button Combinations</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Variant</th>
                  {sizes.map((size) => (
                    <th key={size} className="text-left p-2">
                      {size}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variants.map((variant) => (
                  <tr key={variant} className="border-t">
                    <td className="p-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        variant="{variant}"
                      </code>
                    </td>
                    {sizes.map((size) => (
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
      </div>
    </div>
  )
} 