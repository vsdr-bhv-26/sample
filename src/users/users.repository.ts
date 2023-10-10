import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, ObjectId } from "mongoose";

import { User, UserDocument } from "./schemas/user.schema";

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) public userModel: Model<UserDocument>) {}

    async findOne(id: ObjectId): Promise<User> {
        return await this.userModel.findById(id);
    }

    async find(usersFilterQuery: FilterQuery<User>): Promise<User[]> {
        return await this.userModel.find(usersFilterQuery)
    }

    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save()
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
        return await this.userModel.findOneAndUpdate(userFilterQuery, user, { new: true });
    }

    async findOneandDelete(dbid: ObjectId): Promise<User> {
        return await this.userModel.findByIdAndDelete(dbid);
    }
}