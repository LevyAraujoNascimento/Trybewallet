import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './compCSS.css';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    const despesas = expenses.map((element) => {
      const { name } = element.exchangeRates[element.currency];
      const { ask } = element.exchangeRates[element.currency];
      const numValue = parseFloat(element.value);
      const numAsk = parseFloat(ask);
      const total = numAsk * numValue;
      return (
        <tr key={ element.id }>
          <td>{ element.description }</td>
          <td>{ element.tag }</td>
          <td>{ element.method }</td>
          <td>{ parseFloat(element.value).toFixed(2)}</td>
          <td>{ name }</td>
          <td>{ parseFloat(ask).toFixed(2) }</td>
          <td>{ total.toFixed(2) }</td>
          <td>Real</td>
        </tr>
      );
    });
    return (
      <div>
        <table id="table">
          <thead id="table-header">
            <tr id="table-list">
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            { despesas }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

export default connect(mapStateToProps)(Table);
