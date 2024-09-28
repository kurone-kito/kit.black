import type { Week } from '@kurone-kito/kit.black-lib';
import type { EventType } from './constants.mjs';

/** Type definition that represents the event detail. */
export interface EventDetail {
  /** The date. */
  readonly date: string;

  /** The epoch time used for sorting. */
  readonly epoch: number;

  /**
   * The time.
   *
   * When omitted, the event is an all-day or unknown time event.
   */
  readonly time?: string | undefined;

  /** The event title. */
  readonly title: string;

  /** The event type. */
  readonly type: EventType;
}

/** Type definition for the event detail row. */
export interface EventDetailRow extends Pick<EventDetail, 'time' | 'type'> {
  /** The event title. */
  readonly children: string;

  /** The date. */
  readonly date?: string | undefined;

  /**
   * The span of the date.
   *
   * When omitted the {@link date}, this property is ignored.
   */
  readonly dateSpan?: number | undefined;

  /** The week. */
  readonly week?: Week | undefined;
}
