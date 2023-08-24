// exibe uma barra de progresso horizontal, com um marcador que se move para a esquerda ou direita com base no valor fornecido

import React, { Component } from 'react';

import { Container, Content } from './styles';

// Este componente é uma classe que define a barra de progresso horizontal.
export default class Progress extends Component {

  // Define a cor de fundo da barra de progresso com base no valor fornecido. Se o valor for maior que 0, a cor será '#488DA3'; caso contrário, será '#FA8B8B'.
  getBackgroundColor = () => {
    let color = '#488DA3';
    const { value } = this.props;

    if (value > 0) return color;

    return '#FA8B8B';
  }

  // Calcula o valor da largura da barra de progresso. Ele multiplica o valor pelo valor da largura total (fullWidth) para determinar o quão larga será a barra de progresso em relação à largura total.
  getImportance = fullWidth => {
    const { value } = this.props;

    return Math.abs(value * fullWidth);
  }

  // Renderiza um número com um tamanho de fonte reduzido. O tamanho da fonte e o preenchimento à direita ou à esquerda podem ser personalizados usando as propriedades passadas.
  renderNumber = (value, prop) => {
    return <div style={{ fontSize: '.7rem', [prop]: '.3vw' }}>{value}</div>
  }

  // Renderiza o componente da barra de progresso horizontal.
  // O valor de transformação (transform) é usado para girar a barra de progresso em 180 graus se o valor for negativo.
  render() {
    const fullWidth = 6;
    const { value } = this.props;
    const background = this.getBackgroundColor();
    const importance = this.getImportance(fullWidth);
    const transform = value > 0 ? 'rotate(0deg)' : 'rotate(180deg)';

    // Content: Representa a própria barra de progresso, cuja largura é definida com base no cálculo de importance e cujo fundo é determinado pela cor de fundo obtida do método getBackgroundColor.
    // renderNumber: Renderiza o número do valor (positivo ou negativo) à esquerda ou à direita da barra de progresso, dependendo do valor.
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        {value < 0 ? this.renderNumber(value, 'paddingRight') : null}
        <Container style={{ transform }}>
          <Content
            background={background}
            style={{ width: `${importance}vw` }} />
        </Container>
        {value > 0 ? this.renderNumber(value, 'paddingLeft') : null}
      </div>
    );
  }
}

// O objetivo deste componente é exibir visualmente uma barra de progresso horizontal com um marcador que se move para a esquerda ou direita com base no valor. A cor de fundo da barra de progresso também é ajustada de acordo com o valor. Este tipo de componente é frequentemente usado para visualizar métricas, porcentagens, valores de importância, entre outros.
