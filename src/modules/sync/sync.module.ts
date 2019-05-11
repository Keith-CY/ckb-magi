import { Module, Global } from '@nestjs/common'
import { SyncService } from './sync.service'
import { SyncController } from './sync.controller'
import { ConfigModule } from '../../config/config.module'

@Global()
@Module({
  providers: [SyncService],
  controllers: [SyncController],
  imports: [ConfigModule],
  exports: [SyncService],
})
export class SyncModule {}
