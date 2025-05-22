"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectMetricsChart } from "@/components/project-metrics-chart"
import { ProjectStatsCards } from "@/components/project-stats-cards"
import type { Project } from "@/lib/types"

interface ProjectMetricsOverviewProps {
  projects: Project[]
}

export function ProjectMetricsOverview({ projects }: ProjectMetricsOverviewProps) {
  // Calculate overall metrics
  const totalProjects = projects.length
  const completedProjects = projects.filter((project) => project.status === "completed").length
  const inProgressProjects = projects.filter((project) => project.status === "in-progress").length
  const atRiskProjects = projects.filter((project) => project.status === "at-risk").length

  const averageCompletion = projects.reduce((acc, project) => acc + project.completion, 0) / totalProjects

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Metrics</CardTitle>
        <CardDescription>Track and analyze your project performance metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 mt-4">
            <ProjectStatsCards
              totalProjects={totalProjects}
              completedProjects={completedProjects}
              inProgressProjects={inProgressProjects}
              atRiskProjects={atRiskProjects}
              averageCompletion={averageCompletion}
            />
            <ProjectMetricsChart projects={projects} chartType="completion" />
          </TabsContent>
          <TabsContent value="performance" className="space-y-4 mt-4">
            <ProjectMetricsChart projects={projects} chartType="performance" />
          </TabsContent>
          <TabsContent value="timeline" className="space-y-4 mt-4">
            <ProjectMetricsChart projects={projects} chartType="timeline" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
