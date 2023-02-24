import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    const valor = 0;
    const cambio = 'BRL';
    return (
      <div>
        <h2
          data-testid="email-field"
        >
          { email }
        </h2>
        <h2
          data-testid="total-field"
        >
          { valor }
        </h2>
        <h2
          data-testid="header-currency-field"
        >
          { cambio }
        </h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Header);
