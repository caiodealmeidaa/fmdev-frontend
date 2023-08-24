//Este trecho de código mostra como os diversos reducers são combinados em um único reducer raiz usando a função combineReducers do Redux

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// Aqui, são importados os diferentes reducers que foram definidos em arquivos separados, como lms, auth, train, chart, etc. Também é importado o reducer do react-redux-toastr (um pacote usado para exibir notificações na aplicação).
import lms from './lms';
import auth from './auth';
import train from './train';
import chart from './chart';
import dialog from './dialog';
import screen from './screen';
import course from './course';
import subject from './subject';
import semester from './semester';
import indicator from './indicator';
import pre_processing from './pre_processing';
import train_status from './train_status';
import train_model from './train_model';
import train_metric from './train_metric';
import model_copy from './model_copy';
import download from './download';
import data_source from './data_source';
import phenomenon from './phenomenon';
import prediction from './prediction';
import period from './period';
import student from './student';
import { reducer as toastr } from 'react-redux-toastr';


// A função combineReducers é usada para combinar todos esses reducers em um único reducer raiz. Cada reducer é atribuído a uma propriedade específica do estado global. Por exemplo, o reducer lms é atribuído à propriedade lms do estado, o reducer auth é atribuído à propriedade auth do estado, e assim por diante.
export default history => combineReducers({
  lms,
  auth,
  train,
  chart,
  dialog,
  toastr,
  screen,
  course,
  subject,
  semester,
  indicator,
  pre_processing,
  train_status,
  train_model,
  train_metric,
  model_copy,
  download,
  data_source,
  phenomenon,
  prediction,
  student,
  period,
  // O reducer criado pelo connectRouter(history) é responsável por gerenciar o estado relacionado à rota usando o connected-react-router, que é uma integração do Redux com o roteamento do React Router. Ele é atribuído à propriedade router do estado, e é responsável por manter informações sobre a localização atual na aplicação.
  router: connectRouter(history)
});

//  O resultado final da combinação de todos esses reducers é exportado. Isso cria o reducer raiz que será utilizado ao criar a store do Redux.

// Esse arquivo é essencial para definir como os diferentes reducers interagem e influenciam o estado global da aplicação. Ele permite que ações disparadas em qualquer parte da aplicação afetem o estado global de maneira organizada e eficiente.