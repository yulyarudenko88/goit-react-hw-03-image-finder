import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ImageModal } from './Modal.styled';

export class Modal extends Component {
  state = {
    isOpenModal: null,
  };

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
    // const { src, alt } = this.props;

    return (
      createPortal(<Overlay onClick={this.checkEvent}>
        <ImageModal>
          {/* <img src={src} alt={alt} /> */}
        </ImageModal>
      </Overlay>,
      modalRoot
    )
    );
  }
}