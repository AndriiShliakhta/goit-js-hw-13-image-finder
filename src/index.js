import './sass/main.scss';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import { defaults } from '@pnotify/core';
import templateFunction from './template/templateList.hbs';

defaults.mode='light'
defaults.animateSpeed = '100ms';
defaults.hide = true;
defaults.delay = 300;
defaults.closer = false;
defaults.sticker = false;

const _ = require('lodash');

const input = document.querySelector('[name="query"]');
const gallery = document.querySelector('.gallery');


const createMarkup = function (data) {
  gallery.innerHTML = templateFunction(data.hits);    
}



const onImagesSearch = _.debounce(() => {
  if (!input.value || input.value === ' ') { return }

  fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${input.value}&page=1&per_page=12&key=23115860-3b173cd8cbd28dc69cb35b572`)
    .then(response => {
      return response.json();
    })
    .then( createMarkup )
  }, 500)


input.addEventListener('input', onImagesSearch)
