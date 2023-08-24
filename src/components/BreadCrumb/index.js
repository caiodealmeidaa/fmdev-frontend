// Este é um componente chamado BreadCrumb, que parece estar relacionado à navegação do aplicativo, possivelmente exibindo um caminho de navegação para o usuários


// Importa a função connect do React Redux, que será usada para conectar o componente à store Redux.
import { connect } from 'react-redux';
import React, { Component } from 'react';
import BackIcon from 'react-feather/dist/icons/arrow-left';
import { Creators as ScreenActions } from '../../store/ducks/screen';

import { Container, Text } from './styles';

class BreadCrumb extends Component {
  render() {
    // Desestruturação das propriedades passadas ao componente.
    const { text, screen, destiny, setScreen } = this.props;

// O conteúdo JSX que será renderizado.
    return (
// Um contêiner que envolve o conteúdo do componente. Se houver uma propriedade destiny, é adicionado um ouvinte de evento de clique que, ao ser clicado, chama a função setScreen com os valores screen e destiny (e possivelmente outros valores) como argumentos. Se não houver destiny, o evento de clique não é adicionado.
      <Container onClick={destiny ? setScreen.bind(this, screen, destiny, {}) : null}>
        <BackIcon size={16} />
        <Text>{text}</Text>
      </Container>
    );
  }
}

// Um contêiner que envolve o conteúdo do componente. Se houver uma propriedade destiny, é adicionado um ouvinte de evento de clique que, ao ser clicado, chama a função setScreen com os valores screen e destiny (e possivelmente outros valores) como argumentos. Se não houver destiny, o evento de clique não é adicionado.
export default connect(
  null,
  { ...ScreenActions }
)(BreadCrumb);