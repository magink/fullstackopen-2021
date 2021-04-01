const errorHandler = (error, request, response, next) => {
  // console.error(error.name);
  // console.error(error.message);
  if (error.name === 'CastError') {
    // console.log('CastError trigged');
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    // console.log('ValidationError Trigged');
    return response.status(400).json({ error: error.message });
  }
  next(error);
};
module.exports = { errorHandler };