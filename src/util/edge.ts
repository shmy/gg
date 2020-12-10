// @ts-ignore
import * as edge from "edge.js";
import * as humps from "humps";

edge.global("camelize",  (value: string) => {
  return humps.camelize(value);
});

edge.global("pascalize",  (value: string) => {
  return humps.pascalize(value);
});

export default edge;

