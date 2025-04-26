import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { PrismaService } from 'nestjs-prisma'
import { User } from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateUserDto): Promise<{
    message: string
    data: User
    status: number
  }> {
    const user = await this.prismaService.user.create({
      data,
    })
    return {
      message: 'User created successfully',
      data: user,
      status: 201,
    }
  }

  async findAll(): Promise<User[]> {
    return this.prismaService.user.findMany({
      include: {
        Task: {
          select: {
            description: true,
          },
        },
      },
    })
  }

  async findOne(user_id: string) {
    return this.prismaService.user.findUnique({
      where: {
        user_id,
      },
      select: {
        Task: {
          select: {
            description: true,
          },
        },
      },
    })
  }

  async update(user_id: string, data: UpdateUserDto): Promise<User> {
    return await this.prismaService.user.update({
      where: {
        user_id,
      },
      data,
    })
  }

  async remove(user_id: string): Promise<User> {
    return await this.prismaService.user.delete({
      where: {
        user_id,
      },
    })
  }
}
