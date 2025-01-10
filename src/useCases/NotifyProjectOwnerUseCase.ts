import { ProjectApprovalService } from "../domain/ProjectApprovalService";
import { ProjectRepositoryInterface } from "../interfaces/ProjectRepositoryInterface";
import { UserRepositoryInterface } from "../interfaces/UserRepositoryInterface";

export class NotifyProjectOwnerUseCase {
    constructor(
        private projectRepository: ProjectRepositoryInterface,
        private userRepository: UserRepositoryInterface,
        private projectApprovalService: ProjectApprovalService
    ) {}

    async execute(projectId: string): Promise<void> {
        console.log(`[NotifyProjectOwnerUseCase] Notifying owner for project ID: ${projectId}`);

        // Step 1: Fetch the project
        const project = await this.projectRepository.findProjectById(projectId);
        if (!project) {
            throw new Error(`Project with ID ${projectId} not found.`);
        }

        // Step 2: Fetch the owner of the project
        const owner = await this.userRepository.findUserById(project.owner.id);
        if (!owner) {
            throw new Error(`Owner with ID ${project.owner.id} not found.`);
        }

        // Step 3: Notify the owner directly
        await this.projectApprovalService.notifyOwner(project, owner);

        console.log(`[NotifyProjectOwnerUseCase] Owner notification completed.`);
    }
}