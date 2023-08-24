// Este componente React parece ser um diálogo que permite ao usuário inserir um valor constante para um pré-processamento de dados.

import React, { Component } from 'react';
import {
  DialogForm, DialogFormButtonContainer,
  DialogInput, DialogSpan
} from './styles';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { actions as toastrActions } from 'react-redux-toastr';


// Este componente é uma classe que define o diálogo para inserir um valor constante para um tipo específico de pré-processamento
class PreProcessingDialog extends Component {

  // O estado do componente contém uma propriedade chamada constant, que é usada para armazenar o valor inserido pelo usuário.
  state = {
    constant: null
  };

  // Fecha o diálogo, chamando a ação Redux para fechar o diálogo de inserção de valor constante.
  onClose = () => {
    this.props.setDialog('preProcessingConstant');
  }

  // Renderiza uma mensagem de aviso usando a biblioteca react-redux-toastr.
  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  // Atualiza o estado do componente conforme o usuário digita um valor no campo de entrada. O nome do campo é usado como a chave no estado.
  handleChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  // É chamado quando o usuário clica no botão "Pré-processar". Ele verifica se um valor constante foi inserido e, se for o caso, chama a função onSubmit (passada como propriedade) com o valor da estratégia "constant" e o valor constante inserido.
  submit = () => {
    const { onSubmit } = this.props;
    const { constant } = this.state;

    if (!constant) {
      this.renderWarningMsg('Valor da constante não informada!');
      return;
    }

    if (onSubmit) {
      this.onClose();
      onSubmit({ strategy: 'constant', constantValue: constant });
    }
  }

  //  Determina o tipo de entrada (type) com base no tipo do indicador. Se o indicador for do tipo "Discreto", o tipo será "number" (para permitir apenas números).
  getInputType = (data) => {
    let type = "text";

    if (data && data.type === 'Discreto') {
      type = "number";
    }

    return type;
  }


  //  O componente renderiza diferentes conteúdos com base em variáveis do estado ou em valores das propriedades, como preProcessingConstant e data.
  render() {
    const { constant } = this.state;
    const { preProcessingConstant, data } = this.props.dialog;
    const inputType = this.getInputType(data);

    if (!preProcessingConstant) {
      return null;
    }

    return (
      <Dialog>
        <DialogForm>
          <h1>Pré-processamento</h1>
          <h2>(Indicador: {data && data.description ? `${data.description})` : null}</h2>

          <DialogSpan>Constante {inputType === 'number' ? '(Apenas números)' : null}</DialogSpan>
          <DialogInput
            type={inputType}
            value={constant}
            autoComplete="off"
            onChange={this.handleChangeInput}
            name="constant">
          </DialogInput>

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Pré-processar</Button>
            <Button color="gray" isCancel={true} onClick={this.onClose}>Cancelar</Button>
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog }) => ({ dialog });

export default connect(
  mapStateToProps, { ...DialogActions, ...toastrActions }
)(PreProcessingDialog);

// Esse componente de diálogo aparentemente permite ao usuário inserir um valor constante, que será usado em um pré-processamento específico. O valor constante pode depender do tipo de indicador e dos requisitos do pré-processamento. A estratégia específica de pré-processamento é passada de volta ao componente pai usando a função onSubmit para permitir que o fluxo continue.