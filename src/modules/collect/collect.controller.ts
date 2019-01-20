import * as express from 'express'

import { inject } from 'inversify'
import { controller, httpPost, interfaces, BaseHttpController } from 'inversify-express-utils'

import { TYPES } from '../../inversify.config'
import { getData, saveReport } from './utils'
import { IReportsService } from '../../deps';

@controller('/collect')
export class LightHouseController extends BaseHttpController implements interfaces.Controller {
  constructor(
    @inject(TYPES.ReportsService) private reportService: IReportsService,
    @inject(TYPES.Logger) private readonly logger) {
    super()
  }

  @httpPost('/', TYPES.BasicAuthMiddleware)
  private async index(req: express.Request, res: express.Response) {
    const url = req.body.url
    try {
      this.logger.info({ url }, 'Collect data')

      const { app_version = '', report = false } = req.body as
        { url: string, app_version: string, report: boolean }

      const { raw, filteredData }: any = await getData(url)
      if (report) {
        await this.reportService.saveReport(this.reportService.fromLighthouseReport(url, filteredData))
        await saveReport(url, raw, app_version)
      }
      return this.json(filteredData, 201)
    } catch (err) {
      this.logger.error(err, 'Something went wrong!')
      return this.internalServerError(new Error('Server internal error'))
    }
  }
}
