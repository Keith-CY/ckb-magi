import { Injectable } from '@nestjs/common'
import { SyncService } from '../sync/sync.service'

@Injectable()
export class BlocksService {
  constructor(private readonly syncService: SyncService) {
    this.syncService.blocks$.subscribe(console.log)
  }

  findAll() {}

  create(block) {}
}
