import * as express from 'express'

import { inject } from 'inversify'
import { controller, httpGet, interfaces, BaseHttpController } from 'inversify-express-utils'

import { TYPES } from '../../inversify.config'
import { IReportsService } from '../../deps'

@controller('/reports')
export class ReportsController extends BaseHttpController implements interfaces.Controller {
  constructor(@inject(TYPES.ReportsService) private readonly reportsService: IReportsService) {
    super()
  }

  @httpGet('/')
  private async index(req: express.Request, res: express.Response) {
    const resp = await this.reportsService.getReportByUrl(req.query.url)
    return this.json(resp)
  }

  @httpGet('/badge/:category')
  private async getScoreByCategory(req: express.Request, res: express.Response) {
    const resp = await this.reportsService.getBadge(req.params.category, req.query.url)
    return resp
  }
}
