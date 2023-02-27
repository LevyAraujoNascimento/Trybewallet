import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { connect } from 'react-redux';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import WalletForm from '../../components/WalletForm';

export default connect()(WalletForm);

describe('Testando a Aplicação', () => {
  it('Deve renderizar a pagina de Login', () => {
    renderWithRouterAndRedux(<App />);

    const inputs = document.querySelectorAll('input');
    expect(inputs).toHaveLength(2);

    const botaoLogin = screen.queryByText('Entrar');
    expect(botaoLogin).toBeInTheDocument();
  });

  it('Testando o Router', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const inputs = document.querySelectorAll('input');
    expect(inputs).toHaveLength(2);

    const email = inputs[0];
    const senha = inputs[1];

    const emailTest = 'Levy@gmail.com';
    const passwordTest = '123456';

    userEvent.type(email, emailTest);
    expect(email.value).toBe(emailTest);

    userEvent.type(senha, passwordTest);
    expect(senha.value).toBe(passwordTest);

    const botaoLogin = screen.queryByText('Entrar');
    expect(botaoLogin).toBeInTheDocument();

    userEvent.click(botaoLogin);
    expect(screen.getByText('Wallet Form')).toBeInTheDocument();

    expect(store.getState().user.email).toBe(emailTest);
  });

  it('Preenchendo os campos', async () => {
    renderWithRouterAndRedux(<WalletForm />);

    const valor = screen.getByTestId('value-input');
    const descricao = screen.getByTestId('description-input');
    const moeda = screen.getByTestId('currency-input');
    const pagamento = screen.getByTestId('method-input');
    const atividade = screen.getByTestId('tag-input');

    expect(valor).toBeInTheDocument();
    expect(descricao).toBeInTheDocument();
    expect(moeda).toBeInTheDocument();
    expect(pagamento).toBeInTheDocument();
    expect(atividade).toBeInTheDocument();

    userEvent.type(valor, '10');
    userEvent.type(descricao, 'hotdog');

    const addDespesa = screen.getByText(/Adicionar despesa/i);
    expect(addDespesa).toBeInTheDocument();

    userEvent.selectOptions(pagamento, 'Dinheiro');
    expect(screen.getByText('Dinheiro').selected).toBe(true);

    userEvent.selectOptions(atividade, 'Lazer');
    expect(screen.getByText('Lazer').selected).toBe(true);

    await waitFor(() => {
      userEvent.selectOptions(moeda, 'USD');
      expect(screen.getByText('USD').selected).toBe(true);
    });
  });
});
