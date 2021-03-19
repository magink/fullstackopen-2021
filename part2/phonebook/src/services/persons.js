import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAllPersons = () => {
  return axios.get(baseUrl).then((response) => response.data);
};
const createPerson = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};
const updatePerson = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};
const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((response) => response.data);
};
// esLint complains if I use shorter notation, so I had to use the longer
// See https://github.com/benmosher/eslint-plugin-import/blob/v2.22.1/docs/rules/no-anonymous-default-export.md
const personServices = {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson,
};
export default personServices;
