import debounce from 'lodash.debounce';
import countriesList from '..templates/countries-list.hbs';
import '../sass/main.scss';

import fetchCountries from './fetchCountries.js';

const input = document.querySelector('[name="countris"]');

input.addEventListener('input', debounce(changeCountry, 500));

function changeCountry(e) {
  let searchQuery = e.target.value;

  fetchCountries(searchQuery);
}
