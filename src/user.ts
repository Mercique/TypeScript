import { renderBlock } from './lib.js';

export function renderUserBlock(favoriteItemsAmount: number | null) {
  const bool = Boolean(favoriteItemsAmount);
  const items: string | number | null = bool ? favoriteItemsAmount : 'ничего нет';

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="./img/newjawa.jpg" alt="Ilya Chvanov" />
      <div class="info">
          <p class="name">Ilya Chvanov</p>
          <p class="fav">
            <i class="heart-icon${favoriteItemsAmount ? ' active' : ''}"></i>${items}
          </p>
      </div>
    </div>
    `
  );
}
