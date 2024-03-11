export interface SubCategoryDocsNavProps {
    subCategory: {
      item: {
        title: string;
        slug: string;
        href?: string;
      };
      children?: {
        title: string;
        slug: string;
        href?: string;
      }[];
    };
    activeItem: string;
    onClick: () => void;
  }