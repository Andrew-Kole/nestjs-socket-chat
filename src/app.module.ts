import { Module } from '@nestjs/common';
import {ChatModule} from "./chat/chat.module";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      ChatModule,
      ConfigModule.forRoot({
          isGlobal: true,
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
