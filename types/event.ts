import type { Moment } from 'moment';

export interface IEvent {
  title: string;
  calLink: string;
  url: string;
  banner: string;
  date: Moment;
}
