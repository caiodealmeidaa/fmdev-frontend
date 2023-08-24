// Este é um componente React chamado TrainModelSaveDialog, que faz parte do aplicativo relacionado à etapa de salvamento de modelos de treinamento de machine learning. 

import React, { Component } from 'react';
import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan
} from '../../styles/global';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';
// O componente utiliza a biblioteca react-redux-toastr para exibir mensagens de aviso ao usuário.
import { actions as toastrActions } from 'react-redux-toastr';
import { Creators as TrainModelActions } from '../../store/ducks/train_model';
// O componente também utiliza a biblioteca primereact para exibir o ícone de spinner durante o salvamento.
import { ProgressSpinner } from 'primereact/progressspinner';

class TrainModelSaveDialog extends Component {

  // O estado do componente inclui campos name e description que representam o nome e a descrição do modelo que o usuário deseja salvar.
  state = {
    name: '',
    description: ''
  };

  // chamado quando o usuário fecha o diálogo de salvamento do modelo. Ele dispara uma ação Redux para fechar o diálogo.
  onClose = () => {
    this.props.setDialog('trainSave');
  }


  // usado para renderizar uma mensagem de aviso na tela. Ele é chamado quando há algum erro de validação nos campos do formulário.
  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  // usado para atualizar o estado do componente quando os campos de entrada (name e description) são alterados.
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // chamado quando o usuário clica no botão "Salvar" no diálogo. Ele dispara uma ação Redux para salvar o modelo. Antes de salvar, verifica se os campos name e description foram preenchidos.
  submit = () => {
    const { path } = this.props.pre_processing;
    const { score } = this.props.train.data;
    const { name, description } = this.state;

    if (!name || !description) {
      this.renderWarningMsg('Por favor, preencha todos os campos!');
      return;
    }

    this.props.postTrainModel({
      name, 
      description, 
      path, 
      score: score || null
    });
  }

  render() {
    const { loading } = this.props.train_model;
    const { name, description } = this.state;
    const { trainSave } = this.props.dialog;

    if (!trainSave) {
      return null;
    }

    // O componente renderiza um diálogo que permite ao usuário salvar um modelo de treinamento. Durante o salvamento, ele exibe um ícone de spinner. Ele também renderiza campos de entrada para o nome e a descrição do modelo. O botão "Salvar" só é exibido quando não há operação de salvamento em andamento.
    return (
      <Dialog>
        <DialogForm>
          <h1>{loading ? 'Salvando Modelo...' : 'Salvar Modelo'}</h1>

          {loading ? 
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '15vh' }}>
              <ProgressSpinner style={{ width: '30px', height: '30px' }} strokeWidth="4" animationDuration=".5s" />
            </div>
          : null}

          {!loading ? <DialogSpan>Nome do modelo</DialogSpan> : null}
          {!loading ? <DialogInput
            value={name}
            autoComplete="off"
            onChange={this.handleChange}
            name="name">
          </DialogInput> : null}

          {!loading ? <DialogSpan>Detalhes do modelo</DialogSpan> : null}
          {!loading ? <DialogInput
            value={description}
            autoComplete="off"
            onChange={this.handleChange}
            name="description">
          </DialogInput> : null}

          {!loading ? <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Salvar</Button>
            <Button style={{ marginLeft: '1vw' }} color="gray" isCancel={true} onClick={this.onClose}>Cancelar</Button>
          </DialogFormButtonContainer> : null}


        </DialogForm>
      </Dialog>
    )
  }
}

// O componente se conecta ao estado Redux para obter informações relevantes sobre o diálogo (se está aberto ou não), o status do salvamento do modelo e as ações do Redux para gerenciar o diálogo e o salvamento do modelo.
const mapStateToProps = ({ dialog, train_model, pre_processing, train }) =>
  ({ dialog, train_model, pre_processing, train });

export default connect(
  mapStateToProps, { ...DialogActions, ...toastrActions, ...TrainModelActions }
)(TrainModelSaveDialog);