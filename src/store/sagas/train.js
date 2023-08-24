// Esse trecho de código é um exemplo de como as operações de treinamento de dados são gerenciadas usando o Redux Saga. 


// As importações necessárias são feitas, incluindo o objeto api para realizar chamadas à API, os criadores de ação dos reducers relevantes (Creators e TrainStatusCreators), as funções call e put do Redux Saga para lidar com chamadas assíncronas e despacho de ações, e toastrActions para lidar com notificações.
import api from '../../services/api';
import { Creators } from '../ducks/train';
import { Creators as TrainStatusCreators } from '../ducks/train_status';
import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';

// A função postTrain é um generator function (função geradora) que lida com a lógica assíncrona para iniciar um treinamento de dados.
export function* postTrain({ filter }) {
  try {
    // A ação trainInit é despachada para reiniciar o estado relacionado ao treinamento.
    yield put(Creators.trainInit());
    // A ação trainRequest é despachada para informar que a solicitação de treinamento está em andamento.
    yield put(Creators.trainRequest());
    // A função call do Redux Saga é usada para realizar a chamada assíncrona à API para iniciar um treinamento. É feita uma requisição POST para o endpoint 'train' com os filtros especificados em filter.
    const response = yield call(api.post, 'train', filter);
    // Se o treinamento for concluído com sucesso, uma notificação de sucesso é adicionada usando toastrActions. Isso informa ao usuário que o treinamento foi finalizado com sucesso.
    yield put(toastrActions.add({
      type: 'success',
      title: 'Sucesso',
      message: `Treinamento finalizado com sucesso!`
    }));

    // Se a chamada à API for bem-sucedida, a ação trainSuccess é despachada com os dados relacionados ao treinamento como payload.
    yield put(Creators.trainSuccess(response.data));
    // É despachada a ação postTrainStatus usando os filtros especificados em filter para atualizar o status do treinamento.
    yield put(TrainStatusCreators.postTrainStatus(filter));
  } catch (err) {
    // Se ocorrer um erro durante a chamada à API, uma notificação de erro é adicionada usando toastrActions. Isso informa ao usuário que houve uma falha ao treinar a base de dados.
    yield put(Creators.trainError({ err }));
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao treinar base de dados'
    }));
  }
}

// Essa função é semelhante à postTrain, mas lida com a lógica assíncrona para excluir dados de treinamento.
export function* deleteTrain({ filter }) {
  try {
    yield put(Creators.trainDeleteRequest());
    // A função call do Redux Saga é usada para realizar a chamada assíncrona à API para excluir os dados de treinamento. É feita uma requisição DELETE para o endpoint 'train' com os filtros especificados em filter.
    const response = yield call(api.delete, 'train', { data: filter });

    // Se a chamada à API for bem-sucedida, a ação trainDeleteSuccess é despachada para atualizar o estado relacionado aos dados de treinamento após a exclusão.
    yield put(Creators.trainDeleteSuccess(response.data));
  } catch (err) {
    yield put(Creators.trainDeleteError({ err }));
    // Se ocorrer um erro durante a chamada à API de exclusão, uma notificação de erro é adicionada usando toastrActions. Isso informa ao usuário que houve uma falha ao excluir os dados de treinamento.
    yield put(toastrActions.add({
      type: 'error',
      title: 'Erro',
      message: 'Falha ao excluir dados do treinamento'
    }));
  }
}


// Em resumo, esse trecho de código ilustra como as operações de treinamento e exclusão de dados de treinamento são tratadas usando o Redux Saga, incluindo notificações de sucesso e erro para informar o usuário sobre o resultado das operações.