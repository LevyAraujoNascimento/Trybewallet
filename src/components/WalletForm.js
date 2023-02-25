import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;
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
            />
          </label>
          <label htmlFor="currency-input">
            Moeda :
            <select
              id="currency-input"
              name="currency-input"
              data-testid="currency-input"
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
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
