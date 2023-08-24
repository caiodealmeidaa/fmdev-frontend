// Neste trecho de código, está sendo usado o Redux Sauce para definir os tipos de ação, criadores de ação e um reducer relacionados à exibição de gráficos em uma aplicação Redux. 

import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

// A função createActions() é usada para criar tipos de ação (action types) e criadores de ação (action creators). No caso, são definidos os seguintes tipos de ação: chartInit, chartRequest, getChart, chartSuccess e chartError. Os criadores de ação associados a esses tipos são gerados automaticamente.
export const { Types, Creators } = createActions({
  chartInit: [],
  chartRequest: [],
  getChart: ['filter'],
  chartSuccess: ['data', 'chartType'],
  chartError: ['err']
});

/* Initial State */

//  Isso define o estado inicial do reducer. O estado inicial inclui as propriedades data, chartType, loading e error. data armazena os dados do gráfico, chartType armazena o tipo de gráfico a ser exibido, loading indica se a requisição do gráfico está em andamento e error indica se ocorreu um erro durante a requisição do gráfico.
export const INITIAL_STATE = Immutable({
  data: {},
  chartType: null,
  loading: false,
  error: false
});

/* Reducers */

//  Aqui, os reducers são definidos para manipular as ações correspondentes. Cada reducer manipula o estado conforme necessário. O reducer init é responsável por redefinir o estado para o valor inicial quando a ação chartInit é disparada. O reducer request é responsável por atualizar o estado para indicar que a requisição do gráfico está em andamento quando a ação chartRequest é disparada. O reducer success é responsável por atualizar o estado com os dados do gráfico, o tipo de gráfico e os indicadores de erro e carregamento quando a ação chartSuccess é disparada. O reducer error é responsável por atualizar o estado para indicar que ocorreu um erro durante a requisição do gráfico quando a ação chartError é disparada.
export const init = state => state.merge({ ...INITIAL_STATE });

export const request = state => state.merge({ loading: true });

export const success = (state, { data, chartType }) => state.merge({ data, chartType, error: false, loading: false });

export const error = state => state.merge({ loading: false, error: true });

/* Reducers to types */

//  O reducer é criado usando a função createReducer() do Redux Sauce. Ele é inicializado com o estado inicial definido anteriormente e um objeto que associa tipos de ação a funções de reducer. No caso, ele associa os tipos CHART_INIT, CHART_REQUEST, CHART_SUCCESS e CHART_ERROR às funções init, request, success e error, respectivamente.
export default createReducer(INITIAL_STATE, {
  [Types.CHART_INIT]: init,
  [Types.CHART_REQUEST]: request,
  [Types.CHART_SUCCESS]: success,
  [Types.CHART_ERROR]: error
});


// Esse código organiza a lógica relacionada à exibição de gráficos em um estado global do Redux, facilitando o gerenciamento do estado de exibição do gráfico e das ações relacionadas a ele.