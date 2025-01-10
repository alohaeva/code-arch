import { UserRepositoryInterface } from "../interfaces/UserRepositoryInterface";
import {IUserFactory} from "../interfaces/UserFactoryInterface";
import {IUserValidator} from "../interfaces/UserValidatorInterface";

export class CreateUserUseCase {
  constructor(
      private userFactory: IUserFactory,
      private userValidator: IUserValidator,
      private userRepository: UserRepositoryInterface) {}

  async execute(id: string, name: string, email: string, role: string): Promise<void> {
    console.log(`[CreateUserUseCase] Request to create user with name: ${name}`);

    // Step 1: Validate input data
    this.userValidator.validate(name, email, role);

    // Step 2: Create the User entity
    const user = this.userFactory.create(id, name, email, role);

    // Step 3: Save the user in the repository
    await this.userRepository.addUser(user);

    console.log(`[CreateUserUseCase] User created and persisted.`);
  }
}