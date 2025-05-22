"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Filter } from "lucide-react"

export function ProjectsFilter() {
  const [showCompleted, setShowCompleted] = useState(true)
  const [showInProgress, setShowInProgress] = useState(true)
  const [showAtRisk, setShowAtRisk] = useState(true)
  const [showOnHold, setShowOnHold] = useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem checked={showCompleted} onCheckedChange={setShowCompleted}>
          Completed
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showInProgress} onCheckedChange={setShowInProgress}>
          In Progress
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showAtRisk} onCheckedChange={setShowAtRisk}>
          At Risk
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem checked={showOnHold} onCheckedChange={setShowOnHold}>
          On Hold
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
