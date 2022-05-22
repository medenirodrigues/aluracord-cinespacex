const api_key = process.env.NEXT_PUBLIC_API_KEY;
const api_url = process.env.NEXT_PUBLIC_API_URL;
const api_movieUrl = process.env.NEXT_PUBLIC_API_A_MOVIE_URL;
const pageQuery = process.env.NEXT_PUBLIC_PAGE_QUERY;
let pageNumber = process.env.NEXT_PUBLIC_PAGE_NUMBER;

/**
 * Picture Prefix "https://www.themoviedb.org/t/p/w600_and_h900_bestv2"
 */
export function movieData(fillArray, currentPage) {
    pageNumber = currentPage
    fetch(api_url + api_key + pageQuery + pageNumber)
      .then((response) => response.json())
      .then((respJson) => {
        fillArray((movieArray) => [...movieArray, ...respJson.results])
    });
}

export function selectedMovieData(MOVIE_ID) {
  const getMovieDetails = fetch(api_movieUrl + MOVIE_ID + '?' + api_key)
    .then((response) => response.json())
    .then((aMovieRespJson) => {
      return aMovieRespJson;
    })
  return getMovieDetails;
}