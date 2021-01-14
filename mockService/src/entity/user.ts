import { mock, Random } from 'mockjs';

module.exports = () => mock({
  'data': {
    'icon': Random.image('100', '#FF9A2A', '#FFF', 'png', '@./name'),
    'name': '@cword(2,3)'
  }
})
