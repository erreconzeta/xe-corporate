import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { StatusPill } from "@/components/ui/status-pill"
import { FilterPill } from "@/components/ui/filter-pill"

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

        <div className="grid gap-8">
          {/* Avatar Component Card */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Avatar</h2>
            
            {/* Sizes */}
            <div className="space-y-6">
              <div>
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
              <div>
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
            </div>
          </Card>

          {/* StatusPill Component Card */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Status Pill</h2>
            
            {/* Basic Examples */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Basic Examples</h3>
                <div className="flex flex-wrap gap-4">
                  <StatusPill status="pending_approval" />
                  <StatusPill status="action_required" />
                  <StatusPill status="scheduled" />
                  <StatusPill status="in_progress" />
                  <StatusPill status="completed" />
                  <StatusPill status="canceled" />
                </div>
              </div>

              {/* Without Icons */}
              <div>
                <h3 className="text-lg font-medium mb-4">Without Icons</h3>
                <div className="flex flex-wrap gap-4">
                  <StatusPill status="pending_approval" showIcon={false} />
                  <StatusPill status="action_required" showIcon={false} />
                  <StatusPill status="scheduled" showIcon={false} />
                  <StatusPill status="in_progress" showIcon={false} />
                  <StatusPill status="completed" showIcon={false} />
                  <StatusPill status="canceled" showIcon={false} />
                </div>
              </div>

              {/* Examples in Context */}
              <div>
                <h3 className="text-lg font-medium mb-4">Examples in Context</h3>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <StatusPill status="completed" />
                      <div>
                        <div className="font-medium">Payment to John Doe</div>
                        <div className="text-sm text-muted-foreground">Transaction completed successfully</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <StatusPill status="pending_approval" />
                      <div>
                        <div className="font-medium">Transfer to Bank Account</div>
                        <div className="text-sm text-muted-foreground">Awaiting approval from admin</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* FilterPill Component Card */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Filter Pill</h2>
            
            {/* Basic Examples */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Basic Examples</h3>
                <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
                  <FilterPill
                    status="all"
                    count={11}
                    isSelected={true}
                    onClick={() => {}}
                  />
                  <FilterPill
                    status="pending_approval"
                    count={2}
                    isSelected={false}
                    onClick={() => {}}
                  />
                  <FilterPill
                    status="action_required"
                    count={3}
                    isSelected={false}
                    onClick={() => {}}
                  />
                </div>
              </div>

              {/* Selected State */}
              <div>
                <h3 className="text-lg font-medium mb-4">Selected State</h3>
                <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
                  <FilterPill
                    status="completed"
                    count={5}
                    isSelected={true}
                    onClick={() => {}}
                  />
                  <FilterPill
                    status="in_progress"
                    count={4}
                    isSelected={true}
                    onClick={() => {}}
                  />
                  <FilterPill
                    status="canceled"
                    count={1}
                    isSelected={false}
                    onClick={() => {}}
                  />
                </div>
              </div>

              {/* Example in Context */}
              <div>
                <h3 className="text-lg font-medium mb-4">Example in Context</h3>
                <div className="border rounded-lg p-4">
                  <h4 className="text-sm font-medium mb-3">Transaction Filters</h4>
                  <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}>
                    <FilterPill
                      status="all"
                      count={15}
                      isSelected={true}
                      onClick={() => {}}
                    />
                    <FilterPill
                      status="completed"
                      count={8}
                      isSelected={false}
                      onClick={() => {}}
                    />
                    <FilterPill
                      status="pending_approval"
                      count={4}
                      isSelected={false}
                      onClick={() => {}}
                    />
                    <FilterPill
                      status="in_progress"
                      count={3}
                      isSelected={false}
                      onClick={() => {}}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Add more component cards here */}
        </div>
      </div>
    </div>
  )
} 