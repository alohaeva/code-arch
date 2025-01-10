import { ProjectApprovalService } from "../domain/ProjectApprovalService";
import { ProjectRepositoryInterface } from "../interfaces/ProjectRepositoryInterface";
import { UserRepositoryInterface } from "../interfaces/UserRepositoryInterface";

export class ApproveProjectUseCase {
    constructor(
        private projectRepository: ProjectRepositoryInterface,
        private userRepository: UserRepositoryInterface,
        private projectApprovalService: ProjectApprovalService
    ) {}

    async execute(projectId: string): Promise<void> {
        console.log(`[ApproveProjectUseCase] Handling project approval for project ID: ${projectId}`);

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

        // Step 3: Approve and notify
        await this.projectApprovalService.approveAndNotify(project, owner);

        console.log(`[ApproveProjectUseCase] Project approval and notification completed.`);
    }
}