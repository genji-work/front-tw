import style from './index.less';

import Content from './Content';
import Menu from './Menu';

export default function Main() {
}

Main.render = () => {
  return `
    <div class="${style.container}">
      ${Menu.render()}
      ${Content.render()}
    </div>
  `;
}

Main.effect = () => {
  Menu.effect();
  Content.effect();
}
