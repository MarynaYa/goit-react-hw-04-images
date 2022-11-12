const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30006168-b05b26a813c039d7750d56cf6';

function fetchGallery(searchQuery, page) {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Did not find anything by request ${searchQuery}`)
    );
  });
}

const Api = {
  fetchGallery,
};
export default Api;