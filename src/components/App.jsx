import { useState, useEffect } from 'react';
//import ErrorMessage from './ErrorMessage/ErrorMessage';
import s from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';
import Api from 'apiServices/serviceApi';


export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [largeImage, setLargeImage] = useState('');
  const [totalPages, setTotalPages] = useState(null);
  const PER_PAGE = 12;
  
  const handleSearchSubmit = query => {
    if (searchQuery !== query) {
      setSearchQuery(query);
      setImages([]);
      setPage(1);
    }
  };

  const handleOpenLargeImage = imageUrl => {
    setShowModal(true);
    setLargeImage(imageUrl);
  };

  const handleAddPage = () => {
    setPage(prevState => prevState + 1);
    setLoading(true);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      return;
    }
    setLoading(true);
    Api
      .fetchGallery(searchQuery, page)
      .then(data => {
        setImages(prevState => [...prevState, ...data.hits]);
        setTotalPages(Math.ceil(data.totalHits / PER_PAGE));
        
      })
      .catch(error => console.error(error))
      .finally(() => {
        setLoading(false);   
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  }, [page, searchQuery]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const isButtonVisible = images.length > page && !loading;

  return (
    <div className={s.appDiv}>
      <Searchbar onSearch={handleSearchSubmit} />
      <ImageGallery images={images} onOpenImage={handleOpenLargeImage} />
      {loading && <Loader loading={loading} />}
      {isButtonVisible && page < totalPages && (
        <Button onClick={handleAddPage} />
      )}
     {showModal && <Modal onClose={toggleModal} largeImage={largeImage} />}
    </div>
  );
}

