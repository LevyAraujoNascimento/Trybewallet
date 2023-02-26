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
  expenses: [],
  er: {},
  total: 0,
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
      er: action.currencies,
    };
  case 'ADD_EXPENSES': {
    const newExpenses = state.expenses.concat(action.expenses);
    return {
      ...state,
      expenses: newExpenses,
    };
  }
  case 'ADD_MONEY':
    return {
      ...state,
      total: state.total + action.valor,
    };
  case 'DELETE_EXPENSE': {
    const newExpenses = state.expenses.filter((element) => (
      element.id !== action.id
    ));
    return {
      ...state,
      expenses: newExpenses,
    };
  }
  case 'REMOVE_MONEY':
    return {
      ...state,
      total: state.total - action.valor,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ user, wallet });

export default rootReducer;
