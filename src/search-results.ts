import { addBlock, renderBlock } from './lib.js';
import { Hotel } from './domain/hotel.js';

export function renderSearchStubBlock() {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  );
}

export function renderEmptyOrErrorSearchBlock(reasonMessage: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  );
}

export function renderSearchResultsBlock(hotels: Hotel[]) {
  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <form class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select id="select" name="select">
                <option value="cheap">Сначала дешёвые</option>
                <option value="expensive">Сначала дорогие</option>
                <!---<option name="near">Сначала ближе</option>--->
            </select>
        </form>
    </div>
    <ul class="results-list" id="results-list">
    </ul>
    `
  );
  hotels.length == 0
    ? renderEmptyOrErrorSearchBlock('nothing found')
    : renderHotels(hotels);
}

function renderHotels(hotels: Hotel[]) {
  for (let index = 0; index < hotels.length; index++) {
    const { title, details, photos, totalPrice } = hotels[index]!;
    if (photos) {
      renderHotel(title, details, photos[0]!, totalPrice);
    }
  }
}

function renderHotel(
  title: string,
  details: string,
  imgName: string,
  price: number
) {
  addBlock(
    'results-list',
    `
  <li class="result" style="list-style-type:none;">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites"></div>
            <img class="result-img" src="./img/${imgName}" alt="${imgName}">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${title}</p>
              <p class="price">${price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 1.1км от вас</div>
            <div class="result-info--descr">${details}</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
  `
  );
}

`<li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites active"></div>
            <img class="result-img" src="./img/result-1.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>YARD Residence Apart-hotel</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 2.5км от вас</div>
            <div class="result-info--descr">Комфортный апарт-отель в самом сердце Санкт-Петербрга. К услугам гостей номера с видом на город и бесплатный Wi-Fi.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites"></div>
            <img class="result-img" src="./img/result-2.png" alt="">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>Akyan St.Petersburg</p>
              <p class="price">13000&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 1.1км от вас</div>
            <div class="result-info--descr">Отель Akyan St-Petersburg с бесплатным Wi-Fi на всей территории расположен в историческом здании Санкт-Петербурга.</div>
            <div class="result-info--footer">
              <div>
                <button>Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>`;
