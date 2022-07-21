import axios from '../helper/custom_axios';
import Vue from 'vue';

export default class KullaniciService{

    getKullaniciList(){

        return axios.get('listeler/kullaniciList?token=' + Vue.$jwt.getToken()).then(res => res.data);
    }
    getOperasyonKullaniciList(){

        return axios.get('listeler/OperasyonKullaniciList?token=' + Vue.$jwt.getToken()).then(res => res.data);
    }
}
