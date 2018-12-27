let allLabels;

// TODO: Replace with request util + config
const labelURI = 'http://localhost:5000/labels';

function t(label, startsWith = false) {
  if (!startsWith) return allLabels[label];

  return Object.entries(allLabels)
    .filter(l => l[0].startsWith(label))
    .map(l => l[1]);
}

function getLabels() {
  return new Promise((resolve, reject) => {
    fetch(labelURI)
      .then(response => response.json())
      .then(data => resolve(data.labels))
      .catch(error => reject(error));
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
          type: 'LABELS_LOADED'
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export { init, t };
