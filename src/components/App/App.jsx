import React, { Component } from 'react';
import { fetchPhotos } from "services/api";
// import { ToastContainer } from 'react-toastify';
import Searchbar from 'components/Searchbar/Searchbar';
// import PokemonInfo from './components/PokemonInfo';

const STATUS = {
	IDLE: 'idle',
	PENDING: 'pending',
	REJECTED: 'rejected',
	RESOLVED: 'resolved',
}
export class App extends Component {
  state = {
    searchWord: '',
  };

  handleFormSubmit = searchWord => {
    this.setState({ searchWord });
  };

  // getPhotos = this.state.searchWord => {
  //   console.log(fetchPhotos(this.state.searchWord))
  // }

  render() {
    return (
      <Searchbar onSubmit={this.handleFormSubmit}/>
    );
  }
}