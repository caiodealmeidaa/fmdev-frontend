// Responsável por renderizar gráficos usando a biblioteca Plotly

import Plotly from 'plotly.js-dist';
import React, { Component } from 'react';
// Importa o estilo CenterContainer do arquivo de estilos associado.
import { CenterContainer } from './styles';
import createPlotlyComponent from 'react-plotly.js/factory';
// Importa o componente ProgressSpinner da biblioteca PrimeReact, que é um spinner de carregamento.
import { ProgressSpinner } from 'primereact/progressspinner';
// Importa a função connect do React Redux, que será usada para conectar o componente à store Redux.
import { connect } from 'react-redux';
import { primaryColor } from '../../styles/global';

//Cria o componente Plot usando a função createPlotlyComponent, que recebe o Plotly.js importado.
const Plot = createPlotlyComponent(Plotly);

class Chart extends Component {

  // Renderiza o spinner de carregamento dentro de um contêiner centralizado.
  renderLoading = () => (
    <CenterContainer color={primaryColor}>
      <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" fill="#EEEEEE" animationDuration=".5s" />
    </CenterContainer>
  )

  // Renderiza uma mensagem de erro dentro de um contêiner centralizado.
  renderError = () => (
    <CenterContainer>Ocorreu um erro</CenterContainer>
  )

  //Renderiza uma mensagem de estado vazio dentro de um contêiner centralizado.
  renderEmptyState = () => (
    <CenterContainer>Sem detalhes para este indicador</CenterContainer>
  )

  //Retorna os dados de trace (dados do gráfico) com base no tipo de gráfico (chartType) e nos dados (data) passados ao componente.
  getTrace = () => {
    let trace = {};
    const { name } = this.props;
    const { data, chartType } = this.props.chart;

    if (chartType === 'box') {
      trace.y = data;
    }

    if (chartType === 'histogram') {
      trace.x = data;
    }

    trace.name = name;
    trace.marker = { color: primaryColor };
    trace.type = chartType;

    return [trace];
  }

  render() {
    const { error, loading, data, chartType } = this.props.chart;

    // Verifica se há erro e se não está carregando, renderiza a mensagem de erro.
    if (error && !loading) return this.renderError();
    // Se estiver carregando, renderiza o spinner de carregamento.
    if (loading) return this.renderLoading();
    // Se não houver dados, renderiza a mensagem de estado vazio.
    if (!data.length) return this.renderEmptyState();

    // Se tiver tudo ok, renderiza o componente Plot (gráfico) com as propriedades adequadas.
    return (
      <Plot
        useResizeHandler={true}
        style={{ width: '100%', height: '50vh' }}
        data={this.getTrace()}
        config={{
          displaylogo: false,
          displayModeBar: false,
          responsive: true,
          editable: false
        }}
        layout={{
          title: chartType === 'box' ? 'Box Plot' : 'Histograma',
          margin: {
            l: 100,
            r: 100,
            b: 50,
            t: 50,
            pad: 2
          },
          plot_bgcolor: '#F3F3F3',
          paper_bgcolor: '#F3F3F3',
          autosize: true,
          font: {
            family: 'Avenir'
          },
        }}
      />
    );
  }
}


// Mapeia o estado Redux para as propriedades do componente.
const mapStateToProps = ({ chart }) => ({ chart });

// Conecta o componente Chart à store Redux usando a função connect. Ele mapeia o estado Redux para as propriedades do componente e não mapeia ações Redux, por isso passa null como o segundo argumento.
export default connect(
  mapStateToProps, null
)(Chart);