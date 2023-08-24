// Este componente React é um diálogo usado para adicionar uma fonte de dados. Ele lida com a entrada do nome da fonte de dados, bem como o upload de um arquivo CSV associado. 

import React, { Component } from 'react';
import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan
} from '../../styles/global';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as DataSourceActions } from '../../store/ducks/data_source';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { actions as toastrActions } from 'react-redux-toastr';
import Upload from '../Upload';
import UploadFileList from '../UploadFileList';
import api from '../../services/api';

class DataSourceDialog extends Component {

  state = {
    name: '',
    uploadedFiles: []
  };

  // O estado do componente inclui as variáveis name (nome da fonte de dados) e uploadedFiles (arquivos CSV carregados). O método onClose é usado para fechar o diálogo e limpar o estado.   
  onClose = () => {
    this.props.setDialog('dataSource');
    this.setState({ name: '', uploadedFiles: [] });
  }

  // O estado do componente inclui as variáveis name (nome da fonte de dados) e uploadedFiles (arquivos CSV carregados). usado para cancelar a adição da fonte de dados, excluindo arquivos carregados.
  onCancel = () => {
    const { uploadedFiles } = this.state;

    uploadedFiles.forEach(file => this.handleDelete(file.id));

    this.onClose();
  }

  // O método handleDelete é usado para excluir um arquivo carregado.
  handleDelete = async id => {
    await api.delete(`file/${id}`);

    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    });
  };

  // O método renderWarningMsg é usado para renderizar uma mensagem de aviso. 
  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  // atualizar o estado com o valor do campo de entrada.
  handleChangeInput = e => this.setState({ [e.target.name]: e.target.value });

  // O método submit é usado para enviar a fonte de dados para o servidor.
  // enviar os dados para a API e adicionar a fonte de dados.
  submit = () => {
    const { name, uploadedFiles } = this.state;
    const fileId = uploadedFiles.map(file => file.id);

    if (!name) {
      this.renderWarningMsg('Nome não informado');
      return;
    }

    if (!uploadedFiles.length) {
      this.renderWarningMsg('Nenhum arquivo importado');
      return;
    }

    this.props.postDataSource({ name, file_id: fileId[0] });
    this.onClose();
  }

  // renderizar a interface do usuário do diálogo. Ele inclui campos de entrada para nome e upload de arquivos CSV, bem como informações sobre o formato do arquivo.
  render() {
    const { name, uploadedFiles } = this.state;
    const { dataSource } = this.props.dialog;

    if (!dataSource) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1>Adicionar Fonte de Dados</h1>

          <DialogSpan>Fonte de dados:</DialogSpan>
          <DialogInput
            value={name}
            autoComplete="off"
            onChange={this.handleChangeInput}
            name="name">
          </DialogInput>

          {!uploadedFiles.length && (
            <div style={{ paddingTop: '2vh' }}>
              <div style={{ paddingBottom: '.5vh' }}><DialogSpan>Arquivo:</DialogSpan></div>
              <Upload
                onUpload={(uploadedFiles) => this.setState({ uploadedFiles })}
                accept="text/csv"
                message="Arraste um arquivo CSV ou clique aqui."
              />
            </div>)}

          {!!uploadedFiles.length && (
            <UploadFileList
              files={uploadedFiles}
              onDelete={(uploadedFiles) => this.setState({ uploadedFiles })} />
          )}

          {!uploadedFiles.length && (
            <div style={{ paddingTop: '.5vh' }}>
              <h2 style={{ fontWeight: 500 }}>* Arquivo deve estar separado por vírgulas</h2>
              <h2 style={{ fontWeight: 500 }}>* Primeira linha deve ser o cabeçalho</h2>
              <h2 style={{ fontWeight: 500 }}>* As variáveis alvo devem ser numéricas</h2>
            </div>
          )}

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Salvar</Button>
            <Button style={{ marginLeft: '1vw' }} color="gray" isCancel={true} onClick={this.onCancel}>Cancelar</Button>
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }
}

//  Mapeia o estado da store Redux para as propriedades do componente DataSourceDialog.
const mapStateToProps = ({ dialog }) => ({ dialog });

export default connect(
  mapStateToProps,
  {
    ...DialogActions, ...toastrActions,
    ...DataSourceActions
  }
)(DataSourceDialog);


// Este diálogo permite que os usuários adicionem uma nova fonte de dados, informando o nome e fazendo o upload de um arquivo CSV associado. Ele também fornece informações sobre o formato do arquivo exigido. O componente lida com a interação do usuário, validação e comunicação com a API.