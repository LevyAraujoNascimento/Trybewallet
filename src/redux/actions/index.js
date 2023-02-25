// Coloque aqui suas actions

// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_MONEY = 'ADD_MONEY';

// ACTIONS CREATORS
export const addEmail = (email) => ({
  type: ADD_EMAIL,
  email,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const receiveCurrencies = (currencies) => ({
  type: RECEIVE_CURRENCIES,
  currencies,
});

export const addMoney = (valor) => ({
  type: ADD_MONEY,
  valor,
});

export const addExpenses = (...args) => ({
  // id, value, desc, cur, met, tag, er
  type: ADD_EXPENSES,
  expenses: {
    id: args[0],
    value: args[1],
    description: args[2],
    currency: args[3],
    method: args[4],
    tag: args[5],
    exchangeRates: args[6],
  },
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies);
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(receiveCurrencies(currencies)));
  };
}
