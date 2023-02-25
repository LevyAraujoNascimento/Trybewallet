// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

import { combineReducers } from 'redux';

const USER_STATE = {
  email: '',
};

const WALLET_STATE = {
  currencies: [],
};

const user = (state = USER_STATE, action) => {
  switch (action.type) {
  case 'ADD_EMAIL':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

const wallet = (state = WALLET_STATE, action) => {
  if (action.currencies !== undefined) {
    delete action.currencies.USDT;
  }
  switch (action.type) {
  case 'RECEIVE_CURRENCIES':
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ user, wallet });

export default rootReducer;
