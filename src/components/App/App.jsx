import { Component } from 'react';
// import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar/Searchbar';
// import PokemonInfo from './components/PokemonInfo';

export class App extends Component {
  state = {
    searchWord: '',
  };

  handleFormSubmit = searchWord => {
    this.setState({ searchWord });
  };

  render() {
    return (
      <Searchbar onSubmit={this.handleFormSubmit}/>
    );
  }
}