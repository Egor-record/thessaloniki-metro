import type { string } from "astro/zod";

type Language = 'en' | 'el';
type TranslationKeys = Record<string, string>;
type Translations = {
    el: TranslationKeys;
    en: TranslationKeys;
};