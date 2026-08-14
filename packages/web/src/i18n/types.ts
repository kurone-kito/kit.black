import type { ReadonlyRecord } from '@kurone-kito/kit.black-lib';

/** Type definition for the resources object. */
export type Resources = ReadonlyRecord<ResourcesKeys, string>;

/** Type definition for the resources keys. */
export type ResourcesKeys =
  | 'activities'
  | 'activitiesCarousel'
  | 'author'
  | 'avatarKito'
  | 'avatarMomoneko'
  | 'avatarNext'
  | 'calendar'
  | 'downloadCalendar'
  | 'footerCredits'
  | 'hamburgerMenu'
  | 'heroAbout'
  | 'heroIntroduction'
  | 'language'
  | 'languageSelection'
  | 'learnMore'
  | 'links'
  | 'marshmallow'
  | 'navbarLabel'
  | 'netlify'
  | 'released'
  | 'repository'
  | 'siteDescription'
  | 'splashLoading'
  | 'toggleTheme'
  | 'wishlist'
  | 'worksDescription'
  | 'worksHeading'
  | 'worksMore';
