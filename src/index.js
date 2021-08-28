import articlesTpl from './templates/articles.hbs';
import './css/common.css';
import NewsApiService from './js/news-service';
import LoadMoreBtn from './js/components/load-more-btn';

const _ = require('lodash');

const refs = {
  searchForm: document.querySelector('.search-form'),
  searchInput: document.querySelector('[name="query"]'),
  articlesContainer: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

   


const newsApiService = new NewsApiService();

const onImagesSearch = _.debounce((e) => {
    newsApiService.query = e.target.value;

  if (newsApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
  }, 600)


refs.searchForm.addEventListener('input', onImagesSearch);
// refs.searchForm.addEventListener('input', e=> refs.articlesContainer.scrollIntoView({
//   behavior: 'smooth',
//   block: 'end',
// }));
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);
// loadMoreBtn.refs.button.addEventListener('click', ()=> );




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
