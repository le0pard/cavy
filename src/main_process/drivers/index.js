export const driverResponse = ({args, handleSuccessResponse, handleErrorResponse}) => {
  const {type} = args;
  switch (type) {
    default:
      return handleSuccessResponse({pong: true});
  }
};
