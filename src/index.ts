import app from './Components';
import eventBus from './EventBus';
import store from './store';

const root = async function () {};

root.register = async () => {
  await store.init();

  const Root: Element | null = document.querySelector('#root');

  eventBus.addListener('onload', (render = '', effect?: Function) => {
    (Root as Element).appendChild(document.createRange().createContextualFragment(render));
    if (typeof effect === 'function') {
      setTimeout(() => {
        effect();
      })
    }
  })
}

root.run = () => {
  app.run();
}

export default root;
