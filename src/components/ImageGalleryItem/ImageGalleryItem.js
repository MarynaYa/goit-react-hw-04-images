import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  id,
  webformatURL,
  tags,
  largeImageURL,
  onOpenImage,
})  {
  const handleOpenIamge = () => {
    onOpenImage(largeImageURL);
  };

  return (
    <li className={s.galleryItem} key={id}>
      <img className={s.galleryImg}
        alt={tags}
        src={webformatURL}
        data-source={largeImageURL}
        onClick={handleOpenIamge}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number,
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenImage: PropTypes.func,
};

