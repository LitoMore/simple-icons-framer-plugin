import {useEffect, useState} from 'react';
import {framer} from 'framer-plugin';
import Icons from './components/icons';
import Loading from './components/loading';
import Search from './components/search';
import {IconData} from './types';
import {loadJson, loadLatestVersion, titleToSlug} from './utils';
import './app.css';

void framer.showUI({
	position: 'top right',
	width: 540,
	height: 540,
});

export function App() {
	const [searchString, setSearchString] = useState('');
	const [icons, setIcons] = useState<IconData[]>([]);
	const [version, setVersion] = useState<string>('latest');

	useEffect(() => {
		(async () => {
			const version = await loadLatestVersion();
			const json = await loadJson(version);
			const icons = json.map((icon) => ({
				...icon,
				slug: icon.slug || titleToSlug(icon.title),
			}));
			setIcons(icons);
			setVersion(version);
		})();
	}, []);

	return (
		<div className="container">
			<Search
				onChange={(value = '') => {
					setSearchString(value);
				}}
			/>
			{icons.length > 0 ? (
				<Icons icons={icons} searchString={searchString} version={version} />
			) : (
				<Loading />
			)}
		</div>
	);
}
