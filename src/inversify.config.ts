import * as basicAuth from 'express-basic-auth'
import { Container, injectable } from 'inversify'
import { createConnection } from 'typeorm'

import { IReportsService } from './deps'
import { ReportsService } from './modules/reports/reports.svc'
import { Report } from './entity/Report'

export enum TYPES {
  ReportsService = 'ReportsService',
  ReportRepo = 'ReportRepo',
  Logger = 'logger',
  BasicAuthMiddleware = 'basicAuth',
}

interface IFooService {
  foo(): string
}

@injectable()
class FooService {
  public foo() {
    return 'bar'
  }
}

export const createDbConnection = async () => {
  const connection = await createConnection({
    entities: [Report],
    type: 'postgres',
    url: process.env.PG_URL || 'postgres://postgres:postgres@localhost:5432/lighthouse-reports',
  })

  return connection
}

const basicAuthMiddleware = (users = { [process.env.SUPER_USERNAME]: process.env.SUPER_PASSWORD }) => {
  return basicAuth({ users })
}

export const bootstrapContainer = async () => {
  const container = new Container()
  container.bind<IFooService>('FooService').to(FooService)
  container.bind<IReportsService>(TYPES.ReportsService).to(ReportsService)
  container.bind(TYPES.Logger).toConstantValue(console)
  container.bind(TYPES.BasicAuthMiddleware).toConstantValue(basicAuthMiddleware())

  const conn = await createDbConnection()

  container.bind(TYPES.ReportRepo).toConstantValue(conn.getRepository('Report'))

  return container
}
