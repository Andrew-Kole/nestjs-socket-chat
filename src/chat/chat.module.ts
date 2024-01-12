import {Module} from "@nestjs/common";
import {ChatGateway} from "./chat.gateway";
import {ChatService} from "./chat.service";
import {ChatConfigService} from "../common/config/chat.config";
import {UserService} from "./user.service";
import {MessageService} from "./message.service";

@Module({
    providers: [ChatGateway, ChatService, ChatConfigService, UserService, MessageService],
})
export class ChatModule{}