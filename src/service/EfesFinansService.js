import axios from '../helper/custom_axios' 


const EfesFinansService = {


      getEfesKonteynerAnaListe(yil){

           return axios.get('efesfinans/listeler/EfesKonteynerAnaListe/' + yil).then(res => res.data) 
    },
    getEfesKonteynerGelenOdemelerYillik(){

           return axios.get('efesfinans/listeler/EfesKonteynerGelenOdemelerYil').then(res => res.data) 
       },
      getEfesFinansAyrintiListYukle(musteriid){
  
           return axios.get('efesfinans/listeler/EfeskonteynerAyrintiList/' + musteriid).then(res => res.data)
       },
      getEfesFinansOdemeSecimList(musteri_id,tarih){

            return axios.get('efesfinans/listeler/EfesodemeSecimList/' + musteri_id + '/' + tarih).then(res => res.data)
       },
       getEfesMusteriTahsilatListe(musteriid,siparisno){

           return axios.get('efesfinans/listeler/EfesmusteriTahsilatListe/' + musteriid + '/' + siparisno).then(res => res.data)
      },
       getEfesMusteriOdemeListesi(yil,ay){

           return axios.get('efesfinans/listeler/efesmusteriOdemeListesi/' + yil + '/' + ay).then(res => res.data)
      },
        getEfesMusteriOdemeYilListesi(){
  
        return axios.get('efesfinans/listeler/EfesmusteriOdemeYilListesi').then(res => res.data)
        },
        getEfesMusteriOdemeAyListesi(yil){
 
            return axios.get('efesfinans/listeler/EfesmusteriOdemeAyListesi/' + yil).then(res => res.data)
        }, 
        getEfesPesinatIslemListesi(){

           return axios.get('efesfinans/listeler/EfespesinatIslemListesi').then(res => res.data)
        },
        getEfesKonteynerExcelListe(data_list){

            return axios.post('efesfinans/dosyalar/EfeskonteynerExcelCikti',data_list).then(res => res.data)
         },

        getEfesTahsilatExcelListe(data_list){

            return axios.post('efesfinans/dosyalar/EfestahsilatExcelCikti',data_list).then(res => res.data)
         }
}



export default EfesFinansService