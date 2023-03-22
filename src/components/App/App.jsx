import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchPhotos } from 'services/api';
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
  };

  handleFormSubmit = async searchQuery => {
    this.setState({ queryPage: 1, searchQuery, loading: true, });
    const { queryPage } = this.state;
    // console.log(this.state);

    if (searchQuery.trim() === '') {
      toast.info('You cannot search by empty field, try again.');
      this.setState({ loading: false, });
      return;
    } else {
      try {
        const { totalHits, hits } = await fetchPhotos(searchQuery, queryPage);
        // console.log(totalHits, hits);
        if (hits.length === 0) {
          toast.warn(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          this.setState({ loading: false, });
        } else {
          this.setState({
            images: hits,
            totalImages: totalHits,
            loading: false,
          });
        }
      } catch (error) {
        this.setState({ error: true, });
      }
    }
  };

  handleLoadMore = async () => {
    this.setState({ queryPage: () => this.incrementPage(), loading: true, });
    const { searchQuery, queryPage } = this.state;
    // console.log(this.state);
    try {
      const results = await fetchPhotos(searchQuery, queryPage);
      const { hits } = results;

      this.setState(prevState => ({
        images: [...prevState.images, ...hits],
        loading: false,
      }));
    } catch (error) {
      this.setState({ error: true, });
    }
  };

  incrementPage() {
    this.setState(prevState => ({ queryPage: prevState.queryPage + 1 }));
  }

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
