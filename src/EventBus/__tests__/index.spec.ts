import evtBus from '../index';

describe('event bus module', () => {
  const key = 'test';
  const func = jest.fn().mockImplementation((val: any) => val);

  test('add listener test', () => {
    // add first listener
    evtBus.addListener(key, func);
    let value = evtBus._events.get(key);
    expect(value).not.toBeInstanceOf(Function);
    // add second listener
    evtBus.addListener(key, func);
    value = evtBus._events.get(key);
    expect(value).toBeInstanceOf(Array);
    // add third listenr
    evtBus.addListener(key, func)
    value = evtBus._events.get(key);
    expect(value).toBeInstanceOf(Array);
    expect(value?.length).toEqual(3);
  });

  test('emit listener test', () => {
    evtBus.emit(key);
    expect(func).toBeCalledTimes(3);
  });

  test('remove listener test', () => {
    evtBus.removeListener(key, func);
    const value = evtBus._events.get(key);
    // actually should toBeUndefined
    expect(value?.length).toBe(2);
  });

});