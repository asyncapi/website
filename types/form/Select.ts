export interface Option {
    value: string;
    text: string;
}

export interface SelectProps {
    className?: string;
    onChange?: (selected: string) => void;
    options: Option[];
    selected: string;
}