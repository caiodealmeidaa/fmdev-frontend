//  arquivo com algumas funções utilitárias que parecem estar relacionadas ao download e cópia de dados

import { TRAIN_PIPELINES, PRE_PROCESSING_RAW } from "../constants";

// cria um campo de entrada temporário no DOM, atribui o valor especificado a ele, seleciona o conteúdo desse campo e, em seguida, executa o comando de cópia (document.execCommand("copy")). Isso copiará o valor para a área de transferência. Após a cópia, o campo temporário é removido do DOM.
export const copyToClipboard = (value) => {
  let dummy = document.createElement("input");

  document.body.appendChild(dummy);
  dummy.value = value;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

//  recebe uma ação como entrada (que parece ser uma string, possivelmente uma constante) e retorna uma extensão de arquivo correspondente com base na ação. Parece que as extensões retornadas são 'py' para TRAIN_PIPELINES e 'csv' para PRE_PROCESSING_RAW.
export const getExtensionDownload = (action) => {
  if (action === TRAIN_PIPELINES) {
    return 'py';
  }

  if (action === PRE_PROCESSING_RAW) {
    return 'csv';
  }
}

// cria um URL de objeto (Blob) a partir do conteúdo fornecido (provavelmente dados de arquivo), cria um elemento de link (<a>) no DOM, define o atributo href do link como o URL do objeto Blob, define o atributo download do link com um nome de arquivo composto por um ID e a extensão de arquivo obtida pela função getExtensionDownload(). Depois disso, o link é temporariamente adicionado ao DOM, o clique no link é simulado e, finalmente, o link é removido do DOM.
export const downloadStream = ({ id, content, action }) => {
  const url = window.URL.createObjectURL(new Blob([content]));
  const link = document.createElement('a');
  const extension = getExtensionDownload(action);

  link.href = url;
  link.setAttribute('download', `${id}.${extension}`);
  document.body.appendChild(link);
  link.click();
}

// Essas funções parecem ser úteis para manipular o download e a cópia de conteúdo, como arquivos ou dados, em um aplicativo web. A função copyToClipboard() permite copiar um valor para a área de transferência, enquanto as funções getExtensionDownload() e downloadStream() tratam o download de conteúdo como arquivos. A extensão de arquivo é determinada com base na ação fornecida.