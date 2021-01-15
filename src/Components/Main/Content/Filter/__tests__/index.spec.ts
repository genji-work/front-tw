import store from '../../../../../store';
import Filter from '../index';


describe('component Filter module', () => {
  test('render', () => {
    expect(Filter.render).toBeInstanceOf(Function);
    const domStr = Filter.render();
    document.body.innerHTML = domStr;
    expect(document.body.firstElementChild?.tagName).toBe('DIV');

    const effects = Filter.effect();
    expect(effects).toBeUndefined();
    expect(Filter.effect).toBeInstanceOf(Function);

    jest.spyOn(store, 'dispatch');
    const tabDoms = document.querySelectorAll('#filter_tab li');
    tabDoms.forEach((tab: HTMLElement) => {
      tab.click();
      setTimeout(() => {
        expect((store as any).dispatch).toBeCalled();
      })
    });

    const styleDoms = document.querySelectorAll('#filter_style i');
    styleDoms.forEach((style: HTMLElement) => {
      style.click();
      setTimeout(() => {
        expect((store as any).dispatch).toBeCalled();
      })
    });
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });
});
