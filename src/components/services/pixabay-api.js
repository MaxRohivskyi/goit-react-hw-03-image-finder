import axios from 'axios';

export const fetchImages = async (newQuery, newPage) => {
  const response = await axios.get('https://pixabay.com/api/', {
    params: {
      key: '29839584-3a38ab7cf912f63d406c8dc49',
      q: newQuery,
      image_type: `photo`,
      orientation: 'horizontal',
      per_page: 12,
      page: newPage,
    },
  });
  return response.data.hits;
};
