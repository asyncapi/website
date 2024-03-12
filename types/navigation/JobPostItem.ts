export interface Job {
    slug: string;
    company: {
        logoUrl: string;
        name: string;
    };
    title: string;
    employmentType?: string;
    category: string;
    location?: string;
    region?: string;
    closingOn: string;
}

export interface JobPostItemProps {
    job: Job;
}