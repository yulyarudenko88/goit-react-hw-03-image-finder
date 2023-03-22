import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchImages } from 'services/api';
import Searchbar from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    queryPage: 1,

    loading: false,
    images: [],
    totalImages: 0,

    error: false,
    // showModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.queryPage !== this.state.queryPage) {
      this.getImages();
    }
  }

  getImages = async () => {
    const { searchQuery, queryPage, images } = this.state;
    this.setState({ loading: true });

    if (searchQuery.trim() === '') {
      toast.info('You cannot search by empty field, try again.');
      this.setState({ loading: false });

      return;
    } else {
      try {
        const { totalHits, hits } = await fetchImages(searchQuery, queryPage);
        console.log(totalHits, hits);

        if (hits.length === 0) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          this.setState({ loading: false });
        } else {
          this.setState({
            images: queryPage === 1 ? hits : [...images, ...hits],
            totalImages: totalHits,
            loading: false,
          });
        }
      } catch (error) {
        this.setState({ error: true });
        toast.error('Sorry, something go wrong! Try again!');
      }
    }
  };

  handleFormSubmit = searchQuery => {
    this.setState({ queryPage: 1, searchQuery, loading: true }, this.getImages);
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ queryPage: prevState.queryPage + 1 }));
  };

  
  render() {
    const { loading, images, totalImages } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />

        <ImageGallery images={images} />
        {loading && <Loader />}
        {!loading && images.length > 0 && images.length < totalImages && (
          <Button onClick={this.handleLoadMore} />
        )}
      </>
    );
  }
}
