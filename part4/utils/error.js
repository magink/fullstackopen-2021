const errorHandler = (error, request, response, next) => {
  // console.error(error.name);
  // console.error(error.message);
  if (error.name === 'CastError') {
    // console.log('CastError trigged');
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    // console.log(error.name, error.message);
    return response.status(400).json({ error: error.message });
  }
  else if (error.name === 'UnauthorizedError') {
    return response.status(401).json({ error: error.message });
  }
  else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    });
  }
  else if(error.name === 'Error') {
    // console.log(error.name, error.message);
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
module.exports = { errorHandler };