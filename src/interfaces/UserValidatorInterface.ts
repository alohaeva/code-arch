export interface IUserValidator {
    validate(name: string, email: string, role: string): void;
}