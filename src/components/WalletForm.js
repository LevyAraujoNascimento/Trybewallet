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
    console.log(currencies);
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
              <option value="valor1">Valor 1</option>
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
  dispatch: PropTypes.func,
  currencies: PropTypes.arrayOf(PropTypes.object),
};

WalletForm.defaultProps = {
  dispatch: null,
  currencies: null,
};

export default connect(mapStateToProps)(WalletForm);
