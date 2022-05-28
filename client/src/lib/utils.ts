export const getQueryString = (type?: number) => {
  if (type) {
    const queryString: string = window.location.search;
    const result = queryString.split("&")[type].split("=")[1];
    return result;
  }
  const queryString: string = window.location.search;
  const result = queryString.split("=")[1];

  return result;
};
