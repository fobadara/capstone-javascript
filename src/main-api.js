const callApi = async (url) => {
  const resolve = await fetch(url).then((result) => result.json());
  return resolve;
};

export { callApi };