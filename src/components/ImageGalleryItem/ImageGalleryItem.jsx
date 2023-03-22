import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageItem, Image } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
    console.log('modal', this.state);
  };

  render() {
    const { src, largeImageURL, alt } = this.props;
    return (
      <ImageItem>
        <Image src={src} alt={alt} onClick={this.toggleModal} />

        {this.showModal && (
          <Modal>
            <Image src={largeImageURL} alt={alt} onClose={this.toggleModal} />
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
