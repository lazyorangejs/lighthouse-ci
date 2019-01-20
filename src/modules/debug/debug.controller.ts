import * as express from 'express'
import { getConnection, Repository } from 'typeorm'

import { inject } from 'inversify'
import { controller, httpGet, interfaces, BaseHttpController, httpPost } from 'inversify-express-utils'
import { Report } from '../../entity/Report';

const logger = console

@controller('/debug')
export class FooController extends BaseHttpController implements interfaces.Controller {
    constructor(@inject('ReportRepo') private readonly reportRepo: Repository<Report>) {
        super()
    }

    @httpGet('/foo')
    private index(req: express.Request, res: express.Response): string {
        return 'bar'
    }

    @httpPost('/db/seed')
    private async seed(req, res) {
        const report = new Report()
        report.url = 'https://medium.com/about'
        report.accessibilityScore = 53
        report.bestPracticesScore = 87
        report.performanceScore = 87
        report.errorsInConsole = 0
        report.pwaScore = 31
        report.seoScore = 82
        report.estimatedInputLatency = 244
        report.firstCpuIdle = 10572

        await this.reportRepo.insert(report)
    }
}
