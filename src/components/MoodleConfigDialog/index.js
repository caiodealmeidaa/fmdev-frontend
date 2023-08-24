// Este componente React é responsável por exibir um diálogo de configuração de integração com um sistema LMS (Learning Management System) específico (por exemplo, o Moodle). 

import React, { Component } from 'react';
import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan
} from '../../styles/global';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { Creators as LmsActions } from '../../store/ducks/lms';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { actions as toastrActions } from 'react-redux-toastr';
import Select from 'react-select';
import { selectStyle } from '../../styles/global';

const versions = [
  { value: '3.8.0', label: '3.8.0' },
  { value: '3.7.0', label: '3.7.0' },
  { value: '3.6.0', label: '3.6.0' }
];

// Define uma classe de componente chamada MoodleConfigDialog que é responsável por exibir o diálogo de configuração de integração com o LMS.
class MoodleConfigDialog extends Component {

  //  É chamado quando o botão de fechar é clicado, e fecha o diálogo de configuração.
  onClose = () => {
    this.props.setDialog('moodle');
  }

  // É chamado quando o botão "Salvar" é clicado, e realiza a validação dos campos de entrada (URL, chave de API e versão LMS) e, se tudo estiver correto, envia os dados de configuração para a ação Redux correspondente.
  submit() {
    const { id, name, url, token, version } = this.props.dialog.data;

    if (!url) {
      this.renderWarningMsg('Informe a URL');
      return;
    }

    if (!token) {
      this.renderWarningMsg('Informe a Chave de API');
      return;
    }

    if (!version) {
      this.renderWarningMsg('Informe a versão');
      return;
    }

    this.props.putLms({ id, url, token, version: version.value });
    this.props.setDialog(name);
  }

  // Renderiza uma mensagem de aviso utilizando o sistema de notificações do Redux (react-redux-toastr).
  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  // Atualiza o estado do diálogo com os valores dos campos de entrada.
  handleChangeInput = e => this.props.setDialogData({ [e.target.name]: e.target.value });

  // Atualiza o estado do diálogo com o valor selecionado de um campo de seleção (nesse caso, a versão LMS).
  handleChange = (item, name) => this.props.setDialogData({ [name]: item });

  // O componente renderiza o diálogo de configuração de integração. Ele inclui campos de entrada para a URL e a chave de API do LMS, bem como um campo de seleção para a versão do LMS. Os valores para a versão são obtidos do array versions. O diálogo também possui botões "Salvar" e "Cancelar" para confirmar ou cancelar a configuração.
  render() {
    const { url, token, version, description } = this.props.dialog.data || {};
    const { moodle } = this.props.dialog;

    if (!moodle) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1>Configurar Integração</h1>
          <h2>{description}</h2>

          <DialogSpan>URL</DialogSpan>
          <DialogInput value={url} autoComplete="off" onChange={this.handleChangeInput} name="url"></DialogInput>

          <DialogSpan>Chave de Api</DialogSpan>
          <DialogInput value={token} onChange={this.handleChangeInput} name="token" type="password" />

          <DialogSpan>Versão LMS</DialogSpan>
          <div style={{ width: '100%' }}>
            <Select
              isClearable
              value={version}
              onChange={(e) => this.handleChange(e, 'version')}
              placeholder={'Selecione uma Versão'}
              styles={selectStyle}
              options={versions} />
          </div>

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Salvar</Button>
            <Button style={{ marginLeft: '1vw' }} color="gray" isCancel={true} onClick={this.onClose}>Cancelar</Button>
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog }) => ({ dialog });

export default connect(
  mapStateToProps,
  {
    ...DialogActions, ...toastrActions,
    ...LmsActions
  }
)(MoodleConfigDialog);


// Este componente é responsável por permitir ao usuário configurar a integração com um sistema LMS específico (Moodle) fornecendo a URL, chave de API e versão. A interface é projetada para facilitar a configuração dessas informações e prosseguir com a integração.