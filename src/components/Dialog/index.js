// Este componente React é uma estrutura genérica para um diálogo personalizado. Ele envolve o conteúdo do diálogo em um contêiner estilizado. 

import React from 'react';
import { Container, Content } from './styles';

// Define uma função de componente chamada Dialog, que recebe duas propriedades: children (o conteúdo do diálogo) e size (opcional, para controlar o tamanho do diálogo).
// O componente Dialog renderiza um contêiner estilizado (<Container>) que envolve o conteúdo do diálogo (<Content>). O tamanho do diálogo é ajustado usando o estilo CSS baseado na propriedade size.
const Dialog = ({ children, size }) => (
  <Container>
    <Content size={size}>{children}</Content>
  </Container>
)

export default Dialog;