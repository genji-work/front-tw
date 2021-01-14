import http from '../../service/index';
import store from '../index';

const cruises = {data: [{
  id: 1,
  browser: ['chrome', 'ie', 'firefox', 'safari']
}]};
const history = {data: []}
const user = {data: {}};

describe('store module', () => {
  jest.spyOn(http, 'get')
    .mockResolvedValueOnce(cruises)
    .mockResolvedValueOnce(history)
    .mockResolvedValueOnce(user)

  let storeState: any = null;

  beforeAll(() => {
    storeState = store.getState();
    store.init();
  });

  afterAll(() => {
    storeState && store.reducer(storeState);
  });

  test('store init test', () => {
    expect(store.state.cruises).toBeInstanceOf(Array);
  });

  test('store reducer & getState test', () => {
    store.reducer({test: 1});
    const state = store.getState();
    expect(state).toHaveProperty('test');
    expect(state?.test).toBe(1);
  });

  test('store dispatch test', () => {
    store.dispatch('setChooseTab', {test: 1});
    const state = store.state;
    expect(state).toHaveProperty('test');
    expect(state?.test).toBe(1);
    expect(() => store.dispatch('ErrorTrigger', {})).toThrowError('action is not defined');
  });

  test('store delete-browser test', () => {
    store.dispatch('deleteBrowserItem', {id: 1, index: 0, val: 'chrome'});
    const browsers = store.state.cruises?.[0]?.browser;
    expect(browsers).not.toContain('chrome');
  });

  test('store change-status test', () => {
    store.dispatch('changeStatus', {id: 1});
    const status = store.state.cruises?.[0].status;
    expect(status).toBe('idle');
  });

  // other functions
});