import serverlessExpress from '@codegenie/serverless-express'
import { INestApplication, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type {
  Callback,
  Context,
  Handler,
  APIGatewayProxyEvent,
} from 'aws-lambda'
import { AppModule } from './app.module'
import { RequestListener } from 'http'
import { Application } from 'express'

let server: Handler
const getApp = async () => {
  const app: INestApplication =
    await NestFactory.create<INestApplication>(AppModule)
  app.enableCors()

  return app
}

const bootstrap = async (): Promise<Handler> => {
  const app = await getApp()
  await app.init()
  const expressApp: Application = app
    .getHttpAdapter()
    .getInstance() as Application

  const requestListener: RequestListener =
    expressApp as unknown as RequestListener

  return serverlessExpress({ app: requestListener })
}

export const handler: Handler = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
): Promise<Handler> => {
  server = server ?? (await bootstrap())
  return server(event, context, callback)
}
const main = async () => {
  const app = await getApp()
  await app.listen(3000)
  Logger.log('Application is running on: 3000')
}
void getApp().then(() => main())
