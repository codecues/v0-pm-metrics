"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MoreHorizontal, ExternalLink, FileEdit, Trash2 } from "lucide-react"
import type { Project } from "@/lib/types"

interface ProjectsTableProps {
  projects: Project[]
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof Project>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSort = (column: keyof Project) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedProjects = [...projects].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
            Completed
          </Badge>
        )
      case "in-progress":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            In Progress
          </Badge>
        )
      case "at-risk":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
            At Risk
          </Badge>
        )
      case "on-hold":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            On Hold
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
            Project Name
            {sortColumn === "name" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
            Status
            {sortColumn === "status" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("completion")}>
            Completion
            {sortColumn === "completion" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("teamPerformance")}>
            Team Performance
            {sortColumn === "teamPerformance" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
          </TableHead>
          <TableHead className="cursor-pointer" onClick={() => handleSort("budgetUtilization")}>
            Budget Utilization
            {sortColumn === "budgetUtilization" && <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>}
          </TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedProjects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="font-medium">{project.name}</TableCell>
            <TableCell>{getStatusBadge(project.status)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress value={project.completion} className="h-2 w-[60px]" />
                <span className="text-xs">{project.completion}%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress
                  value={project.teamPerformance}
                  className={`h-2 w-[60px] ${
                    project.teamPerformance < 50
                      ? "bg-red-200 [&>div]:bg-red-500"
                      : project.teamPerformance < 75
                        ? "bg-yellow-200 [&>div]:bg-yellow-500"
                        : "bg-green-200 [&>div]:bg-green-500"
                  }`}
                />
                <span className="text-xs">{project.teamPerformance}/100</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress
                  value={project.budgetUtilization}
                  className={`h-2 w-[60px] ${
                    project.budgetUtilization > 100
                      ? "bg-red-200 [&>div]:bg-red-500"
                      : project.budgetUtilization > 90
                        ? "bg-yellow-200 [&>div]:bg-yellow-500"
                        : "bg-green-200 [&>div]:bg-green-500"
                  }`}
                />
                <span className="text-xs">{project.budgetUtilization}%</span>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <FileEdit className="mr-2 h-4 w-4" />
                    Edit Project
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
