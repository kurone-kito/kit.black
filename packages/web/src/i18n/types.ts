import type { ReadonlyRecord } from '@kurone-kito/kit.black-lib';

/** Type definition for the resources object. */
export type Resources = ReadonlyRecord<ResourcesKeys, string>;

/** Type definition for the resources keys. */
export type ResourcesKeys =
  | 'activities'
  | 'author'
  | 'avatarKito'
  | 'avatarMomoneko'
  | 'calendar'
  | 'language'
  | 'learnMore'
  | 'links'
  | 'marshmallow'
  | 'netlify'
  | 'released'
  | 'repository'
  | 'siteDescription'
  | 'toDark'
  | 'toLight'
  | 'wishlist'
  | 'worksDescription'
  | 'worksHeading';
