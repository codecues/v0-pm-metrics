import type { Metadata } from "next"
import { ProjectMetricsOverview } from "@/components/project-metrics-overview"
import { ProjectsTable } from "@/components/projects-table"
import { ProjectsFilter } from "@/components/projects-filter"
import { getProjects } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Project Metrics Dashboard",
  description: "Monitor and analyze your project performance metrics",
}

export default async function Page() {
  const projects = await getProjects()

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Project Metrics Dashboard</h1>
          <div className="flex items-center gap-2">
            <ProjectsFilter />
            <Link href="/projects/new">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Project
              </Button>
            </Link>
          </div>
        </div>
        <ProjectMetricsOverview projects={projects} />
        <div className="rounded-lg border shadow-sm">
          <ProjectsTable projects={projects} />
        </div>
      </main>
    </div>
  )
}
