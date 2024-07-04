import axios from 'axios';
import router from './router'


const axiosClient = axios.create({
    baseURL : 'http://localhost:8000/api'
})

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('TOKEN')
    config.headers.Authorization = `Bearer ${token} `
    return config
})

axiosClient.interceptors.response.use(
    response => {
        return response
    },
    /* error => {
        if(error.response){
            router.navigate('/home')
            return error ;
        }
    } */
)
export default axiosClient ;