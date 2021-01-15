import store from '../../../../../store';
import List from '../index';

const state = {
  ready: false,
  cruises: [{
    os: 'windows',
    status: 'building',
    url: 'www.xxx.com',
    ip: '127.0.0.1',
    path: 'www.yyy.com',
    id: 'A',
    browser: ['ie', 'chrome'],
    opType: 'Virtual',
  }],
  history: [],
  user: {},
  chooseMenu: 'dashboard',
  chooseTab: 'All',
  chooseStyle: 'card',
  searchValue: '',
};

describe('component List module', () => {
  let storeState: any = null;
  beforeEach(() => {
    storeState = store.getState();
    store.reducer(state);
  });

  afterEach(() => {
    store.reducer(storeState);
    document.body.innerHTML = '';
  });

  test('search test', () => {
    let render = List.render();
    expect(render).toMatch(/main_list/);
    state.searchValue = 'yyy';
    store.reducer(state)
    render = List.render();
    expect(render).toMatch(/main_list/);
    state.searchValue = 'xxx';
    store.reducer(state)
    expect(render).toMatch(/main_list/);
  });

  test('render & effect test', () => {
    expect(List.render).toBeInstanceOf(Function);
    const domStr = List.render();
    document.body.innerHTML = domStr;
    expect(document.body.firstElementChild?.id).toBe('main_list');

    List.effect();
  });
});
