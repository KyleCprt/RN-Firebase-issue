// App start
export const appStart = () => {
  return { type: 'APP_START' };
};

export const connectionState = (status) => {
  return { type: 'CHANGE_CONNECTION_STATUS', status };
};

// Navigation
export const goTo = (scene) => {
  return { type: 'GO_TO', scene };
};

export const goBack = () => {
  return { type: 'GO_BACK' };
};

export const showModal = (scene, props) => {
  return { type: 'SHOW_MODAL', scene, props };
};