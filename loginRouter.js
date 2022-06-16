const express = require('express');

const router = express.Router();

const HTTP_OK_STATUS = 200;
const HTTP_ERR_STATUS = 400;

function randomToken() {
  let randomString = '';
  const caracteres = 'ABCDEFabcdef123456';
  for (let i = 0; i < 16; i += 1) {
    randomString += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return randomString;
}

function validateLogin(request, response, next) {
  const { email, password } = request.body;
  const regex = /\S+@\S+\.\S+/;
  if (!email) {
    return response.status(HTTP_ERR_STATUS).json({ message: 'O campo "email" é obrigatório' });
  }
  if (regex.test(email) === false) {
    return response.status(HTTP_ERR_STATUS)
      .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (!password) {
    return response.status(HTTP_ERR_STATUS)
      .json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length < 6) {
    return response.status(HTTP_ERR_STATUS)
      .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  next();
}

router.post('/', validateLogin, (request, response) => {
  response.status(HTTP_OK_STATUS).json({ token: randomToken() });
});

module.exports = router;

/**
 * REFERENCIAS:
 * 
 * charAt(): https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/charAt
 */