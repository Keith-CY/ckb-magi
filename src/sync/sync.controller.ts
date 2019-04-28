import { Controller, Get } from '@nestjs/common'
import { SyncService } from './sync.service'

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get('start')
  start() {
    return this.syncService.start()
  }

  @Get('stop')
  stop() {
    return this.syncService.stop()
  }
}
