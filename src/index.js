import './css/styles.css';
const url = 'https://pixabay.com/api/';
const KEY = '34347073-8f1b60398676bada9d735fc2f';
const restAPI = '&image_type=photo&orientation=horizontal&safesearch=true';

function searchPhoto(namePhoto) {
  return fetch(`${url}?key=${KEY}&q=${namePhoto}${restAPI}`).then(res => {
    //     .then(object => {
    // if (object.totalHits === 0) {
    //   console.log(
    //     'Sorry, there are no images matching your search query. Please try again'
    //   );
    // }
    return res.json();
  });
}

const searchFormPoto = document.querySelector('#search-form');
const galleryPhoto = document.querySelector('.gallery');

// webformatURL - посилання на маленьке зображення для списку obкарток.scr
// largeImageURL - посилання на велике зображення.href
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.

searchFormPoto.addEventListener('submit', onSubmitPhoto);
function onSubmitPhoto(e) {
  e.preventDefault();
  const queryPhoto = e.target.elements.searchQuery.value.trim();
  console.log(searchPhoto(queryPhoto));
}

// функція для свторення картки
function cardPhoto(arr) {
  const markUp = arr.hits
    .map(el => {
      `<div class="photo-card"><a a class="gallery-link" href="${el.largeImageURL}"><img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
        </a>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${el.likes}
      </p>
      <p class="info-item">
        <b>Views</b>${el.views}
      </p>
      <p class="info-item">
        <b>Comments</b>${el.comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${el.downloads}
      </p>
    </div>
    </div>`;
    })
    .join('');
  galleryPhoto.insertAdjacentHTML('afterbegin', markUp);
}
