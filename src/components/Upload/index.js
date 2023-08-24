// Este é um componente React chamado Upload que permite aos usuários carregar arquivos arrastando-os e soltando-os em uma área específica. Ele utiliza a biblioteca react-dropzone para lidar com o processo de upload de arquivos e exibir mensagens relacionadas ao estado do upload. 

import React, { Component } from 'react';
import DropZone from 'react-dropzone';
import { DropContainer, UploadMessage } from './styles';
import api from '../../services/api';
import filesize from "filesize";

export default class Upload extends Component {

  //  O estado do componente inclui uma matriz chamada uploadedFiles, que armazenará informações sobre os arquivos carregados.
  state = {
    uploadedFiles: []
  };

  // chamado quando os arquivos são soltos na área de drop. Ele mapeia os arquivos soltos e cria objetos de informações de arquivo para cada um, incluindo detalhes como nome, tamanho legível, URL de pré-visualização, status de progresso e muito mais. Esses objetos são então adicionados à matriz uploadedFiles no estado.
  handleUpload = files => {
    const uploadedFiles = files.map(file => ({
      file,
      id: null,
      name: file.name,
      readableSize: filesize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null
    }));

    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles)
    });

    uploadedFiles.forEach(this.processUpload);
  };

  //  usado para atualizar as informações de um arquivo específico na matriz uploadedFiles no estado. Ele é chamado sempre que o status de um arquivo muda, como progresso de upload, upload bem-sucedido ou erro.
  updateFile = (id, data) => {
    const newFiles = this.state.uploadedFiles.map(uploadedFile => {
      return id === uploadedFile.id
        ? { ...uploadedFile, ...data }
        : uploadedFile;
    });

    this.setState({ uploadedFiles: newFiles });

    if (this.props.onUpload) {
      this.props.onUpload(newFiles);
    }
  };

  //  responsável por processar o upload de um arquivo específico para o servidor. Ele cria um objeto FormData para enviar o arquivo para o servidor e acompanha o progresso de upload. Se o upload for bem-sucedido, as informações do arquivo serão atualizadas para refletir o sucesso.
  processUpload = uploadedFile => {
    const data = new FormData();

    data.append("file", uploadedFile.file, uploadedFile.name);

    api
      .post("file", data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));

          this.updateFile(uploadedFile.id, {
            progress
          });
        }
      })
      .then(response => {
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data.id,
          url: response.data.url
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true
        });
      });
  };

  //  renderiza mensagens dinâmicas com base no estado do arrasto e soltar. Ele verifica se o arrasto está ativo, rejeitado ou bem-sucedido e renderiza mensagens apropriadas.
  renderDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>{this.props.message}</UploadMessage>
    }

    if (isDragReject) {
      return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
    }

    return <UploadMessage type="success">Solte os arquivos aqui</UploadMessage>
  }


  // O componente utiliza o componente DropZone da biblioteca react-dropzone para lidar com as interações de arrastar e soltar. Ele fornece uma função render prop que recebe parâmetros como getRootProps, getInputProps, isDragActive e isDragReject. O elemento DropContainer é renderizado com base no estado de arrasto ativo ou rejeitado. A mensagem exibida na área de drop é determinada pelo método renderDragMessage.
  render() {
    return (
      <DropZone accept={this.props.accept} onDropAccepted={this.handleUpload}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {this.renderDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </DropZone>
    );
  }
}

// O componente não parece se conectar ao Redux, portanto, não parece depender do estado global ou de ações Redux.

// Em resumo, este componente cria uma área de drop onde os usuários podem arrastar e soltar arquivos para fazer upload. Ele gerencia as interações de upload e exibe mensagens dinâmicas para informar os usuários sobre o progresso do upload ou erros. Este componente é altamente reutilizável e pode ser facilmente incorporado em outros componentes que exigem funcionalidade de upload de arquivos.