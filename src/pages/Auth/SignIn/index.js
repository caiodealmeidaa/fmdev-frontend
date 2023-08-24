//  componente de autenticação de login em uma aplicação React usando Redux

import React, { Component } from 'react';
import Button from '../../../styles/Button';
import { Container, SignForm } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from '../../../assets/login_logo.svg';
import squares from '../../../assets/login_squares.svg';
import { Creators as AuthActions } from '../../../store/ducks/auth';
import { DialogInput } from '../../../styles/global';

class SignIn extends Component {

  // O estado inicial do componente é definido com valores padrão para o email e a senha. Isso permite que o estado do formulário seja controlado pelo componente.
  state = {
    email: 'admin@fmdev.com.br',
    password: 'p@ssW0rd'
  };

  // usada para atualizar o estado do componente sempre que o valor de um campo de entrada (email ou senha) é alterado. Isso ocorre quando o usuário digita no campo.
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // chamada quando o formulário é enviado. Ela evita o comportamento padrão do envio do formulário (que recarregaria a página) e, em vez disso, chama a ação signInRequest passando o email e a senha do estado do componente.
  handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = this.state;
    const { signInRequest } = this.props;

    signInRequest(email, password);

  }

  // o componente é renderizado. Ele exibe uma imagem (provavelmente uma ilustração) e um formulário de login. O formulário inclui campos de email e senha, bem como um botão de envio.
  render() {
    const { email, password } = this.state;

    return (
      <Container>
        <img alt="" src={squares} width={200} height={200} />

        <SignForm>
          <img alt="" src={logo} />
          <h1>ACESSE A PLATAFORMA</h1>

          <span>Email</span>
          <DialogInput type="email" value={email} onChange={this.handleInputChange} name="email" />

          <span>Senha</span>
          <DialogInput type="password" value={password} onChange={this.handleInputChange} name="password" />

          <Button size="big" onClick={this.handleSubmit}>Acessar o meu ambiente</Button>

        </SignForm>
      </Container>
    );
  }
}


// O componente é conectado ao Redux usando a função connect. O mapDispatchToProps é usado para mapear a ação signInRequest para as propriedades do componente, permitindo que a ação seja chamada quando o formulário é enviado.
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);

// No geral, este componente é parte de uma tela de login onde os usuários podem inserir seu email e senha para acessar a plataforma. Através da ação signInRequest fornecida pelo Redux, a autenticação é processada e o usuário pode ser autenticado e redirecionado para outras partes da aplicação.