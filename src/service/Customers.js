import axios from '../helper/custom_axios';



const customersService = {

    getCustomersListe(){

        return axios.get('/listeler/customers/customersList').then(res => res.data);
    },
    getCustomersDetayListe(musteri_adi){

        return axios.get('listeler/customers/customersDetay/'+ musteri_adi).then(res => res.data);
    },
    satisciIcerikKaydetme(item_data){

        return axios.post('satisci/customers/islemler/satisciKayitDegistirme',item_data).then(res => res.data)
     },
     satisciIcerikGuncelleme(item_data){

      return axios.put('satisci/customers/islemler/satisciKayitDegistirme',item_data).then(res => res.data)
   },
     satisciIcerikSilme(id){

        return axios.delete('satisci/customers/islemler/satisciKayitSilme/' + id).then(res => res.data)
   },
   getSatisciMusteriListe(musteriadi,id){

    return axios.get('satisci/customers/liste/musteriListe/' + musteriadi + '/' + id).then(res => res.data)
   },
   getSatisciModel(){

    return axios.get('satisci/customers/satisciModel').then(res => res.data);
   },
   setSatisciDosyaKayit(musteri){

    return axios.post('islemler/customers/satisciDosyaKaydet',musteri).then(res => res.data);
    },
   
   getCustomersHatirlatmaListe(kullanici_id){

        return axios.get('listeler/customers/customersHatirlatma/'+ kullanici_id).then(res => res.data);
    },
}

export default customersService;