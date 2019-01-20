import * as nock from 'nock'

import { sendRequest } from '../cron'

// const logger = console

describe('Cron', () => {
  describe('#sendRequest', () => {
    it('foo', async () => {
      const scope = nock('http://localhost:3034')
        .post('/api/collect', { url: 'https://medium.com', report: true })
        .reply(200, {})

      await sendRequest('http://localhost:3034', 'https://medium.com', 'user:pass')
      expect(scope.isDone()).toBeTruthy()
    })
  })
})
