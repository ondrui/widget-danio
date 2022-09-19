export interface Data {
  eventType: number;
  eventTime: number | number[];
  timeFormat: string;
  titleText: string;
  eventText: string;
  iconCode?: number;
  isDayShow?: boolean;
}

export interface Filters {
  code: number;
  amount: number;
  name: string;
  isActive: boolean;
}
