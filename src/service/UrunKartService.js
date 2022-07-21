import axios from '../helper/custom_axios';
import Vue from 'vue';


const  UrunKartService = {


    getUrunKartMenuList(){
        return axios.get('listeler/urunKartMenuList?token=' + Vue.$jwt.getToken()).then(response => response.data);
    },

    setUrunKaydet(kart){

        return axios.post('islemler/urunKart/kayit',kart).then(res => res.data);
    },

    setUrunGuncelle(kart){

        return axios.put('islemler/urunKart/kayit',kart).then(res => res.data);
    },

    getUrunKart(urunKartId){ 

        return axios.get('islemler/urunKart/getUrunKart/' + urunKartId + '?token=' + Vue.$jwt.getToken()).then(res => res.data);

    },

    setUrunKartSil(urunKartId,username){
        
        return axios.delete('/islemler/urunKart/getUrunKartSil/' + urunKartId + '/' + username).then(res=> res.data )
    },
    getSeleksiyonKasaKontrol(urunKartId){
        return axios.get('/seleksiyon/islemler/getUrunKartSeleksiyonKasaKontrol/' + urunKartId).then(res=> res.data )
    },
    

    getUrunKartModel(){

        return axios.get('islemler/urunKart/getUrunKartModel?token=' + Vue.$jwt.getToken()).then(res => res.data);
    },

    getUrunDetayList(urunKartId){

        return axios.get('islemler/urunKart/getUrunKartDetayList/' + urunKartId + '?token=' + Vue.$jwt.getToken()).then(res => res.data);
    },

    getUrunDetayListYeni(){

        return axios.get('islemler/urunKart/getUrunKartDetayListYeni?token=' + Vue.$jwt.getToken()).then(res => res.data);
    },
    setKasaYeniUrunKart(kasaNo,urunKartId,username){
        return axios.put('islemler/urunKart/setKasaYeniUrunKart/' + kasaNo + '/' +  urunKartId + '/' + username ).then(res => res.data);
    }


}

export default UrunKartService;