import axios from 'axios'

const axiosInstance= axios.create({
    baseURL:'https://react-my-burger-d3b73.firebaseio.com/'
})

export default axiosInstance; 
