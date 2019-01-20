import { injectable, inject } from 'inversify'
import { TYPES } from '../../inversify.config';
import { IReportsService } from '../../deps';

@injectable()
export class LighthouseService {
    constructor(@inject(TYPES.ReportsService) private readonly reportService: IReportsService) {
    }

    public async getReportByUrl(url: string): Promise<any> {
        return this.reportService.getReportByUrl(url)
    }
}
