import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Audio } from 'react-loader-spinner';

import { fetchPhotos } from 'services/api';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

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
    page: 1,
    status: STATUS.IDLE,
  };

  handleFormSubmit = async searchWord => {
    this.setState({ searchWord });

    if (searchWord.trim() === '') {
      toast.info('You cannot search by empty field, try again.');
      return;
    } else {
      try {
        this.setState({ status: STATUS.PENDING });

        const results = await fetchPhotos(searchWord);
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

  //   pageIncrement = () => {
  // this.setState(prevState => {{ page: prevState.page + 1 }})
  //   }

  render() {
    const { images, status } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />

        {status === STATUS.PENDING && (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="#3f51b5"
            ariaLabel="loading"
            wrapperStyle={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          />
        )}
        {status === STATUS.RESOLVED && <ImageGallery images={images} />}
      </>
    );
  }
}
