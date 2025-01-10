import {User} from "../entities/UserEntity";

export interface IUserFactory {
    create(id: string, name: string, email: string, role: string): User;
}