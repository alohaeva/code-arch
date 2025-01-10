import {IUserValidator} from "../interfaces/UserValidatorInterface";

export class UserValidationService implements IUserValidator {
  validate(name: string, email: string, role: string): void {
    console.log(`[UserValidationService] Validating user with name: ${name}`);

    if (!name || name.trim().length === 0) {
      throw new Error("User name must not be empty.");
    }

    if (!email || !email.includes("@")) {
      throw new Error("Invalid email address.");
    }

    const validRoles = ["admin", "user"];
    if (!validRoles.includes(role)) {
      throw new Error(`Invalid role. Allowed roles are: ${validRoles.join(", ")}`);
    }

    console.log(`[UserValidationService] Validation successful for user: ${name}`);
  }
}