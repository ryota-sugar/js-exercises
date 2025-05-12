// a,b: complex numbers

export const add = (a, b) => {
  return {
    re: a.re + b.re,
    im: a.im + b.im,
  };
};

export const sub = (a, b) => {
  return {
    re: a.re - b.re,
    im: a.im - b.im,
  };
};

export const mul = (a, b) => {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
};

export const div = (a, b) => {
  const denominator = b.re * b.re + b.im * b.im;
  return {
    re: (a.re * b.re + a.im * b.im) / denominator,
    im: (a.im * b.re - a.re * b.im) / denominator,
  };
};
