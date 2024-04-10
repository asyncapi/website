export interface LabelType {
  name: string;
};

export interface RowItemType {
  resourcePath: string;
  isPR: boolean;
  repo: string;
  title: string;
  labels: LabelType[];
};
