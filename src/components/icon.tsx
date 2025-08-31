import {framer, useIsAllowedTo} from 'framer-plugin';
import {type IconData} from '../types.js';
import {loadSvg} from '../utils.js';

function Icon({
	icon,
	luminance,
	version,
}: {
	readonly icon: IconData;
	readonly luminance: number;
	readonly version: string;
}) {
	const isAllowedToAddSvg = useIsAllowedTo('addSVG');
	const isWhite = icon.hex === 'FFFFFF';
	const isBright = luminance >= 0.4;
	const isDark = luminance <= 0.05;

	return (
		<div
			className={`icon ${isBright ? 'bright' : isDark ? 'dark' : ''}`}
			style={{
				border: `${isWhite ? 1 : 2}px solid ${
					isWhite
						? 'var(--figma-color-text, var(--fallback-color-text))'
						: `#${icon.hex}`
				}`,
				borderBottomWidth: isWhite ? 1 : 0,
			}}
			onClick={async () => {
				if (!isAllowedToAddSvg) {
					framer.notify('Permission to add SVGs is required.');
				}

				const svg = await loadSvg(version, icon.slug);
				const coloredSvg = svg.replace('<svg ', `<svg fill="#${icon.hex}" `);
				await framer.addSVG({
					svg: coloredSvg,
					name: `${icon.slug}.svg`,
				});
			}}
		>
			<div
				className="icon-image"
				style={{
					backgroundColor: isWhite ? 'currentColor' : `#${icon.hex}`,
					WebkitMask: `url(https://cdn.jsdelivr.net/npm/simple-icons@${version}/icons/${icon.slug}.svg)`,
					WebkitMaskSize: 'contain',
					WebkitMaskRepeat: 'no-repeat',
					WebkitMaskPosition: 'center',
				}}
			/>
			<div className="icon-title">{icon.title}</div>
			<div
				className={`icon-color ${isBright ? '' : 'light'}`}
				style={{
					backgroundColor: `#${icon.hex}`,
				}}
			>
				#{icon.hex}
			</div>
		</div>
	);
}

export default Icon;
