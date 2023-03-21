import React from 'react';
import PropTypes from 'prop-types';
import { ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ id, webformatURL, largeImageURL }) => (
  <ImageItem key={id}>
    <img src={webformatURL} alt={largeImageURL} />
  </ImageItem>
);

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
}
