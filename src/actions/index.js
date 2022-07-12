import currencyAPI from '../services/currencyAPI';

export const USER_INFO = 'USER_INFO';
export const CURRENCY_SAVE = 'CURRENCY_SAVE';

export const userInfoAction = (payload) => ({ type: USER_INFO, payload });
export const currencySaveAction = (payload) => ({ type: CURRENCY_SAVE, payload });

export const currencySavingThunk = () => async (dispatch) => {
  const currencies = await currencyAPI();
  dispatch(currencySaveAction(Object.keys(currencies)));
};
