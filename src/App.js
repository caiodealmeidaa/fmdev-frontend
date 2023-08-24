/*  Importa o React e o Fragment do módulo 'react'. O Fragment é usado para envolver vários elementos sem introduzir um nó adicional no DOM. */
import React, { Fragment } from 'react';
/* O Provider é um componente do React Redux que fornece o Redux Store a todos os componentes descendentes. Aqui, você está envolvendo a aplicação inteira com o Provider e passando o store como prop.*/
import { Provider } from 'react-redux';
import GlobalStyle from './styles/global';
/* Um componente que renderiza notificações/toastrs usando Redux. Ele é configurado para exibir notificações no canto superior direito da tela e desaparecer após 4 segundos. É uma biblioteca usada para exibir mensagens de sucesso, erro, etc. */
import ReduxToastr from 'react-redux-toastr';
import { materialUIStyle } from './styles/global';
/*  fornece o tema do Material-UI a todos os componentes descendentes. Aqui, o tema materialUIStyle é passado para estilizar os componentes do Material-UI. */
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

import store from './store';
/* componente que gerencia as rotas da sua aplicação. */
import Routes from './routes';

/* Esse código é um componente React chamado App. Ele é o componente raiz da sua aplicação React e # envolve toda a aplicação, fornecendo o Redux Store e o provedor de tema do Material-UI. */

/* configura as variáveis de ambiente a partir do arquivo .env.development ou .env com base no ambiente de execução (desenvolvimento ou produção). */
require('dotenv').config({  
  path: process.env.NODE_ENV === "development" ? ".env.development" : ".env"
})

/*  Define o componente funcional App que envolve toda a aplicação.   */
const App = () => (
/* Fornece a store do Redux para a aplicação, tornando o estado global acessível a todos os componentes dentro do Provider. */
  <Provider store={store}>
    <Fragment>
      <MuiThemeProvider theme={materialUIStyle}>
        <Routes />
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick />
      </MuiThemeProvider>
      <GlobalStyle />
    </Fragment>
  </Provider>
);

/* Exporta o componente App como o componente padrão a ser usado em outros lugares da aplicação. */
export default App;


/* No geral, esse código define a estrutura básica da sua aplicação React-Redux, gerenciando o estado global com o Redux, aplicando estilos globais e temas do Material-UI, exibindo rotas e notificações, e configurando as variáveis de ambiente apropriadas com base no ambiente de execução. */