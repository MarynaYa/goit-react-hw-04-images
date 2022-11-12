import { Overley, Container } from './Modal.styled';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ onClose, largeImage }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

 const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };


    return (
      <Overley onClick={handleBackdropClick}>
        <Container>
          <img src={largeImage} alt="" />
        </Container>
      </Overley>
 
    );
  };

  Modal.propTypes = {
    //image: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };


