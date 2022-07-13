import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import currencyAPI from '../services/currencyAPI';
import { savingSpendingsAction } from '../actions';

class SpendingForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: null,
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const currencies = await currencyAPI();
    this.setState({ exchangeRates: currencies }, () => {
      const { dispatch } = this.props;
      dispatch(savingSpendingsAction(this.state));
      this.setState((prev) => ({
        id: prev.id + 1,
        value: '',
        description: '',
      }));
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <fieldset>
        <label htmlFor="value">
          Valor:
          <input
            onChange={ this.handleChange }
            value={ value }
            name="value"
            id="value"
            type="number"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            onChange={ this.handleChange }
            value={ description }
            name="description"
            id="description"
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            onChange={ this.handleChange }
            value={ currency }
            name="currency"
            id="moeda"
          >
            {currencies.map((curr, ind) => <option key={ ind }>{curr}</option>)}
          </select>
        </label>
        <label htmlFor="method">
          <select
            onChange={ this.handleChange }
            value={ method }
            data-testid="method-input"
            name="method"
            id="method"
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          <select
            onChange={ this.handleChange }
            value={ tag }
            data-testid="tag-input"
            name="tag"
            id="tag"
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          onClick={ this.handleClick }
          type="button"
        >
          { !editor ? 'Adicionar despesa' : 'Editar despesa'}
        </button>
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
});

SpendingForm.propTypes = {
  currencies: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(SpendingForm);
