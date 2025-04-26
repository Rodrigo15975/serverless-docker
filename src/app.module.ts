import { Module } from '@nestjs/common'
import { UserModule } from './module/user/user.module'
import { PrismaModule } from 'nestjs-prisma'
import { AuthModule } from './module/auth/auth.module'
import { TaskModule } from './module/task/task.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '1h' },
    }),
    UserModule,
    PrismaModule.forRoot({ isGlobal: true }),
    AuthModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
