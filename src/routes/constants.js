// Essas constantes representam as rotas utilizadas na aplicação. Cada rota é associada a um caminho específico dentro da aplicação, permitindo a navegação entre diferentes páginas. 


// Esta constante representa a rota raiz da aplicação, ou seja, a página inicial da aplicação. Geralmente, é usada como o ponto de partida quando o usuário acessa o site.
export const ROOT = '/';
// representa a rota para a página de treinamento de modelos. Pode ser usada para direcionar o usuário para a página onde eles podem treinar seus modelos.
export const TRAIN = '/train';
// representa a rota para a página de login. Ela pode ser usada para redirecionar o usuário para a página onde eles podem fazer login na aplicação.
export const SIGNIN = '/signin';
// representa a rota para a página de modelos de treinamento. Pode ser usada para direcionar o usuário para a página onde eles podem visualizar e gerenciar os modelos de treinamento salvos.
export const TRAIN_MODEL = '/train-model';

// Essas constantes facilitam a manutenção e a alteração das rotas em toda a aplicação. Quando você precisa criar um link para uma página específica ou redirecionar o usuário para uma determinada página, você pode usar essas constantes em vez de codificar os caminhos manualmente. Isso torna o código mais legível e menos propenso a erros.