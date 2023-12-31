const showError = (status, message) => {
  const error = new Error();

  error.status = status;
  error.message = message;

  return error;
};

export default showError;
