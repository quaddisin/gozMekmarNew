import axios from '../helper/custom_axios';
import Vue from 'vue';

export default class TedarikciService {


     getTedarikciMenuList(){

        return axios.get('listeler/tedarikciSiparisList?token=' + Vue.$jwt.getToken()).then(res =>  res.data)
     }
}