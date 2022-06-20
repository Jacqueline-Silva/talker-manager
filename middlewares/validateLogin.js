const HTTP_ERR_STATUS = 400;

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

module.exports = validateLogin;