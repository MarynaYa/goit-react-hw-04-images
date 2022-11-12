import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

function ImageGallery({ images, onOpenImage }) {
    return (
        <ul className={s.galleryList}>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onOpenImage={onOpenImage}
            />
          ))}
        </ul>
      );
};

ImageGallery.propTypes = {
    images: PropTypes.array,
    onOpenImage: PropTypes.func,
  };
export default ImageGallery;