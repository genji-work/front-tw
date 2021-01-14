import style from './index.less';

export default function Footer() {}

Footer.render = () => {
  return `
    <div class="${style.container}">
      © Copyright 2017 <em>Thought</em>Works
    </div>
  `;
}
