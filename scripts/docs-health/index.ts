import fs from 'fs'
import path from 'path'
import { scanFiles } from './scanFiles'
import { analyzeMetadata } from './analyzeMetadata'
import { analyzeLinks } from './analyzeLinks'
import { HealthIssue, HealthReport } from './types'

const MARKDOWN_ROOT = path.join(process.cwd(), 'markdown', 'docs')
const OUTPUT_FILE = path.join(process.cwd(), 'public', 'docs-health.json')

function logProgress(current: number, total: number) {
    if (current % 50 === 0 || current === total) {
        console.log(`Processed ${current}/${total} files...`)
    }
}

function run(): void {
    console.log('🔍 Starting documentation health analysis...\n')

    console.log(`📁 Scanning: ${MARKDOWN_ROOT}`)
    const files = scanFiles(MARKDOWN_ROOT)
    console.log(`✔ Found ${files.length} markdown files\n`)

    const issues: HealthIssue[] = []

    console.log('🧪 Analyzing files...')
    files.forEach((file, index) => {
        try {
            issues.push(...analyzeMetadata(file))
            issues.push(...analyzeLinks(file, files))
        } catch (error: any) {
            issues.push({
                type: 'analyzer-error',
                file,
                message: error?.message || 'Unknown analyzer error',
                severity: 'high'
            })
        }

        logProgress(index + 1, files.length)
    })

    console.log('✔ Analysis complete\n')

    const high = issues.filter(i => i.severity === 'high').length
    const medium = issues.filter(i => i.severity === 'medium').length
    const low = issues.filter(i => i.severity === 'low').length

    const report: HealthReport = {
        summary: {
            totalFiles: files.length,
            issues: issues.length,
            high,
            medium,
            low
        },
        issues
    }

    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2))

    // 📊 Console summary (human-readable)
    console.log('📊 Health Report Summary:')
    console.log(`Total Files: ${files.length}`)
    console.log(`Total Issues: ${issues.length}`)
    console.log(`- High: ${high}`)
    console.log(`- Medium: ${medium}`)
    console.log(`- Low: ${low}\n`)

    console.log(`✅ Report saved to: ${OUTPUT_FILE}`)

    if (high > 0) {
        console.warn(`⚠ Found ${high} high-severity issues`)
    }
}

run()
