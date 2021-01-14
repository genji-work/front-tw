import Main from '../index';

describe('component header module', () => {
  test('render & effect', () => {
    expect(Main.render).toBeInstanceOf(Function);
    const domStr = Main.render();
    document.body.innerHTML = domStr;

    // const effects = Main.effect();
    expect(Main.effect).toBeInstanceOf(Function);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });
});
