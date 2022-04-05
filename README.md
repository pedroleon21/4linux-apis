# 4linux-apis

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Resumo:

Foi criado um projeto minimo para publicado em ambiente de produção. 
os projetos foram clonados e seradamente feito build para uma imagem local. executando os containers foi feito teste local para validar o funcionanmento dos serviços nas portas 8080 e 8081.
Pesteriormete inicie a tentativa de configurar o triefik na porta 80 redirecionando para seus respectivos recursos de acordo com a rota. Não objeve sucesso no mapeamento para a rota '/4linux' base da rota da api para o serviço, ja o front end foi facilmente servido no '/' do servidor.
abandonando a tentativa de mapear os recursos com o tryfik adicionei um docker compose para a imagem gerada dos serviços e configurando um proxy reverso para cada container. Os front end foi servido corretamente e 

arquitetura proposta:
https://imgur.com/8KJsvip

A ideia deste projeto foi a criação de um projeto minimo e a publicação em ambiente produção para testes e evoluções posteriores a criação do ambiente.




### Copia do readme deixado no respositório da api

consumer-public-api Project

Um projeto Quarkus.

O pacote inicial do projeto foi gerado a partir do siter do quarkus.io que fonece um projeto base organizado e com as dependencias de nossa escolha.

para executar

./mvnw compile quarkus:dev
_NOTE:_ Quarkus now ships with a Dev UI, which is available in dev mode only at http://localhost:8080/q/dev/.

Empacontaodo e rodando a aplicacão

mvn clean packege Dquarkus.profile=prod
apesar de poder ser compilada para binário esta aplicação não esta executando em binário. ela roda sobre a open-jdk-11 e esta sendo executada dentro de um docker presente neste arquivo.

desafios:

Tive desafio especial e acabei por não buscar um solução definifiva para mapear para um objeto e uma lista, retornando uma string da resposta e filtrando no proprio front na listagem de apis. infelizmente o tempo não contribuiu para a busca de um solução efetiva. apesar de retorar uma string no header e no body da requisição de login, não implementei o jwt que era o objetivo primário. e existe uma dependencia que acabou pro quebrar os teste unitário, mas com a remoção das dependencias do jersey cliente os testes voltam a funcionar. ja existe uma solução para a incompatibildade.