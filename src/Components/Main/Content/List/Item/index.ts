import style from '../index.less';
import store from '../../../../../store';
import Statistics from '../../Statistics';

import assets from '../../../../../assets';
import Modal from '../../../../Modal';

const {
  cent_os,
  debin,
  suse,
  ubuntu,
  windows,
} = assets;

const Assets: any = {
  cent_os,
  debin,
  suse,
  ubuntu,
  windows,
};

export default function Item () {}

const browsers = (id: string, data: string[]) => {
  return data.map((item: string, index: number) => `
    <li id="list_browser_item${id}${item}${index}">
      <span>${item}</span>
      <i class="icon-trash" data-key="${id},${index},${item}"></i>
    </li>
  `).join('');
}

Item.render = (item: any, ) => {
  return `
    <li data-key="${item.id}" id="list_${item.id}" class="${style['cruise-item']}" status="${item.status}">
      <div class="${style['os-type']}">
        <img src="${Assets[item.os]}" alt="图片加载失败" />
      </div>
      <div class="${style['item-top']}">
        <div class="${style['cruise-title']}" >
          <i class="icon-desktop"></i>
          <span status="${item.status}" >${item.url}</span>
        </div>
        <div class="${style['info-box']}">
          <div class="${style['ip-box']}">
            <i class="icon-info"></i>
            <span>${item.ip}</span>
          </div>
          <div class="${style['path-box']}" tooltip="${item.realPath || item.path}">
            <i class="icon-folder"></i>
            <span>${item.path}</span>
          </div>
        </div>
      </div>
      <div class="${style['item-bottom']}">
        <i class="icon-plus" data-key="${item.id}" id="list_add_${item.id}"></i>
        <ul id="${item.id}_browser" class="${style['browsers']}">
          ${browsers(item.id, item.browser)}
        </ul>
        <div
          id="${item.status === 'building' ? '' : 'no_'}btn_status_${item.id}"
          data-key="${item.id}"
          class="${style['deny-op']} ${item.status !== 'building' ? style.hide : ''}"
        >
          <i class="icon-deny"></i>
          <span>Deny</span>
        </div>
      </div>
    </li>
  `;
}

const handleChangeStatus = (btn: HTMLElement) => {
  const id = btn.dataset.key;
  store.dispatch('changeStatus', {
    id
  });
  const { cruises } = store.getState();
  const newItem = cruises.find((item: any) => item.id === id);
  Item.reload(newItem);
  Statistics.reload();
};

const handleDeleteBrowserItem = (item: HTMLElement) => {
  const [id, index, val] = (item.dataset.key as string).split(',');
  store.dispatch('deleteBrowserItem', {
    id, index: ~~index, val
  });
  const { cruises } = store.getState();
  const newItem = cruises.find((item: any) => item.id === id);
  Item.reload(newItem);
}

const handleAddBrowserItem = (item: HTMLElement) => {
  const id = item.dataset.key;
  const { bottom, left, right } = item.getClientRects()[0] || {};
  const x = (left + right) / 2 - (589 / 2);
  const y = bottom + 22;
  store.dispatch('setModalProps', {
    modalProps: {
      id, bottom, x, y, visible: true,
    }
  });
  Modal.reload();
};

Item.effect = () => {
  const btns = document.querySelectorAll('div[id^="btn_status_"]');

  btns.forEach((btn: HTMLElement) => {
    btn.addEventListener('click', handleChangeStatus.bind(null, btn));
  });

  const browserItems = document.querySelectorAll('li[id^="list_browser_item"] i');
  browserItems.forEach((item: HTMLElement) => {
    item.addEventListener('click', handleDeleteBrowserItem.bind(null, item));
  });

  const listAddBtns = document.querySelectorAll('i[id^="list_add_"]');

  listAddBtns.forEach((item: HTMLElement) => {
    item.addEventListener('click', handleAddBrowserItem.bind(null, item));
  });
};

Item.unBind = () => {
  const btns = document.querySelectorAll('div[id^="btn_status_"]');

  btns.forEach((btn: HTMLElement) => {
    btn.removeEventListener('click', handleChangeStatus.bind(null, btn));
  })

  const browserItems = document.querySelectorAll('li[id^="list_browser_item"] i');
  browserItems.forEach((item: HTMLElement) => {
    item.addEventListener('click', handleDeleteBrowserItem.bind(null, item));
  });

  const listAddBtns = document.querySelectorAll('i[id^="list_add_"]');

  listAddBtns.forEach((item: HTMLElement) => {
    item.removeEventListener('click', handleAddBrowserItem.bind(null, item));
  });
}

Item.reload = (data: any) => {
  Item.unBind();
  setTimeout(() => {
    const parentDom = document.querySelector('#main_list');
    const oldDom = document.querySelector(`#list_${data.id}`);
    const newDom = document.createRange().createContextualFragment(Item.render(data));
    (parentDom as HTMLElement).replaceChild(newDom, (oldDom as Element));

    setTimeout(() => {
      Item.effect();
    })
  })
}
