// Coloque aqui suas actions

// ACTIONS TYPES
export const ADD_EMAIL = 'ADD_EMAIL';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const ADD_MONEY = 'ADD_MONEY';
export const REMOVE_MONEY = 'REMOVE_MONEY';
export const EDIT_ON = 'EDIT_ON';
export const EDIT_OFF = 'EDIT_OFF';

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

export const removeMoney = (valor) => ({
  type: REMOVE_MONEY,
  valor,
});

export const editOn = (id, value) => ({
  type: EDIT_ON,
  id,
  value,
});

export const editOff = () => ({
  type: EDIT_OFF,
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

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies);
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currencies) => dispatch(receiveCurrencies(currencies)));
  };
}
