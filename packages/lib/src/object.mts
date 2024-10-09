/**
 * Type definition that the readonly record.
 * @template K The record key type.
 * @template T The record value type.
 */
export type ReadonlyRecord<in K extends RecordKey, out T> = {
  readonly [P in K]: T;
};

/** Type definition that the record key. */
export type RecordKey = keyof any;
