const express = require('express');

const router = express.Router();
const crypto = require('crypto');

const validateLogin = require('./middlewares/validateLogin');

const HTTP_OK_STATUS = 200;

function randomToken() {
  return crypto.randomBytes(8).toString('hex');
}

router.post('/', validateLogin, (_request, response) => {
  response.status(HTTP_OK_STATUS).json({ token: randomToken() });
});

module.exports = router;
