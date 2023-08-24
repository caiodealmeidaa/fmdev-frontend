// Esse trecho de código é parte de um arquivo que utiliza o Redux Saga para gerenciar a lógica assíncrona relacionada a operações de pré-processamento de dados


// São feitas importações dos módulos necessários, incluindo o objeto api para as chamadas à API, os criadores de ação do reducer de pré-processamento (Creators), funções call e put do Redux Saga para chamadas assíncronas e despacho de ações, e toastrActions para lidar com notificações.
import api from '../../services/api';
import { Creators } from '../ducks/pre_processing';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

// A função getPreProcessing é um generator function (função geradora) que lida com a lógica assíncrona para obter dados de pré-processamento.
export function* getPreProcessing({ filter }) {
  try {
    //  A ação preProcessingRequest é despachada para informar que a solicitação para obter os dados de pré-processamento está em andamento.
    yield put(Creators.preProcessingRequest());
    // A ação preProcessingSetFilter é despachada para definir os filtros de pré-processamento que foram passados como argumento.
    yield put(Creators.preProcessingSetFilter(filter));
    // A função call do Redux Saga é usada para realizar a chamada assíncrona à API para obter os dados de pré-processamento. É feita uma requisição POST para o endpoint 'pre-processing' com os filtros especificados em filter.
    const response = yield call(api.post, 'pre-processing', filter);
    // Se a chamada à API for bem-sucedida, a ação preProcessingSuccess é despachada com os dados de pré-processamento obtidos como payload. Isso atualiza o estado do Redux com os dados de pré-processamento.
    yield put(Creators.preProcessingSuccess(response.data));

    // Se os filtros de pré-processamento incluírem pre_processing_indicator e pre_processing_strategy, uma notificação de sucesso é exibida usando toastrActions.add.
    if (filter.pre_processing_indicator && filter.pre_processing_strategy) {
      yield put(toastrActions.add({
        type: 'success',
        title: 'Sucesso',
        message: `Indicador ${filter.pre_processing_indicator} pré-processado com sucesso!`
      }));
    }

  } catch (err) {
    // Se ocorrer um erro durante a chamada à API, uma notificação de erro é adicionada usando toastrActions. Isso informa ao usuário que houve uma falha ao listar os indicadores de pré-processamento.
    yield put(Creators.preProcessingError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao listar Indicadores'
    }));
  }
}

// A função deletePreProcessing é um generator function (função geradora) que lida com a lógica assíncrona para excluir dados de pré-processamento.
export function* deletePreProcessing({ filter }) {
  try {
    // A ação preProcessingDeleteRequest é despachada para informar que a solicitação para excluir os dados de pré-processamento está em andamento.
    yield put(Creators.preProcessingDeleteRequest());
    // A função call do Redux Saga é usada para realizar a chamada assíncrona à API para excluir os dados de pré-processamento. É feita uma requisição DELETE para o endpoint 'pre-processing' com os filtros especificados em filter.
    const response = yield call(api.delete, 'pre-processing', { data: filter });

    //Se a chamada à API for bem-sucedida, a ação preProcessingDeleteSuccess é despachada, indicando que a operação de exclusão foi concluída.
    yield put(Creators.preProcessingDeleteSuccess(response.data));
  } catch (err) {
    yield put(Creators.preProcessingDeleteError({ err }));
    // Se ocorrer um erro durante a chamada à API de exclusão, uma notificação de erro é adicionada usando toastrActions.
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao excluir dados do pré-processamento'
    }));
  }
}

// Em resumo, esse trecho de código é responsável por definir a lógica assíncrona para obter e excluir dados de pré-processamento, bem como lidar com as notificações de sucesso e erro durante essas operações. O Redux Saga é usado para tornar o gerenciamento de operações assíncronas mais controlado e previsível.