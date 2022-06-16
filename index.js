const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const HTTP_ERR_STATUS = 404;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_request, response) => {
  const dataTalker = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const talker = dataTalker.length === 0 ? [] : dataTalker;
  response.status(HTTP_OK_STATUS).json(talker);
});

app.get('/talker/:id', (request, response) => {
  const { id } = request.params;
  const dataTalker = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const talkerID = dataTalker.find((talker) => talker.id === +id);
  if (!talkerID) {
    return response.status(HTTP_ERR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).json(talkerID);
});

app.listen(PORT, () => {
  console.log('Online');
});
