Para desenvolver
```bash
git clone git@github.com:ronateds/BookStore-Manager-CLI.git
cd BookStore-Manager-CLI

# Mude para a branch desejada
# Exemplo
git checkout feat/autores
# se a branch não estiver criada
git checkout -b feat/autores

# para atualizar a branch com a develop de os dois proximos comando
git fetch origin
git merge origin/develop

# abra no VS code com o comando
code .

# Coloque o arquivo .env na raiz do projeto

# coloque o arquivo ca.pem dentro da pasta database

# instale os pacotes a primeira vez
npm install

# rode em desenvolvimento
npm run dev
```