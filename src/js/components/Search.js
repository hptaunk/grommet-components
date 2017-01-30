import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import SearchCtrl from 'grommet/components/Search';
import Button from 'grommet/components/Button';
import SearchIcon from 'grommet/components/icons/base/Search';

const CLASSROOT = "search-ctrl";
class Search extends Component {
	constructor(props) {
		super(props);
		this._onSearch = this._onSearch.bind(this);
		this._onSearchTextChange = this._onSearchTextChange.bind(this);
		this._onOptionChange = (e) => this.setState({ selectedOption: e.option });
		this.state = { term: '', suggestions: [], selectedOption: props.selectedOption };
	}

	_onSearchTextChange(e) {
		var term = e.target.value;

		if (this.props.onSuggestion) {
			this.props.onSuggestion({ term: term, option: selectedOption});
		} else {
			//TODO: Remove else part.
			let suggestions= ['first', 'second', 'third', 'fourth'];
			var sugg = suggestions.filter(x => x.indexOf(term) == 0);
			this.setState({suggestions: sugg });
		}
		this.setState({ term: term});
	}

	_onSearch(e) {
		console.log(this.state);
		if (this.props.onSearch) {
			const {term, selectedOption} = this.state;
			this.props.onSearch({ term: term, option: selectedOption });
		}
	}

	render() {
		const {options, placeHolder} = this.props;
		const {term, selectedOption, suggestions} = this.state;
		// debugger;
		return (
			<Box className={CLASSROOT} direction="row" pad="none">
				<Select className={CLASSROOT + "_filter"} options={options} value={selectedOption} onChange={this._onOptionChange} />
				<SearchCtrl className={CLASSROOT + "_input"} inline={true} placeHolder={placeHolder} suggestions={suggestions} value={term} onDOMChange={this._onSearchTextChange} />
				<Button className={CLASSROOT + "_button"} label="Search" icon={<SearchIcon />} primary={true} onClick={this._onSearch} />
			</Box>

		);
	}
}

Search.propTypes = {
	selectedOption: PropTypes.object,
	options: PropTypes.array,
	suggestions: PropTypes.array,
	onSearch: PropTypes.func,
	onSuggestion: PropTypes.func
};

Search.defaultProps = {
	placeHolder: "Discover APIs",
	selectedOption: { label: "Search All", value: 0 },
	options: [{ label: "Search All", value: 0 }, { label: "Tags", value: 1 }, { label: "Title", value: 2 }],
	suggestions: []
};

export default Search;
