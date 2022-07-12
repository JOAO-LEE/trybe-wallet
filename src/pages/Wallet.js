import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { currencySavingThunk } from '../actions';
import SpendingForm from '../components/SpendingForm';

class Wallet extends React.Component {
  state = {
    total: 0,
  };

  componentDidMount = () => {
    const { currencyThunk } = this.props;
    currencyThunk();
  };

  totalSpendings = () => {
    const { expenses } = this.props;
    const spendings = expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const accumulator = acc + (Number(value) * Number(exchangeRates[currency].ask));
      return accumulator;
    }, 0);
    this.setState({ total: spendings });
  };

  render() {
    const { email } = this.props;
    const { total } = this.state;
    return (
      <>
        <header>
          <h4 data-testid="email-field">{email}</h4>
          <h5 data-testid="total-field">{total.toFixed(2)}</h5>
          <h3 data-testid="header-currency-field">BRL</h3>
        </header>
        <SpendingForm updateTotal={ this.totalSpendings } />
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
        </table>
      </>
    );
  }
}

const mapStateToProps = ({ user: { email }, wallet: { expenses } }) => ({
  email,
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currencyThunk: () => dispatch(currencySavingThunk()),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
