import http from '../index';
import {getCruises, getHistory, getUser} from '../api';

const resp = {data: {}}

describe('service api module', () => {
  jest.spyOn(http, 'get')
    .mockResolvedValueOnce({data: []})
    .mockResolvedValueOnce(resp)
    .mockResolvedValueOnce(resp)

  test('get cruises test', async () => {
    expect(getCruises()).resolves.toEqual({data: []});
  });

  test('get history test', async () => {
    expect(getHistory()).resolves.toEqual({data: {}});
  });

  test('get user test', async () => {
    expect(getUser()).resolves.toEqual({data: {}});
  });
});