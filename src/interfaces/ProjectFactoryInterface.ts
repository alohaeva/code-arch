import {User} from "../entities/UserEntity";
import {Project} from "../entities/ProjectEntity";

export interface IProjectFactory {
    create(id: string, name: string, description: string, owner: User): Project;
}