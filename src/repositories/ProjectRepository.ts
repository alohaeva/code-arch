import { Project } from "../entities/ProjectEntity";
import { ProjectRepositoryInterface } from "../interfaces/ProjectRepositoryInterface";

export class ProjectRepository implements ProjectRepositoryInterface {
  private projects: Project[] = [];

  async addProject(project: Project): Promise<void> {
    // Create the Project within the repository
    this.projects.push(project);
    console.log(`[ProjectRepository] Project saved:`, project);
  }

  async updateProject(newProject: Project): Promise<void> {
    this.projects = this.projects.map((project) => {
      if (project.id === newProject.id) {
        return newProject;
      }

      return project;
    })
  }

  async findProjectById(id: string): Promise<Project | null> {
    return this.projects.find((project) => project.id === id) || null;
  }

  async findProjectsByUserId(userId: string): Promise<Project[]> {
    return this.projects.filter((project) => project.owner.id === userId);
  }
}