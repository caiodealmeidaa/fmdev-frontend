// Este componente AlertDialog representa uma caixa de diálogo de alerta que pode ser usada para exibir mensagens de confirmação ou aviso para o usuário. 

import React, { Component } from 'react';
import { DialogForm, DialogFormButtonContainer } from './styles';
import { Creators as DialogActions } from '../../store/ducks/dialog';
import { connect } from 'react-redux';
import Dialog from '../Dialog';
import Button from '../../styles/Button';

class AlertDialog extends Component {

  // Um método que é chamado quando a caixa de diálogo é fechada. Ele usa uma ação Redux para atualizar o estado do diálogo.
  onClose = () => {
    this.props.setDialog('alert');
  }
  // Um método que é chamado quando o usuário clica no botão "Sim". Fecha o diálogo e, se uma função onSubmit estiver definida como prop, a executa.
  submit = () => {
    this.onClose();

    if (this.props.onSubmit) {
      this.props.onSubmit();
    }
  }
//  O método que renderiza o componente. 
  render() {
    const { alert, data } = this.props.dialog;
// Primeiro, verifica se a propriedade alert no estado Redux está definida como true. Se não estiver, retorna null, o que resulta na não renderização do componente.
    if (!alert) {
      return null;
    }

// Se alert estiver definido como true, o componente Dialog é renderizado.
    return ( 
// Um formulário dentro do diálogo. Ele contém um título, uma mensagem e dois botões.
      <Dialog>  
        <DialogForm>
          <h1>Atenção</h1>
          <h2>{data && data.description ? data.description : 'Deseja Continuar?'}</h2>

          <DialogFormButtonContainer>
            <Button onClick={this.submit.bind(this)}>Sim</Button>
            <Button color="gray" isCancel={true} onClick={this.onClose}>Não</Button>
          </DialogFormButtonContainer>

        </DialogForm>
      </Dialog>
    )
  }
}

//Mapeia o estado Redux para as propriedades do componente.
const mapStateToProps = ({ dialog }) => ({ dialog });

// Conecta o componente AlertDialog à store Redux usando a função connect. Ele também passa as ações DialogActions para o componente, permitindo que ele atualize o estado de diálogo através das ações Redux.
export default connect(
  mapStateToProps, { ...DialogActions }
)(AlertDialog);