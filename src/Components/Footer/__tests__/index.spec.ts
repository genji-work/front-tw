import Footer from '../index';

describe('component footer module', () => {
  test('render', () => {
    expect(Footer.render).toBeInstanceOf(Function);
    const domStr = Footer.render();
    const dom = document.createRange().createContextualFragment(domStr);
    expect(dom.firstElementChild?.tagName).toBe('DIV');
  });
});