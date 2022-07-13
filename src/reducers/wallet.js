import {
  CURRENCY_SAVE,
  SPENDING_SAVINGS,
  DELETE_EXPENSES,
  EDIT_EXPENSES } from '../actions';

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
  case DELETE_EXPENSES: {
    return {
      ...state,
      expenses: [...action.filteredExpenses],
    };
  }
  case EDIT_EXPENSES:
    return {
      ...state,
      editor: !state.editor,
    };
  default:
    return state;
  }
};

export default wallet;
