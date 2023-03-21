import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchFormLabel,
  SearchFormInput,
} from './Searchbar.styled';

export default class Searchar extends Component {
  state = {
    searchWord: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({ searchWord: value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchWord);
    this.reset();
  };

  reset = () => {
    this.setState({ searchWord: '' });
  };

  render() {
    const { searchWord } = this.state;
    
    return (
      <Header>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchFormLabel>Search</SearchFormLabel>
          </SearchButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchWord}
            onChange={this.handleChange}
          />
        </SearchForm>
      </Header>
    );
  }
}

Searchar.propTypes = {
  onSubmit: PropTypes.func,
};
