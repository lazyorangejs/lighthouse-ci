import * as fs from 'fs'
import * as path from 'path'

import fetch from 'node-fetch'
import { CronJob } from 'cron'

export const sendRequest = async (apiUrl: string, url: string, userpass: string = 'user:pass') => {
  return fetch(`${apiUrl}/api/collect`, {
    body: JSON.stringify({ url, report: true }),
    headers: {
      'Authorization': `Basic ${Buffer.from(userpass, 'utf8').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    timeout: 60 * 1000,
  })
}

export const startCron = async (apiUrl: string, userpass: string) => {
  const configPath = path.resolve(process.cwd(), 'config.json')
  if (fs.existsSync(configPath)) {
    const config = JSON.parse(fs.readFileSync(configPath).toString())
    if (config.cron) {
      const job = new CronJob(config.cron, async () => {
        await Promise.all(config.urls.map(({ url }) => {
          return sendRequest(apiUrl, url, userpass)
        }))
      }, null, true, 'UTC', true)
      job.start()
    }
  }
  return true
}
