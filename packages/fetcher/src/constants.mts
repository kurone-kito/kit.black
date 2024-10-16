/** Type definition for the event type. */
export type EventType = (typeof eventTypes)[number];

/** The event type. */
export const eventTypes = ['others', 'release', 'streaming'] as const;

/** The maximum number of events. */
export const MAX_EVENTS = 12;
