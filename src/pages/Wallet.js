import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
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

Wallet.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
