export interface BlogPaginationProps {
    /** Current active page number (1-indexed) */
    currentPage: number;
    /** Total number of pages */
    totalPages: number;
    /** Total number of posts after filtering */
    totalPosts: number;
    /** Number of posts displayed per page */
    postsPerPage: number;
    /** Callback when page changes */
    onPageChange: (page: number) => void;
}
