export enum ParagraphTypeStyle {
    lg = 'body-lg',
    md = 'body-md',
    sm = 'body-sm',
}

export interface ParagraphProps {
    typeStyle?: ParagraphTypeStyle;
    textColor?: string; 
    fontWeight?: string;
    className?: string;
    children?: React.ReactNode;
}