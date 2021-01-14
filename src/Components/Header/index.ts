import * as style from './index.less';
import * as menuStyle from '../Main/Menu/index.less';
import * as parentStyle from '../index.less';
import assets from "../../assets";
import store from "../../store";
const { logo } = assets;

export default function Header() {
}

Header.render = () => {
  const { user, userMenuDropdown } = store.getState();

  return `
    <div class="${style.container}" id="header">
      <img class="${style.logo}" src="${logo}" />
      <div class="${style['menu-box']}">
        <div id="menuBtn" class="${style['menu-btn']}">
          <i class="icon-navicon" ></i>
        </div>
        <div  class="${style['user-menu']}">
          <div class="${style['user-menu-btn']}">
            <div class="${style['user-box']}">
              <img src="${user.icon}" alt="图片加载失败" />
            </div>
            <i class="${userMenuDropdown ? 'icon-angle-up' : 'icon-angle-down'}"></i>
          </div>
          <ul class="${style['user-menu-dropdown']} ${userMenuDropdown ? style.visible : ''}">
            <li tooltip="${user.name}">
              <i class="icon-id-card"></i>
              <span>Profile</span>
            </li>
            <li>
              <i class="icon-sign-in"></i>
              <span>Sign Out</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  `;
}

const handleShowMenu = (e: Event) => {
  e.stopPropagation();
  const menu = document.querySelector('#menu');
  (menu as Element).classList.add(menuStyle['menu-show']);
}

const handleUserMenuToggle = () => {
  const { userMenuDropdown } = store.getState();
  store.dispatch('setUserMenuDrop', {
    userMenuDropdown: !userMenuDropdown
  });
  Header.reload();
};

const handleCancelUserMenu = () => {
  store.dispatch('setUserMenuDrop', {
    userMenuDropdown: false
  });
  Header.reload();
};

const handleCancelDropdownEvent = (e: Event) => {
  e.stopPropagation();
}

Header.effect = () => {
  const dom: Element | null = document.querySelector('#menuBtn');
  (dom as Element).addEventListener('click', handleShowMenu);

  const userMenuBtn = document.querySelector(`.${style['user-menu-btn']}`);
  (userMenuBtn as Element).addEventListener('click', handleUserMenuToggle);

  const userMenuDropdown = document.querySelector(`.${style['user-menu-dropdown']}`);
  (userMenuDropdown as Element).addEventListener('click', handleCancelDropdownEvent);

  window.addEventListener('click', handleCancelUserMenu);
}

Header.unBind = () => {
  const dom: Element | null = document.querySelector('#menuBtn');
  (dom as Element).removeEventListener('click', handleShowMenu);

  const userMenuBtn = document.querySelector(`.${style['user-menu-btn']}`);
  (userMenuBtn as Element).removeEventListener('click', handleUserMenuToggle);

  const userMenuDropdown = document.querySelector(`.${style['user-menu-dropdown']}`);
  (userMenuDropdown as Element).removeEventListener('click', handleCancelDropdownEvent);

  window.removeEventListener('click', handleCancelUserMenu);
}

Header.reload = () => {
  Header.unBind();
  setTimeout(() => {
    const parentDom = document.querySelector(`.${parentStyle.app}`);
    const oldDom = document.querySelector(`.${style.container}`);
    const newDom = document.createRange().createContextualFragment(Header.render());
    (parentDom as HTMLElement).replaceChild(newDom, (oldDom as Element));

    setTimeout(() => {
      Header.effect();
    })
  })
}
