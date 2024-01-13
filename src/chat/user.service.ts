import {ChatConfigService} from "../common/config/chat.config";
import * as path from 'path';
import {Injectable} from "@nestjs/common";
import {DataLayer} from "../common/utils/data-layer";
import {User} from "./types/user.type";

@Injectable()
export class UserService {
    constructor(
        private readonly chatConfigService: ChatConfigService
    ) {}

    private userPath = path.join(__dirname, this.chatConfigService.userPath);

    getUsers(): User {
        return DataLayer.readData<User>(this.userPath);
    }

    saveUsers(users: User) {
        DataLayer.writeData(this.userPath, users);
    }
}