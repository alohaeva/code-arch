import { UserRepository } from "../repositories/UserRepository";
import { ProjectRepository } from "../repositories/ProjectRepository";
import { CloudFlareService } from "../externalServices/CloudFlareService";
import { NotificationService } from "../businessLogic/NotificationService";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { CreateProjectUseCase } from "../useCases/CreateProjectUseCase";
import { GetProjectsOfUserUseCase } from "../useCases/GetProjectsOfUserUseCase";
import {PurgeCacheAndNotifyUsersUseCase} from "../useCases/PurgeCacheAndNotifyUsersUseCase";
import {UserFactory} from "../factories/UserFactory";
import {ProjectFactory} from "../factories/ProjectFactory";
import {UserValidationService} from "../validators/UserValidationService";
import {ProjectValidationService} from "../validators/ProjectValidationService";
import {ProjectApprovalService} from "../domain/ProjectApprovalService";
import {ApproveProjectUseCase} from "../useCases/ApproveProjectUseCase";
import {NotifyProjectOwnerUseCase} from "../useCases/NotifyProjectOwnerUseCase";

const projectRepo = new ProjectRepository();
const notificationService = new NotificationService();

export const DIContainer = {
  repositories: {
    userRepository: new UserRepository(),
    projectRepository: projectRepo,
  },
  factories: {
    userFactory: new UserFactory(),
    projectFactory: new ProjectFactory(),
  },
  validators: {
    userValidator: new UserValidationService(),
    projectValidator: new ProjectValidationService(),
  },
  externalServices: {
    cacheService: new CloudFlareService(),
    notificationService,
  },
  businessLogic: {
    projectApprovalService: new ProjectApprovalService(
        projectRepo,
        notificationService
    ),
  },
  useCases: {
    purgeCacheAndNotifyUsersUseCase: (): PurgeCacheAndNotifyUsersUseCase => {
      return new PurgeCacheAndNotifyUsersUseCase(
          DIContainer.externalServices.cacheService,
          DIContainer.repositories.userRepository,
          DIContainer.externalServices.notificationService
      );
    },
    createUserUseCase: (): CreateUserUseCase => {
      return new CreateUserUseCase(
          DIContainer.factories.userFactory,
          DIContainer.validators.userValidator,
          DIContainer.repositories.userRepository
      );
    },
    createProjectUseCase: (): CreateProjectUseCase => {
      return new CreateProjectUseCase(
          DIContainer.factories.projectFactory,
          DIContainer.validators.projectValidator,
          DIContainer.repositories.userRepository,
          DIContainer.repositories.projectRepository
      );
    },
    getProjectsOfUserUseCase: (): GetProjectsOfUserUseCase => {
      return new GetProjectsOfUserUseCase(DIContainer.repositories.projectRepository);
    },
    approveProjectUseCase: (): ApproveProjectUseCase => {
      return new ApproveProjectUseCase(
          DIContainer.repositories.projectRepository,
          DIContainer.repositories.userRepository,
          DIContainer.businessLogic.projectApprovalService
      );
    },
    notifyProjectOwnerUseCase: (): NotifyProjectOwnerUseCase => {
      return new NotifyProjectOwnerUseCase(
          DIContainer.repositories.projectRepository,
          DIContainer.repositories.userRepository,
          DIContainer.businessLogic.projectApprovalService
      );
    }
  },
};