import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => (
  <ImageGalleryList>
    {images.map(({ id, webformatURL, largeImageURL }) => (
      <ImageGalleryItem key={id} src={webformatURL} alt={largeImageURL} />
    ))}
  </ImageGalleryList>
);

ImageGallery.propTypes = {
  id: PropTypes.string.isRequired,
};
