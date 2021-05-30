export default function fetchCountries(searchQuery) {
  fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      if (data.length >= 2 && data.length <= 10) {
        console.log('data.length: ', data.length);
        return data.map(c => {
          c.name;
        });
      }
      if (data.length === 1) {
        return data.map(c => {
          c.name;
          c.flag;
          c.capital;
          c.population;
          c.languages.map(language => {
            language.name;
          });
        });
      }
    });
}
