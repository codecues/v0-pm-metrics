"use client"

import { useEffect, useState } from "react"
import { Bar, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from "chart.js"
import type { Project } from "@/lib/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend)

interface ProjectMetricsChartProps {
  projects: Project[]
  chartType: "completion" | "performance" | "timeline"
}

export function ProjectMetricsChart({ projects, chartType }: ProjectMetricsChartProps) {
  const [chartData, setChartData] = useState<ChartData<"bar" | "line">>({
    datasets: [],
  })
  const [chartOptions, setChartOptions] = useState<ChartOptions>({})
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      if (!projects || projects.length === 0) {
        setError("No project data available")
        return
      }

      const labels = projects.map((project) => project.name)

      if (chartType === "completion") {
        setChartData({
          labels,
          datasets: [
            {
              label: "Completion (%)",
              data: projects.map((project) => project.completion),
              backgroundColor: "rgba(59, 130, 246, 0.5)",
              borderColor: "rgb(59, 130, 246)",
              borderWidth: 1,
            },
          ],
        })

        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Project Completion Rates",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: "Completion (%)",
              },
            },
          },
        })
      } else if (chartType === "performance") {
        setChartData({
          labels,
          datasets: [
            {
              type: "bar" as const,
              label: "Budget Utilization (%)",
              data: projects.map((project) => project.budgetUtilization),
              backgroundColor: "rgba(34, 197, 94, 0.5)",
              borderColor: "rgb(34, 197, 94)",
              borderWidth: 1,
            },
            {
              type: "line" as const,
              label: "Team Performance Score",
              data: projects.map((project) => project.teamPerformance),
              backgroundColor: "rgba(249, 115, 22, 0.5)",
              borderColor: "rgb(249, 115, 22)",
              borderWidth: 2,
              tension: 0.2,
            },
          ],
        })

        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Project Performance Metrics",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: "Score",
              },
            },
          },
        })
      } else if (chartType === "timeline") {
        setChartData({
          labels,
          datasets: [
            {
              label: "Planned Duration (days)",
              data: projects.map((project) => project.plannedDuration),
              backgroundColor: "rgba(99, 102, 241, 0.5)",
              borderColor: "rgb(99, 102, 241)",
              borderWidth: 1,
            },
            {
              label: "Actual Duration (days)",
              data: projects.map((project) => project.actualDuration || project.plannedDuration),
              backgroundColor: "rgba(244, 63, 94, 0.5)",
              borderColor: "rgb(244, 63, 94)",
              borderWidth: 1,
            },
          ],
        })

        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "Project Timeline Analysis",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Duration (days)",
              },
            },
          },
        })
      }

      setError(null)
    } catch (err) {
      setError("Error generating chart data")
      console.error("Chart error:", err)
    }
  }, [projects, chartType])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      {chartType === "completion" ? (
        <Bar options={chartOptions} data={chartData} />
      ) : (
        <Line options={chartOptions} data={chartData} />
      )}
    </div>
  )
}
