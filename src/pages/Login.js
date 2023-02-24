import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    notValidButton: true,
    userEmail: '',
    password: '',
    redirect: false,
  };

  isButtonValid = () => {
    const { userEmail, password } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const emailValidation = regexEmail.test(userEmail);
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
      { userEmail: target.value }
    ), () => this.isButtonValid());
  };

  itIsPassword = ({ target }) => {
    this.setState(() => (
      { password: target.value }
    ), () => this.isButtonValid());
  };

  confirm = () => {
    const { userEmail } = this.state;
    const { dispatch } = this.props;
    dispatch(addEmail(userEmail));
    this.setState(() => (
      { redirect: true }
    ));
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
          onClick={ () => this.confirm() }
        >
          Entrar
        </button>
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Login);
