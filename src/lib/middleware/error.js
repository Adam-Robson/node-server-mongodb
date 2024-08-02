const error = (err, req, res, next) => {
  console.error(`The error stack is: ${err.stack}`);
  res.status(500).send('Error: Status 500. A server error occurred.');
};

export default error;
