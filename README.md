
# portal-filmes

Projeto de **Portal de Filmes** desenvolvido como exercício para as turmas de 2º Semestre de Engenharia de Software da FIAP. Esta aplicação permite aos usuários navegar por filmes populares, assistir trailers, marcar filmes como assistidos ou para ver depois, e receber recomendações personalizadas com base nos filmes que já assistiram. O projeto utiliza a **API do The Movie Database (TMDb)** para obter informações e dados sobre os filmes.

## 🛠 Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para criação da interface de usuário.
- **Tailwind CSS**: Framework de CSS para estilização moderna e customizável.
- **Vite**: Ferramenta de build e desenvolvimento rápido para projetos React.
- **The Movie Database (TMDb) API**: API para obter dados de filmes, trailers, e lançamentos.
- **LocalStorage**: Utilizado para armazenar os filmes que os usuários marcaram como assistidos ou para ver depois.

## 🚀 Funcionalidades

- **Catálogo de Filmes**: Exibe uma lista de filmes populares e próximos lançamentos.
- **Busca de Filmes**: Possibilita a busca de filmes específicos.
- **Recomendações Personalizadas**: Recomenda filmes com base nos filmes assistidos pelo usuário.
- **Marcar Filmes**: Permite que o usuário marque filmes como "Assistidos" ou "Ver Depois".
- **Remover Filmes**: Possibilita remover filmes da lista de assistidos ou da lista de ver depois.
- **Visualizar Trailers**: Exibe trailers dos filmes via YouTube.

## 📦 Como rodar o projeto localmente

### Pré-requisitos

Certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior)
- **npm** ou **yarn**

### Passo a Passo

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. **Acesse a pasta do projeto**:

   ```bash
   cd nome-do-projeto
   ```

3. **Instale as dependências**:

   Com npm:
   ```bash
   npm install
   ```

   Ou com yarn:
   ```bash
   yarn install
   ```

4. **Configurar a API do TMDb**:

   - Crie uma conta no [TMDb](https://www.themoviedb.org/).
   - Gere uma chave de API.
   - Adicione a chave de API ao arquivo `.env` na raiz do projeto com o seguinte formato:

     ```bash
     VITE_API_KEY=your_tmdb_api_key_here
     ```

5. **Inicie o servidor de desenvolvimento**:

   Com npm:
   ```bash
   npm run dev
   ```

   Ou com yarn:
   ```bash
   yarn dev
   ```

6. **Acesse a aplicação**:

   Abra seu navegador e acesse `http://localhost:5173`.

## 🌐 API Utilizada

Este projeto utiliza a API do [The Movie Database (TMDb)](https://www.themoviedb.org/documentation/api) para obter informações sobre filmes.

### Endpoints principais utilizados:

- **Filmes Populares**:
  - `https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY&language=pt-BR&page=1`
- **Próximos Lançamentos**:
  - `https://api.themoviedb.org/3/movie/upcoming?api_key=YOUR_API_KEY&language=pt-BR&page=1`
- **Detalhes de Filmes**:
  - `https://api.themoviedb.org/3/movie/{movie_id}?api_key=YOUR_API_KEY&language=pt-BR`
- **Trailer do Filme**:
  - `https://api.themoviedb.org/3/movie/{movie_id}/videos?api_key=YOUR_API_KEY&language=pt-BR`

---

Este projeto foi desenvolvido com fins educacionais para as turmas da FIAP no curso de Engenharia de Software.
