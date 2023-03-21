import React from 'react';
import PropTypes from 'prop-types';
import { ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({src, alt }) => (
  <ImageItem>
    <img src={src} alt={alt} />
  </ImageItem>
);

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}
