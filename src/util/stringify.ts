export const stringify: (value: any) => string = (value: any) => {
  return JSON.stringify(value, null, 2).replace(/"([^"]+)":/g, "$1:");
};
