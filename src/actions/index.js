import currencyAPI from '../services/currencyAPI';

export const USER_INFO = 'USER_INFO';
export const CURRENCY_SAVE = 'CURRENCY_SAVE';
export const SPENDING_SAVINGS = 'SPENDING_SAVINGS';
export const DELETE_EXPENSES = 'DELETE_EXPENSES';
export const EDIT_EXPENSES = 'EDIT_EXPENSES';

export const userInfoAction = (payload) => ({ type: USER_INFO, payload });
export const currencySaveAction = (payload) => ({ type: CURRENCY_SAVE, payload });
export const savingSpendingsAction = (payload) => ({ type: SPENDING_SAVINGS, payload });
export const deleteExpensesAction = (expenses, e) => {
  const filteredExpenses = expenses
    .filter((expense) => expense.id !== Number(e.target.id));
  return {
    type: DELETE_EXPENSES,
    filteredExpenses,
  };
};
export const editExpenseAction = () => ({ type: EDIT_EXPENSES });

export const currencySavingThunk = () => async (dispatch) => {
  const currencies = await currencyAPI();
  dispatch(currencySaveAction(Object.keys(currencies)));
};

// export const deleteExpensesActionThunk = (expenses, e) => (dispatch) => {
//   dispatch(deleteExpensesAction(expenses
//    )));
// };
