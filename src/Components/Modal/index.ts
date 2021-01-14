import * as style from './index.less';
import * as parentStyle from '../index.less';
import store from '../../store';
import Item from '../Main/Content/List/Item';

export default function Modal() {
}

Modal.render = () => {
  const { modalProps = {} } = store.getState();
  const { x = 0, y = 0, visible = false } = modalProps;

  return `
    <div
      class="${style.container} ${visible ? style.visible : ''}"
      style="left: ${x}px; top: ${y}px;"
    >
      <div class="${style.mask}"></div>
      <div class="${style.content}">
        <div class="${style['close-box']}">
          <i class="icon-close" id="cancel_modal_icon"></i>
        </div>
        <div class="${style.title}">
          <span>Separate multiple resource name with commas</span>
        </div>
        <div class="${style['input-box']}">
          <input id="add_input" placeholder="e.g. Chrome,Firefox"/>
        </div>
        <div class="${style.footer}">
          <div class="${style.confirm}" id="add_modal_btn">Add Resource</div>
          <div class="${style.cancel}" id="cancel_modal_btn">Cancel</div>
        </div>
      </div>
    </div>
  `;
}

Modal.reload = () => {
  Modal.unBind();
  setTimeout(() => {
    const parentDom = document.querySelector(`.${parentStyle.app}`);
    const oldDom = document.querySelector(`.${style.container}`);
    const newDom = document.createRange().createContextualFragment(Modal.render());
    (parentDom as HTMLElement).replaceChild(newDom, (oldDom as Element));

    setTimeout(() => {
      Modal.effect();
    })
  })
};

const handleCancel = () => {
  store.dispatch('setModalProps', {
    modalProps: {
      visible: false
    }
  });

  Modal.reload();
}

const handleAddBrowserItem = () => {
  const input = document.querySelector('#add_input');
  const val = (input as HTMLInputElement).value;

  if (val) {
    const browsers = val.split(',').filter((item: string) => !!item);
    const { modalProps = {} } = store.getState();
    const { id = '' } = modalProps;
    if (id) {
      store.dispatch('addBrowserItems', {
        id,
        browsers
      });
      const { cruises } = store.getState();
      const data = cruises.find((item: any) => item.id === id);
      data && Item.reload(data);
    }
  }
  handleCancel();
}

const handleSubmit = (e: Event) => {
  if ((e as any).code === 'Enter') {
    handleAddBrowserItem();
  }
}

Modal.effect = () => {
  const addBtn = document.querySelector('#add_modal_btn');

  (addBtn as HTMLElement).addEventListener('click', handleAddBrowserItem);

  const icon = document.querySelector('#cancel_modal_icon');

  (icon as HTMLElement).addEventListener('click', handleCancel);

  const cancelBtn = document.querySelector('#cancel_modal_btn');

  (cancelBtn as HTMLElement).addEventListener('click', handleCancel);

  const addInput = document.querySelector('#add_input');

  (addInput as HTMLElement).addEventListener('keyup', handleSubmit);
};

Modal.unBind = () => {
  const addBtn = document.querySelector('#add_modal_btn');

  (addBtn as HTMLElement).removeEventListener('click', handleAddBrowserItem);

  const icon = document.querySelector('#cancel_modal_icon');

  (icon as HTMLElement).removeEventListener('click', handleCancel);

  const cancelBtn = document.querySelector('#cancel_modal_btn');

  (cancelBtn as HTMLElement).removeEventListener('click', handleCancel);

  const addInput = document.querySelector('#add_input');

  (addInput as HTMLElement).removeEventListener('keyup', handleSubmit);
}
