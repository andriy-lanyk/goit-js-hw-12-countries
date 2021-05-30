import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const countriesList = document.querySelector('.js-list');

export default function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => {
      if (!response.ok) {
        countriesList.innerHTML = '';
        if (response.status === 404) {
          error({
            text: 'There is no country with such name. Please enter a correct query!',
            width: '420px',
            minHeight: '20px',
            maxTextHeight: null,
            delay: 4000,
          });
        } else {
          error({
            text: 'We have problem with a server. Please try again!',
            width: '420px',
            minHeight: '20px',
            maxTextHeight: null,
            delay: 4000,
          });
        }
      }
      return response.json();
    })
    .then(data => data);
}
