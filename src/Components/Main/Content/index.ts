import style from './index.less';

import Statistics from './Statistics';
import Filter from './Filter';
import List from './List';

export default function Content() {}

Content.render = () => {
  return `
    <div class="${style.container}">
      ${Statistics.render()}
      ${Filter.render()}
      ${List.render()}
    </div>
  `;
}

Content.effect = () => {
  Filter.effect();
  List.effect();
  Statistics.effect();
}
