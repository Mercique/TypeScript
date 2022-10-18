import { renderSearchFormBlock } from './search-form.js';
import {
  renderSearchStubBlock,
  renderSearchResultsBlock,
  renderHotel,
} from './search-results.js';
import { renderUserBlock } from './user.js';
import {
  renderToast,
  getUserData,
  getFavoritesAmount,
  Place,
  SearchFormData,
} from './lib.js';

localStorage.setItem(
  'user',
  JSON.stringify({
    username: 'Chvanov Ilya',
    avatarUrl: '../img/newjawa.jpg',
  })
);

localStorage.setItem('favoritesAmount', '11');

const { username, avatarUrl } = JSON.parse(getUserData('user'));

window.addEventListener('DOMContentLoaded', () => {
  const favoritesAmount: number = +getFavoritesAmount('favoritesAmount');
  renderUserBlock(username, avatarUrl, favoritesAmount);
  renderSearchFormBlock(null, null);
  renderSearchStubBlock();
  // renderToast(
  //   {
  //     text: 'Это пример уведомления. Используйте его при необходимости',
  //     type: 'success',
  //   },
  //   {
  //     name: 'Понял',
  //     handler: () => {
  //       console.log('Уведомление закрыто');
  //     },
  //   }
  // );
  handleSearch();
});

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
    fetch('http://localhost:3000/places')
      .then<Place>((res) => res.json())
      .then((hotels) => {
        document.getElementById('search-results-block').innerHTML = '';
        const getHotels = Object.values(hotels);
        
        const filteredHotels = getHotels.filter((hotel) => {
          if (searchData.maxPrice) {
            return (
              hotel.price < searchData.maxPrice &&
              !hotel.bookedDates.includes(searchData.checkIn) &&
              !hotel.bookedDates.includes(searchData.checkOut)
            );
          } else
            return (
              !hotel.bookedDates.includes(searchData.checkIn) &&
              !hotel.bookedDates.includes(searchData.checkOut)
            );
        });
        filteredHotels.forEach((hotel: Place) => {
          renderHotel(hotel);
        });
        
        toggleFavoriteItem();
      });
  }
}

function toggleFavoriteItem() {
  document.querySelectorAll('.favorites').forEach((item) =>
    item.addEventListener('click', () => {
      const hotel = {
        id: item.getAttribute('hotel_id'),
        name: item.getAttribute('hotel_name'),
        image: item.getAttribute('hotel_img'),
      };

      let items: object = JSON.parse(localStorage.getItem('favoriteItems'));

      if (items) {
        if (Object.prototype.hasOwnProperty.call(items, hotel.id)) {
          delete items[`${hotel.id}`];
          item.classList.remove('active');
        } else {
          items[`${hotel.id}`] = hotel;
          item.classList.add('active');
        }
      } else {
        items = {};
        items[`${hotel.id}`] = hotel;
        item.classList.add('active');
      }
      localStorage.setItem('favoriteItems', JSON.stringify(items));
      const favoritesAmount: number = +getFavoritesAmount('favoriteItems');
      renderUserBlock(username, avatarUrl, favoritesAmount);
    })
  );
}
