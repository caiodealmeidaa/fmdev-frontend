// Esse trecho de código parece ser parte de um arquivo que utiliza o Redux Saga para gerenciar a lógica assíncrona relacionada à autenticação de um usuário


// São feitas importações dos módulos necessários. call e put são funções fornecidas pelo Redux Saga para chamar funções assíncronas e despachar ações do Redux, respectivamente. api é um objeto que encapsula as chamadas à API definidas em services/api. push é uma ação do connected-react-router usada para navegar para uma determinada rota. toastrActions se refere às ações relacionadas às notificações do pacote react-redux-toastr. Creators se refere aos criadores de ação do reducer de autenticação, que provavelmente são definidos em ../ducks/auth. ScreenCreators se refere aos criadores de ação do reducer de controle de tela, que provavelmente são definidos em ../ducks/screen. DATASOURCE e ADD_TRAIN são constantes que parecem representar telas da aplicação.
import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import { Creators } from '../ducks/auth';
import { Creators as ScreenCreators } from '../ducks/screen';
import { DATASOURCE, ADD_TRAIN } from '../../constants';


// A função signInRequest é um generator function (função geradora) que lida com a lógica assíncrona para realizar a autenticação do usuário.
export function* signInRequest({ email, password }) {

  try {
    // A função call do Redux Saga é usada para realizar a chamada assíncrona à API de autenticação. É feita uma requisição POST para o endpoint 'auth/login' com o email e a senha do usuário.
    const response = yield call(api.post, 'auth/login', { email, password });
    // Se a chamada à API for bem-sucedida, o token de autenticação é armazenado no armazenamento local (localStorage) usando a chave @fmdev:token.
    localStorage.setItem('@fmdev:token', response.data.token);
    // A ação signInSuccess é despachada com o token de autenticação como payload. Isso atualiza o estado do Redux com o token.
    yield put(Creators.signInSuccess(response.data.token));
    // A ação push é usada para navegar para a página principal (rota '/') após o usuário ser autenticado.
    yield put(push('/'));
  } catch (err) {
    // Se ocorrer um erro durante a chamada à API, uma notificação de erro é adicionada usando o toastrActions. Isso informa ao usuário que houve uma falha no processo de login.
    yield put(toastrActions.add({
      type: 'error',
      title: 'Falha no login',
      message: 'Verifique seu e-mail/senha'
    }));
  }
}

// A função signOutRequest é um generator function que lida com a lógica assíncrona para efetuar o logout do usuário.
export function* signOutRequest() {
  // O token de autenticação é removido do armazenamento local durante o processo de logout.
  localStorage.removeItem('@fmdev:token');
  // A ação signOutSuccess é despachada, indicando que o usuário fez logout com sucesso.
  yield put(Creators.signOutSuccess());
  // A ação push é usada para navegar para a página de login (rota '/signin') após o usuário fazer logout.
  yield put(push('/'));
  // A ação setScreen é despachada com as constantes ADD_TRAIN e DATASOURCE, possivelmente para controlar a exibição da tela após o usuário fazer logout.
  yield put(ScreenCreators.setScreen(ADD_TRAIN, DATASOURCE));
}


// Em resumo, esse trecho de código é responsável por definir a lógica assíncrona relacionada à autenticação do usuário e ao logout, além de despachar as ações apropriadas do Redux durante o processo e lidar com possíveis erros. O Redux Saga permite gerenciar de maneira eficiente as operações assíncronas relacionadas ao estado do Redux.