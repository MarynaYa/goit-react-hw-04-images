import { Overley, Container } from './Modal.styled';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClickModal();
    }
  };

  handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClickModal();
    }
  };

  render() {
    const { largeImageURL } = this.props;
    return (
      <Overley onClick={this.handleBackdropClick}>
        <Container>
          <img src={largeImageURL} alt="" />
        </Container>
      </Overley>
 
    );
  }
}

Modal.propTypes = {
  //image: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};