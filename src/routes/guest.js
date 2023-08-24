// O componente GuestRoute é um componente de rota personalizado que permite renderizar um componente específico apenas quando o usuário não estiver autenticado. Se o usuário estiver autenticado, ele será redirecionado para a página raiz (geralmente a página principal).


import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import store from '../store';


// é uma função que recebe as propriedades component e o resto das propriedades (...rest) como argumentos. Essas propriedades são fornecidas quando o componente GuestRoute é usado em um elemento <Route>.
// Dentro do componente GuestRoute, há um <Route> da biblioteca react-router-dom. Isso permite definir uma rota dentro da sua aplicação.
// O prop render do <Route> é definido como uma função que recebe as propriedades props (geralmente são as propriedades passadas pelo roteador do React). Essa função verifica se o usuário não está autenticado (ou seja, não tem um estado de autenticação signedIn verdadeiro).
// Se o usuário não estiver autenticado, o componente fornecido (Component) é renderizado. Isso significa que o componente passado como propriedade component será renderizado na rota.
// Se o usuário estiver autenticado, um redirecionamento (<Redirect>) é renderizado. Isso redirecionará o usuário para a página raiz ('/') e também pode armazenar o estado de onde o redirecionamento ocorreu (usando from: props.location).
const GuestRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (!store.getState().auth.signedIn ? (
      <Component {...props} />
    ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }}
        />
      ))
    }
  />
)

export default GuestRoute;

// Em resumo, o GuestRoute é usado para garantir que o usuário não autenticado veja o componente especificado (geralmente a página de login) e, se estiver autenticado, seja redirecionado para a página principal. Isso é útil para controlar o acesso a determinadas páginas em sua aplicação.