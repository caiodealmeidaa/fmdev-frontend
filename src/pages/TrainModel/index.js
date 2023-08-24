// responsável por exibir e gerenciar os modelos de treinamento salvos

import * as moment from 'moment';
import React, { Component } from 'react';
import { ConfigContainer } from '../../styles/ConfigContainer';
import {
  Header, Table, HeaderColumn, ItemColumn,
  FirstHeaderColumn, FirstItemColumn,
  StatusMsgContainer, LoadingContainer
} from '../../styles/global';
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Creators as TrainModelActions } from '../../store/ducks/train_model';
import { Creators as ModelCopyActions } from '../../store/ducks/model_copy';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as DownloadActions } from '../../store/ducks/download';
import { actions as toastrActions } from 'react-redux-toastr';
import { Menu, MenuItem } from '@material-ui/core';
import MoreIcon from 'react-feather/dist/icons/more-horizontal';
import CopyIcon from 'react-feather/dist/icons/copy';
import KeyIcon from 'react-feather/dist/icons/key';
import DownloadIcon from 'react-feather/dist/icons/download';
import CodeIcon from 'react-feather/dist/icons/terminal';
import TrashIcon from 'react-feather/dist/icons/trash';
import { primaryColor } from '../../styles/global';
import { PRE_PROCESSING_RAW, TRAIN_PIPELINES } from '../../constants';
// O componente AlertDialog é usado para exibir um diálogo de confirmação ao excluir um modelo. Ele é renderizado ao final do componente.
import AlertDialog from '../../components/AlertDialog';
import { ProgressSpinner } from 'primereact/progressspinner';

class TrainModel extends Component {

  constructor(props) {
    super(props);

    //  O estado inicial do componente inclui as propriedades itemSelected (para manter o item de modelo selecionado) e anchorEl (para controlar o menu de ações).
    this.state = {
      itemSelected: null,
      anchorEl: null
    };
  }


  // Ciclo de Vida: O método componentDidMount() é usado para chamar a ação getTrainModel() assim que o componente é montado.
  componentDidMount() {
    this.props.getTrainModel();
  }

  // definido para renderizar um item de modelo na tabela. Ele exibe várias informações, incluindo nome, descrição, data de criação, acurácia de teste, etc. Também inclui um ícone de menu que será usado para acionar as ações do modelo.
  renderItem = (item, idx) => (
    <tr key={idx}>
      <FirstItemColumn>{item.name}</FirstItemColumn>
      <ItemColumn>{item.description}</ItemColumn>
      <ItemColumn>{moment(item.created_at).format('DD/MM/YYYY HH:mm:ss')}</ItemColumn>
      <ItemColumn>{item.score ? item.score.toFixed(2) : null}</ItemColumn>
      <ItemColumn>{item.last_predict_at ? moment(item.last_predict_at).format('DD/MM/YYYY HH:mm:ss') : null}</ItemColumn>
      <ItemColumn>{item.qtd_predict ? item.qtd_predict : 0}</ItemColumn>
      <ItemColumn isClickable onClick={this.handleClickMenu.bind(this, item)}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MoreIcon size={16} /></div>
      </ItemColumn>
    </tr>
  )

  handleMenuItemClose = () => this.setState({ anchorEl: null });


  handleClickMenu = (item, event) => {
    this.setState({ anchorEl: event.currentTarget, itemSelected: item });
  };

  deleteModel = () => {
    const { itemSelected } = this.state;

    this.props.deleteTrainModel(itemSelected.model_id);
  }

  // definido para renderizar o menu de ações que aparecerá quando o ícone do menu for clicado. Ele inclui várias opções, como baixar dados do modelo, baixar código do modelo, copiar URL do modelo, gerar nova chave de API e excluir modelo.
  renderMenuActions = () => {
    let actions = [
      {
        action: 'download_data',
        label: 'Baixar dados do modelo',
        icon: <DownloadIcon size={16} color={primaryColor} />
      },
      {
        action: 'download_pipeline',
        label: 'Baixar código do modelo',
        icon: <CodeIcon size={16} color={primaryColor} />
      },
      {
        action: 'copy_url',
        label: 'Copiar URL do modelo',
        icon: <CopyIcon size={16} color={primaryColor} />
      },
      {
        action: 'generate_key',
        label: 'Gerar nova chave de API',
        icon: <KeyIcon size={16} color={primaryColor} />
      },
      {
        action: 'delete_model',
        label: 'Excluir modelo',
        icon: <TrashIcon size={16} color={primaryColor} />
      }
    ];

    const { anchorEl } = this.state;

    return (
      <Menu
        style={{ list: { paddingTop: 0, paddingBottom: 0 } }}
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={this.handleMenuItemClose}
      >
        {actions.map((option, index) => (
          <MenuItem
            style={{ color: primaryColor, fontSize: '14px' }}
            key={index}
            selected={false}
            onClick={this.handleMenuItemClick.bind(this, option)}
          >
            {option.icon}&nbsp;&nbsp;{option.label}
          </MenuItem>
        ))}
      </Menu>
    )
  }

