import store from '../../../store';

import * as style from './index.less';

export default function Menu() {}

interface Menu {
  id: string;
  name: string;
  icon: string;
}

const MENUS: Array<Menu> = [
  {
    id: 'dashboard',
    name: 'DASHBOARD',
    icon: 'icon-dashboard'
  },
  {
    id: 'agent',
    name: 'AGENT',
    icon: 'icon-sitemap'
  },
  {
    id: 'my_cruise',
    name: 'MY CRUISE',
    icon: 'icon-boat'
  },
  {
    id: 'help',
    name: 'HELP',
    icon: 'icon-life-bouy'
  }
]

const menus = () => MENUS.map((menu: Menu) => {
  const { chooseMenu } = store.getState();
  return  `
    <li id="menu_${menu.id}" class="${menu.id === chooseMenu ? style.selected : ''}">
      <i class="${menu.icon}"></i>
      <span>${menu.name}</span>
    </li>
  `;
}).join('');

const histories = () => {
  const { history } = store.getState();
  return history.map((item: any) => `
    <li tooltip="${item.url}">
      <i></i>
      <span>${item.url}</span>
    </li>
  `).join('');
}

Menu.render = () => {
  return `
    <div id="menu" class="${style.container}">
      <div class="${style.header}">
        <i class="icon-close" id="menu_close"></i>
      </div>
      <ul class="${style.menus}">
        ${menus()}
      </ul>
      <div class="${style.footer}">
        <label class="${style['footer-title']}">History</label>
        <ul class="${style.histories}">
          ${histories()}
        </ul>
      </div>
    </div>
  `;
}

Menu.effect = () => {
  const menuDoms = document.querySelectorAll(`.${style.menus} li`);

  menuDoms.forEach((dom: HTMLElement) => {
    dom.addEventListener('click', () => {
      const { chooseMenu } = store.getState();
      const sourceId: string | null = dom.getAttribute('id');
      if (`menu_${chooseMenu}` !== sourceId) {
        menuDoms.forEach((child: HTMLElement) => {
          child.classList.remove(style.selected);
        })
        store.dispatch('setChooseMenu', {
          chooseMenu: sourceId?.replace(/menu_/g, ''),
        });
        dom.classList.add(style.selected);
      }
    })
  });

  const menuClose = document.querySelector('#menu_close');

  (menuClose as Element).addEventListener('click', () => {
    const menu = document.querySelector('#menu');
    menu?.classList.remove(style['menu-show']);
  });
}
