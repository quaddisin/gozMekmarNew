import axios from '../helper/custom_axios';

export default class LoginService{
    kullaniciGiris(user){
        return axios.post('login', user).then(res => res.data);
    }
}