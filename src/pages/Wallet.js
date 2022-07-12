import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { currencySavingThunk } from '../actions';

class Wallet extends React.Component {
  componentDidMount = () => {
    const { currencyThunk } = this.props;
    currencyThunk();
  }

  render() {
    const { email } = this.props;
    return (
      <header>
        <h4 data-testid="email-field">{email}</h4>
        <h5 data-testid="total-field">0</h5>
        <h3 data-testid="header-currency-field">BRL</h3>

      </header>
    );
  }
}

const mapStateToProps = ({ user: { email } }) => ({
  email,
});

const mapDispatchToProps = (dispatch) => ({
  currencyThunk: () => dispatch(currencySavingThunk()),
});

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
