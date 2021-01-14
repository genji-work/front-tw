import eventBus from '../EventBus';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Modal from './Modal';

import * as style from './index.less';

export default function App () {
}

App.run = () => {
  eventBus.emit(
    'onload',
    App.render(),
    App.effect,
  );
}

App.render = () => {
  return `
    <div id="app" class=${style.app}>
      ${Header.render()}
      ${Main.render()}
      ${Footer.render()}
      ${Modal.render()}
    </div>
  `;
}

App.effect = () => {
  Header.effect();
  Main.effect();
  Modal.effect();
}
