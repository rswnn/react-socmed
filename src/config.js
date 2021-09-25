const staging = {
  url: process.env.REACT_APP_API_URL_STAGING,
  imageUrl: process.env.REACT_APP_API_URL_STAGING,
  name: 'Staging',
};
  
const production = {
  url: process.env.REACT_APP_API_URL_PROD,
  imageUrl: process.env.REACT_APP_API_URL_PROD,
  name: 'Production',
};
  
const dev = {
  url: process.env.REACT_APP_API_URL_DEV,
  imageUrl: process.env.REACT_APP_API_URL_STAGING,
  name: 'Development',
};
  
let config = {};
  
switch (process.env.REACT_APP_STAGE) {
    
case 'staging':
  config = staging;
  break;
  
case 'production':
  config = production;
  break;
  
case 'development':
  config = dev;
  break;
  
default:
  break;
}
  
export default { ...config, };