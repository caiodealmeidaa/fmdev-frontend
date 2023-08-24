// Esse trecho de código é parte de um arquivo que utiliza o Redux Saga para gerenciar a lógica assíncrona relacionada às operações de obtenção e salvamento de indicadores. 


/// São feitas importações dos módulos necessários, incluindo o objeto api para as chamadas à API, os criadores de ação do reducer de indicadores (Creators), funções call e put do Redux Saga para chamadas assíncronas e despacho de ações, e toastrActions para lidar com notificações.
import api from '../../services/api';
import { Creators } from '../ducks/indicator';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

// A função getIndicators é um generator function (função geradora) que lida com a lógica assíncrona para obter indicadores.
export function* getIndicators({ filter }) {
  try {
    // A ação indicatorRequest é despachada para informar que a solicitação para obter os indicadores está em andamento.
    yield put(Creators.indicatorRequest());
    // A função call do Redux Saga é usada para realizar a chamada assíncrona à API para obter os indicadores. É feita uma requisição POST para o endpoint 'indicator' com os filtros especificados em filter.
    const response = yield call(api.post, 'indicator', filter);
    //  Se a chamada à API for bem-sucedida, a ação indicatorSuccess é despachada com os dados dos indicadores obtidos como payload. Isso atualiza o estado do Redux com os dados dos indicadores.
    yield put(Creators.indicatorSuccess(response.data));
  } catch (err) {
    yield put(Creators.indicatorError({ err }));
    // Se ocorrer um erro durante a chamada à API, uma notificação de erro é adicionada usando toastrActions. Isso informa ao usuário que houve uma falha ao listar os indicadores.
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar Indicadores'
    }));
  }
}

// A função saveIndicators é um generator function (função geradora) que lida com a lógica assíncrona para salvar indicadores.
export function* saveIndicators() {
  try {
    // A ação indicatorRequest é despachada para informar que a solicitação para salvar os indicadores está em andamento.
    yield put(Creators.indicatorRequest());
    // A função call do Redux Saga é usada para realizar a chamada assíncrona à API para salvar os indicadores. É feita uma requisição POST para o endpoint 'indicator'.
    const response = yield call(api.post, 'indicator');
    //  Se a chamada à API for bem-sucedida, a ação indicatorSuccess é despachada, indicando que a operação de salvamento foi concluída.
    yield put(Creators.indicatorSuccess(response.data));
  } catch (err) {
    yield put(Creators.indicatorError({ err }));
    // Se ocorrer um erro durante a chamada à API de salvamento, uma notificação de erro é adicionada usando toastrActions.
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar Indicadores'
    }));
  }
}

// Em resumo, esse trecho de código é responsável por definir a lógica assíncrona para obter e salvar indicadores, bem como lidar com as notificações de sucesso e erro durante essas operações. O Redux Saga é usado para tornar o gerenciamento de operações assíncronas mais controlado e previsível.