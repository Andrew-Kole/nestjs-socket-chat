import {Injectable} from "@nestjs/common";
import {UserService} from "./user.service";
import {MessageService} from "./message.service";
import {Message} from "./types/message.type";
import {User} from "./types/user.type";

@Injectable()
export class ChatService {
    constructor(
        private readonly userService: UserService,
        private readonly messageService: MessageService,
    ) {}

    getUsers(): User {
        return this.userService.getUsers();
    }

    saveUsers(users: User) {
        this.userService.saveUsers(users);
    }

    getUserMessages (socketId: string): Message[] {
        return this.messageService.getMessages(socketId);
    }

    saveUserMessages(socketId: string, messages: Message[]): void {
        this.messageService.saveMessages(socketId, messages);
    }

    getUserNickname(socketId: string){
        return this.userService.getUsers()[socketId];
    }
}