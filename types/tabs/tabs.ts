export interface Tab {
    id: string;
    content: React.ReactNode;
}

export interface TabsProps {
    tabs?: Tab[];
    className?: string;
}