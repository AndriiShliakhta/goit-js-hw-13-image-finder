import articlesTpl from './templates/articles.hbs';
import './css/common.css';
import NewsApiService from './js/apiService';
import LoadMoreBtn from './js/components/load-more-btn';
import * as basicLightbox from 'basiclightbox'

const _ = require('lodash');
const refs = {
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('[name="query"]'),
  articlesContainer: document.querySelector('.gallery'),
  largeImgWrap: document.querySelector('.largeImgWrap'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

   
const newsApiService = new NewsApiService();

const onImagesSearch = _.debounce((e) => {
    newsApiService.query = e.target.value;

    if (newsApiService.query === '') {
      return alert('Please, enter something');
    }

    loadMoreBtn.show();
    newsApiService.resetPage();
    clearArticlesContainer();
    fetchArticles();
  }, 600)


refs.searchForm.addEventListener('input', onImagesSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);


function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
  refs.articlesContainer.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  })
}

function appendArticlesMarkup(articles) {
  refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles));
}

function clearArticlesContainer() {
  refs.articlesContainer.innerHTML = '';
}

function enlargeImage(e) {
  if(e.target.tagName!=='IMG'){return}
  const instance = basicLightbox.create(`<img src="${e.target.dataset.largeimg}" >`);
  instance.show();
}


refs.articlesContainer.addEventListener('click', enlargeImage)
