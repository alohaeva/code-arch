import { UserRepositoryInterface } from "../interfaces/UserRepositoryInterface";
import { ProjectRepositoryInterface } from "../interfaces/ProjectRepositoryInterface";
import {IProjectFactory} from "../interfaces/ProjectFactoryInterface";
import {IProjectValidator} from "../interfaces/ProjectValidatorInterface";

export class CreateProjectUseCase {
  constructor(
      private projectFactory: IProjectFactory,
      private projectValidator: IProjectValidator,
      private userRepository: UserRepositoryInterface,
      private projectRepository: ProjectRepositoryInterface
  ) {}

  async execute(userId: string, projectId: string, name: string, description: string): Promise<void> {
    console.log(`[CreateProjectUseCase] Request to create project with name: ${name}`);

    // Step 1: Validate input data
    this.projectValidator.validate(name, description);

    // Step 2: Find the owner User
    const owner = await this.userRepository.findUserById(userId);
    if (!owner) {
      throw new Error(`User with ID ${userId} not found`);
    }

    // Step 3: Create the Project entity
    const project = this.projectFactory.create(projectId, name, description, owner);

    // Step 4: Save the project in the repository
    await this.projectRepository.addProject(project);

    console.log(`[CreateProjectUseCase] Project created and persisted.`);
  }
}