import {Injectable} from "@nestjs/common";
import * as path from 'path';
import {ChatConfigService} from "../common/config/chat.config";
import {DataLayer} from "../common/utils/data-layer";
import {Message} from "./types/message.type";

@Injectable()
export class MessageService {
    constructor(
        private readonly chatConfigService: ChatConfigService
    ) {}

    private messagesPath = path.join(__dirname, this.chatConfigService.messagesPath);

    getMessages(sockeId: string): Message [] {
        const userMessagesPath = path.join(this.messagesPath, `${sockeId}.json`);
        return DataLayer.readData<Message []>(userMessagesPath);
    }

    saveMessages(socketId: string, messages: Message []) {
        const userMessagesPath = path.join(this.messagesPath, `${socketId}.json`);
        DataLayer.writeData(userMessagesPath, messages);
    }
}