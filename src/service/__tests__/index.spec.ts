import http from '../index';

const XHRMock: any = {
  open: jest.fn(),
  send: () => {XHRMock.onreadystatechange()},
  readyState: 4,
  status: 200,
  onreadystatechange: jest.fn(),
  responseText: '{"name":"yangdeng"}'
}

describe('service api module', () => {
  let realXhr: any = null;
  beforeEach(() => {
    realXhr = window.XMLHttpRequest;
    (window.XMLHttpRequest as any) = jest.fn().mockImplementation(() => XHRMock);
  });
  afterEach(() => {
    window.XMLHttpRequest = realXhr;
  });

  test('http test', async () => {
    const result = await http.get('');
    expect(result).not.toBeUndefined();
  });
});