  renderSuccessMsg = ({ title, message }) => {
    this.props.add({
      type: 'success',
      title: title || 'Sucesso',
      message
    });
  }

  // Manipulação de Ações do Menu: Os métodos handleMenuItemClick() e deleteModel() são definidos para lidar com as ações do menu. Dependendo da ação selecionada, várias ações Redux são chamadas para executar as operações necessárias.
  handleMenuItemClick = (option, event) => {
    const { model_id } = this.state.itemSelected;

    if (option.action === 'download_data') {
      this.props.getDownload(model_id, PRE_PROCESSING_RAW);
    }

    if (option.action === 'download_pipeline') {
      this.props.getDownload(model_id, TRAIN_PIPELINES);
    }

    if (option.action === 'delete_model') {
      this.props.setDialog('alert', {
        description: 'Todos os dados gerados pelo modelo serão removidos. Deseja continuar?'
      });
    }

    if (option.action === 'copy_url') {
      this.props.getModelCopy(model_id)
    }

    if (option.action === 'generate_key') {
      this.props.putTrainModel(model_id, { data: {}, action: 'GENERATE_KEY' });
    }

    this.handleMenuItemClose();
  };

  
  // o componente é renderizado. Ele inclui uma barra de rolagem perfeita (PerfectScrollbar) e o conteúdo do componente, que consiste na tabela de modelos.
  render() {
    const { data, loading } = this.props.train_model;

    // A renderização condicional é usada para exibir mensagens de status, indicadores de carregamento, tabela de modelos ou o menu de ações, dependendo do estado atual.
    return (
      <PerfectScrollbar style={{ width: '100%', overflowX: 'auto' }}>
        <ConfigContainer size='big' style={{ color: '#000' }}>

          <Header>
            <h1>Modelos Salvos</h1>
          </Header>


          {!data.length && !loading ?
            <StatusMsgContainer> Sem modelos salvos para serem exibidos. </StatusMsgContainer>
            : null}

          {loading ?
            <LoadingContainer>
              <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" fill="#EEEEEE" animationDuration=".5s" />
            </LoadingContainer>
            : null}

          {data.length && !loading ?
            <Table>
              <thead>
                <tr>
                  <FirstHeaderColumn>Nome</FirstHeaderColumn>
                  <HeaderColumn>Descrição</HeaderColumn>
                  <HeaderColumn>Criado em</HeaderColumn>
                  <HeaderColumn>Acurácia de teste</HeaderColumn>
                  <HeaderColumn>Última predição em</HeaderColumn>
                  <HeaderColumn>Predições realizadas</HeaderColumn>
                  <HeaderColumn><div style={{ display: 'flex', justifyContent: 'center' }}>Ações</div></HeaderColumn>
                </tr>
              </thead>

              <tbody>
                {data.map((item, idx) => this.renderItem(item, idx))}
              </tbody>
            </Table>
            : null}

          {this.renderMenuActions()}
          <AlertDialog onSubmit={this.deleteModel}></AlertDialog>
        </ConfigContainer >
      </PerfectScrollbar>
    )
  }
}

// O componente é conectado ao Redux usando a função connect. O mapStateToProps é usado para mapear o estado train_model do Redux para as propriedades do componente, permitindo que ele acesse o valor de data e loading. Também são mapeadas várias ações Redux para as propriedades do componente.
const mapStateToProps = ({ train_model }) => ({ train_model });

export default connect(mapStateToProps,
  {
    ...TrainModelActions, ...toastrActions,
    ...ModelCopyActions, ...DownloadActions,
    ...DialogActions
  })
  (TrainModel);

  // O componente TrainModel é usado para exibir e gerenciar os modelos de treinamento salvos. Ele permite ao usuário visualizar informações sobre os modelos, executar ações como baixar dados, gerar chaves de API, etc., e também oferece um menu de ações para realizar tarefas específicas. O Redux é usado para gerenciar o estado e as ações relacionadas a esse componente.