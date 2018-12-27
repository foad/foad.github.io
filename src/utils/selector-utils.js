export function selectorTests(selector, state, expected, newState, props = {}) {
  beforeEach(() => {
    selector.resetRecomputations();
  });

  it('should output correct data', () => {
    expect(selector(state, props)).toEqual(expected);
  });

  it('should memoise', () => {
    selector(state, props);
    selector(state, props);
    expect(selector.recomputations()).toBe(0);

    selector(newState, props);
    expect(selector.recomputations()).toBe(1);
    selector(newState, props);
    expect(selector.recomputations()).toBe(1);
  });
}
