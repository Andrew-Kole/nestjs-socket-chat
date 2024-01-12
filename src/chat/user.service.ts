import {ChatConfigService} from "../common/config/chat.config";
import * as path from 'path';
import {Injectable} from "@nestjs/common";
import {DataLayer} from "../common/utils/data-layer";

@Injectable()
export class UserService {
    constructor(
        private readonly chatConfigService: ChatConfigService
    ) {}

    private userPath = path.join(__dirname, this.chatConfigService.userPath);

    getUsers(): {[socketId: string]: string} {
        return DataLayer.readData(this.userPath);
    }

    saveUsers(users: {[socketId: string]: string}) {
        DataLayer.writeData(this.userPath, users);
    }
}