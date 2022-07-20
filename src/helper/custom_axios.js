import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://doktor-servis.mekmar.com/',
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
})
export default instance;