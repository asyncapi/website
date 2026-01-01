import React from 'react';
import fs from 'fs';
import path from 'path';
import Head from 'next/head';
import type { GetStaticProps } from 'next';

type Severity = 'low' | 'medium' | 'high';

interface Issue {
    type: string;
    file: string;
    message: string;
    severity: Severity;
}

interface HealthSummary {
    totalFiles: number;
    issues: number;
    high: number;
    medium: number;
    low: number;
}

interface HealthReport {
    summary: HealthSummary;
    issues: Issue[];
}

interface DocsHealthPageProps {
    report: HealthReport | null;
}

export const getStaticProps: GetStaticProps<DocsHealthPageProps> = async () => {
    const filePath = path.join(process.cwd(), 'public', 'docs-health.json');
    let report: HealthReport | null = null;

    try {
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            report = JSON.parse(fileContent);
        } else {
            console.warn('docs-health.json not found. Run npm run docs:health first.');
        }
    } catch (error) {
        console.error('Error reading docs-health.json:', error);
    }

    return {
        props: {
            report,
        },
    };
};

export default function DocsHealthPage({ report }: DocsHealthPageProps) {
    if (!report) {
        return (
            <div className="p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Documentation Health Report Not Found</h1>
                <p>Please run <code>npm run docs:health</code> to generate the report.</p>
            </div>
        );
    }

    const { summary, issues } = report;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <Head>
                <title>Docs Health Dashboard</title>
            </Head>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Documentation Health Dashboard</h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5 mb-8">
                    <Card label="Total Files" value={summary.totalFiles} />
                    <Card label="Total Issues" value={summary.issues} />
                    <Card label="High Severity" value={summary.high} color="text-red-600" />
                    <Card label="Medium Severity" value={summary.medium} color="text-yellow-600" />
                    <Card label="Low Severity" value={summary.low} color="text-blue-600" />
                </div>

                {/* Issues List */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Issues Found</h3>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {issues.length === 0 ? (
                            <li className="px-4 py-4 sm:px-6 text-green-600">No issues found!</li>
                        ) : (
                            issues.map((issue, index) => (
                                <li key={index} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium text-blue-600 truncate">{issue.file}</p>
                                        <div className="ml-2 flex-shrink-0 flex">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSeverityColor(issue.severity)}`}>
                                                {issue.severity}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                {issue.message}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                            <p>{issue.type}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function Card({ label, value, color = 'text-gray-900' }: { label: string; value: number; color?: string }) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">{label}</dt>
                <dd className={`mt-1 text-3xl font-semibold ${color}`}>{value}</dd>
            </div>
        </div>
    );
}

function getSeverityColor(severity: Severity) {
    switch (severity) {
        case 'high':
            return 'bg-red-100 text-red-800';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'low':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}
