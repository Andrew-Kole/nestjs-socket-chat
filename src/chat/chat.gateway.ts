import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {OnModuleInit} from "@nestjs/common";
import {ChatService} from "./chat.service";

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {

    constructor(
        private readonly chatService: ChatService,
    ) {}

    @WebSocketServer()
    server: Server;

    onModuleInit(): any {
        this.server.on('connection', (socket) => {
            this.handleUserConnection(socket);
        })
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() content: string, @ConnectedSocket() socket: Socket) {
        const nickname = this.chatService.getUserNickname(socket.id);
        const userMessages = this.chatService.getUserMessages(socket.id);
        const messageId = Date.now();
        userMessages.push({ id: messageId, content });
        this.server.emit('onMessage', {
            msg: 'New message',
            user: nickname,
            content: {id: messageId, content},
        });
        this.chatService.saveUserMessages(socket.id, userMessages);
    }

    @SubscribeMessage('editMessage')
    handleEditMessage(
        @MessageBody() editedMessage: {id: number, content: string},
        @ConnectedSocket() socket: Socket,
    ) {
        const nickname = this.chatService.getUserNickname(socket.id);
        const userMessages = this.chatService.getUserMessages(socket.id);
        const editedIndex = userMessages.findIndex((message) => message.id === editedMessage.id);
        if (editedIndex !== -1) {
            userMessages[editedIndex].content = editedMessage.content;
        }
        this.chatService.saveUserMessages(socket.id, userMessages);
        this.server.emit('editedMessage', {
            msg: 'Message edited',
            user: nickname,
            content: {id: editedMessage.id, content: editedMessage.content},
        });
    }

    @SubscribeMessage('deleteMessage')
    handleDeleteMessage(
        @MessageBody() messageId: number,
        @ConnectedSocket() socket: Socket,
    ) {
        const nickname = this.chatService.getUserNickname(socket.id);
        const userMessages = this.chatService.getUserMessages(socket.id);
        const deletedIndex = userMessages.findIndex((message) => message.id === messageId);
        if (deletedIndex !== -1) {
            const deletedMessage = userMessages.splice(deletedIndex, 1)[0];
            this.server.emit('deletedMessage', {
                msg: 'Message deleted',
                user: nickname,
                content: deletedMessage,
            });
            this.chatService.saveUserMessages(socket.id, userMessages);
        }
    }

    private handleUserConnection(socket: Socket) {
        socket.emit('requestNickname');
        socket.on('setNickname', (nickname: string) => {
            const users = this.chatService.getUsers();
            users[socket.id] = nickname;
            socket.emit('welcome', {
                msg: 'Welcome to chat',
                onlineUsers: Object.values(users),
            });
            this.chatService.saveUsers(users);
            this.broadcastUserJoined(nickname);
        })
    }

    private broadcastUserJoined(nickname: string) {
        this.server.emit('userJoined', {
            msg: `${nickname} has joined to chat`,
        })
    }

    handleDisconnect(socket: Socket): void {
        const users = this.chatService.getUsers();
        const nickname = users[socket.id];
        delete users[socket.id];
        this.chatService.saveUsers(users);
        this.server.emit('userLeft', {
            msg: `${nickname} left chat.`
        })
    }
}