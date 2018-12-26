let allLabels;

function t(label) {
  return allLabels[label];
}

function getLabels() {
  return new Promise((resolve, reject) => {
    // TODO: call label backend endpoint
    resolve({});
  });
}

function init() {
  return dispatch => {
    dispatch({
      type: 'LABELS_LOADING'
    });
    return getLabels()
      .then(labels => {
        allLabels = labels;
        dispatch({
          type: 'LABELS_LOADED',
          payload: null
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export { init, t };
