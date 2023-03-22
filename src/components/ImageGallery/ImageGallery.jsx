import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ images }) => (
  <ImageGalleryList>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => (
      <ImageGalleryItem
        key={id}
        src={webformatURL}
        largeImageURL={largeImageURL}
        alt={tags}
      />
    ))}
  </ImageGalleryList>
);

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
