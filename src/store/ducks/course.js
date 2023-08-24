// definição de ações e reducers usando Redux Sauce para lidar com informações relacionadas a cursos em uma aplicação. 

import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

// A função createActions() é usada para criar tipos de ação (action types) e criadores de ação (action creators). Nesse caso, são definidos os seguintes tipos de ação: courseInit, courseRequest, courseSuccess, courseError e getCourses. Os criadores de ação associados a esses tipos são gerados automaticamente.
export const { Types, Creators } = createActions({
  courseInit: [],
  courseRequest: [],
  courseSuccess: ['data'],
  courseError: ['err'],
  getCourses: ['filter']
});

/** --------------------------------
 * Variable declarations
 * --------------------------------- */

// Isso define o estado inicial do reducer. O estado inicial inclui as propriedades data, loading e error. data é uma lista que armazena os dados dos cursos, loading indica se a requisição dos cursos está em andamento e error indica se ocorreu um erro durante a requisição dos cursos.
const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  error: false
});

/* Reducers */
// Aqui, os reducers são definidos para manipular as ações correspondentes. Cada reducer manipula o estado conforme necessário. O reducer init é responsável por redefinir o estado para o valor inicial da lista de cursos quando a ação courseInit é disparada. O reducer request é responsável por atualizar o estado para indicar que a requisição dos cursos está em andamento quando a ação courseRequest é disparada. O reducer success é responsável por atualizar o estado com os dados dos cursos e os indicadores de erro e carregamento quando a ação courseSuccess é disparada. O reducer error é responsável por atualizar o estado para indicar que ocorreu um erro durante a requisição dos cursos quando a ação courseError é disparada.
export const init = state => state.merge({ data: [] });

export const request = state => state.merge({ loading: true });

export const success = (state, { data }) => state.merge({ data, error: false, loading: false });

export const error = state => state.merge({ loading: false, error: true });

/* Reducers to types */
// O reducer é criado usando a função createReducer() do Redux Sauce. Ele é inicializado com o estado inicial definido anteriormente e um objeto que associa tipos de ação a funções de reducer. No caso, ele associa os tipos COURSE_INIT, COURSE_REQUEST, COURSE_SUCCESS e COURSE_ERROR às funções init, request, success e error, respectivamente.
export default createReducer(INITIAL_STATE, {
  [Types.COURSE_INIT]: init,
  [Types.COURSE_REQUEST]: request,
  [Types.COURSE_SUCCESS]: success,
  [Types.COURSE_ERROR]: error
});

// Esse código organiza a lógica relacionada a cursos em um estado global do Redux, tornando mais fácil o gerenciamento do estado e das ações relacionadas aos cursos na aplicação.