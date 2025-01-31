function Search({onChange}: {readonly onChange?: (value?: string) => void}) {
	return (
		<input
			className="search-input"
			placeholder="Search by brand..."
			type="search"
			onChange={(event) => {
				onChange?.(event.target.value);
			}}
		/>
	);
}

export default Search;
