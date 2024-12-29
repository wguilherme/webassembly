# WebAssembly Node.js Example

Este é um exemplo simples de como usar WebAssembly com Node.js e C. O projeto demonstra a integração entre código C compilado para WebAssembly e uma API REST em Node.js.

## Estrutura do Projeto

```
.
├── src
│   ├── server/
│   │   └── index.js    # Servidor Node.js
│   └── wasm/
│       └── sum.c       # Código C que será compilado para WebAssembly
├── .tool-versions      # Versões das ferramentas (asdf)
├── Makefile           # Automação de builds e comandos
└── package.json       # Dependências Node.js
```

## Pré-requisitos

- Node.js (20.10.0)
- Emscripten (via asdf)
- make

## Instalação

1. Instale as versões corretas do Node.js e Emscripten usando asdf:
```bash
asdf install
```

2. Instale as dependências do Node.js:
```bash
make install
```

## Desenvolvimento

Para compilar o código C para WebAssembly e iniciar o servidor:
```bash
make dev
```

Este comando irá:
1. Compilar o arquivo `src/wasm/sum.c` para WebAssembly
2. Iniciar o servidor Node.js na porta 3000

## Uso

O servidor expõe um endpoint GET que soma dois números usando WebAssembly:

```bash
curl "http://localhost:3000/sum?a=5&b=3"
```

Resposta:
```json
{"result": 8}
```

## Como Funciona

1. O código C define uma função simples de soma:
```c
#include <emscripten.h>

EMSCRIPTEN_KEEPALIVE
int sum(int a, int b) {
    return a + b;
}
```

2. O Emscripten compila este código para WebAssembly, gerando os arquivos `sum.wasm` e `sum.js`

3. O servidor Node.js carrega o módulo WebAssembly e expõe a função através de uma API REST

## Comandos Disponíveis

- `make install`: Instala as dependências do Node.js
- `make build`: Compila o código C para WebAssembly
- `make dev`: Compila e inicia o servidor
- `make clean`: Remove os arquivos gerados

## Tecnologias Utilizadas

- Node.js
- Express.js
- WebAssembly
- Emscripten
- C
