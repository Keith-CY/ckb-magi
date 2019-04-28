import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BlocksModule } from './blocks/blocks.module'
import { SyncModule } from './sync/sync.module'
import { ConfigModule } from './config/config.module'

@Module({
  imports: [BlocksModule, SyncModule, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
