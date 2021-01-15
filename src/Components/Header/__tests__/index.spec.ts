import EventBus from '../../../EventBus';
import Header from '../index';

describe('component header module', () => {
  jest.spyOn(EventBus, 'emit');
  test('render & effect', () => {
    expect(Header.render).toBeInstanceOf(Function);
    const domStr = Header.render();
    document.body.innerHTML = `<div class="app">${domStr}</div>`;

    const effects = Header.effect();
    expect(effects).toBeUndefined();

    const dom: HTMLElement | null = document.querySelector('#menuBtn');

    if (dom) {
      const div = document.createElement('div');
      div.id = 'menu';
      document.body.appendChild(div);

      dom.click();
    }

    const userMenuBtn: HTMLElement|null = document.querySelector(`.user-menu-btn`);
    userMenuBtn && userMenuBtn.click();

    const userMenuDropdown: HTMLElement|null = document.querySelector(`.user-menu-dropdown`);
    userMenuDropdown && userMenuDropdown.click();

    (document.body.firstElementChild as HTMLElement).click();
    expect(EventBus.emit).toBeCalled();

    document.body.click();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });
});
