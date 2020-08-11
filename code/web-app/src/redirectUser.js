import React from 'react';
import { withRouter } from 'react-router-dom';

const RedirectUser = (props) => {
  return props.history.push('/convid');
};

export default withRouter(RedirectUser);
