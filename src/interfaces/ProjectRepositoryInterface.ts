import { Project } from "../entities/ProjectEntity";

export interface ProjectRepositoryInterface {
  addProject(project: Project): Promise<void>;
  updateProject(project: Project): Promise<void>;
  findProjectById(id: string): Promise<Project | null>;
  findProjectsByUserId(userId: string): Promise<Project[]>;
}