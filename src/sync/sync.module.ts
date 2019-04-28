import { Module } from '@nestjs/common'
import { SyncService } from './sync.service'
import { SyncController } from './sync.controller'
import { BlocksService } from '../blocks/blocks.service'
import { ConfigModule } from './../config/config.module'

@Module({
  providers: [SyncService, BlocksService],
  controllers: [SyncController],
  imports: [ConfigModule],
})
export class SyncModule {}
