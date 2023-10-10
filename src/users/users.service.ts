import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./schemas/user.schema";
import { UsersRepository } from "./users.repository";
import { ObjectId } from "mongoose";


@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUserById(id:ObjectId): Promise<User> {
        return await this.usersRepository.findOne( id)
    }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({});
    }

    async createUser(email: string, age: number): Promise<User> {
        return this.usersRepository.create({
            userId: uuidv4(),
            email,
            age,
            favoriteFoods: []
        })
    }

    async updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User> {
        return await this.usersRepository.findOneAndUpdate({ userId }, userUpdates);
    }

    async deleteUser(id:ObjectId):Promise<User>{
        return await this.usersRepository.findOneandDelete(id);
    }
}