import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: CreateTaskDto, user_id: string) {
    const task = await this.prismaService.task.create({
      data: { ...data, user_id },
    })
    return {
      message: 'Task created successfully',
      data: task,
      status: 201,
    }
  }

  async findAll() {
    return await this.prismaService.task.findMany()
  }

  async findOne(task_id: string) {
    return await this.prismaService.task.findUnique({
      where: { task_id },
    })
  }

  async update(task_id: string, updateTaskDto: UpdateTaskDto) {
    return await this.prismaService.task.update({
      where: { task_id },
      data: updateTaskDto,
    })
  }

  async remove(task_id: string) {
    return await this.prismaService.task.delete({
      where: { task_id },
    })
  }
}
