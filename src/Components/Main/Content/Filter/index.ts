import store from '../../../../store';
import List from '../List';
import style from './index.less';
import { throttle } from '../../../../util';

export default function Filter() {}

Filter.render = () => {
  return `
    <div class="${style.container}">
      <div class="${style['input-box']}">
        <i class="icon-search"></i>
        <input id="search" placeholder="search value" />
      </div>
      <ul id="filter_tab" class="${style['tab-box']}">
        <li data-key="All" tab="All" class="${style.selected}">All</li>
        <li data-key="Physical" tab="Physical">Physical</li>
        <li data-key="Virtual" tab="virtual">virtual</li>
      </ul>
      <div id="filter_style" class="${style['style-box']}">
        <i data-key="card" class="icon-th-card ${style.choose}"></i>
        <i data-key="list" class="icon-th-list"></i>
      </div>
    </div>
  `;
}

const handleChangeMenu = (tab: HTMLElement, tabDoms: HTMLElement[]) => {
  const { chooseTab } = store.getState();
  if (tab.dataset?.key !== chooseTab) {
    store.dispatch('setChooseTab', {
      chooseTab: tab.dataset?.key
    });
    tabDoms.forEach((item: HTMLElement) => {
      item.classList.remove(style.selected);
    });
    setTimeout(() => {
      tab.classList.add(style.selected);
      List.reload();
    });
  }
}

const handleChangeStyle = ($style: HTMLElement, styleDoms: HTMLElement[]) => {
  const { chooseStyle } = store.getState();
  if ($style.dataset?.key !== chooseStyle) {
    store.dispatch('setChooseStyle', {
      chooseStyle: $style.dataset?.key
    });
    styleDoms.forEach((item: HTMLElement) => {
      item.classList.remove(style.choose);
    });
    setTimeout(() => {
      $style.classList.add(style.choose);
    });
  }
}

const handleSearch = (e: Event | string) => {
  let value = e;
  if (e instanceof Object) {
    value = (e.target as HTMLInputElement).value;
  }
  store.dispatch('setSearchValue', {
    searchValue: value,
  });
  List.reload();
};

const handleSearchThrottle = throttle(handleSearch, 1000);

const handleSearchEvent = (e: Event) => {
  const newVal = (e.target as any).value;
  const { searchValue } = store.getState();

  if (searchValue !== newVal) {
    handleSearchThrottle.call(null, e);
  }

  if ((e as any).code === 'Enter') {
    if (searchValue !== newVal) {
      handleSearch(newVal);
    }
  }
};

Filter.effect = () => {
  const tabDoms = document.querySelectorAll('li[tab]');
  tabDoms.forEach((tab: HTMLElement) => {
    tab.addEventListener('click', handleChangeMenu.bind(null, tab, tabDoms), true);
  });
  const styleDoms = document.querySelectorAll('#filter_style i');
  styleDoms.forEach(($style: HTMLElement) => {
    $style.addEventListener('click', handleChangeStyle.bind(null, $style, styleDoms));
  });

  const search = document.querySelector('#search');
  (search as HTMLElement).addEventListener('keyup', handleSearchEvent);
}
