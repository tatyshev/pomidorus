function the(name, getter) {
  if (typeof getter !== 'function') {
    throw new Error('"the": second argument `getter` should be a function.');
  }

  const define = (key, fn) => {
    let cache;

    Object.defineProperty(the, key, {
      get: () => (cache = cache || fn()),
      configurable: true,
      enumerable: true,
    });
  };

  try {
    expect();
    define(name, getter);
  } catch (e) {
    beforeEach(() => define(name, getter));
  }

  afterEach(() => delete the[name]);
}

window.the = the;
