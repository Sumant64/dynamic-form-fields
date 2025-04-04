const { default: axios } = require("axios")

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

export const postConfigForm = (payload) => {

    return axios.post(`${baseUrl}/api/config`, payload, config);
}

export const getConfigForm = () => {
    return axios.get(`${baseUrl}/api/config`, config)
} 

export const postPersonalInfo = (payload) => {
  return axios.post(`${baseUrl}/api/personal-info`, payload, config)
}

export const getPersonalInfo = (params) => {
  const {rowsPerPage, page, search, sort} = params;
  return axios.get(`${baseUrl}/api/personal-info?row-per-page=${rowsPerPage}&page=${page}&search=${search}&sort=${sort}`)
}