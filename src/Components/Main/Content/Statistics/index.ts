import EventBus from '../../../../EventBus';
import store from '../../../../store';
import { delay } from '../../../../util';
import style from './index.less';
export default function Statistics() {}

Statistics.render = () => {
  const { cruises } = store.getState();

  const buildingCount = cruises.reduce((acc: number, cur: any) => {
    if (cur.status === 'building') {
      acc++;
    }
    return acc;
  }, 0);
  const idleCount = cruises.reduce((acc: number, cur: any) => {
    if (cur.status === 'idle') {
      acc++;
    }
    return acc;
  }, 0);
  const physicalCount = cruises.reduce((acc: number, cur: any) => {
    if (cur.opType === 'Physical') {
      acc++;
    }
    return acc;
  }, 0);
  const virtualCount = cruises.reduce((acc: number, cur: any) => {
    if (cur.opType === 'Virtual') {
      acc++;
    }
    return acc;
  }, 0);
  return `
    <div class="${style.container}">
      <div class="${style['build-count']}">
        <i class="icon-cog"></i>
        <label>Building</label>
        <span>${buildingCount}</span>
      </div>
      <div class="${style['idle-count']}">
        <i class="icon-coffee"></i>
        <label>Idle</label>
        <span>${idleCount}</span>
      </div>
      <div class="${style['statistics-box']}">
        <div class="${style['statistics-item']}">
          <label>ALL</label>
          <span>${cruises.length}</span>
        </div>
        <div class="${style['statistics-item']}">
          <label>PHYSICAL</label>
          <span>${physicalCount}</span>
        </div>
        <div class="${style['statistics-item']}">
          <label>VIRTUAL</label>
          <span>${virtualCount}</span>
        </div>
      </div>
    </div>
  `;
}

const handleReloadStatistics = async () => {
  Statistics.unBind();
  await delay();
  const parentDom = document.querySelector(`.${style.container}`)?.parentNode;
  const oldDom = document.querySelector(`.${style.container}`);
  const newDom = document.createRange().createContextualFragment(Statistics.render());
  (parentDom as HTMLElement).replaceChild(newDom, (oldDom as Element));
  await delay(500);
  Statistics.effect();
}

Statistics.effect = () => {
  EventBus.addListener('reload_statistics', handleReloadStatistics);
}

Statistics.unBind = () => {
  EventBus.removeListener('reload_statistics', handleReloadStatistics);
}
