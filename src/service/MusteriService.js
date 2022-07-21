import axios from '../helper/custom_axios';
import Vue from 'vue';

export default class MusteriService{

    getMusteriList(){

        return axios.get('listeler/musteriList?token=' + Vue.$jwt.getToken()).then(res => res.data);
    }
}
