// uma parte do aplicativo relacionada à exibição dos classificadores utilizados durante o treinamento de modelos de machine learning. 

import React, { Component } from 'react';
import { Table, ItemColumn, DialogForm, DialogFormButtonContainer } from '../../styles/global';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';

class TrainAlgorithmDialog extends Component {

  // chamado quando o usuário fecha o diálogo dos classificadores utilizados. Ele dispara uma ação Redux para fechar o diálogo.
  onClose = () => {
    this.props.setDialog('trainAlgorithm');
  }


  // renderiza uma linha da tabela que exibe informações sobre um classificador utilizado durante o treinamento. Ele exibe o nome do algoritmo e uma lista de hiperparâmetros associados.
  renderItem = (item, idx) => (
    <tr key={idx}>
      <ItemColumn style={{ paddingLeft: '1rem' }}>{item.algorithm}</ItemColumn>
      <ItemColumn style={{ paddingLeft: '1rem' }}>{item.hyperparameters.join(', ')}</ItemColumn>
    </tr>
  )


  // O componente renderiza um diálogo que exibe uma lista de classificadores utilizados durante o treinamento. Ele exibe uma tabela com duas colunas: "Classificador" e "Hiperparâmetros". Cada linha da tabela corresponde a um classificador e seus hiperparâmetros.
  render() {
    const { fitted_pipelines } = this.props.train.data;
    const { trainAlgorithm } = this.props.dialog;

    if (!trainAlgorithm) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1 style={{ paddingLeft: '1rem' }}>Classificadores Utilizados</h1>

          {fitted_pipelines && fitted_pipelines.length ?
            <div style={{ display: 'flex' }}>
              <Table>
                <thead>
                  <tr>
                    <th align="left" style={{ paddingLeft: '1rem' }}>Classificador</th>
                    <th align="left" style={{ paddingLeft: '1rem' }}>Hiperparâmetros</th>
                  </tr>
                </thead>

                <tbody>
                  {fitted_pipelines.map((item, idx) => this.renderItem(item, idx))}
                </tbody>
              </Table>
            </div>
            : null}

          <DialogFormButtonContainer>
            <Button color="gray" isCancel={true} onClick={this.onClose}>Fechar</Button>
          </DialogFormButtonContainer>


        </DialogForm>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog, train }) => ({ dialog, train });

// O componente se conecta ao estado Redux para obter informações relevantes sobre o diálogo (se está aberto ou não) e os dados do treinamento.
export default connect(
  mapStateToProps,
  {
    ...DialogActions
  }
)(TrainAlgorithmDialog);

//  responsável por exibir os classificadores utilizados durante o treinamento, incluindo seus nomes e hiperparâmetros. Ele renderiza essas informações em um diálogo que pode ser fechado pelo usuário. Isso pode ser útil para permitir que os usuários revisem os detalhes dos classificadores utilizados em um determinado treinamento de modelo.