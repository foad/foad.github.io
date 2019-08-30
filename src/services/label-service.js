let allLabels;

// TODO: Replace with request util + config
const labelURI = 'http://localhost:5000/labels';

const mockLabels = {
  'general.name': 'Dan Foad',
  'general.role': 'Associate Software Developer',
  'general.aboutMe': 'About Me',
  'general.featuredProject': 'Featured Project',
  'home.header.subline': 'Currently working with NowTV',
  'home.header.contact': 'Contact Me',
  'app.nav.links.home': 'Home',
  'app.nav.links.projects': 'Projects',
  'app.nav.links.cv': 'CV',
  'app.nav.links.blog': 'Blog',
  'app.nav.links.contact': 'Contact Me',
};

const t = (label, startsWith = false) => {
  if (!startsWith) return allLabels[label];

  return Object.entries(allLabels)
    .filter(l => l[0].startsWith(label))
    .map(l => l[1]);
};

const getLabels = () => {
  return new Promise(resolve => {
    fetch(labelURI)
      .then(response => response.json())
      .then(data => resolve(data.labels))
      .catch(() => resolve(mockLabels));
  });
};

const init = () => {
  return dispatch => {
    dispatch({
      type: 'LABELS_LOADING',
    });
    return getLabels()
      .then(labels => {
        allLabels = labels;
        dispatch({
          type: 'LABELS_LOADED',
        });
      })
      .catch(err => {
        console.error(err);
      });
  };
};

export { init, t };
