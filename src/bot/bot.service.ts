// import { Injectable, Logger } from '@nestjs/common'
// import { CreateBotDto } from './dto/create-bot.dto'
// import { ConfigService } from '@nestjs/config'
// import { gemini, createAgent, StateData, Agent } from '@inngest/agent-kit'
// @Injectable()
// export class BotService {
//   private readonly GEMINI_API_KEY: string
//   private readonly AGENT: Agent<StateData>
//   private readonly logger: Logger = new Logger(BotService.name)
//   constructor(private readonly configService: ConfigService) {
//     this.GEMINI_API_KEY = this.configService.getOrThrow('GEMINI_API_KEY')
//     this.logger.verbose(`GEMINI_API_KEY: ${this.GEMINI_API_KEY}`)
//     this.AGENT = createAgent({
//       name: 'bot',
//       model: gemini({ apiKey: this.GEMINI_API_KEY, model: 'gemini-2.0-flash' }),
//       system: "You're a bot support multilanguage chatbot",
//     })
//   }

//   async create(createBotDto: CreateBotDto) {
//     const { output } = await this.AGENT.run(createBotDto.message)

//     this.logger.debug({
//       output,
//     })
//   }
// }
