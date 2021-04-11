const errorHandler = (error, request, response, next) => {
  switch(error.name) {
  case 'TypeError':
    return response.status(400).send({ error: 'wrong username or password' });
  case 'CastError':
    return response.status(400).send({ error: 'malformatted id' });
  case 'ValidationError':
    return response.status(400).json({ error: error.message });
  case 'UnauthorizedError':
    return response.status(401).json({ error: error.message });
  case 'JsonWebTokenError':
    return response.status(401).json({ error: error.message });
  case 'TokenExpiredError':
    return response.status(401).json({ error: 'token is expired' });
  case 'MissingResource':
    return response.status(404).json({ error: error.message });
  case 'MissingToken':
    return response.status(404).json({ error: error.message });
  case 'Error':
    return response.status(400).json({ error: error.message });
  }
};
module.exports = errorHandler ;