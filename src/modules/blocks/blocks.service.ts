import { Injectable } from '@nestjs/common'
import { Block } from './block.interface'
import { SyncService } from '../sync/sync.service'

@Injectable()
export class BlocksService {
  constructor(private readonly syncService: SyncService) {
    this.syncService.blockSubject.subscribe(block => console.log(block))
  }
  private readonly blocks: Block[] = []

  findAll() {
    return this.blocks
  }

  create(block: Block) {
    this.blocks.push(block)
  }
}
