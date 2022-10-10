import { renderBlock } from './lib.js';

export function renderUserBlock(
  userName: string,
  userIconUrl: string,
  favoriteItemsAmount: number
) {
  const favoritesCaption = favoriteItemsAmount
    ? favoriteItemsAmount
    : 'ничего нет';
  const hasFavoriteItems = favoriteItemsAmount ? true : false;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${
  userIconUrl ? userIconUrl : '/img/avatar.png'
} alt="Wade Warren" />
      <div class="info">
          <p class="name">${userName ? userName : 'Wade Warren'}</p>
          <p class="fav">
            <i class="heart-icon${
  hasFavoriteItems ? ' active' : ''
}"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}
