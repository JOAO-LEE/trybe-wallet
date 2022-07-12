import { CURRENCY_SAVE, SPENDING_SAVINGS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY_SAVE:
    return {
      ...state,
      currencies: action.payload,
    };
  case SPENDING_SAVINGS:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload }],
    };
  default:
    return state;
  }
};

export default wallet;
