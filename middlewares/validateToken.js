const ERR_401 = 401;

function validateToken(request, response, next) {
  const { authorization } = request.headers;

  if (!authorization) {
    return response.status(ERR_401).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return response.status(ERR_401).json({ message: 'Token inválido' });
  }

  next();
}

module.exports = validateToken;