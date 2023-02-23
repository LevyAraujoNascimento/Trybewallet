import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    notValidButton: true,
    email: '',
    password: '',
    redirect: false,
  };

  isButtonValid = () => {
    const { email, password } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const emailValidation = regexEmail.test(email);
    const numLimit = 6;
    if (emailValidation === true
     && password.length >= numLimit) {
      this.setState(() => (
        { notValidButton: false }
      ));
    } else {
      this.setState(() => (
        { notValidButton: true }
      ));
    }
  };

  itIsEmail = ({ target }) => {
    this.setState(() => (
      { email: target.value }
    ), () => this.isButtonValid());
  };

  itIsPassword = ({ target }) => {
    this.setState(() => (
      { password: target.value }
    ), () => this.isButtonValid());
  };

  confirm = () => {
    const { dispatch } = this.props;
    const { email } = this.state;
    this.setState(() => (
      { redirect: true }
    ), () => dispatch(addEmail(email)));
  };

  render() {
    const { notValidButton, redirect } = this.state;
    if (redirect) return (<Redirect to="/carteira" />);
    return (
      <fieldset>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Email"
          onChange={ this.itIsEmail }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Senha"
          onChange={ this.itIsPassword }
        />
        <button
          type="button"
          disabled={ notValidButton }
          onClick={ this.confirm }
        >
          Entrar
        </button>
      </fieldset>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default Login;
