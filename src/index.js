import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from 'axios';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const url = 'https://pixabay.com/api/';
const KEY = '34347073-8f1b60398676bada9d735fc2f';
const restAPI = '&image_type=photo&orientation=horizontal&safesearch=true';

function searchPhoto(namePhoto, page, perPage = 40) {
  return fetch(
    `${url}?key=${KEY}&q=${namePhoto}${restAPI}&page=${page}&per_page=${perPage}`
  ).then(res => {
    return res.json();
  });
}

const searchFormPoto = document.querySelector('#search-form');
const galleryPhoto = document.querySelector('.gallery');

searchFormPoto.addEventListener('submit', onSubmitPhoto);
async function onSubmitPhoto(e) {
  e.preventDefault();
  const queryPhoto = e.target.elements.searchQuery.value.trim();
  if (!queryPhoto) {
    return;
  }
  const data = await searchPhoto(queryPhoto); // значення що сформоване
  cardPhoto(data);
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
}

// створення виклику
const lightbox = new SimpleLightbox('.gallery a').refresh();
