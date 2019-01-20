import { launchChromeViaPuppetierAndRunLighthouse, createReport } from './launchChromeViaPuppetierAndRunLighthouse'

const logger = console

const filterResults = (data = {}) => {
    const { categories = {}, audits = {} }: any = data

    const { metrics = {} } = audits
    const { details = {} } = metrics
    const { items = [] } = details
    const metricItems = items[0] || {}

    const report: any = {}

    for (const categoryName in categories) {
        if (!Object.prototype.hasOwnProperty.call(categories, categoryName)) {
            continue
        }

        const category = categories[categoryName]
        report[`${category.id}-score`] = Math.round(category.score * 100)
    }

    for (const metricItem in metricItems) {
        if (!Object.prototype.hasOwnProperty.call(metricItems, metricItem)) {
            continue
        }
        // For now don't report on any observered metrics
        if (metricItem.indexOf('observed') === -1) {
            const metric = metricItems[metricItem]
            report[metricItem] = metricItems[metricItem]
        }
    }

    const auditData = ['errors-in-console', 'time-to-first-byte', 'interactive', 'redirects']

    auditData.forEach((key) => {
        const { rawValue }: any = audits[key] || {}
        if (rawValue !== undefined) {
            report[key] = rawValue
        }
    })

    return report
}

export const getData = async (url: string, report = {}) => {
    try {
        logger.info(`Getting data for ${url}`)

        const lighthouse =
            (await launchChromeViaPuppetierAndRunLighthouse(url)) || {}

        logger.info(`Successfully got data for ${url}`)

        return Promise.resolve({
            filteredData: filterResults(lighthouse.lhr),
            raw: lighthouse.lhr,
        })
    } catch (err) {
        logger.error(`Failed to get data for ${url}`, err)
    }
}

export const generateReport = async (url: string, data: any) => {
    try {
        logger.info(`Generating report for ${url}`)
        const report = await createReport(data)
        return report
    } catch (err) {
        logger.error(`Failed to generate report`, err)
        return Promise.reject(new Error('Failed to generate report'))
    }
}

export * from './save-report'
