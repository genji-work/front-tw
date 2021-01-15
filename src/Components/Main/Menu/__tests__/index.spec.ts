import store from '../../../../store';
import Menu from '../index';

describe('component Menu module', () => {
  jest.spyOn(store, 'dispatch');

  test('render & effect', () => {
    expect(Menu.render).toBeInstanceOf(Function);
    const { dispatch } = store as any;
    const domStr = Menu.render();
    document.body.innerHTML = domStr;
    expect(document.body.firstElementChild?.id).toBe('menu');

    const effects = Menu.effect();
    expect(effects).toBeUndefined();
    expect(Menu.effect).toBeInstanceOf(Function);
    // mock trigger

    const menuDoms = document.querySelectorAll(`.menus li`);
    menuDoms.forEach((menu: HTMLElement) => menu.click());
    expect(dispatch).toBeCalled();

    const menuClose: HTMLElement|null = document.querySelector('#menu_close');
    menuClose && menuClose.click();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });
});
