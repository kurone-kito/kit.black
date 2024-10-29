import type {
  BaseRecordDict,
  Flatten,
  Translator,
} from '@solid-primitives/i18n';
import { resolveTemplate, translator } from '@solid-primitives/i18n';
import type { Params as RouterParams } from '@solidjs/router';
import { useParams } from '@solidjs/router';
import type { Accessor } from 'solid-js';
import { createMemo } from 'solid-js';
import en from '../i18n/en.js';
import ja from '../i18n/ja.js';
import type { Resources } from '../i18n/types.js';
import type { ReadonlyRecord } from '@kurone-kito/kit.black-lib';

/** Type definition for the dictionary. */
export type Dictionary = Flatten<Resources>;

/** Type definition for the locale. */
export type Language = keyof typeof dictionaries;

/** Type definition for the parameters. */
export interface I18NParams extends RouterParams {
  /** The language. */
  readonly language?: Language;
}

/** The fallback language. */
const FALLBACK = 'ja' satisfies Language;

/** The dictionaries. */
const dictionaries = { en, ja } as const satisfies ReadonlyRecord<
  string,
  Resources
>;

/**
 * Creates the i18n accessor from a custom dictionary.
 * @param dict The custom dictionary.
 * @returns The i18n accessor.
 */
export const createI18NDict =
  <T extends BaseRecordDict>(dict: ReadonlyRecord<Language, T>) =>
  (language: Accessor<Language>): Translator<T> =>
    translator(
      createMemo(() => dict[language()]),
      resolveTemplate,
    );

/**
 * Creates the i18n accessor.
 * @param language The language.
 * @returns The i18n accessor.
 */
export const createI18N = createI18NDict(dictionaries);

/**
 * Creates the i18n accessor from a custom dictionary.
 * @param dict The custom dictionary.
 * @returns The i18n accessor.
 */
export const createI18NText =
  (texts: Record<Language, string>) =>
  (language: Accessor<Language>): Translator<Record<'text', string>> =>
    translator(createMemo(() => ({ text: texts[language()] })));

/**
 * Uses the language from dynamic route.
 * @returns The language.
 */
export const useLanguage = (): Accessor<Language> => {
  const params = useParams<I18NParams>();
  return createMemo(() => params.language || FALLBACK);
};

/**
 * Uses the translator.
 * @returns The translator.
 */
export const useTranslator = (): Translator<Dictionary> =>
  createI18N(useLanguage());
