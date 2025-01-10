import { Project } from "../entities/ProjectEntity";
import { ProjectRepositoryInterface } from "../interfaces/ProjectRepositoryInterface";

export class GetProjectsOfUserUseCase {
  constructor(private projectRepository: ProjectRepositoryInterface) {}

  async execute(userId: string): Promise<Project[]> {
    console.log(`[GetProjectsOfUserUseCase] Fetching projects for user ID ${userId}`);
    return await this.projectRepository.findProjectsByUserId(userId);
  }
}