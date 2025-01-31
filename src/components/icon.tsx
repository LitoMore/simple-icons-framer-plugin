import {framer} from 'framer-plugin';
import {IconData} from '../types.js';
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
	const isWhite = icon.hex === 'FFFFFF';

	return (
		<div
			className="icon"
			style={{
				border: `${isWhite ? 1 : 2}px solid ${
					isWhite
						? 'var(--figma-color-text, var(--fallback-color-text))'
						: `#${icon.hex}`
				}`,
				borderBottomWidth: isWhite ? 1 : 0,
			}}
			onClick={async () => {
				const svg = await loadSvg(version, icon.slug);
				await framer.addSVG({
					svg,
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
				className={`icon-color ${luminance < 0.4 ? 'light' : ''}`}
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
