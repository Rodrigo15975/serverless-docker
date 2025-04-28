import { Body, Controller, Post } from '@nestjs/common'
import { BotService } from './bot.service'
import { CreateBotDto } from './dto/create-bot.dto'

@Controller('bot')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Post()
  create(@Body() createBotDto: CreateBotDto) {
    return this.botService.create(createBotDto)
  }
}
