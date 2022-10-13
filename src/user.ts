import { renderBlock } from './lib.js';

export function renderUserBlock(userName: string, userIconUrl: string, favoriteItemsAmount: number) {
  // const favoritesCaption = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет';
  // const hasFavoriteItems = favoriteItemsAmount ? true : false;
  const items: string | number = favoriteItemsAmount ? favoriteItemsAmount : 'ничего нет';

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src=${userIconUrl} alt="user avatar" />
      <div class="info">
          <p class="name">${userName}</p>
          <p class="fav">
            <i class="heart-icon${favoriteItemsAmount ? ' active' : ''}"></i>${items}
          </p>
      </div>
    </div>
    `
  );
}
