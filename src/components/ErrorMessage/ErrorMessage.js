import s from './ErrorMessage.module.css';
import PropTypes from 'prop-types';

export default function ErrorMessage({ message }) {
  return <p className={s.textError}>{message}</p>;
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};