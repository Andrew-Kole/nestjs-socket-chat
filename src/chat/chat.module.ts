import {Module} from "@nestjs/common";
import {ChatGateway} from "./chat.gateway";
import {ChatService} from "./chat.service";
import {ChatConfigService} from "../common/config/chat.config";

@Module({
    providers: [ChatGateway, ChatService, ChatConfigService],
})
export class ChatModule{}