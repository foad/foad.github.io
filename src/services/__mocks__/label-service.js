const t = (label, startsWith = false) => {
  if (!startsWith) return label;
  return [label];
};

const init = jest.fn();

export { init, t };
