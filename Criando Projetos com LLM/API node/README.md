# API Node.js Consulta CEP

Esta API permite consultar um endereço a partir de um CEP utilizando o serviço ViaCEP.

## Como usar

1. Instale as dependências:
   ```powershell
   npm install
   ```
2. Inicie o servidor:
   ```powershell
   node index.js
   ```
3. Faça uma requisição GET para:
   ```
   http://localhost:3000/cep/01001000
   ```
   Substitua `01001000` pelo CEP desejado.

## Exemplo de resposta

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

## Observações

- Se o CEP não existir, será retornado um erro 404.
- A API retorna os dados diretamente do ViaCEP em formato JSON.
