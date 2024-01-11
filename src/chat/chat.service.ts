import {Injectable} from "@nestjs/common";
import * as fs from "fs";
import * as path from 'path';
import {ChatConfigService} from "../common/config/chat.config";

@Injectable()
export class ChatService {
    constructor(
        private readonly chatConfigService: ChatConfigService,
    ) {}
    private usersPath = path.join(__dirname, this.chatConfigService.userPath);
    private messagesPath = path.join(__dirname, this.chatConfigService.messagesPath);

    getUsers(): {[socketId: string]: string} {
        try {
            const users = JSON.parse(fs.readFileSync(this.usersPath, 'utf8'));
            return users || {};
        }
        catch (error) {
            return {};
        }
    }

    saveUsers(users: {[socketId: string]: string}) {
        fs.writeFileSync(this.usersPath, JSON.stringify(users), 'utf8');
    }

    getUserMessages (socketId: string): any[] {
        const userMessagesPath = `${this.messagesPath}/${socketId}.json`;
        if(!fs.existsSync(userMessagesPath)){
            return [];
        }
        try {
            return JSON.parse(fs.readFileSync(userMessagesPath, 'utf8')) || [];
        }
        catch(error) {
            return [];
        }
    }

    saveUserMessages(socketId: string, messages: any[]): void {
        const userMessagesPath = `${this.messagesPath}/${socketId}.json`;
        fs.writeFileSync(userMessagesPath, JSON.stringify(messages), 'utf8');
    }

    getUserNickname(socketId: string){
        return this.getUsers()[socketId];
    }
}