// polyfill src
import '@babel/polyfill';
import '../src/assets/reset.less';
import '../src/assets/plugin.less';
import '../src/assets/font_icons/fonts.css';

import root from '../src';

(async () => {
  await root.register();
  root.run();
})();
