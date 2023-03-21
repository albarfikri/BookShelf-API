const messageResponse = (inputStatus, inputMessage) => {
    const outputResponseMessage = {
      status: inputStatus,
      message: inputMessage,
    };
    return outputResponseMessage;
  };

  export default messageResponse;
  