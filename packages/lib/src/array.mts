import type { ReadonlyTuple } from 'type-fest';

/**
 * Type definition for the mapper function.
 * @template T The source type.
 * @template R The result type.
 * @template L The index type.
 */
export type Mapper<T, R, L extends number = number> = (
  value: T,
  index: L,
  array: readonly T[],
) => R;

/**
 * Maps a tuple.
 * @template T The source tuple type.
 * @template R The result tuple type.
 * @param tuple The tuple to map.
 * @param mapper The mapper function.
 * @returns The mapped tuple.
 * @example
 * ```ts
 * const tuple = [1, 2, 3] as const;
 * const mapper = (value: number) => value.toString();
 * const result = tupleMap(tuple, mapper);
 * //=> value: ['1', '2', '3']
 * //=> type: readonly [string, string, string]
 * ```
 */
export const tupleMap = <T extends readonly unknown[], R>(
  tuple: T,
  mapper: Mapper<T[number], R>,
): ReadonlyTuple<R, T['length']> =>
  tuple.map(mapper) as ReadonlyTuple<R, T['length']>;
