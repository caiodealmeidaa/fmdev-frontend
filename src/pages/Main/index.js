// Componente principal da aplicação
import React, { Component } from 'react';

import { Container } from './styles';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import SideMenu from '../../components/SideMenu';
import DataSource from '../../components/DataSource';
import Indicators from '../../components/Indicators';
import PreProcessing from '../../components/PreProcessing';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import { Creators as LmsActions } from '../../store/ducks/lms';
import { DATASOURCE, INDICATORS, PRE_PROCESSING, TRAIN, TRAIN_MODEL, LAD } from '../../constants';
import Train from '../../components/Train';
import TrainModel from '../TrainModel';
import Dashboard from '../../components/Dashboard';

class Main extends Component {


  // Ciclo de Vida: O método componentDidMount() é usado para executar uma ação assim que o componente é montado na árvore do DOM. Neste caso, a ação getLms() é chamada para obter dados do LMS (que provavelmente se refere a Learning Management System).
  componentDidMount() {
    this.props.getLms();
  }

  // definido para renderizar o conteúdo com base no estado atual do componente. Dependendo do valor de activeComponent do estado screen, um componente específico é renderizado. Isso permite que diferentes componentes sejam exibidos com base na ação selecionada.

  // A renderização condicional é usada para decidir qual conteúdo renderizar com base no valor de activeComponent. Cada valor possível de activeComponent corresponde a um componente diferente que será renderizado.
  renderContent = () => {
    const { activeComponent } = this.props.screen;

    if (activeComponent === DATASOURCE) {
      return <DataSource />;
    }

    if (activeComponent === INDICATORS) {
      return <Indicators />;
    }

    if (activeComponent === PRE_PROCESSING) {
      return <PreProcessing />;
    }

    if (activeComponent === TRAIN) {
      return <Train />;
    }

    if (activeComponent === TRAIN_MODEL) {
      return <TrainModel />;
    }

    if (activeComponent === LAD) {
      return <Dashboard />;
    }

    return null;
  }

  render() {
    return (
      <Container>
        <SideMenu />
        {this.renderContent()}
      </Container>
    )
  }
}

// O componente é conectado ao Redux usando a função connect. O mapStateToProps é usado para mapear o estado screen do Redux para as propriedades do componente, permitindo que ele acesse o valor de activeComponent. O mapDispatchToProps é usado para mapear as ações ScreenActions e LmsActions para as propriedades do componente, permitindo que as ações sejam chamadas.
const mapStateToProps = ({ screen }) => ({ screen });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ ...ScreenActions, ...LmsActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);

// O componente Main controla a renderização de diferentes partes da aplicação com base na ação selecionada pelo usuário. Ele serve como um ponto central para renderizar o conteúdo da aplicação, como painéis de controle, treinamento de modelos e outros componentes relevantes. Através do uso do Redux e renderização condicional, o componente principal facilita a navegação e a interação do usuário com os diferentes recursos da aplicação.