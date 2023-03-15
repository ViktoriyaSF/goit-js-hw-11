import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const url = 'https://pixabay.com/api/';
const KEY = '34347073-8f1b60398676bada9d735fc2f';
const restAPI = '&image_type=photo&orientation=horizontal&safesearch=true';

function searchPhoto(namePhoto, page = 1, perPage = 40) {
  return fetch(
    `${url}?key=${KEY}&q=${namePhoto}${restAPI}&page=${page}&per_page=${perPage}`
  ).then(res => {
    return res.json();
  });
}

const searchFormPoto = document.querySelector('#search-form');
const galleryPhoto = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
// loadMoreBtn.style.display = 'none';

searchFormPoto.addEventListener('submit', onSubmitPhoto);
loadMoreBtn.addEventListener('click', onLoadMore);

// кнопка пошуку
async function onSubmitPhoto(e) {
  e.preventDefault();
  galleryPhoto.innerHTML = '';
  const queryPhoto = e.target.elements.searchQuery.value.trim();
  if (!queryPhoto) {
    return Notify.failure(
      'Sorry, the search field cannot be empty. Please enter information to search.'
    );
  }
  const data = await searchPhoto(queryPhoto); // значення що сформоване

  cardPhoto(data); // формуваннякартки
  messageInfo(data); // формування повідолень
  loadMoreBtn.style.display = 'block';
  e.target.reset(); // чистка input
  onLoadMore(data);
}

// функція для створення картки вибираючи по hits
function cardPhoto(arr) {
  const markUp = arr.hits
    .map(el => {
      return `
    <div class="photo-card">
    <a class="gallery-link" href="${el.largeImageURL}">
    <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" />
    </a>
    <div class="info">
    <p class="info-item"><b>Likes</b>${el.likes}
    </p>
    <p class="info-item"><b>Views</b>${el.views}
    </p>
    <p class="info-item"><b>Comments</b>${el.comments}
    </p>
    <p class="info-item"><b>Downloads</b>${el.downloads}
    </p>
    </div>
    </div>`;
    })
    .join('');
  galleryPhoto.insertAdjacentHTML('afterbegin', markUp);
  // зображення слайд картинки
  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
  }).refresh();
}
function messageInfo(arr) {
  if (arr.hits.length === 0) {
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  return Notify.success(`Hooray! We found ${arr.totalHits} images.`);
}
// кнопка завантаження

function onLoadMore(arr) {
  console.log(arr.hits.length);
  if (arr.hits.length > 40) {
    // loadMoreBtn.style.display = 'block';
    page += 1;
    return searchPhoto(namePhoto, page, perPage);
  } else {
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}
