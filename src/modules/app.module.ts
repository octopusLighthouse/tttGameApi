import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { GameService } from '../services/game.service';
import { RedisService } from '../services/redis.service';
//import { Transport, ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    RedisService,
    GameService,
  ],
})
export class AppModule {}
