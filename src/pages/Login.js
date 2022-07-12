import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { userInfoAction } from '../actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loginButton: true,
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, this.isButtonEnable);
  };

  isButtonEnable = () => {
    const { password, email } = this.state;
    const emailFormat = /\S+@\S+\.\S+/;
    const passwordReqLength = 5;
    if (password.length > passwordReqLength && emailFormat.test(email)) {
      this.setState({ loginButton: false });
    } else {
      this.setState({ loginButton: true });
    }
  }

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    history.push('/carteira');
    dispatch(userInfoAction(email));
  }

  render() {
    const { email, password, loginButton } = this.state;
    console.log(this.props);
    return (
      <main>
        <fieldset>
          <label htmlFor="login">
            <input
              onChange={ this.handleChange }
              value={ email }
              name="email"
              data-testid="email-input"
              id="login"
              type="email"
              placeholder="Digite seu email"
            />
            <input
              onChange={ this.handleChange }
              value={ password }
              name="password"
              data-testid="password-input"
              id="login"
              type="password"
              placeholder="Digite sua senha"
            />
            <button
              onClick={ this.handleClick }
              type="button"
              disabled={ loginButton }
            >
              Entrar
            </button>
          </label>
        </fieldset>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  dispatch: PropTypes.func,
}.isRequired;

export default connect()(Login);
