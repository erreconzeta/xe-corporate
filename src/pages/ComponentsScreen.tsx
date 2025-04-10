import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function ComponentsScreen() {
  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <Link to="/">
            <Button variant="ghost">Back to Main page</Button>
          </Link>
        </div>
      </div>

      <div className="p-8 max-w-[960px] mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Components</h1>

        {/* Avatar Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Avatar</h2>
          
          {/* Sizes */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Sizes</h3>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <Avatar initials="SM" size="sm" />
                <span className="text-sm text-muted-foreground">Small</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar initials="MD" size="md" />
                <span className="text-sm text-muted-foreground">Medium</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar initials="LG" size="lg" />
                <span className="text-sm text-muted-foreground">Large</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar initials="XL" size="xl" />
                <span className="text-sm text-muted-foreground">Extra Large</span>
              </div>
            </div>
          </div>

          {/* Variants */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Variants</h3>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-2">
                <Avatar initials="PR" variant="primary" size="lg" />
                <span className="text-sm text-muted-foreground">Primary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar initials="SC" variant="secondary" size="lg" />
                <span className="text-sm text-muted-foreground">Secondary</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar initials="SS" variant="secondary" size="lg" showFlag countryCode="ab" />
                <span className="text-sm text-muted-foreground">With Flag</span>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div>
            <h3 className="text-lg font-medium mb-4">Examples</h3>
            <div className="flex flex-col gap-4">
              {/* User Profile Example */}
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar initials="JD" variant="primary" showFlag countryCode="us" />
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">john.doe@example.com</div>
                  </div>
                </div>
              </div>

              {/* Team Members Example */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">Team Members</h4>
                <div className="flex gap-2">
                  <Avatar initials="AB" variant="primary" size="sm" showFlag countryCode="gb" />
                  <Avatar initials="CD" variant="secondary" size="sm" showFlag countryCode="de" />
                  <Avatar initials="EF" variant="primary" size="sm" showFlag countryCode="fr" />
                  <Avatar initials="GH" variant="secondary" size="sm" showFlag countryCode="it" />
                </div>
              </div>

              {/* Flag Sizes Example */}
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-3">Flag Sizes</h4>
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar initials="SM" size="sm" showFlag countryCode="es" />
                    <span className="text-sm text-muted-foreground">Small</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar initials="MD" size="md" showFlag countryCode="pt" />
                    <span className="text-sm text-muted-foreground">Medium</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar initials="LG" size="lg" showFlag countryCode="nl" />
                    <span className="text-sm text-muted-foreground">Large</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Avatar initials="XL" size="xl" showFlag countryCode="be" />
                    <span className="text-sm text-muted-foreground">Extra Large</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 