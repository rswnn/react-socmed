import config from 'config.js';

const requestHandler = async(method, payload, signal) => {
  try {
    let response = await fetch(`${config.url}${payload.path}`, {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.body),
      signal: signal
    });
    if (!response.ok) {
      const body = payload.body;
      return body;
    }
    return await response.json();
  } catch (error) {
    return error;
  }
};

export default requestHandler;