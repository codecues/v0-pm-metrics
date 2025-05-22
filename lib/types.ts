export interface Project {
  id: string
  name: string
  description: string
  status: "completed" | "in-progress" | "at-risk" | "on-hold"
  completion: number
  teamPerformance: number
  budgetUtilization: number
  plannedDuration: number
  actualDuration?: number
  startDate: string
  endDate?: string
}
