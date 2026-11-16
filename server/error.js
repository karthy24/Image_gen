  export const createError = (status, message) => {
  // Correct type or fallback
  if (typeof status !== 'number') {
    console.warn("createError: status is not a number, defaulting to 500. Received:", status);
    status = 500;
  }
  // If message is not a string (like an object/req), stringify it for clarity
  if (typeof message !== 'string') {
    if (message && typeof message === 'object') {
      console.warn("createError: message is an object, converting to string. Received:", message);
      message = JSON.stringify(message);
    } else {
      message = 'Internal Server Error';
    }
  }
  const err = new Error(message);
    err.status = status;
  return err;
};
  