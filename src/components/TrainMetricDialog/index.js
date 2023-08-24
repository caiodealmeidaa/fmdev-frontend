// Este é um componente React chamado TrainMetricDialog, que faz parte do aplicativo relacionado à exibição das métricas de treinamento de modelos de machine learning. 

import React, { Component } from 'react';
import { DialogForm, DialogFormButtonContainer } from './styles';
import { Table, ItemColumn } from '../../styles/global';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';
//  O componente utiliza a biblioteca react-redux-toastr para exibir mensagens de aviso ao usuário.
import { actions as toastrActions } from 'react-redux-toastr';
import { Creators as TrainModelActions } from '../../store/ducks/train_model';
// O componente também utiliza a biblioteca primereact para exibir o ícone de spinner durante o carregamento dos dados de métricas.
import { ProgressSpinner } from 'primereact/progressspinner';

class TrainMetricDialog extends Component {


  // chamado quando o usuário fecha o diálogo de métricas de treinamento. Ele dispara uma ação Redux para fechar o diálogo.
  onClose = () => {
    this.props.setDialog('trainMetrics');
  }

  // renderiza uma linha da tabela de métricas. Ele mapeia os dados de métrica e exibe o nome da métrica e o valor correspondente.
  renderItem = (item, idx) => (
    <tr key={idx}>
      <ItemColumn style={{ paddingLeft: '1rem' }}><b>{item.name}</b></ItemColumn>
      <ItemColumn>{item.value.toFixed(2)}</ItemColumn>
    </tr>
  )

  render() {
    const { data, loading } = this.props.train_metric;
    const { trainMetrics } = this.props.dialog;

    if (!trainMetrics) {
      return null;
    }

    // O componente renderiza um diálogo que exibe as métricas de treinamento do modelo. Se os dados ainda estiverem sendo carregados, ele exibe um ícone de spinner. Caso contrário, ele exibe uma tabela com as métricas. Há também um botão "Fechar" para fechar o diálogo.
    return (
      <Dialog>
        <DialogForm>
          <h1 style={{ paddingLeft: '1rem' }}>Métricas</h1>

          {loading ?
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '15vh' }}>
              <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="4" animationDuration=".5s" />
            </div>
            : null}

          {data && !loading ?
            <Table>
              <tbody>
                {data.map((item, idx) => this.renderItem(item, idx))}
              </tbody>
            </Table>
            : null}

          {!loading ? <DialogFormButtonContainer>
            <Button color="gray" isCancel={true} onClick={this.onClose}>Fechar</Button>
          </DialogFormButtonContainer> : null}


        </DialogForm>
      </Dialog>
    )
  }
}


// O componente se conecta ao estado Redux para obter informações relevantes sobre o diálogo (se está aberto ou não), os dados de métricas de treinamento e as ações do Redux para gerenciar o diálogo e as métricas.
const mapStateToProps = ({ dialog, train_metric, pre_processing }) =>
  ({ dialog, train_metric, pre_processing });

export default connect(
  mapStateToProps,
  {
    ...DialogActions, ...toastrActions,
    ...TrainModelActions
  }
)(TrainMetricDialog);