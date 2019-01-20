const request = require('superagent')

import fetch from 'node-fetch'
// import * as request from 'superagent'

import { bootstrapContainer, TYPES } from '../../../inversify.config'
import { IReportsService } from '../../../deps';

const logger = console

const apiUrl = 'http://localhost:3033'

describe('ReportsService', () => {
  logger.info('bootstrap')
  describe('#getScoreMetrics', () => {
    it('ok', async () => {
      const container = await bootstrapContainer()
      const reportsService: IReportsService = await container.get(TYPES.ReportsService)

      const resp = await reportsService.getScoreMetrics('https://medium.com/')
      // logger.info(resp)
      expect(resp).toHaveProperty('accessibilityScore')
      expect(resp).toHaveProperty('bestPracticesScore')
      expect(resp).toHaveProperty('performanceScore')
      expect(resp).toHaveProperty('pwaScore')
      expect(resp).toHaveProperty('seoScore')
    })
  })

  describe('#getScoreByCategory', () => {
    it('ok', async () => {
      const resp = await request.get(`${apiUrl}/api/reports/badge/performance`)
        .query({ url: 'https://medium.com' })
      expect(resp.ok).toBeTruthy()
    })
  })
})
