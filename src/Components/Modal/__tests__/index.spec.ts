import EventBus from '../../../EventBus';
import store from '../../../store';
import Modal from '../index';

describe('component modal module', () => {
  jest.spyOn(EventBus, 'emit');
  let storeState: any = null;

  beforeAll(() => {
    const domStr = Modal.render();
    document.body.innerHTML = `<div class="app">${domStr}</div>`;

    storeState = store.getState();
    store.reducer({modalProps: {id: 1}});
  });

  afterAll(() => {
    storeState && store.reducer(storeState);
    document.body.innerHTML = '';
  });
  test('effect', () => {
    Modal.effect();

    const addInput: HTMLInputElement|null = document.querySelector('#add_input');
    addInput && (addInput.value = 'chrome');

    const addBtn: HTMLElement|null = document.querySelector('#add_modal_btn');
    addBtn && addBtn.click();

    const icon: HTMLElement|null = document.querySelector('#cancel_modal_icon');
    icon && icon.click();

    const cancelBtn: HTMLElement|null = document.querySelector('#cancel_modal_btn');
    cancelBtn && cancelBtn.click();

    expect(EventBus.emit).toBeCalled();
  });
});
