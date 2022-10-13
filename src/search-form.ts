import { renderBlock } from './lib.js';

export function renderSearchFormBlock(checkin: string | null, checkout: string | null) {
  const today: Date = new Date();
  const lastDayOfNextMonth: Date = new Date(today.getFullYear(), today.getMonth() + 2, 0);

  const formatDate = (date: Date, day: number): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + day}`;
  }

  const getInputDate = (value: string | null, day: number) => {
    return value === null ? formatDate(today, day) : value;
  }

  renderBlock(
    'search-form-block',
    `
    <form id="searchForm">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${getInputDate(checkin, 1)}" min="${formatDate(today, 0)}" max="${formatDate(lastDayOfNextMonth, 0)}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${getInputDate(checkout, 3)}" min="${formatDate(today, 2)}" max="${formatDate(lastDayOfNextMonth, 0)}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button type="submit">Найти</button></div>
          </div>
          <div id="display"></div>
        </div>
      </fieldset>
    </form>
    `
  );
}
