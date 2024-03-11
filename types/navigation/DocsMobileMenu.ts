export interface DocsMobileMenuProps {
    post: {
        slug: string;
    };
    navigation: {
        [key: string]: any;
    };
    onClickClose?: () => void;
}