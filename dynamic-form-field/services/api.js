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