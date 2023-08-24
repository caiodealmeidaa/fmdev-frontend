// parte do aplicativo relacionada à configuração dos parâmetros de treinamento de modelos de machine learning.

import React, { Component } from 'react';
import {
  DialogForm, DialogFormButtonContainer, DialogSpan
} from './styles';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';
import { actions as toastrActions } from 'react-redux-toastr';
// utiliza a biblioteca react-currency-input para formatar e gerenciar os campos de entrada numérica. Isso facilita a entrada de percentuais e valores inteiros.
import CurrencyInput from 'react-currency-input';

class TrainConfigDialog extends Component {

  // O estado inicial do componente possui campos para armazenar os valores dos parâmetros de treinamento, como o percentual de treinamento, o percentual de testes, a quantidade máxima de treinos e a quantidade de K-fold.
  state = {
    train: 70,
    test: 30,
    generations: 5,
    kfold: 5
  };

  // chamado quando o usuário fecha o diálogo de configuração de treinamento. Ele dispara uma ação Redux para fechar o diálogo.
  onClose = () => {
    this.props.setDialog('trainConfig');
  }

  // renderiza uma mensagem de aviso usando o Redux Toastr para exibir um aviso para o usuário.
  renderWarningMsg = (msg) => {
    this.props.add({
      type: 'warning',
      title: 'Atenção',
      message: msg
    });
  }

  // chamado quando o usuário clica no botão "TREINAR" no diálogo. Ele valida os valores dos parâmetros de treinamento e, se tudo estiver correto, chama a função onSubmit passada como prop. Ele também fecha o diálogo após a conclusão.
  submit = () => {
    const { train, test, generations, kfold } = this.state;
    const { onSubmit } = this.props;

    if (!train || train <= 0) {
      this.renderWarningMsg('O percentual da base de treinamento é inválido!');
      return;
    }

    if (!test || test <= 0) {
      this.renderWarningMsg('O percentual da base de testes é inválido!');
      return;
    }

    if (!generations || generations <= 0) {
      this.renderWarningMsg('A Qtd. máxima de treinos é inválida!');
      return;
    }

    if (!kfold || kfold <= 0) {
      this.renderWarningMsg('A Qtd. de kfolds é inválida!');
      return;
    }

    this.onClose();

    if (onSubmit) {
      onSubmit({ data: { train, test, generations, kfold } });
    }
  }


  // chamado quando há uma alteração em um dos campos de percentual de treinamento ou teste. Ele ajusta os valores para garantir que a soma dos percentuais de treinamento e teste seja 100%.
  handlePercentualChange = (event, maskedValue, floatValue) => {
    let newValue = floatValue;
    let otherInputToUpdate = event.target.name === 'train' ? 'test' : 'train';

    if (floatValue < 0) {
      newValue = 0;
    }

    if (floatValue > 100) {
      newValue = 100;
    }

    this.setState({
      [event.target.name]: newValue,
      [otherInputToUpdate]: Math.abs(100 - newValue),
    });
  }


  // chamado quando há uma alteração em um dos campos de quantidade máxima de treinos ou quantidade de K-fold. Ele simplesmente atualiza o estado com o novo valor.
  handleChange = (event, maskedValue, floatValue) => {
    this.setState({ [event.target.name]: floatValue });
  }

  render() {
    const { train, test, generations, kfold } = this.state;
    const { trainConfig } = this.props.dialog;
    const inputParams = {
      suffix: "%",
      className: "input",
      decimalSeparator: ".",
      thousandSeparator: "",
      onChangeEvent: this.handlePercentualChange
    };

    if (!trainConfig) {
      return null;
    }

    // O componente renderiza um diálogo que permite ao usuário configurar os parâmetros de treinamento. Ele exibe campos para o percentual de treinamento, percentual de testes, quantidade máxima de treinos e quantidade de K-fold. Também inclui botões para "TREINAR" ou "Cancelar".
    return (
      <Dialog>
        <DialogForm>
          <h1>Parâmetros do treinamento</h1>
          <h2>Use os parâmetros default ou altere-os caso seja necessário.</h2>

          <DialogSpan>Percentual de treinamento</DialogSpan>
          <CurrencyInput
            {...inputParams}
            value={train}
            name="train"
          />

          <DialogSpan>Percentual de testes</DialogSpan>
          <CurrencyInput
            {...inputParams}
            value={test}
            name="test"
          />

          <DialogSpan>Qtd. máxima de treinos</DialogSpan>
          <CurrencyInput
            {...inputParams}
            suffix=""
            precision="0"
            onChangeEvent={this.handleChange}
            value={generations}
            name="generations"
          />

          <DialogSpan>Qtd. de K-fold</DialogSpan>
          <CurrencyInput
            {...inputParams}
            suffix=""
            precision="0"
            onChangeEvent={this.handleChange}
            value={kfold}
            name="kfold"
          />

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>TREINAR</Button>
            <Button color="gray" isCancel={true} onClick={this.onClose}>Cancelar</Button>
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }
}

const mapStateToProps = ({ dialog }) => ({ dialog });

// O componente se conecta ao estado Redux para obter informações relevantes sobre o diálogo (se está aberto ou não) e utiliza ações do Redux para gerenciar o diálogo e as mensagens de aviso.
export default connect(
  mapStateToProps, { ...DialogActions, ...toastrActions }
)(TrainConfigDialog);