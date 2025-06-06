import { createDateNow } from '@solid-primitives/date';

/**
 * The accessor for the current date.
 *
 * The value is updated periodically by `createDateNow`.
 */
export const [now] = createDateNow();
