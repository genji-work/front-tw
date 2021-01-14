import store from '../../../../../../store';
import Statistics from '../../../Statistics';
import Item from '../index';

const item = {
  os: 'windows',
  status: 'building',
  url: 'https://xxx.com',
  ip: '127.0.0.1',
  path: 'xxx',
  id: 'A',
  browser: ['ie', 'chrome'],
};

describe('component ListItem module', () => {
  let storeState: any = null;

  beforeEach(() => {
    storeState = store.getState();
  });

  afterEach(() => {
    storeState && store.reducer(storeState);
    document.body.innerHTML = '';
  });

  test('render', () => {
    store.reducer({cruises: [item]})
    expect(Item.render).toBeInstanceOf(Function);
    // creaet ul
    const ul = document.createElement('ul');
    ul.id = 'main_list';
    const domStr = Item.render(item);
    ul.innerHTML = domStr;
    document.body.appendChild(ul);

    expect(document.body.firstElementChild?.tagName).toBe('UL');

    Item.effect();
    const btns = document.querySelectorAll('div[id^="btn_status_"]');

    jest.spyOn(Item, 'reload');
    jest.spyOn(Item, 'unBind');
    jest.spyOn(Statistics, 'reload').mockImplementation(() => void 0);
    btns.forEach((btn: HTMLElement) => btn.click());

    expect(Item.reload).toBeCalled();
    expect(Item.unBind).toBeCalled();
  });
});
