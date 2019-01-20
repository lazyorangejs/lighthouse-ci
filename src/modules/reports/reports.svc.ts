import fetch from 'node-fetch'
import * as snakecase from 'lodash.snakecase'
import { injectable, inject } from 'inversify'
import { Repository } from 'typeorm'

import { Report } from '../../entity/Report'
import { IReportsService, IReportDTO, IScoreMetricsDTO } from '../../deps'

@injectable()
export class ReportsService implements IReportsService {
  @inject('ReportRepo')
  private readonly reportRepo: Repository<Report>

  public async getBadge(category, url: string) {
    const scores = await this.getScoreMetrics(url)
    switch (category) {
      case 'performance':
        return this.fetchBadge(category, scores.performanceScore)
      case 'seo':
        return this.fetchBadge(category, scores.seoScore)
      case 'pwa':
        return this.fetchBadge(category, scores.pwaScore)
      case 'best-practices':
        return this.fetchBadge(category, scores.bestPracticesScore)
      case 'accessibility':
        return this.fetchBadge(category, scores.accessibilityScore)
      default:
        return ''
    }
  }

  public async getScoreMetrics(url: string): Promise<IScoreMetricsDTO> {
    const report = await this.getReportByUrl(url)
    return {
      accessibilityScore: report.accessibility_score,
      bestPracticesScore: report.best_practices_score,
      performanceScore: report.performance_score,
      pwaScore: report.pwa_score,
      seoScore: report.seo_score,
    }
  }

  public async getReportByUrl(url: string): Promise<any> {
    const repo = await this.reportRepo.findOne({ url })
    if (!repo) {
      throw new Error('Not found')
    }
    return repo.toJSON()
  }

  public async saveReport(report: IReportDTO) {
    await this.reportRepo.insert(report)
    return true
  }

  public fromLighthouseReport(url: string, raw: any): IReportDTO {
    return {
      accessibilityScore: raw['accessibility-score'],
      bestPracticesScore: raw['best-practices-score'],
      performanceScore: raw['performance-score'],
      pwaScore: raw['pwa-score'],
      seoScore: raw['seo-score'],
      url,
    }
  }

  private async fetchBadge(category: string, percent: number = 0) {
    const resp = await fetch(`https://img.shields.io/badge/lighthouse_${snakecase(category)}-${percent}-green.svg`)
    return resp.text()
  }
}
