import { User } from "../entities/UserEntity";
import { UserRepositoryInterface } from "../interfaces/UserRepositoryInterface";
import {Project} from "../entities/ProjectEntity";

export class UserRepository implements UserRepositoryInterface {
    private users: User[] = [];

    async addUser(user: User): Promise<void> {
        // Create the User within the repository
        this.users.push(user);

        console.log(`[UserRepository] User saved:`, user);
    }

    async addProjectToUser(userId: string, project: Project) {
        const user = this.users.find(user => user.id === userId);

        user.projects.push(project);
    }

    async findUserById(id: string): Promise<User | null> {
        return this.users.find((user) => user.id === id) || null;
    }

    async findAllUsers(): Promise<User[]> {
        return this.users;
    }
}