import {useMemo} from 'react';
import {Searcher} from 'fast-fuzzy';
import getRelativeLuminance from 'get-relative-luminance';
import {VirtuosoGrid} from 'react-virtuoso';
import {styled} from 'styled-components';
import {IconData} from '../types.js';
import Icon from './icon.js';

const ListContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 33px;
	gap: 5px;
	margin: 40px 8px 0 8px;
`;

function Icons({
	searchString = '',
	icons,
	version,
}: {
	readonly searchString?: string;
	readonly icons: IconData[];
	readonly version: string;
}) {
	const searcher = new Searcher(icons, {
		keySelector(icon) {
			return [
				icon.title,
				icon.slug,
				icon.aliases?.aka,
				icon.aliases?.dup?.map((duplicate) => duplicate.title),
				Object.values(icon.aliases?.loc ?? {}),
			]
				.flat()
				.filter(Boolean) as string[];
		},
	});
	const searchResult = searchString ? searcher.search(searchString) : icons;
	const luminanceMap = useMemo(
		() =>
			new Map(
				[...new Set(icons.map((icon) => icon.hex))].map((hex) => [
					hex,
					getRelativeLuminance(`#${hex}`),
				]),
			),
		[icons],
	);

	return (
		<VirtuosoGrid
			components={{
				List: ListContainer,
			}}
			itemContent={(index) => {
				const icon = searchResult[index];
				return (
					<Icon
						key={icon.slug}
						icon={icon}
						luminance={Number(luminanceMap.get(icon.hex))}
						version={version}
					/>
				);
			}}
			overscan={100}
			style={{height: window.innerHeight}}
			totalCount={searchResult.length}
		/>
	);
}

export default Icons;
