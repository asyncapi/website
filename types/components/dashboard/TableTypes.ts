export interface LabelType {
  name: string;
}

export interface Issue {
  title: string;
  repo: string;
  area?: string;
  resourcePath: string;
  isPR?: boolean;
  labels: LabelType[];
}
