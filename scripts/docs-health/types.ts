export type IssueSeverity = 'low' | 'medium' | 'high';

export interface HealthIssue {
    type: string;
    file: string;
    message: string;
    severity: IssueSeverity;
}

export interface HealthSummary {
    totalFiles: number;
    issues: number;
    high: number;
    medium: number;
    low: number;
}

export interface HealthReport {
    summary: HealthSummary;
    issues: HealthIssue[];
}
