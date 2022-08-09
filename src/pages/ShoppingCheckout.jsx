import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ShoppingCheckout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validEmail: true,
      address: '',
      fullname: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      payment: '',
    };
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, payment, cpf, cep, phone, address, fullname } = this.state;
    // const { id } = event.target;
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+/g;
    const emailValidation = emailRegex.test(email);
    const validate = [
      fullname.length > 0,
      cpf.length > 0,
      phone.length > 0,
      cep.length > 0,
      address.length > 0,
      payment.length > 0,
    ].every(Boolean);

    if (emailValidation && validate) {
      this.setState({
        validEmail: emailValidation,
      }, () => {
        // const { comments } = this.state;
        // localStorage.setItem(`${id}`, JSON.stringify(comments));
        event.target.reset();
        this.setState({
          email: '',
          payment: '',
          cpf: '',
          cep: '',
          phone: '',
          address: '',
          fullname: '',
        });
        const { history } = this.props;
        localStorage.clear();
        history.push('/');
      });
    } else {
      this.setState({
        validEmail: false,
      });
    }
  };

  render() {
    const { location: { state: { cart } } } = this.props;
    const { validEmail, email, fullname, cep, cpf, phone, address } = this.state;
    return (
      <section>
        { cart.map((product) => (
          <h1 key={ product.id }>{product.title}</h1>
        ))}
        <form onSubmit={ this.handleSubmit }>
          <input
            data-testid="checkout-fullname"
            type="text"
            name="fullname"
            placeholder="Type your full name"
            onChange={ this.handleChange }
            value={ fullname }
          />
          <input
            data-testid="checkout-email"
            type="email"
            name="email"
            placeholder="Type your email"
            onChange={ this.handleChange }
            value={ email }
          />
          <input
            data-testid="checkout-cpf"
            type="text"
            name="cpf"
            placeholder="Type your cpf"
            onChange={ this.handleChange }
            value={ cpf }
          />
          <input
            data-testid="checkout-phone"
            type="text"
            name="phone"
            placeholder="Type your phone number"
            onChange={ this.handleChange }
            value={ phone }
          />
          <input
            data-testid="checkout-cep"
            type="text"
            name="cep"
            placeholder="Type your postal code"
            onChange={ this.handleChange }
            value={ cep }
          />
          <input
            data-testid="checkout-address"
            type="text"
            name="address"
            placeholder="Type your address"
            onChange={ this.handleChange }
            value={ address }
          />
          <label htmlFor="ticket">
            Ticket
            <input
              data-testid="ticket-payment"
              type="radio"
              name="payment"
              value="ticket"
              id="ticket"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="visa">
            Visa
            <input
              data-testid="visa-payment"
              type="radio"
              name="payment"
              value="visa"
              id="visa"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="master">
            Master
            <input
              data-testid="master-payment"
              type="radio"
              name="payment"
              value="masterCard"
              id="master"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="elo">
            EloCARTÃO
            <input
              data-testid="elo-payment"
              type="radio"
              name="payment"
              value="elo"
              id="elo"
              onChange={ this.handleChange }
            />
            <button data-testid="checkout-btn" type="submit">Finalizar</button>
          </label>
        </form>
        { !validEmail && <h3 data-testid="error-msg">Campos inválidos</h3> }
      </section>
    );
  }
}

ShoppingCheckout.propTypes = {
  history: PropTypes.arrayOf().isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      cart: PropTypes.arrayOf,
    }),
  }).isRequired,
};

export default ShoppingCheckout;
