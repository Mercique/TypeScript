import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast, getUserData, getFavoritesAmount } from './lib.js';

localStorage.setItem(
  'user',
  JSON.stringify({
    username: 'Chvanov Ilya',
    avatarUrl: '../img/newjawa.jpg',
  })
);

localStorage.setItem('favoritesAmount', '11');

const { username, avatarUrl } = JSON.parse(getUserData('user'));
const favoritesAmount: number = +getFavoritesAmount('favoritesAmount');

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock(username, avatarUrl, favoritesAmount);
  renderSearchFormBlock(null, null);
  renderSearchStubBlock();
  renderToast(
    {
      text: 'Это пример уведомления. Используйте его при необходимости',
      type: 'success',
    },
    {
      name: 'Понял',
      handler: () => {
        console.log('Уведомление закрыто');
      },
    }
  );
  handleSearch();
});

interface SearchFormData {
  checkIn: string;
  checkOut: string;
  maxPrice: number;
}

//interface Place {}

function handleSearch(): SearchFormData {
  console.log('handleSearch');
  const searchData: SearchFormData = {
    checkIn: '',
    checkOut: '',
    maxPrice: 0,
  };
  
  const form = document.getElementById('searchForm');
  let formData = null;

  if (form instanceof HTMLFormElement) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formData = new FormData(form);
      searchData.checkIn = formData.get('checkin');
      searchData.checkOut = formData.get('checkout');
      searchData.maxPrice = formData.get('price');
      search(searchData);
      return searchData;
    });
  }
  return null;
}

function search(searchData: SearchFormData) {
  if (searchData != null) {
    console.log(searchData);
  }
}
