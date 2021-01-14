import store from '../../../../../store';
import Statistics from '../index';


const state = {
  cruises: [
    {status: 'building'},
    {status: 'idle'},
    {opType: 'Physical'},
    {opType: 'Virtual'}
  ]
};
describe('component Statistics module', () => {
  test('render', () => {
    store.reducer(state)
    expect(Statistics.render).toBeInstanceOf(Function);
    const domStr = Statistics.render();
    const dom = document.createRange().createContextualFragment(domStr);
    expect(dom.firstElementChild?.tagName).toBe('DIV');
    expect(Statistics.reload).toThrowError();
  });
});