const { URL } = require('url')

const lighthouse = require('lighthouse')
const puppeteer = require('puppeteer')
const ReportGenerator = require('lighthouse/lighthouse-core/report/report-generator')

export const launchChromeViaPuppetierAndRunLighthouse = async (url: string) => {
    const browser = await puppeteer.launch({
        args: [
            '--disable-gpu', '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
        ],
        devtools: false,
        headless: true,
    })

    const flags = {
        output: 'json',
        port: (new URL(browser.wsEndpoint())).port,
    }

    const result = await lighthouse(url, flags, {
        extends: 'lighthouse:default',
    })

    await browser.close()

    return result
}

export const createReport = (results: any) => ReportGenerator.generateReportHtml(results)
