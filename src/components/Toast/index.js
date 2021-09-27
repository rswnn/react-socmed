import M from 'materialize-css';

const Toast = () => {

  const errorMessage = text => {
    M.toast({
      html: text,
      inDuration: 50,
      displayLength: 2000,
      classes: 'error-toast'
    });
  };

  const successMessage = text => {
    M.toast({
      html: text,
      inDuration: 50,
      displayLength: 2000,
      classes: 'success-toast'
    });
  };

  return {
    errorMessage,
    successMessage
  };
};

export default Toast;
