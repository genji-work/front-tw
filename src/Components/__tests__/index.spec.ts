import App from '../index';

describe('component App module', () => {
  test('render & effect', () => {
    expect(App.render).toBeInstanceOf(Function);
    const domStr = App.render();
    document.body.innerHTML = domStr;
    expect(document.body.firstElementChild?.id).toBe('app');

    expect(App.effect()).toBeUndefined();
    expect(App.run()).toBeUndefined();
  });
});