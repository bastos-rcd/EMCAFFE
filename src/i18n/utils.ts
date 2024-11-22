import ENLang from './en.json';
import FRLang from './fr.json';
import ESLang from './es.json';

export const languages = {
	en: 'English',
	fr: 'Français',
	es: 'Español',
};

export const defaultLang = 'fr';

export const ui = {
	en: flattenObject(ENLang),
	fr: flattenObject(FRLang),
	es: flattenObject(ESLang),
} as const;

function flattenObject(ob: any) {
	const toReturn: any = {};

	for (const i in ob) {
		if (!ob.hasOwnProperty(i)) continue;

		if (typeof ob[i] === 'object' && ob[i] !== null) {
			const flatObject = flattenObject(ob[i]);
			for (const x in flatObject) {
				if (!flatObject.hasOwnProperty(x)) continue;

				toReturn[i + '.' + x] = flatObject[x];
			}
		} else {
			toReturn[i] = ob[i];
		}
	}
	return toReturn;
}

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split('/');
	if (lang in ui) return lang as keyof typeof ui;
	return lang as keyof typeof ui;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export async function getStaticPaths() {
	return Object.keys(languages).map((lang) => ({ params: { lang } }));
}
