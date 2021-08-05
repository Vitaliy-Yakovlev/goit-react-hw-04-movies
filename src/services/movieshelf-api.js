const BASE_URL = 'https://api.themoviedb.org';
const KEY_BASE = '040a69881556ed51ed6455576f17640b';

async function fetchWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

//Список самых популярных фильмов на сегодня для создания коллекции на главной странице
export function fetchMovies() {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/trending/all/day?api_key=${KEY_BASE}`,
  );
}

//Поиск кинофильма по ключевому слову на странице фильмов.
export function fetchMovieKeywordById(searchQuery) {
  return fetchWithErrorHandling(
    `${BASE_URL}/3/search/movie?api_key=${KEY_BASE}&language=en-US&query=${searchQuery}&page=1&include_adult=false`,
  );
}

// Запрос полной информации о фильме для страницы кинофильма по ID
export function fetchMovieById(movieId) {
  return fetchWithErrorHandling(`
${BASE_URL}/3/movie/${movieId}?api_key=${KEY_BASE}&language=en-US`);
}

// Запрос информации о актёрском составе для страницы кинофильма.
export function fetchMovieActorById(actorId) {
  return fetchWithErrorHandling(`
${BASE_URL}/3/movie/${actorId}/credits?api_key=${KEY_BASE}&language=en-US`);
}

// Запрос обзоров для страницы кинофильма.
export function fetchMoviePageById(movieId) {
  return fetchWithErrorHandling(`
${BASE_URL}/3/movie/${movieId}/reviews?api_key=${KEY_BASE}&language=en-US&page=1`);
}
