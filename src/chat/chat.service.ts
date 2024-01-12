import {Injectable} from "@nestjs/common";
import {UserService} from "./user.service";
import {MessageService} from "./message.service";

@Injectable()
export class ChatService {
    constructor(
        private readonly userService: UserService,
        private readonly messageService: MessageService,
    ) {}

    getUsers(): {[socketId: string]: string} {
        return this.userService.getUsers();
    }

    saveUsers(users: {[socketId: string]: string}) {
        this.userService.saveUsers(users);
    }

    getUserMessages (socketId: string): any[] {
        return this.messageService.getMessages(socketId);
    }

    saveUserMessages(socketId: string, messages: any[]): void {
        this.messageService.saveMessages(socketId, messages);
    }

    getUserNickname(socketId: string){
        return this.userService.getUsers()[socketId];
    }
}