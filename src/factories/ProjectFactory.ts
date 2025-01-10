import { Project } from "../entities/ProjectEntity";
import { User } from "../entities/UserEntity";
import {IProjectFactory} from "../interfaces/ProjectFactoryInterface";

export class ProjectFactory implements IProjectFactory {
     create(id: string, name: string, description: string, owner: User): Project {
        console.log(`[ProjectFactory] Creating a new Project entity with name: ${name}`);

        // Add any default values or derived logic here
        const project = new Project(id, name, description, owner);

        console.log(`[ProjectFactory] Project entity created:`, project);

        return project;
    }
}