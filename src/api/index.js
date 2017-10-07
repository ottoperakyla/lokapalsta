import axios from 'axios'
const ROOT_URL = 'http://craschan.clients.crasman.fi/stage-ajax'

export const fetchPosts = () => {
  return axios.get(`${ROOT_URL}/fetchPosts`)
}


