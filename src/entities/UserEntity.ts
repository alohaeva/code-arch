import { Project } from "./ProjectEntity";

export class User {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public role: string,
        public projects: Project[] = [] // A user owns multiple projects
    ) {}
}