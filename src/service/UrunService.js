import axios from '../helper/custom_axios';
import Vue from 'vue';


export default class UrunService{

    getUrunBirimList(){
        
        return axios.get('listeler/urunBirimList?token=' + Vue.$jwt.getToken()).then(res => res.data)
    }
}