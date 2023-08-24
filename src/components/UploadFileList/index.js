// Este é um componente React chamado UploadFileList, que exibe uma lista de arquivos carregados com informações sobre o status de upload de cada arquivo.

import React, { Component } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { Container, FileInfo, Preview } from './styles';
import { primaryColor } from '../../styles/global';
// O componente utiliza ícones da biblioteca react-feather para exibir ícones de arquivo, ícones de verificação e ícones de alerta.
import FileIcon from 'react-feather/dist/icons/file';
import CheckCircleIcon from 'react-feather/dist/icons/check-circle';
import AlertIcon from 'react-feather/dist/icons/alert-circle';
import api from '../../services/api';

class UploadFileList extends Component {

  // chamado quando o usuário decide excluir um arquivo carregado. Ele faz uma solicitação à API para excluir o arquivo pelo seu ID e, em seguida, atualiza a lista de arquivos carregados excluindo o arquivo correspondente. Se o onDelete for fornecido como prop, ele chama essa função com a nova lista de arquivos após a exclusão.

  // O método handleDelete usa a função api.delete para excluir um arquivo pelo ID. Não fica claro como o componente se conecta ao servidor API, mas presume-se que ele faça uso da biblioteca axios ou algo semelhante para fazer solicitações HTTP.
  handleDelete = async id => {
    let newUploadedFiles = [];
    await api.delete(`file/${id}`);

    newUploadedFiles = this.props.files.filter(file => file.id !== id);

    if (this.props.onDelete) {
      this.props.onDelete(newUploadedFiles);
    }
  };

  // O componente renderiza uma lista não ordenada (<ul>) com cada arquivo carregado como um item da lista (<li>). Para cada arquivo, é renderizado um componente FileInfo que exibe o ícone do arquivo, nome do arquivo, tamanho legível e uma opção para excluir o arquivo, se ele já foi carregado no servidor. A parte inferior do item da lista exibe um componente de status, que pode ser uma barra de progresso circular em andamento, um ícone de check (sucesso) ou um ícone de alerta (erro).
  render() {
    const { files } = this.props;

    return (
      <Container>
        {files.map((uploadedFile, idx) => (
          <li key={uploadedFile.id || idx}>
            <FileInfo>
              <Preview><FileIcon size={24} color={primaryColor} /></Preview>
              <div>
                <strong>{uploadedFile.name}</strong>
                <span>
                  {uploadedFile.readableSize}{" "}
                  {!!uploadedFile.id && (
                    <div onClick={() => this.handleDelete(uploadedFile.id)}>
                      Excluir
                    </div>
                  )}
                </span>
              </div>
            </FileInfo>

            <div>
              {!uploadedFile.uploaded &&
                !uploadedFile.error && (
                  <CircularProgressbar
                    styles={{
                      root: { width: 45 },
                      path: { stroke: primaryColor }
                    }}
                    strokeWidth={10}
                    value={uploadedFile.progress}
                    text={`${uploadedFile.progress}%`}
                  />
                )}

              {uploadedFile.uploaded && <CheckCircleIcon size={24} color="#78e5d5" />}
              {uploadedFile.error && <AlertIcon size={24} color="#e57878" />}
            </div>
          </li>
        ))}
      </Container>
    )
  }
}

export default UploadFileList;


// Em resumo, o UploadFileList é um componente que exibe uma lista de arquivos carregados com informações sobre o status de upload de cada arquivo. Ele permite que os usuários excluam arquivos carregados e exibe indicadores visuais de progresso, sucesso ou erro para cada arquivo. Esse componente pode ser usado em conjunto com o componente Upload para fornecer uma interface completa de upload de arquivos.