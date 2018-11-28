# Validador de Boletos

Projeto tem o objetivo de validar se o código digitável do boleto é válido.

**Considerações**

Não foquei na construção da estrutura da API por estar utilizando o express para rotear e gerenciar entrada e saída de dados. O objetivo principal foi criar um serviço que seja capaz de validar adequadamente o código digitável do boleto, de acordo com a solicitação.


### Instalação e utilização

Após clone do projeto, entre na pasta e execute os seguintes comandos:

```bash
npm install
npm start
```

Exemplo usando curl:

```bash
curl -X GET http://localhost:8000/boleto/99999.99999%2099999.999999%209999
```

ou

```bash
curl -X POST http://localhost:8000/boleto \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
	   "boleto": "99999.99999 99999.999999 99999.999999 9 99999999999"
   }'
```


### Rotas

VERBO | PATH | Descrição
----- | ---- | ----------
GET | / | Apresenta versão do projeto
GET | /boleto/{:digits} | Valida {:digits} do boleto informado
POST | /boleto | Valida boleto informado
