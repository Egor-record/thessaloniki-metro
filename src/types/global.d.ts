import type { string } from "astro/zod";

export type Language = 'en' | 'el';
export type TranslationKeys = Record<string, string>;
export type Translations = {
    el: TranslationKeys;
    en: TranslationKeys;
};
