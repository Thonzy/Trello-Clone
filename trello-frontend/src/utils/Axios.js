import axios from 'axios'

const instance = axios.create({
    baseURL: "https://trello-be-31x4.onrender.com/api"
})

export default instance