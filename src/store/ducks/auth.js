// Esse trecho de código usa a biblioteca reduxsauce para criar tipos (actions types) e criadores de ação (action creators) para o Redux. Ele também define um reducer para manipular o estado global relacionado à autenticação.

import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

// A função createActions() é usada para criar tipos de ação (actions types) e criadores de ação (action creators). No caso, ela define dois tipos de ação: signInRequest e signOutRequest. Os criadores de ação associados a esses tipos são gerados automaticamente.
export const { Types, Creators } = createActions({
  signInRequest: ['email', 'password'],
  signInSuccess: ['token'],
  signOutRequest: [],
  signOutSuccess: []
});

/* Initial State */

//  Isso define o estado inicial do reducer. O estado inicial inclui uma propriedade signedIn que é definida como true se um token estiver presente no localStorage (indicando que o usuário está autenticado) ou false caso contrário. Também há uma propriedade token que contém o token armazenado no localStorage, caso exista.
export const INITIAL_STATE = Immutable({
  signedIn: !!localStorage.getItem('@fmdev:token'),
  token: localStorage.getItem('@fmdev:token') || ''
});

/* Reducers */
// os reducers são definidos para manipular as ações correspondentes. O reducer success é responsável por atualizar o estado quando a ação signInSuccess é disparada. Ele funde o estado existente com um objeto que atualiza signedIn para true e atribui o token recebido da ação. O reducer signOut é responsável por atualizar o estado quando a ação signOutSuccess é disparada. Ele funde o estado existente com um objeto que atualiza signedIn para false e limpa o token.
export const success = (state, { token }) => state.merge({ signedIn: true, token });

export const signOut = state => state.merge({ signedIn: false, token: '' });


/* Reducers to types */

// o reducer é criado usando a função createReducer() do Redux Sauce. Ele é inicializado com o estado inicial definido anteriormente e um objeto que associa tipos de ação a funções de reducer. No caso, ele associa os tipos SIGN_IN_SUCCESS e SIGN_OUT_SUCCESS às funções success e signOut, respectivamente.
export default createReducer(INITIAL_STATE, {
  [Types.SIGN_IN_SUCCESS]: success,
  [Types.SIGN_OUT_SUCCESS]: signOut
});

// Esse código é uma maneira organizada de gerenciar a autenticação no Redux, incluindo a definição de tipos de ação, criadores de ação e reducers. Isso ajuda a centralizar o código relacionado à autenticação e facilita a manutenção do estado global do Redux para essa parte da aplicação.