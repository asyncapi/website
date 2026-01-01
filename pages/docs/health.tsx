import { GetStaticProps } from 'next';
import fs from 'fs';
import path from 'path';
import { HealthReport } from '../../scripts/docs-health/types.js';


export const getStaticProps: GetStaticProps = async () => {
    const filePath = path.join(process.cwd(), 'public', 'docs-health.json');

    if (!fs.existsSync(filePath)) {
        return {
            props: {
                data: null
            }
        };
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    return {
        props: {
            data
        }
    };
};

export default function DocsHealthPage({ data }: { data: HealthReport | null }) {
    if (!data) {
        return (
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-3xl font-bold mb-4">Documentation Health Dashboard</h1>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <p className="text-gray-700 mb-2">
                        No documentation health report found.
                    </p>
                    <p className="text-gray-600 text-sm">
                        Run <code className="bg-gray-200 px-2 py-1 rounded font-mono text-sm">npm run docs:health</code> to generate the report.
                    </p>
                </div>
            </div>
        );
    }

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high':
                return 'text-red-600 bg-red-50';
            case 'medium':
                return 'text-orange-600 bg-orange-50';
            case 'low':
                return 'text-yellow-600 bg-yellow-50';
            default:
                return 'text-gray-600 bg-gray-50';
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-2">Documentation Health Dashboard</h1>
            <p className="text-gray-600 mb-8">
                Overview of documentation quality and issues found in markdown files.
            </p>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <SummaryCard label="Total Files" value={data.summary.totalFiles} color="bg-blue-50" />
                <SummaryCard label="Total Issues" value={data.summary.issues} color="bg-gray-50" />
                <SummaryCard label="High Severity" value={data.summary.high} color="bg-red-50" />
                <SummaryCard label="Medium Severity" value={data.summary.medium} color="bg-orange-50" />
                <SummaryCard label="Low Severity" value={data.summary.low} color="bg-yellow-50" />
            </div>

            {/* Issues Table */}
            {data.issues.length > 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Severity
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Type
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        File
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                                        Message
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data.issues.map((issue, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span
                                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(
                                                    issue.severity
                                                )}`}
                                            >
                                                {issue.severity}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{issue.type}</td>
                                        <td className="px-4 py-3 text-sm font-mono text-gray-800 break-all max-w-xs">
                                            {issue.file.replace(/\\/g, '/')}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-700">{issue.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                    <p className="text-green-800 font-semibold">✓ No issues found!</p>
                    <p className="text-green-600 text-sm mt-1">All documentation files are healthy.</p>
                </div>
            )}
        </div>
    );
}

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className={`${color} border border-gray-200 rounded-lg p-4`}>
            <div className="text-sm text-gray-600 mb-1">{label}</div>
            <div className="text-2xl font-bold text-gray-900">{value}</div>
        </div>
    );
}
