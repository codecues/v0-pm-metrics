"use server"

import { revalidatePath } from "next/cache"
import type { Project } from "./types"
import { getProjects } from "./data"

// Mock database operations with in-memory storage
let projectsData: Project[] = []

// Initialize with data from data.ts
const initializeData = async () => {
  if (projectsData.length === 0) {
    projectsData = await getProjects()
  }
}

export async function createProject(projectData: Omit<Project, "id">): Promise<Project> {
  await initializeData()

  // Generate a new ID
  const id = Math.max(0, ...projectsData.map((p) => Number.parseInt(p.id))) + 1

  const newProject: Project = {
    id: id.toString(),
    ...projectData,
  }

  projectsData.push(newProject)
  revalidatePath("/")

  return newProject
}

export async function updateProject(projectData: Project): Promise<Project> {
  await initializeData()

  const index = projectsData.findIndex((p) => p.id === projectData.id)

  if (index === -1) {
    throw new Error(`Project with ID ${projectData.id} not found`)
  }

  projectsData[index] = projectData
  revalidatePath("/")

  return projectData
}

export async function deleteProject(id: string): Promise<void> {
  await initializeData()

  const index = projectsData.findIndex((p) => p.id === id)

  if (index === -1) {
    throw new Error(`Project with ID ${id} not found`)
  }

  projectsData.splice(index, 1)
  revalidatePath("/")
}
