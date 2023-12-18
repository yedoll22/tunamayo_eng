export const getQueryString = (type?: number) => {
  if (type || type === 0) {
    const queryString: string = window.location.search;
    const result = queryString.split("&")[type];
    return result.split("=")[1];
  }
  const queryString: string = window.location.search;
  const result = queryString.split("=")[1];

  return result;
};

export const arrayBufferToBase64 = (buffer: ArrayBuffer | null) => {
  if (!buffer) return;

  let binary = "";
  let bytes = new Uint8Array(buffer);
  let len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};
