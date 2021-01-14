import { mock } from 'mockjs';

module.exports = () => mock({
  'data|10-30': [
    {
      id: '@id',
      ip: '@ip',
      url: '@domain().com',
      path: '/@word(3,8)/@word(3,8)/@word(3,8)',
      'opType|+1': [
        'Physical',
        'Virtual'
      ],
      'status|+1': [
        'idle',
        'building'
      ],
      'os|+1': [
        'windows',
        'ubuntu',
        'cent_os',
        'suse',
        'debin',
      ],
      'browser|1-4': [
        'Chrome',
        'Firefox',
        'Ubuntu',
        'Safari',
      ]
    }
  ]
})
