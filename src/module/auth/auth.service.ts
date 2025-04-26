import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from 'nestjs-prisma'
import { CreateAuthDto } from './dto/create-auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(createAuthDto: CreateAuthDto) {
    const user = await this.prismaService.user.findFirst({
      where: { username: createAuthDto.username },
    })
    if (user && user.password === createAuthDto.password) {
      const payload = { username: user.username, sub: user.user_id }
      return { access_token: await this.jwtService.signAsync(payload) }
    }
    return {
      message: 'Invalid username or password',
      status: 400,
    }
  }
}
