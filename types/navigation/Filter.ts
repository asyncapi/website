export interface Option {
    value: string;
    text: string;
}

export interface FilterProps {
    data: any[];
    onFilter: (data: any[]) => void;
    checks: { name: string; options?: Option[] }[];
    className: string;
}