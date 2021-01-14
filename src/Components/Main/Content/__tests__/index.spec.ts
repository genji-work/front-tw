import Content from '../index';

describe('component Content module', () => {
  test('render & effect', () => {
    expect(Content.render).toBeInstanceOf(Function);
    const domStr = Content.render();
    document.body.innerHTML = domStr;
    expect(document.body.firstElementChild?.tagName).toBe('DIV');

    const effects = Content.effect();
    expect(effects).toBeUndefined();
    expect(Content.effect).toBeInstanceOf(Function);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });
});