const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Rota para buscar endereço pelo CEP
app.get('/cep/:cep', async (req, res) => {
  const { cep } = req.params;
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    if (response.data.erro) {
      return res.status(404).json({ error: 'CEP não encontrado' });
    }
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao buscar o CEP' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
