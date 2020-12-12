export interface Params {
  [key: string]: any;
  page?: number;
  date?: Date;
  years?: string;
  months?: string;
  hours?: string;
  minutes?: string;
  detected_object?: string;
}

export type ConditionsType = 'years'|'months'|'days'|'hours'|'minutes'|'detected_objects'|'tracking_objects';

export interface Conditions {
  [key: string]: ConditionsType;
  condition?: ConditionsType;
}

export interface selectValues {
  value: string;
  total: number;
}
