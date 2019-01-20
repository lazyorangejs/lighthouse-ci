export interface IReportsService {
  getBadge(category, url: string): Promise<any>
  getScoreMetrics(url: string): Promise<IScoreMetricsDTO>
  getReportByUrl(url: string): Promise<any>
  saveReport(report: IReportDTO): Promise<boolean>
  fromLighthouseReport(url: string, filterData: any): IReportDTO
}

export interface IScoreMetricsDTO {
  bestPracticesScore: number
  accessibilityScore: number
  performanceScore: number
  pwaScore: number
  seoScore: number
}

export interface IReportDTO {
  url?: string
  bestPracticesScore: number
  accessibilityScore: number
  performanceScore: number
  pwaScore: number
  seoScore: number
}
