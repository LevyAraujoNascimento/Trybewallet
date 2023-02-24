// import user from './user';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

import { combineReducers } from 'redux';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
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

const rootReducer = combineReducers({ user });

export default rootReducer;
