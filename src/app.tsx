import {useEffect, useState} from 'react';
import {framer} from 'framer-plugin';
import Icons from './components/icons.js';
import Loading from './components/loading.js';
import Search from './components/search.js';
import {type IconData} from './types.js';
import {loadJson, loadLatestVersion} from './utils.js';
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
			const icons = await loadJson(version);
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
