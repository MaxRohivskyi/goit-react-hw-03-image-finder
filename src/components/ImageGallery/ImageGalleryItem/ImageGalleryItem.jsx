import PropTypes from 'prop-types';
import { WrapperImageGalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imageData, modalImage, toggleModal }) => {
  return (
    <WrapperImageGalleryItem>
      <Image
        src={imageData.webformatURL}
        alt={imageData.tags}
        onClick={() => {
          toggleModal();
          modalImage();
        }}
        loading="lazy"
      />
    </WrapperImageGalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  imageData: PropTypes.object.isRequired,
  modalImage: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
