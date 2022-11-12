import React, { Component } from "react";
//import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from "./Button/Button";
import ErrorMessage from "./ErrorMessage/ErrorMessage";
import Api from 'services/serviceApi';
import s from './App.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class App extends Component {
  state = {
    searchQuery: '',
    images: [],    
    page: 1,
    error: '',
    bigImage: '',
    largeImageURL: '',
    showModal: false,
    totalHits: 1,
    contentLoad: false,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImages = prevState.searchQuery;
    const nextImages = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImages !== nextImages) {
      this.setState({
        status: Status.PENDING,
        page: 1,
        images: [],
      });
      this.fetchGallery(nextImages, nextPage);
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      this.fetchGallery(nextImages, nextPage);
    }
    if (nextPage >= 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchGallery(nextImages, nextPage) {
    Api.fetchGallery(nextImages, nextPage)
      .then(data => {
        this.setState(prevState => {
          return {
            totalHits: data.totalHits,
            prevState,
            images: [...prevState.images, ...data.hits],
            status: Status.RESOLVED,
            searchQuery: nextImages,
          };
        });
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  }

 handleFormSubmit = searchQuery => {
  this.setState({ searchQuery, page: 1 });
 };

 toggleModal = largeImageURL => {
  this.setState(({ showModal, bigImage }) => ({
    showModal: !showModal,
    bigImage: largeImageURL,
  }));
};

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

render() {
  const { images, bigImage, status } = this.state; 

  if (status === Status.IDLE) {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
      </>
    );
  }
  if (status === Status.PENDING) {
    return <Loader />;
  }

  if (status === Status.REJECTED) {
    return <ErrorMessage message="Sorry, nothing was found, please try your search again" />;
  }

  if (status === Status.RESOLVED) {
  return (
    <div className={s.appDiv}>
       <Searchbar onSubmit={this.handleFormSubmit} />
      <ImageGallery images={images} toggleModal={this.toggleModal} />
       
        {this.state.showModal && (
            <Modal onClickModal={this.toggleModal} largeImageURL={bigImage} />
          )}
          {this.state.images.length !==this.state.totalHits && (
        // {!contentLoad && <Loader />}
        <Button onClick={this.handleLoadMore} />
          )}
    </div>
  );
}

};
}
export default App;