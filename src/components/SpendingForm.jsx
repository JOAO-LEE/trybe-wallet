import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class SpendingForm extends Component {
  render() {
    const { currencies } = this.props;
    return (
      <fieldset>
        <label htmlFor="value">
          Valor:
          <input
            id="value"
            type="text"
            data-testid="value-input"
          />
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            id="description"
            type="text"
            data-testid="description-input"
          />
        </label>
        <label htmlFor="moeda">
          Moeda:
          <select
            name=""
            id="moeda"
          >
            {currencies.map((currency, ind) => <option key={ ind }>{currency}</option>)}
          </select>
        </label>
        <label htmlFor="method">
          <select
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
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

SpendingForm.propTypes = {
  currencies: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(SpendingForm);
