// Esse código define um componente PrivateRoute que é usado para proteger rotas em uma aplicação React usando o react-router-dom. Ele garante que apenas usuários autenticados tenham acesso a determinadas rotas

import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import store from '../store';


//  Esse é um componente que aceita algumas props, incluindo component (o componente a ser renderizado) e outras props de rota (como path, exact, etc.).
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    //  Isso parece verificar se o usuário está autenticado. Presumivelmente, a autenticação é gerenciada no estado do Redux, na propriedade auth.signedIn. Se signedIn for true, significa que o usuário está autenticado.
    // render:  É um método dentro do componente Route do react-router-dom que permite renderizar conteúdo condicionalmente com base na lógica fornecida.
    // Se signedIn for true, o componente passado como component é renderizado (por exemplo, a página protegida que requer autenticação). Se signedIn for false, o usuário é redirecionado para a página de login (/signin), e a localização atual é passada como state
    render={props => (store.getState().auth.signedIn ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/signin', state: { from: props.location } }}
        />
      ))
    }
  />
)

export default PrivateRoute;

// Em resumo, o PrivateRoute é um componente que envolve o Route do react-router-dom para proteger rotas que exigem autenticação. Ele redireciona os usuários não autenticados para a página de login e renderiza as rotas protegidas para os usuários autenticados. Isso ajuda a controlar o acesso a determinadas partes do aplicativo com base no status de autenticação do usuário.