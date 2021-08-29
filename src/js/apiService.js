const BASE_URL = 'https://pixabay.com';


export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    const url = `${BASE_URL}/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=23115860-3b173cd8cbd28dc69cb35b572`;

    return fetch(url)
      .then(response => response.json())
      .then(({hits}) => { 
        this.incrementPage();
        return hits;
      })
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
