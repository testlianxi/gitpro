import { SearchBar } from 'antd-mobile';
import styles from './style.scss';

const Search = (props) => {
  const fn = () => {};
	const {
		placeholder,
    searchText,
    inputChange = fn,
    onSubmit = fn,
		onSearch = fn,
	} = props;
  return (
  	<div className={styles.search}>
  		<SearchBar
        placeholder={placeholder}
        cancelText={searchText}
        onSubmit={val => {onSearch(val)}}
        onCancel={val => {onSearch(val)}}
        onChange={val => {inputChange(val)}}
        showCancelButton
      />
  	</div>
  );
}

export default Search;
