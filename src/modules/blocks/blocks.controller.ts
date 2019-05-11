import { CreateBlockDto } from './create-block.dto'
import { Block } from './block.interface'
import { BlocksService } from './blocks.service'
import { Controller, Get, Post, Body } from '@nestjs/common'

@Controller('blocks')
export class BlocksController {
  constructor(private readonly blockService: BlocksService) {}

  @Get()
  async findAll() {
    return this.blockService.findAll()
  }

  @Post()
  async create(@Body() createBlockDto: CreateBlockDto) {
    return this.blockService.create(createBlockDto)
  }
}
