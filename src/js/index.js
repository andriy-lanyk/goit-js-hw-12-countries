import debounce from 'lodash.debounce';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import countriesListTpl from '../../src/templates/countries-list.hbs';
import countryArticleTpl from '../../src/templates/country-article.hbs';
import '../sass/main.scss';
import fetchCountries from './fetchCountries.js';

const input = document.querySelector('[name="countries"]');
const countriesList = document.querySelector('.js-list');

input.addEventListener('input', debounce(chooseCountry, 500));

countriesList.innerHTML = '';

function chooseCountry(e) {
  let searchQuery = e.target.value;
  if (searchQuery.trim() === '') {
    countriesList.innerHTML = '';
    return;
  }

  fetchCountries(searchQuery).then(data => {
    if (data.length >= 2 && data.length <= 10) {
      return createCountriesList(data);
    }
    if (data.length === 1) {
      return createCountryArticle(data);
    }
    if (data.length > 10) {
      return notification();
    }
  });
}

function createCountriesList(data) {
  countriesList.innerHTML = countriesListTpl(data);
}

function createCountryArticle(data) {
  countriesList.innerHTML = countryArticleTpl(data);
}

function notification() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
    width: '420px',
    minHeight: '20px',
    maxTextHeight: null,
    delay: 4000,
  });
}
