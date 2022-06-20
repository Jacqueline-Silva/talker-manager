const express = require('express');

const router = express.Router();
const fs = require('fs');

const validateToken = require('./middlewares/validateToken');
const validateTalker = require('./middlewares/validateTalker');

const talkFile = './talker.json';
const HTTP_OK_STATUS = 200;
const HTTP_ERR_STATUS = 404;
const HTTP_OK = 201;
const HTTP_204 = 204;

router.get('/', (_request, response) => {
  const dataTalker = JSON.parse(fs.readFileSync(talkFile));
  const talker = dataTalker.length === 0 ? [] : dataTalker;
  response.status(HTTP_OK_STATUS).json(talker);
});

router.get('/:id', (request, response) => {
    const { id } = request.params;
    const dataTalker = JSON.parse(fs.readFileSync(talkFile));
    const talkerID = dataTalker.find((talker) => talker.id === +id);
    if (!talkerID) {
      return response.status(HTTP_ERR_STATUS)
        .json({ message: 'Pessoa palestrante não encontrada' });
    }
  response.status(HTTP_OK_STATUS).json(talkerID);
});

// CRUD
router.post('/',
  validateToken,
  validateTalker,
  (request, response) => {
    const { name, age, talk } = request.body;

    const talkers = JSON.parse(fs.readFileSync(talkFile));
    const newTalker = { id: talkers.length + 1, name, age, talk };
    talkers.push(newTalker);
  
    const upTalkers = JSON.stringify(talkers);
    fs.writeFileSync(talkFile, upTalkers);

    response.status(HTTP_OK).json(newTalker);
});

router.put('/:id',
  validateToken,
  validateTalker,
  (request, response) => {
    const { id } = request.params;
    const { name, age, talk } = request.body;

    const dataTalker = JSON.parse(fs.readFileSync(talkFile));
    const talkerID = dataTalker.findIndex((talker) => +talker.id === +id);

    const newTalker = { id: +id, name, age, talk };
    dataTalker[talkerID] = newTalker;

    fs.writeFileSync(talkFile, JSON.stringify(dataTalker));

    response.status(HTTP_OK_STATUS).json(newTalker);
  });

router.delete('/:id',
  validateToken,
  (request, response) => {
    const { id } = request.params;

    const dataTalker = JSON.parse(fs.readFileSync(talkFile));
    const talkerID = dataTalker.findIndex((talker) => +talker.id === +id);
    
    dataTalker.splice(talkerID, 1);

    fs.writeFileSync(talkFile, JSON.stringify(dataTalker));

    response.status(HTTP_204).send();
  });

module.exports = router;