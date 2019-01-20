const fs = require('fs-extra')
const path = require('path')
const URL = require('url').URL

import fetch from 'node-fetch'
import { generateReport } from './index';

const fetchVersion = async (uri: string) => {
    try {
        const url = new URL(uri)
        url.pathname = '.well-known/version'

        const req = await fetch(url.toString())
        const body = await req.json()
        return body.version
    } catch (err) {
        return ''
    }
}

const reportDir = path.resolve(process.cwd(), 'reports')

export const saveReport = async (url: string, data: any, appVersion: string) => {
    try {
        const report = await generateReport(url, data)
        const appver = appVersion || await fetchVersion(url)

        const date = new Date()
        const siteDir = path.resolve(reportDir, url.replace(/(^\w+:|^)\/\//, ''), appver)
        if (!fs.existsSync(siteDir)) {
            await fs.mkdirp(siteDir)
        }
        return fs.outputFile(path.resolve(siteDir, `${date.toISOString()}.html`), report)
    } catch (err) {
        return Promise.reject(new Error('Failed to generate report'))
    }
}
