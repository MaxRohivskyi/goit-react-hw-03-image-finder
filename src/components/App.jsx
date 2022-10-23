import { Component } from 'react';
import { fetchImages } from './services/pixabay-api.js';
import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
import { Loader } from './Loader/Loader.jsx';
import {
  NotificationSuccess,
  NotificationError,
  Toast,
} from './Notification/Notification.jsx';
import { Wrapper } from './App.styled.js';
export class App extends Component {
  state = {
    images: [],
    page: 1,
    searchQuery: '',
    status: 'idle',
    showModal: false,
    loadMore: true,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const newQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const newPage = this.state.page;

    if (prevQuery !== newQuery || prevPage !== newPage) {
      this.setState({ status: 'pending', loadMore: true });
      try {
        const result = await fetchImages(newQuery, newPage);

        if (!result.length) {
          throw new Error();
        }

        if (result.length < 12) {
          this.setState({ loadMore: false });
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...result],
          status: 'resolved',
        }));
        NotificationSuccess({ result });
      } catch (err) {
        this.setState({ status: 'rejected' });
        NotificationError();
      }
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  findModalImage = (id, img, tags) => {
    this.setState({ modalImage: { id: id, img: img, tags: tags } });
  };

  formSubmitHandler = data => {
    this.setState({
      page: 1,
      images: [],
      searchQuery: data.inputParam,
    });
  };

  render() {
    const { images, modalImage, showModal, status, loadMore } = this.state;

    if (status === 'idle') {
      return (
        <Wrapper>
          <Searchbar onSubmit={this.formSubmitHandler} />;
        </Wrapper>
      );
    }

    if (status === 'pending') {
      return (
        <Wrapper>
          <Searchbar onSubmit={this.formSubmitHandler} />
          <ImageGallery
            images={images}
            modalImage={this.findModalImage}
            toggleModal={this.toggleModal}
          />
          <Loader />
        </Wrapper>
      );
    }
    if (status === 'resolved') {
      return (
        <Wrapper>
          <Searchbar onSubmit={this.formSubmitHandler} />
          <ImageGallery
            images={images}
            modalImage={this.findModalImage}
            toggleModal={this.toggleModal}
          />
          {showModal && (
            <Modal onClose={this.toggleModal} modalImage={modalImage} />
          )}

          {loadMore && <Button loadMore={this.loadMore} />}
          <Toast result={this.result} />
        </Wrapper>
      );
    }

    if (status === 'rejected') {
      return (
        <Wrapper>
          <Searchbar onSubmit={this.formSubmitHandler} />
          <Toast />
        </Wrapper>
      );
    }
  }
}
