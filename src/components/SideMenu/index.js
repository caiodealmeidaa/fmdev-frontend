// Este é um componente React chamado SideMenu, que representa um menu lateral em um aplicativo. Ele contém links para diferentes telas e funcionalidades, bem como a opção de sair do aplicativo

import React, { Component } from 'react';

import logo from '../../assets/logo.svg';
import { Container, ItemList, Item, ItemText, Logo } from './styles';
import { connect } from 'react-redux';

import { Creators as AuthActions } from '../../store/ducks/auth';
import { Creators as ScreenActions } from '../../store/ducks/screen';
import AddIcon from 'react-feather/dist/icons/plus-circle';
import TranModelIcon from 'react-feather/dist/icons/package';
import MonitorIcon from 'react-feather/dist/icons/monitor';
import { DATASOURCE, TRAIN_MODEL, ADD_TRAIN, LAD } from '../../constants';

class SideMenu extends Component {

  // Este método determina a largura da linha do ícone do menu com base na tela ativa. Se a tela ativa corresponder à tela associada a um link no menu, a largura da linha será definida como 1.5 (destacada). Caso contrário, a largura da linha será de 0.5 (normal).
  getStrokeWidth = (screen) => {
    const { activeScreen } = this.props.screen;

    if (activeScreen === screen) {
      return 1.5;
    }

    return .5;
  }

  render() {

    const { signOutRequest } = this.props;
    const links = [
      {
        screen: LAD,
        component: LAD,
        icon: <MonitorIcon color={'#FFF'} strokeWidth={this.getStrokeWidth(LAD)} />
      },
      {
        screen: ADD_TRAIN,
        component: DATASOURCE,
        icon: <AddIcon color={'#FFF'} strokeWidth={this.getStrokeWidth(ADD_TRAIN)} />
      },
      {
        screen: TRAIN_MODEL,
        component: TRAIN_MODEL,
        icon: <TranModelIcon color={'#FFF'} strokeWidth={this.getStrokeWidth(TRAIN_MODEL)} />
      }
    ];

  // O componente renderiza o menu lateral, que inclui os seguintes elementos:
  // ItemList: Um contêiner para a lista de itens do menu.
  // Logo: Renderiza o logotipo do aplicativo.
  // links: Renderiza cada link de menu definido no array links. Cada link possui:
    // Item: Um item de menu que, quando clicado, chama o método setScreen para mudar a tela ativa.
    // link.icon: O ícone associado ao link de menu, que pode ser um ícone de "monitor", "plus-circle" ou "package".
  // O componente inclui um último item de menu "Sair", que, quando clicado, chama o método signOutRequest para efetuar o logout do aplicativo.
    return (
      <Container>
        <ItemList>
          <Logo>
            <img alt="" src={logo} />
          </Logo>
          {links.map((link, idx) => (
            <Item
              key={idx}
              onClick={this.props.setScreen.bind(this, link.screen, link.component, null)}>
              {link.icon}
            </Item>
          ))}
        </ItemList>
        <ItemList>
          <Item>
            <ItemText onClick={signOutRequest}>Sair</ItemText>
          </Item>
        </ItemList>
      </Container>
    );
  }
}


const mapStateToProps = ({ screen }) => ({ screen });

export default connect(
  mapStateToProps,
  { ...AuthActions, ...ScreenActions }
)(SideMenu);

// O objetivo deste componente é fornecer uma barra de menu lateral com links para diferentes telas do aplicativo, permitindo que o usuário navegue entre as funcionalidades e acesse as opções de logout. O design e a estrutura do menu podem variar de acordo com as preferências de estilo do aplicativo.