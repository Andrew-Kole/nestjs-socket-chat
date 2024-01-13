import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ChatConfigService {
    constructor(
        private configService: ConfigService,
    ) {}

    get userPath() {
        return this.configService.get('USERS_PATH');
    }

    get messagesPath() {
        return this.configService.get('MESSAGES_PATH');
    }
}