import React, { Component } from 'react';
import { Overlay, ImageModal } from './Modal.styled';

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
    // const { src, alt } = this.props;

    return (
      <Overlay onClick={this.checkEvent}>
        <ImageModal>
          {/* <img src={src} alt={alt} /> */}
        </ImageModal>
      </Overlay>
    );
  }
}