const errorHandler = (error, request, response, next) => {
  // console.log('error was thrown', error.name, error.message);
  switch(error.name) {
  case 'CastError':
    return response.status(400).send({ error: 'malformatted id' });
  case 'ValidationError':
    return response.status(400).json({ error: error.message });
  case 'UnauthorizedError':
    return response.status(401).json({ error: error.message });
  case 'JsonWebTokenError':
    return response.status(401).json({ error: 'invalid token' });
  case 'MissingResource':
    return response.status(404).json({ error: error.message });
  case 'MissingToken':
    return response.status(404).json({ error: error.message });
  case 'Error':
    return response.status(400).json({ error: error.message });
  }
};
module.exports = errorHandler ;