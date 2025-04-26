import serverlessExpress from '@codegenie/serverless-express'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import type { Callback, Context, Handler } from 'aws-lambda'
import { AppModule } from './app.module'

let server: Handler
const getApp = async () => {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  return app
}

const bootstrap = async (): Promise<Handler> => {
  const app = await getApp()
  await app.init()
  const expressApp = app.getHttpAdapter().getInstance()

  return serverlessExpress({ app: expressApp })
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  server = server ?? (await bootstrap())
  return server(event, context, callback)
}
const main = async () => {
  const app = await getApp()
  await app.listen(3000)
  Logger.log('Application is running on: 3000')
}
getApp().then(() => main())
