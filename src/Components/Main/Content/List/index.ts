import style from './index.less';
import parentStyle from '../index.less';
import store from '../../../../store';
import Item from './Item';

export default function List() {}

const ListContent = (cruises: any[]) => {

    return cruises.map((item: any) => {
      return Item.render(item);
    }).join('');
};

const hasSearchResult = (item: any, val: string) => {
  let hasSearch = false;
  if (val) {
    if (item.url.indexOf(val) > -1) {
      hasSearch = true;
    }
    if (item.path.indexOf(val) > -1) {
      hasSearch = true;
    }
    if (item.ip.indexOf(val) > -1) {
      hasSearch = true;
    }
  } else {
    hasSearch = true;
  }
  return hasSearch;
}

const handleCruiseFilter  = () => {
  const { cruises = [], chooseTab, searchValue } = store.getState();
  let newCruises = cruises.reduce((acc: any[], cur: any) => {
    let canPush = false;
    if (chooseTab === 'All') {
      canPush = true;
    } else {
      canPush = chooseTab !== cur.opType;
    }
    canPush = canPush && hasSearchResult(cur, searchValue);
    if (canPush) {
      return [...acc, cur];
    }
    return acc;
  }, []);
  if (searchValue) {
    newCruises = newCruises.map((item: any) => {
      let url = item.url;
      let path = item.path;
      let ip = item.ip;

      if (url.indexOf(searchValue) > -1) {
        url = url.replace(new RegExp(searchValue, 'g'), `<em>${searchValue}</em>`);
      }
      if (path.indexOf(searchValue) > -1) {
        path = path.replace(new RegExp(searchValue, 'g'), `<em>${searchValue}</em>`);
      }
      if (ip.indexOf(searchValue) > -1) {
        ip = ip.replace(new RegExp(searchValue, 'g'), `<em>${searchValue}</em>`);
      }
      return {
        ...item,
        url,
        path,
        ip,
        realPath: item.path
      }
    });
  }
  return newCruises;
}

List.render = () => {
  return `
    <ul id="main_list" class="${style.container}">
      ${ListContent(handleCruiseFilter())}
    </ul>
  `;
}

List.effect = () => {
  Item.effect();
}


List.unBind = () => {
  Item.unBind();
}

List.reload = () => {
  List.unBind();
  setTimeout(() => {
    const parentDom = document.querySelector(`.${parentStyle.container}`);
    const oldDom = document.querySelector(`.${style.container}`);
    const newDom = document.createRange().createContextualFragment(List.render());
    (parentDom as HTMLElement).replaceChild(newDom, (oldDom as Element));

    setTimeout(() => {
      List.effect();
    });
  })
}
