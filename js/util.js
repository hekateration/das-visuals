const randomInt = (min, max) =>
{
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const wait = async (duration) =>
{
  return new Promise((resolve) =>
  {
    setTimeout(() => { resolve(); }, duration);
  });
};
