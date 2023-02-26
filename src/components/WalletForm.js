import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, addExpenses, addMoney } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
    this.setState(() => ({
      value: 0,
      description: '',
    }));
  }

  itIsValue = ({ target }) => {
    this.setState(() => (
      { value: target.value }
    ));
  };

  itIsDescription = ({ target }) => {
    this.setState(() => (
      { description: target.value }
    ));
  };

  itIsCurrency = ({ target }) => {
    this.setState(() => (
      { currency: target.value }
    ));
  };

  itIsMethod = ({ target }) => {
    this.setState(() => (
      { method: target.value }
    ));
  };

  itIsTag = ({ target }) => {
    this.setState(() => (
      { tag: target.value }
    ));
  };

  att = () => {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  };

  enviarForm = () => {
    this.att();
    const { dispatch, expenses, er } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const id = expenses.length;
    dispatch(addExpenses(
      id,
      value,
      description,
      currency,
      method,
      tag,
      er,
    ));
    const finalValue = parseFloat(value) * parseFloat(er[currency].ask);
    dispatch(addMoney(parseFloat(finalValue)));
    this.setState(() => ({
      value: '',
      description: '',
    }));
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    let moedas = '---';
    if (currencies !== undefined) {
      moedas = currencies.map((e) => (
        <option
          key={ e }
          value={ e }
        >
          { e }
        </option>
      ));
    }
    return (
      <div>
        <form>
          <h1>Wallet Form</h1>
          <label htmlFor="value-input">
            Valor da despesa :
            <input
              id="value-input"
              name="value-input"
              data-testid="value-input"
              onChange={ this.itIsValue }
              value={ value }
            />
          </label>
          <label htmlFor="value-input">
            Descrição da despesa :
            <textarea
              id="description-input"
              name="description-input"
              data-testid="description-input"
              rows="4"
              cols="50"
              onChange={ this.itIsDescription }
              value={ description }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda :
            <select
              id="currency-input"
              name="currency-input"
              data-testid="currency-input"
              onChange={ this.itIsCurrency }
            >
              { moedas }
            </select>
          </label>
          <label htmlFor="method-input">
            Forma de Pagamento :
            <select
              id="method-input"
              name="method-input"
              data-testid="method-input"
              onChange={ this.itIsMethod }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria :
            <select
              id="tag-input"
              name="tag-input"
              data-testid="tag-input"
              onChange={ this.itIsTag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ this.enviarForm }
          >
            Adicionar despesa
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  er: state.wallet.er,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  er: PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
