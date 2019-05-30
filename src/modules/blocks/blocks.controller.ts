import { BlocksService } from './blocks.service'
import { Controller, Get, Post, Body } from '@nestjs/common'

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blockService: BlocksService) {}

  @Get()
  async findAll() {
    return this.blockService.findAll()
  }
}
