import { Project } from "../entities/ProjectEntity";
import { User } from "../entities/UserEntity";
import { ProjectRepositoryInterface } from "../interfaces/ProjectRepositoryInterface";
import {NotificationServiceInterface} from "../interfaces/NotificationServiceInterface"; // Example notification service

export class ProjectApprovalService {
    constructor(
        private projectRepository: ProjectRepositoryInterface,
        private notificationService: NotificationServiceInterface
    ) {}

    /**
     * Step 1: Validate a project for approval.
     */
    public async validateForApproval(project: Project): Promise<void> {
        console.log(`[ProjectApprovalService] Validating project ${project.name} for approval.`);

        if (project.status !== "pending") {
            throw new Error("Only projects with status 'pending' can be approved.");
        }

        if (project.description.length < 10) {
            throw new Error("Project description must be at least 10 characters long to be approved.");
        }

        console.log(`[ProjectApprovalService] Project ${project.name} validated for approval.`);
    }

    /**
     * Step 2: Mark a project as approved.
     */
    public async markAsApproved(project: Project): Promise<void> {
        console.log(`[ProjectApprovalService] Marking project ${project.name} as approved.`);

        project.status = "approved";
        await this.projectRepository.updateProject(project);

        console.log(`[ProjectApprovalService] Project ${project.name} marked as approved.`);
    }

    /**
     * Step 3: Notify the project owner about approval.
     */
    public async notifyOwner(project: Project, owner: User): Promise<void> {
        console.log(`[ProjectApprovalService] Notifying owner ${owner.name} about project approval.`);

        const message = `Dear ${owner.name}, your project "${project.name}" has been approved.`;
        await this.notificationService.notifyUser(owner.email, message);

        console.log(`[ProjectApprovalService] Owner ${owner.name} notified.`);
    }

    /**
     * Composite Action: Approve and notify the project owner.
     */
    public async approveAndNotify(project: Project, owner: User): Promise<void> {
        console.log(`[ProjectApprovalService] Starting full approval workflow for project ${project.name}...`);

        await this.validateForApproval(project);
        await this.markAsApproved(project);
        await this.notifyOwner(project, owner);

        console.log(`[ProjectApprovalService] Full approval workflow completed for project ${project.name}.`);
    }
}