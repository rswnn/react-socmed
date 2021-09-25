import config from 'config.js';

const requestHandler = async(method, payload) => {
  try {
    let response = await fetch(`${config.url}${payload.path}`, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.body)
    });
    return await response.json();
  } catch (error) {
    return error;
  }
};

export default requestHandler;