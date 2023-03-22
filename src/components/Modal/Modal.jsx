import { Component } from 'react';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';
import { Overlay, ImageModal } from './Modal.styled';

const modalRoot = document.getElementById('modal-root');
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.checkEvent);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.checkEvent);
  }

  checkEvent = e => {
    if (e.code === 'Escape' || e.target === e.currentTarget) {
      // this.props.toggleModal({ status: false });
    }
  };

  render() {
    const { src, alt } = this.props;

    return createPortal(
      <Overlay onClick={this.checkEvent}>
        <ImageModal>
          <img src={src} alt={alt} />
        </ImageModal>
      </Overlay>,
      modalRoot
    );
  }
}
