import { Component } from 'react';
import PropTypes from 'prop-types';
import { VscSearch } from "react-icons/vsc";
import {
  Header,
  SearchForm,
  SearchButton,
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
            <VscSearch size={20} />
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
