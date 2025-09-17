export const debounce = (func) => {
  let timer;
  return function (event) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(
      () => {
        func();
      },
      200,
      event
    );
  };
};
