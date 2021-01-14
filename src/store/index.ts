import { getCruises, getHistory, getUser } from '../service/api';

type State = TWFront['State'];
interface Effect {
  [index: string]: Function;
}

class Store {
  static store?: Store;

  state: State = {
    ready: false,
    cruises: [],
    history: [],
    user: {},
    chooseMenu: 'dashboard',
    chooseTab: 'All',
    chooseStyle: 'card',
    searchValue: '',
    modalProps: {},
    userMenuDropdown: false,
  };

  effects: Effect = {
    addBrowserItems: (params: any) => {
      const { browsers, id } = params;
      const { cruises } = this.getState();
      const newCruises = cruises.map((item: any) => {
        if (item.id === id) {
          return {
            ...item,
            browser: [...item.browser, ...browsers]
          }
        }
        return item
      });
      this.dispatch('setCruises', {
        cruises: newCruises,
      });
    },
    deleteBrowserItem: (params: any) => {
      const { id, index, val } = params;
      const { cruises } = this.getState();
      const newCruises = cruises.map((item: any) => {
        const { browser = [] } = item;
        const changeBrowsers = () => {
          if (id === item.id) {
            return browser.reduce((acc: string[], cur: string, idx: number) => {
              if (`${cur}${idx}` === `${val}${index}`) {
                return acc;
              }
              return [...acc, cur];
            }, []);
          }
          return browser;
        }
        return {
          ...item,
          browser: changeBrowsers(),
        }
      });
      this.dispatch('setCruises', {
        cruises: newCruises,
      });
    },
    changeStatus: ({ id }: { id: string }) => {
      const { cruises } = this.getState();
      const newCruises = cruises.map((item: any) => ({
        ...item,
        status: id === item.id ? 'idle' : item.status,
      }));
      this.dispatch('setCruises', {
        cruises: newCruises,
      });
    },
    setCruises: (params: State) => {
      this.reducer(params);
    },
    setHistory: (params: State) => {
      this.reducer(params);
    },
    setUser: (params: State) => {
      this.reducer(params);
    },
    setChooseMenu: (params: State) => {
      this.reducer(params);
    },
    setChooseTab: (params: State) => {
      this.reducer(params);
    },
    setChooseStyle: (params: State) => {
      this.reducer(params);
    },
    setSearchValue: (params: State) => {
      this.reducer(params);
    },
    setModalProps: (params: State) => {
      this.reducer(params);
    },
    setUserMenuDrop: (params: State) => {
      this.reducer(params);
    }
  }

  static getInstance() {
    if (!this.store) {
      this.store = new Store();
    }
    return this.store;
  }

  async init() {
    const cruises: any = await getCruises();
    const history: any = await getHistory();
    const user: any = await getUser();
    this.dispatch('setCruises', {
      cruises: cruises.data
    });
    this.dispatch('setHistory', {
      history: history.data
    });
    this.dispatch('setUser', {
      user: user.data
    })
  }

  reducer(params: State) {
    this.state = {
      ...this.state,
      ...params
    }
  }

  getState() {
    return Object.assign({}, this.state)
  }

  dispatch(action: string, payload: State) {
    if (typeof this.effects[action] === 'function') {
      this.effects[action](payload);
    } else {
      throw new TypeError('action is not defined');
    }
  }
}

export default Store.getInstance();
