export interface Params {
  [key: string]: any;
  page?: number;
  date?: Date;
  month?: string;
  hour?: string;
  detected_object?: string;
}

export type ConditionsType = 'years'|'months'|'hours'|'detected_objects'|'tracking_objects';

export interface Conditions {
  [key: string]: ConditionsType;
  condition?: ConditionsType;
}

export interface selectValues {
  value: string;
  total: number;
}
