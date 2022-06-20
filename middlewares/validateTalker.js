const dataRegex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
const ERR_400 = 400;

function validateAge(age, response) {
  if (!age) {
    return response.status(ERR_400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!Number.isInteger(age) || age < 18) {
    return response.status(ERR_400)
      .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
}

function validateName(name, response) {
  if (!name) {
    return response.status(ERR_400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return response.status(ERR_400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
}

function validateRate(talk, response) {
  if (talk.rate === undefined) {
    return response.status(ERR_400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (!Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return response.status(ERR_400)
      .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
}

function validateTalk(talk, response) {
  if (!talk) return response.status(ERR_400).json({ message: 'O campo "talk" é obrigatório' });
  if (!talk.watchedAt) {
    return response.status(ERR_400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dataRegex.test(talk.watchedAt)) {
    return response.status(ERR_400)
      .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
}

function validateTalker(request, response, next) {
  const { name, age, talk } = request.body;
  validateName(name, response);
  validateAge(age, response);
  validateTalk(talk, response);
  validateRate(talk, response);

  next();
}

module.exports = validateTalker;