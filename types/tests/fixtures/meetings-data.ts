export interface MockEvent {
    summary: string;
    htmlLink: string;
    extendedProperties: {
        private: {
            ISSUE_ID: string;
            BANNER: string;
        };
    };
    start: {
        dateTime: string;
    };
}

export interface ExpectedContent {
    banner: string;
    calLink: string;
    date: string;
    title: string;
    url: string;
}
