// Esse trecho de código configura a store do Redux, aplica middlewares e integra o Redux Saga para gerenciamento de ações assíncronas


// São importadas todas as dependências necessárias, incluindo funções do Redux (createStore, applyMiddleware), o middleware do Redux Saga (createSagaMiddleware), o histórico de roteamento (history), o rootReducer (que combina os reducers de todos os módulos) e o rootSaga (que combina todas as sagas).
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import history from '../routes/history';
import rootReducer from './ducks';
import rootSaga from './sagas';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import Immutable from 'seamless-immutable';

//Aqui, é criado o middleware do Redux Saga usando a função createSagaMiddleware().
const sagaMiddleware = createSagaMiddleware();

//A constante middlewares é criada, contendo o middleware do Redux Saga e o middleware de roteamento do connected-react-router.
const middlewares = [sagaMiddleware, routerMiddleware(history)];

// Essa função recebe um objeto initialState como parâmetro e cria a store do Redux usando o createStore. Ela utiliza o rootReducer(history) para combinar os reducers de todos os módulos e passa o initialState como um objeto imutável para a store.
const configureStore = (initialState) => {
  return createStore(
    rootReducer(history),
    Immutable(initialState),
    composeWithDevTools(
      applyMiddleware(...middlewares)
    ));
}

// A store é criada chamando a função configureStore(). Além disso, o composeWithDevTools é utilizado para aprimorar a ferramenta de desenvolvedor Redux.
const store = configureStore();

// A função sagaMiddleware.run(rootSaga) é chamada para iniciar a execução das sagas.
sagaMiddleware.run(rootSaga);

// A store é exportada para que possa ser acessada em outros locais do seu aplicativo.
export default store;

// Em resumo, esse arquivo configura a store Redux do aplicativo, incluindo middlewares para gerenciar ações assíncronas e integrando o Redux Saga para coordenar as sagas. Isso cria a base para o gerenciamento de estado centralizado no Redux, incluindo o tratamento de operações assíncronas usando sagas.