import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchPhotos } from 'services/api';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};
export class App extends Component {
  state = {
    searchWord: '',
    images: [],
    totalHits: 0,
    queryPage: 1,
    status: STATUS.IDLE,
  };

  handleFormSubmit = async searchWord => {
    this.setState({ queryPage: this.resetPage(), searchWord });
    const { queryPage } = this.state;

    if (searchWord.trim() === '') {
      toast.info('You cannot search by empty field, try again.');
      return;
    } else {
      try {
        this.setState({ status: STATUS.PENDING });

        const results = await fetchPhotos(searchWord, queryPage);
        console.log(results);
        const { totalHits, hits } = results;

        if (hits.length === 0) {
          this.setState({ status: STATUS.IDLE });
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState({
            images: hits,
            totalHits,
            status: STATUS.RESOLVED,
          });
        }
      } catch (error) {
        this.setState({ status: STATUS.REJECTED });
      }
    }
  };

  handleLoadMore = async () => {
    this.setState({ queryPage: this.incrementPage(), status: STATUS.PENDING });
    const { queryPage } = this.state;

    try {
      const results = await fetchPhotos( queryPage);
        console.log(results);
        const { hits } = results;
      
      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        status: STATUS.RESOLVED,
      }));
    } catch (error) {
      this.setState({  status: STATUS.REJECTED } );
    }
  };

  resetPage() {
    this.setState({ queryPage: 1 });
  }

  incrementPage() {
    this.setState(prevState => ({ queryPage: prevState.queryPage + 1 }));
  }

  render() {
    const { images, status } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />

        {status === STATUS.PENDING && <Loader />}
        {status === STATUS.RESOLVED && (
          <>
            <ImageGallery images={images} />
            <Button onClick={this.handleLoadMore}/>
          </>
        )}
      </>
    );
  }
}
