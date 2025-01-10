import { User } from "../entities/UserEntity";
import {Project} from "../entities/ProjectEntity";

export interface UserRepositoryInterface {
    addUser(data: User): Promise<void>;
    addProjectToUser(userId: string, project: Project): Promise<void>;
    findUserById(id: string): Promise<User | null>;
    findAllUsers(): Promise<User[]>;
}