jest.mock('../src/services/label-service', () => ({
  t: label => `translated ${label}`,
}));
