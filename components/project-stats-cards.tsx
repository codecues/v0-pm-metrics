import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, AlertTriangle, Clock, BarChart3, TrendingUp } from "lucide-react"

interface ProjectStatsCardsProps {
  totalProjects: number
  completedProjects: number
  inProgressProjects: number
  atRiskProjects: number
  averageCompletion: number
}

export function ProjectStatsCards({
  totalProjects,
  completedProjects,
  inProgressProjects,
  atRiskProjects,
  averageCompletion,
}: ProjectStatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProjects}</div>
          <p className="text-xs text-muted-foreground">Active and completed projects</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedProjects}</div>
          <p className="text-xs text-muted-foreground">
            {((completedProjects / totalProjects) * 100).toFixed(1)}% of total projects
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressProjects}</div>
          <p className="text-xs text-muted-foreground">
            {((inProgressProjects / totalProjects) * 100).toFixed(1)}% of total projects
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">At Risk</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{atRiskProjects}</div>
          <p className="text-xs text-muted-foreground">
            {((atRiskProjects / totalProjects) * 100).toFixed(1)}% of total projects
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg. Completion</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{averageCompletion.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">Across all projects</p>
        </CardContent>
      </Card>
    </div>
  )
}
