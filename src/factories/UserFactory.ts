import { User } from "../entities/UserEntity";
import {IUserFactory} from "../interfaces/UserFactoryInterface";

export class UserFactory implements IUserFactory {
    create(id: string, name: string, email: string, role: string): User {
        console.log(`[UserFactory] Creating a new User entity with name: ${name}`);

        // Add any default values or derived logic here
        const user = new User(id, name, email, role);

        console.log(`[UserFactory] User entity created:`, user);

        return user;
    }
}