import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import { connect } from 'react-redux';
import App from '../../App';
import WalletForm from '../../components/WalletForm';

export default connect()(WalletForm);

describe('Testando a Aplicação', () => {
  it('Deve renderizar a pagina de Login', () => {
    renderWithRouterAndRedux(<App />);

    const inputs =  document.querySelectorAll('input');
    expect(inputs).toHaveLength(2);

    const botaoLogin = screen.queryByText('Entrar');
    expect(botaoLogin).toBeInTheDocument();
  });

  it('Testando o Router', () => {
    const { store } = renderWithRouterAndRedux(<App />);
   
    const inputs =  document.querySelectorAll('input');
    expect(inputs).toHaveLength(2);

    const email = inputs[0];
    const senha = inputs[1];

    userEvent.type(email, 'Levy@gmail.com');
    expect(email.value).toBe('Levy@gmail.com');

    userEvent.type(senha, '123456');
    expect(senha.value).toBe('123456');
   
    const botaoLogin = screen.queryByText('Entrar');
    expect(botaoLogin).toBeInTheDocument();

    userEvent.click(botaoLogin);
    expect(screen.getByText('Wallet Form')).toBeInTheDocument();

    expect(store.getState().user.email).toBe('Levy@gmail.com');
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
   
    userEvent.type(valor,'10');
    userEvent.type(descricao,'hotdog');
   
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