import { Body, Controller, Post, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateAuthDto } from './dto/create-auth.dto'
import { Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    const response = await this.authService.login(createAuthDto)
    res.cookie('token', response.access_token, { httpOnly: true })
    return res.send({
      token: response.access_token,
    })
  }
}
