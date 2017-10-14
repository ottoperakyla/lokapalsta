import axios from 'axios'
const ROOT_URL = 'http://craschan.clients.crasman.fi/stage-ajax'

export const fetchPosts = () => {
  return axios.get(`${ROOT_URL}/fetchPosts`)
}

export const fetchPost = (id) => {
  //return axios.get(`${ROOT_URL}/fetchPost?id=` + id)
  // placeholder
  return {
    data: {
      id: '12GERg4km€#ffg',
      title: 'Hannu liity snapchattii :D',
      timestamp: '14.10.17 18:45',
      text: 'Hannu hei tee parhaas',
      replies: [
        {
          id: 'vermlk3m4lk3',
          timestamp: '16.10.17 08:03',
          text: 'Niinpä'
        },
        {
          id: 'asdfaerverlm',
          timestamp: '16.10.17 09:54',
          text: 'haist kiki'
        }
      ]
    }
  }
}


