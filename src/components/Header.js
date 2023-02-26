import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    const cambio = 'BRL';
    return (
      <fieldset>
        <h2
          data-testid="email-field"
        >
          { email }
        </h2>
        <h2
          data-testid="total-field"
        >
          { Math.abs(total).toFixed(2) }
        </h2>
        <h2
          data-testid="header-currency-field"
        >
          { cambio }
        </h2>
      </fieldset>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
