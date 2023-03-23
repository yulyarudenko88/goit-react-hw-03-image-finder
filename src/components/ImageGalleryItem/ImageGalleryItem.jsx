import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageItem, Image, ImageLarge } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
    // console.log('modal', this.state);
  };

  render() {
    const { src, largeImageURL, alt } = this.props;
    const { showModal } = this.state;

    return (
      <ImageItem>
        <Image src={src} alt={alt} onClick={this.toggleModal} />

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <ImageLarge src={largeImageURL} alt={alt} />
          </Modal>
        )}
      </ImageItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
