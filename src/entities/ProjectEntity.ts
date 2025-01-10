import { User } from "./UserEntity";

export class Project {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public status: string,
        public owner: User // The user who owns this project
    ) {}
}