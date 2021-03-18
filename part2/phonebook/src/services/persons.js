import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};
const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};
const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};
// esLint complains if I use shorter notation, so I had to use the longer
// See https://github.com/benmosher/eslint-plugin-import/blob/v2.22.1/docs/rules/no-anonymous-default-export.md
const personServices = { getAll, create, update };
export default personServices;
