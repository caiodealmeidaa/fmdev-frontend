// Este trecho de código mostra como são definidas ações e reducers usando Redux Sauce para tratar informações relacionadas a fontes de dados em uma aplicação.

import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// A função createActions() é usada para criar tipos de ação (action types) e criadores de ação (action creators). Aqui são definidos os seguintes tipos de ação: dataSourceInit, dataSourceRequest, dataSourceSuccess, dataSourceError, getDataSource, postDataSource e deleteDataSource. Os criadores de ação associados a esses tipos são gerados automaticamente.
export const { Types, Creators } = createActions({
  dataSourceInit: [],
  dataSourceRequest: [],
  dataSourceSuccess: ['data'],
  dataSourceError: ['err'],
  getDataSource: [],
  postDataSource: ['data'],
  deleteDataSource: ['id']
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */
// Isso define o estado inicial do reducer. O estado inicial inclui as propriedades data, loading e error. data é uma lista que armazena os dados das fontes de dados, loading indica se a requisição das fontes de dados está em andamento, e error indica se ocorreu um erro durante a requisição das fontes de dados.
const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  error: false
});

/* Reducers */
// Aqui, os reducers são definidos para manipular as ações correspondentes. Cada reducer manipula o estado conforme necessário. O reducer init redefine o estado para o valor inicial da lista de fontes de dados quando a ação dataSourceInit é disparada. O reducer request atualiza o estado para indicar que a requisição das fontes de dados está em andamento quando a ação dataSourceRequest é disparada. O reducer success atualiza o estado com os dados das fontes de dados e os indicadores de erro e carregamento quando a ação dataSourceSuccess é disparada. O reducer error atualiza o estado para indicar que ocorreu um erro durante a requisição das fontes de dados quando a ação dataSourceError é disparada.
export const init = state => state.merge({ data: [] });

export const request = state => state.merge({ loading: true });

export const success = (state, { data }) => state.merge({ data, error: false, loading: false });

export const error = state => state.merge({ loading: false, error: true });

/* Reducers to types */
// O reducer é criado usando a função createReducer() do Redux Sauce. Ele é inicializado com o estado inicial definido anteriormente e um objeto que associa tipos de ação a funções de reducer. No caso, ele associa os tipos DATA_SOURCE_INIT, DATA_SOURCE_REQUEST, DATA_SOURCE_SUCCESS e DATA_SOURCE_ERROR às funções init, request, success e error, respectivamente.

export default createReducer(INITIAL_STATE, {
  [Types.DATA_SOURCE_INIT]: init,
  [Types.DATA_SOURCE_REQUEST]: request,
  [Types.DATA_SOURCE_SUCCESS]: success,
  [Types.DATA_SOURCE_ERROR]: error
});

// Esse código organiza a lógica relacionada a fontes de dados em um estado global do Redux, facilitando o gerenciamento do estado e das ações relacionadas a fontes de dados na aplicação.