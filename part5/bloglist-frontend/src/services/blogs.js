import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const setToken = rawToken => {
  token = `Bearer ${rawToken}`
}

const create = async blogObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}${id}`, updatedBlog)
  return response.data
}

const deleteblog = async id => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}${id}`, config)
  return response.data
}

export default {
  setToken,
  create,
  getAll,
  update,
  deleteblog
}