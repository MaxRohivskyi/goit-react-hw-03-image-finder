import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { WrapperImageGallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, modalImage, toggleModal }) => {
  return (
    <WrapperImageGallery>
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          imageData={image}
          toggleModal={() => toggleModal()}
          modalImage={() =>
            modalImage(image.id, image.largeImageURL, image.tags)
          }
        />
      ))}
    </WrapperImageGallery>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  modalImage: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
