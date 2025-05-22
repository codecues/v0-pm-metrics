import type { Project } from "./types"

// Mock data for projects
const projectsData: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with new branding",
    status: "completed",
    completion: 100,
    teamPerformance: 92,
    budgetUtilization: 95,
    plannedDuration: 60,
    actualDuration: 65,
    startDate: "2023-01-15",
    endDate: "2023-03-20",
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Creating a new mobile app for customer engagement",
    status: "in-progress",
    completion: 65,
    teamPerformance: 78,
    budgetUtilization: 70,
    plannedDuration: 90,
    startDate: "2023-02-10",
  },
  {
    id: "3",
    name: "CRM Integration",
    description: "Integrating our systems with the new CRM platform",
    status: "at-risk",
    completion: 30,
    teamPerformance: 45,
    budgetUtilization: 110,
    plannedDuration: 45,
    startDate: "2023-03-01",
  },
  {
    id: "4",
    name: "Data Migration",
    description: "Migrating data from legacy systems to new cloud platform",
    status: "on-hold",
    completion: 20,
    teamPerformance: 60,
    budgetUtilization: 25,
    plannedDuration: 30,
    startDate: "2023-04-15",
  },
  {
    id: "5",
    name: "Security Audit",
    description: "Comprehensive security audit of all systems",
    status: "completed",
    completion: 100,
    teamPerformance: 88,
    budgetUtilization: 85,
    plannedDuration: 20,
    actualDuration: 18,
    startDate: "2023-05-01",
    endDate: "2023-05-19",
  },
  {
    id: "6",
    name: "E-commerce Platform",
    description: "Building a new e-commerce platform for online sales",
    status: "in-progress",
    completion: 75,
    teamPerformance: 82,
    budgetUtilization: 80,
    plannedDuration: 120,
    startDate: "2023-01-10",
  },
  {
    id: "7",
    name: "AI Chatbot",
    description: "Developing an AI-powered chatbot for customer support",
    status: "in-progress",
    completion: 40,
    teamPerformance: 75,
    budgetUtilization: 60,
    plannedDuration: 60,
    startDate: "2023-04-01",
  },
  {
    id: "8",
    name: "Analytics Dashboard",
    description: "Creating a real-time analytics dashboard for business metrics",
    status: "at-risk",
    completion: 50,
    teamPerformance: 65,
    budgetUtilization: 120,
    plannedDuration: 45,
    startDate: "2023-03-15",
  },
]

// Function to simulate fetching projects from an API
export async function getProjects(): Promise<Project[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return projectsData
}

// Function to get a single project by ID
export async function getProject(id: string): Promise<Project | undefined> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  return projectsData.find((project) => project.id === id)
}
