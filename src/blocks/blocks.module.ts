import { Module } from '@nestjs/common'
import { BlocksController } from './blocks.controller'
import { BlocksService } from './blocks.service'

@Module({
  providers: [BlocksService],
  controllers: [BlocksController],
})
export class BlocksModule {}
