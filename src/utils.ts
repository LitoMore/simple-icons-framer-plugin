import {type IconData, type JsDelivrNpmResponse} from './types.js';

export const loadLatestVersion = async () => {
	const response = await fetch(
		new Request('https://data.jsdelivr.com/v1/packages/npm/simple-icons', {
			cache: 'no-cache',
		}),
	);
	const json = (await response.json()) as JsDelivrNpmResponse;
	return json.tags.latest;
};

export const loadJson = async (simpleIconsVersion: string) => {
	const response = await fetch(
		`https://cdn.jsdelivr.net/npm/simple-icons@${simpleIconsVersion}/data/simple-icons.json`,
	);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const json = await response.json();
	return json as IconData[];
};

export const loadSvg = async (simpleIconsVersion: string, slug: string) => {
	const iconUrl = `https://cdn.jsdelivr.net/npm/simple-icons@${simpleIconsVersion}/icons/${slug}.svg`;
	const response = await fetch(iconUrl);
	const svg = await response.text();
	return svg;
};
