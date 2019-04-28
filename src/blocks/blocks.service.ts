import { Injectable } from '@nestjs/common'
import { Block } from './block.interface'

@Injectable()
export class BlocksService {
  private readonly blocks: Block[] = []

  findAll() {
    return this.blocks
  }

  create(block: Block) {
    this.blocks.push(block)
  }
}
