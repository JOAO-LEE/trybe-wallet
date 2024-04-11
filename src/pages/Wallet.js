import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { currencySavingThunk,
  deleteExpensesAction,
  editExpenseAction } from '../actions';
import SpendingForm from '../components/SpendingForm';

class Wallet extends React.Component {
  state = {
    editData: [],
  };

  componentDidMount = () => {
    const { currencyThunk } = this.props;
    currencyThunk();
  };

  totalSpendings = () => {
    const { expenses } = this.props;

    const spendings = expenses.reduce(
      (acc, { value, currency, exchangeRates }) => {
        const accumulator = acc + Number(value) * Number(exchangeRates[currency].ask);
        return accumulator;
      },
      0,
    );
    return spendings;
  };

  deleteSpending = ({ target: { id } }) => {
    const { expenses, deleteExpenses } = this.props;
    const remainingExpenses = expenses.filter((expense) => expense.id !== Number(id));
    deleteExpenses(remainingExpenses, id);
    this.totalSpendings();
  }

  editButton = (e) => {
    const { editExpense } = this.props;
    editExpense(e);
    this.filterButtons(e);
  }

  filterButtons = (e) => {
    const { expenses } = this.props;
    const filteredExpense = expenses.filter(({ id }) => id === Number(e.target.id));
    this.setState({ editData: [...filteredExpense] });
  }

  render() {
    const { email, expenses } = this.props;
    const { editData } = this.state;
    return (
      <>
        <header>
          <h4 data-testid="email-field">{email}</h4>
          <h5 data-testid="total-field">{this.totalSpendings().toFixed(2)}</h5>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <SpendingForm editData={ editData } updateTotal={ this.totalSpendings } />
        {
          expenses.length ? (
            <table>
              <thead>
                <tr>
                  <th>Descrição</th>
                  <th>Tag</th>
                  <th>Método de pagamento</th>
                  <th>Valor</th>
                  <th>Moeda</th>
                  <th>Câmbio utilizado</th>
                  <th>Valor convertido</th>
                  <th>Moeda de conversão</th>
                  <th>Editar/Excluir</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((expense) => (
                  <tr key={ expense.id }>
                    <td>{expense.description}</td>
                    <td>{expense.tag}</td>
                    <td>{expense.method}</td>
                    <td>{Number(expense.value).toFixed(2)}</td>
                    <td>{expense.exchangeRates[expense.currency].name}</td>
                    <td>
                      {Number(expense.exchangeRates[expense.currency].ask).toFixed(
                        2,
                      )}
                    </td>
                    <td>
                      {(
                        Number(expense.exchangeRates[expense.currency].ask)
                    * Number(expense.value)
                      ).toFixed(2)}
                    </td>
                    <td>Real</td>
                    <td>
                      <button
                        id={ expense.id }
                        onClick={ this.editButton }
                        data-testid="edit-btn"
                        type="button"
                      >
                        Editar

                      </button>
                      <button
                        id={ expense.id }
                        data-testid="delete-btn"
                        onClick={ (event) => this.deleteSpending(event) }
                        type="button"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Não há despesas</p>
          )
        }
      </>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses, editor } }) => ({
  email,
  expenses,
  editor,
});

const mapDispatchToProps = (dispatch) => ({
  currencyThunk: () => dispatch(currencySavingThunk()),
  deleteExpenses: (expenses, e) => dispatch(deleteExpensesAction(expenses, e)),
  editExpense: () => dispatch(editExpenseAction()),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
