import { Module } from '@nestjs/common'
import { UserModule } from './module/user/user.module'
import { PrismaModule } from 'nestjs-prisma'
import { AuthModule } from './module/auth/auth.module'
import { TaskModule } from './module/task/task.module'
import { JwtModule } from '@nestjs/jwt'
import { BotModule } from './bot/bot.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    PrismaModule.forRoot({ isGlobal: true }),
    AuthModule,
    TaskModule,
    BotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
