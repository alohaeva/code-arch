import {IProjectValidator} from "../interfaces/ProjectValidatorInterface";

export class ProjectValidationService implements IProjectValidator {
  validate(name: string, description: string): void {
    console.log(`[ProjectValidationService] Validating project with name: ${name}`);

    if (!name || name.trim().length === 0) {
      throw new Error("Project name must not be empty.");
    }

    if (description.length > 500) {
      throw new Error("Project description must be less than 500 characters.");
    }

    console.log(`[ProjectValidationService] Validation successful for project: ${name}`);
  }
}