const API_KEY = "api_key=2bd960c847f1e70aa5daf865cddf9dfc";
const API_URL = "https://api.themoviedb.org/3/discover/movie?";
const PAGE_QUERY = "&page="
let PAGE_NUMBER = 0

/**
 * API RESQUEST example
 * https://api.themoviedb.org/3/movie/550?api_key=2bd960c847f1e70aa5daf865cddf9dfc
 *
 * Picture Prefix "https://www.themoviedb.org/t/p/w600_and_h900_bestv2"
 */
export function movieData(currentPage, fillArray) {
    PAGE_NUMBER = currentPage
    return fetch(API_URL + API_KEY + PAGE_QUERY + PAGE_NUMBER)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        fillArray(responseJson.results)
    });
}