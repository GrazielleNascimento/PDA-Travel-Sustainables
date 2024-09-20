# 🌿 Sustainable Travel Itinerary API

Conecte-se a uma API inteligente que gera itinerários de viagens sustentáveis com base nas preferências dos usuários. A API utiliza inteligência artificial para recomendar opções de hospedagem, transporte, refeições, eventos e guias, tudo com foco em práticas eco-friendly.

### 🚀 Funcionalidades

- CRUD completo para acomodação, transporte, refeição, eventos, guias e pacotes de viagem;
- Gerar itinerários personalizados com acomodações, transportes, refeições, eventos e guias, todos com foco em práticas sustentáveis;
- Integração com a API Google Gemini para recomendações otimizadas por inteligência artificial.

### 🛠️ Tecnologias Utilizadas

- Node.js;
- Express.


### 📄 Endpoints

1. **Criação de Itinerário**
    - **POST** ```/itinerary/create```;
        - Gera um novo itinerário com base nas preferências enviadas;
        - Parâmetros: ```id, name, description, location, placeID, accomodationID, transportationID, mealID, eventID, guideID, packageID```.
2. **Consultar Itinerário**
    - **GET** ```/itinerary/:id```;
        - Retorna os detalhes de um itinerário gerado.

3. **CRUD de Recursos**
    - **POST/GET/PUT/DELETE** ```/accommodation```;
    - **POST/GET/PUT/DELETE** ```/transportation```;
    - **POST/GET/PUT/DELETE** ```/meal```;
    - **POST/GET/PUT/DELETE** ```/event```;
    - **POST/GET/PUT/DELETE** ```/guide```;
    - **POST/GET/PUT/DELETE** ```/package```.

### 🗂️ Instalação e Configuração

1. Clonar o repositório
    ```bash
    git clone https://github.com/GrazielleNascimento/PDA-Travel-Sustainables.git
    ```

2. Instalar dependências
    ```
    npm install
    ```

3. Configurar variáveis de ambiente
Crie um arquivo .env com as seguintes variáveis:

- Token da API do Gemini:
    ```
    GEMINI_API_KEY
    ```

### 👧 Desenvolvido Por

[Grazielle Nascimento Ferreira](https://github.com/GrazielleNascimento)
