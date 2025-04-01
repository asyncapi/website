export interface MockApiResponse {
    items: Array<{
        snippet: {
            thumbnails: {
                high: {
                    url: string;
                };
            };
            title: string;
            description: string;
        };
        id: {
            videoId: string;
        };
    }>;
}

export type ExpectedResult = string;
