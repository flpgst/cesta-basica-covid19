# cesta-basica-covid19
Software para cadastrar pessoas e gerenciar o recebimento da cesta básica fornecida durante a quarentena do Corona Vírus

# Processos de instalação
Esse sistema utiliza nodeJS no backend e VueJS no frontend, sendo assim é necessário ter o node instalada para poder executar este sistema.
Para instruções de instalação do node visite:
http://nodejs.org

Este sistema opera com banco de dados Postgres

Para instalar o Postgres com docker execute o comando "docker run --name postgres -e POSTGRES_PASSWORD=COLOQUESUASENHA -p5432:5432 -d postgres"

Para configurar a conexão com o banco de dados edite o arquivo backend/src/config/database.js
  altere o valor dos parâmetros username e password (Caso tenha usado docker para instalar o Postgres o usuário padrão é postgres)

Para criar o banco de dados acesse a pasta backend e execute os seguintes comandos:
  - npx sequelize-cli db:create
  - npx sequelize-cli db:migrate
  - npx sequelize-cli db:seed:all
Estes comando vão respectivamente, criar o banco de dados, criar as tabelas e popular os dados básicos.

Para o sistema rodar em modo desenvolvimento siga os seguintes passos:
  Acesse pasta backend e execute o comando:
    - npm dev
    * este comando habilita o servidor backend na porta 3333.
  Acesse a pasta frontend e execute o comando:
    - npm serve
    * este comando habilita o servidor backend na porta 8080.

Para acessar a aplicação abra o navegador e digite http://localhost:8080

O usuário inicial de acesso é admin e a senha é 123456 (Recomendado excluir este usuário após criar um novo usuário com a permissão admin)

Para rodar a aplicação em produção é necessário fazer o build do backend e do frontend para isso execute o seguinte comando na pasta backend e também na pasta frontend:  
  - npm build
Este comando irá criar as pasta backend/dist e frontend/dist estas pastas deverão ser utilizadas no servidor de produção
  Para rodar a aplicação em produção basta rodar o comando npm start no servidor e acessar a url configurada no servidor web.
  

# Software desenvolvido por:
 - Darlan Robson Voss
 - Filipe Augusto Gonçalves
 - Mateus Pedroni

# Este é um software open-source.


