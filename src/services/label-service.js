let allLabels;

const mockLabels = {
  'general.name': 'Dan Foad',
  'general.role': 'Associate Software Developer',
  'home.header.subline': 'Currently working with NowTV',
  'home.header.contact': 'Contact Me',
  'app.nav.links': {
    'app.links.home': 'Home',
    'app.links.projects': 'Projects',
    'app.links.cv': 'CV',
    'app.links.blog': 'Blog',
    'app.links.contact': 'Contact Me'
  }
};

function t(label) {
  return allLabels[label];
}

function getLabels() {
  return new Promise((resolve, reject) => {
    // TODO: call label backend endpoint
    resolve(mockLabels);
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
