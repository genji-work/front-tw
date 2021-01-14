
import {throttle} from '../index';
jest.useFakeTimers();

describe('utils module', () => {
  const func = jest.fn();
  test('throttle test', () => {
    const throttleFn = throttle(func, 1000);
    throttleFn();
    expect(func).toBeCalledTimes(0);

    setTimeout(() => {
      throttleFn();
      throttleFn();
    }, 2000);

    jest.advanceTimersByTime(2000);
    expect(func).toBeCalledTimes(1);

    const throttleFnImmediate = throttle(func, 0);
    throttleFnImmediate();

    expect(func).toBeCalledTimes(2);
  });
});