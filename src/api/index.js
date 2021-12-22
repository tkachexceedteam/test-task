import axios from "axios";

const URL = 'https://reqres.in/api/users'

export const getListUsers = (page) => {
  return axios.get(`${URL}?page=${page}`)
    .then((res) => res.data);
}

export const getSingleUser = (id) => {
  return axios.get(`${URL}/${id}`)
    .then((res) => res.data)
}