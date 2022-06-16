const express = require('express');

const router = express.Router();
const fs = require('fs');

const HTTP_OK_STATUS = 200;
const HTTP_ERR_STATUS = 404;

router.get('/', (_request, response) => {
  const dataTalker = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const talker = dataTalker.length === 0 ? [] : dataTalker;
  response.status(HTTP_OK_STATUS).json(talker);
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  const dataTalker = JSON.parse(fs.readFileSync('talker.json', 'utf8'));
  const talkerID = dataTalker.find((talker) => talker.id === +id);
  if (!talkerID) {
    return response.status(HTTP_ERR_STATUS).json({ message: 'Pessoa palestrante não encontrada' });
  }
  response.status(HTTP_OK_STATUS).json(talkerID);
});

module.exports = router;