import axios from '../helper/custom_axios';
import store from '../store/store';


const raporService = {

    getSiparisOzet(){

        return axios.get('raporlar/siparisOzet').then(res => res.data);
    },
    getSiteYeniUrunList(){

        return axios.get('raporlar/siteYeniUrunList').then(res => res.data)
    },
    
    getYeniSiparisList(){

        return axios.get('/raporlar/yeniEklenenSiparisler').then(res => res.data)
    },
    getSiparisOzetRapor(){

        return axios.get('raporlar/siparis/siparisOzetRaporlar').then(res => res.data)
    },

    getSiparisBazindaOzetTablo(){

        return axios.get('raporlar/siparis/siparisBazindeOzetRapor').then(res => res.data)
    },



    getMusteriBazindaSiparisOzetTablo(){

        return axios.get('raporlar/siparis/musteriBazindaSiparisOzet').then(res => res.data)
    },


    getAnaSayfaDegisiklikList(){
        return axios.get('raporlar/anaSayfa/anaSayfaDegisiklikList').then(res=>res.data)
    },

    getAnaSayfaDegisiklikListAll() {
        return axios.get('raporlar/anaSayfa/anaSayfaDegisiklikListAll').then(res=>res.data)
    },
    


    getMusteriBazindaAyrinti(yil,ay){
        
        return axios.get('raporlar/siparis/musteriBazindaAyrinti/' + yil + '/' + ay).then(res => res.data)
    },
    
    getUlkeBazindaSevkiyat(){
        
        return axios.get('raporlar/siparis/ulkeBazindaSevkiyat').then(res => res.data)
    },
    getUlkeBazindaSevkiyatYear(year){
        
        return axios.get('raporlar/siparis/ulkeBazindaSevkiyatYears/' + year).then(res => res.data)
    },


    getKullaniciSiparisOzetRapor(){
        const username = store.getters.getUser;
        return axios.get('raporlar/siparisozet/siparisOzetRaporlar/'+username).then(res => res.data)
    },
    getKullaniciSiparisOzetAyrinti(ay){
        const username = store.getters.getUser;
        return axios.get(`raporlar/siparisozet/kullaniciOzet/${username}/${ay}`).then(res => res.data)
       
    },
    getUretimRaporuHepsi(){

        return axios.get('raporlar/listeler/uretimRaporuHepsi').then(res => res.data)
    },
    getUretimRaporTarih(tarih){ 

        return axios.get('raporlar/listeler/uretimRaporTarih/' + tarih).then(res => res.data)
    },
    getUretimRaporIkiTarih(ilk_tarih,son_tarih){

        return axios.get(`raporlar/listeler/uretimRaporIkiTarih/${ilk_tarih}/${son_tarih}`).then(res => res.data)
    },
    getUretimRaporExcel(data_list){

        return axios.post('/raporlar/dosyalar/uretimRaporExcelListe',data_list).then(res=>res.data)
    },
    getSevkiyatRaporHepsi(tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporHepsi/${tarih}`).then(res => res.data)
    },
    getOcakListesiRapor(){

        return axios.get('/raporlar/listeler/ocakListesiRapor').then(res => res.data)
    },
      getOcakListesiRaporExcell(data_list){

        return axios.post('/raporlar/listeler/ocakListesiRaporExcell',data_list).then(res => res.data)
    },
      getSipKalanExcell(data_list){

        return axios.post('/raporlar/listeler/sipKalanListesiExcell',data_list).then(res => res.data)
    },
    getmusteriBazindaAylikExcell(data_list){

        return axios.post('/raporlar/listeler/musteriBazindaRaporExcell',data_list).then(res => res.data)
    },
    getSevkiyatRaporTarih(tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporTarih/${tarih}`).then(res => res.data)
    },
    getSevkiyatRaporTekTarih(tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporTekTarih/${tarih}`).then(res => res.data)
    },
    getSevkiyatRaporIkiTarih(ilk_tarih,son_tarih){

        return axios.get(`raporlar/listeler/sevkiyatRaporIkiTarih/${ilk_tarih}/${son_tarih}`).then(res => res.data)
    },
    getSevkiyatExcelCikti(data_list){

        return axios.post('raporlar/dosyalar/sevkiyatRaporExcelListe',data_list).then(res => res.data)
    },
    getMaliyetRapor(yil,ay){

        return axios.get(`maliyet/listeler/maliyetListesi/${yil}/${ay}`).then(res => res.data)
    },
    getMaliyetRaporYil(yil){

        return axios.get(`maliyet/listeler/maliyetListesi/${yil}`).then(res => res.data)
    },
    getMaliyetYilListesi(){

        return axios.get('maliyet/listeler/maliyetYilListesi').then(res => res.data)
    },
    getMaliyetAyListesi(yil){

        return axios.get(`maliyet/listeler/maliyetAyListesi/${yil}`).then(res => res.data)
    },
    getMaliyetExcelCikti(data_list){
        return axios.post('maliyet/dosyalar/maliyetRaporExcelListe',data_list).then(res => res.data)
    },
    getMaliyetAyrintiYeni(siparisno){ 
        
        return axios.get('maliyet/ayrinti/listeler/maliyetListesi/' + siparisno).then(res => res.data)
    },
    getSevkiyatOzetRapor(){

        return axios.get('raporlar/sevkiyat/sevkiyatOzetRaporlar').then(res => res.data)
    },
    StokRaporRaporApi(){

        return axios.get('/raporlar/listeler/stokRaporuHepsi').then(res => res.data)
    },

    StokRaporOlculeriApi(){

        return axios.get('/raporlar/listeler/stokRaporuOlculeri').then(res => res.data)
    },
    StokRaporAnaList(){

        return axios.get('/raporlar/listeler/stokRaporuAnaListe').then(res => res.data)
    },
    StokRaporAnaListOnlyMekmer(){

        return axios.get('/raporlar/listeler/stokRaporuOnlyMekmer').then(res => res.data)
    },
    StokRaporAnaListFilter(tedarikci){

        return axios.get('/raporlar/listeler/stokRaporuAnaListeFilter/' + tedarikci).then(res => res.data)
    },

    StokTopRaporApi(){

        return axios.get('/raporlar/listeler/stokTopRaporuHepsi').then(res => res.data)
    },
    getStokRaporAyrintiHepsi(select_depo) {
        return axios.get('/raporlar/listeler/stokRaporAyrintiHepsi/' + select_depo.boyut.en +'/'+ select_depo.boyut.boy + '/' + select_depo.boyut.kenar + '/' + select_depo.boyut.yuzeyIslem +'/' + select_depo.boyut.urunAdi + '/' + select_depo.listDurum).then(res => res.data)
     },
     
     getSevkiyatBuYilAyrintiListesiApi(ay){

        return axios.get('/raporlar/listeler/sevkiyatBuyilAyrinti/' + ay).then(res => res.data)
    },
      getSevkiyatOncekiYilAyrintiListesiApi(ay){

        return axios.get('/raporlar/listeler/sevkiyatOncekiyilAyrinti/' + ay).then(res => res.data)
    },
    
     getSevkiyatGecenYilAyrintiListesiApi(ay){

        return axios.get('/raporlar/listeler/sevkiyatGecenAyrinti/' + ay).then(res => res.data)
    },
    getSiparisGecenYilAyrintiListesiApi(ay){

        return axios.get('/raporlar/listeler/siparisGecenAyrinti/' + ay).then(res => res.data)
    },
     getSiparisOncekiYilAyrintiListesiApi(ay){

        return axios.get('/raporlar/listeler/siparisOncekiyilAyrinti/' + ay).then(res => res.data)
    },
    getSiaprisBuYilAyrintiListesiApi(ay){

        return axios.get('/raporlar/listeler/siparisBuyilAyrinti/' + ay).then(res => res.data)
    },

    getStokExcelCikti(data_list){

        return axios.post('/raporlar/listeler/stokRaporExcelListe',data_list).then(res => res.data)
    },
    getUretilenSipExcell(data_list){

        return axios.post('/raporlar/listeler/uretilenSipExcelListe',data_list).then(res => res.data)
    },
    getUrunlerUretimList() {
        return axios.get('/raporlar/listeler/urunlerUretimListesi').then(res =>res.data)
    },
    getUrunlerUretimAyrintiList(urunKartId) {
        return axios.get('/raporlar/listeler/urunlerUretimAyrintiListesi/' + urunKartId).then(res =>res.data)
    },

    getStokAyrintiExcelCikti(data_list){

        return axios.post('/raporlar/listeler/stokRaporAyrintiExcelListe',data_list).then(res => res.data)
    },
    get_musteri_list_excell_cikti(data_list){

        return axios.post('/raporlar/musteri/musteriexcellCikti',data_list).then(res => res.data)
    },
    get_ulk_sevk_top_excell_cikti(data_list){

        return axios.post('/raporlar/musteri/ulkebzindaSevkiyat',data_list).then(res => res.data)
    },


    getOcakListesiDetaylari(ocakadi){
        return axios.get('/raporlar/listeler/ocakListesiDetayListe/' + ocakadi).then(res => res.data)
    },





    getMusteriList(){
        const username = store.getters.getUser;
        return axios.get('/raporlar/musteri/' + username).then(res => res.data);
    },
    getGenelMusteriList(){
       
        return axios.get('/raporlar/musteri').then(res => res.data);
    },
    getMusteriDetay(musteriid){

        return axios.get('/raporlar/musteri/musteriDetay/' + musteriid).then(res => res.data);
    },
    getYuklemeRapor(yil,ay){

        return axios.get(`/raporlar/listeler/yukleme/${yil}/${ay}`).then(res => res.data)
    },
    getAtlantaYuklemeRapor(yil,ay){

        return axios.get(`/raporlar/listeler/atlantayukleme/${yil}/${ay}`).then(res => res.data)
    },
    getYuklemeYilListesi(){

        return axios.get('/raporlar/listeler/yuklemeYilListesi').then(res => res.data)
    },
    getYuklemeAll(){

        return axios.get('/raporlar/listeler/sevkiyatRaporAll').then(res => res.data)
    },
    getYuklemeAyListesi(yil){

        return axios.get(`/raporlar/listeler/yuklemeAyListesi/${yil}`).then(res => res.data)
    },
    getYuklemePoExcelCikti(data_list){

        return axios.post('/raporlar/listeler/yuklemepoExcelCikti',data_list).then(res => res.data)
    },

    

    getSeleksiyonOcakListesi(data_list){

        return axios.post('/raporlar/listeler/ocakListesiRapor',data_list).then(res => res.data)
    },
    getYuklemeMuExcelCikti(data_list){

        return axios.post('/raporlar/listeler/yuklememusExcelCikti',data_list).then(res => res.data)
    },
    getYuklemeYilExcelCikti(data_list){

        return axios.post('/raporlar/listeler/yuklemeYilExcelCikti',data_list).then(res => res.data)
    },
    getSiparisOzetExcelCikti(data_list){

        return axios.post('/raporlar/listeler/siparisOzetExcelCikti',data_list).then(res => res.data)
    },
    getAtlantaStokListesi(){

        return axios.get('/raporlar/listeler/atlanta/stoklistesi').then(res => res.data)
    },
    getAtlantaStokAyrintiListesi(skuNo){

        return axios.get('/raporlar/listeler/atlanta/ayrinti/stoklistesi/' + skuNo).then(res => res.data)
    },
    
    getAtlantaStokExcelCikti(data_list){

        return axios.post('/raporlar/listeler/atlanta/stokExcelCikti',data_list).then(res => res.data)
    },

    getTedarikciPDFCikti(data_list){

        return axios.post('/islemler/dosyalar/pdfciktim',data_list).then(res => res.data)
    },

    /*All Orders Report */
    getAllOrders(){

        return axios.get('/islemler/listeler/allOrders').then(res => res.data)
    },
    getOrder(po){

        return axios.get('/islemler/listeler/order/' + po).then(res => res.data)
    },

    getUreticiDagilimi(year) {
        return axios.get('/islemler/listeler/ureticiDagilimi/' + year).then(res=>res.data)
    },

    get_tedarikci_list_excell_cikti(data) {
        return axios.post('/islemler/listeler/ureticiDagilimiExcelList',data).then(res=>res.data)
    },
    getNakliyeciDagilimi(year) {
        return axios.get('/islemler/listeler/nakliyeciDagilimi/' + year).then(res=>res.data)
    },
    getNakliyeciDagilimiExcel(data) {
        return axios.post('/islemler/listeler/nakliyeciDagilimiExcel' ,data).then(res=>res.data)
    },
    getFobMasraflar(year) {
        return axios.get('/islemler/listeler/fobMasraflar/' + year).then(res=>res.data)
    },
    getFobMasraflarExcel(data) {
        return axios.post('/islemler/listeler/fobMasraflarExcel' ,data).then(res=>res.data)
    },

    getNavlunMasraflar(year) {
        return axios.get('/islemler/listeler/navlunMasraflar/' + year).then(res=>res.data)
    },
    getNavlunMasraflarExcel(data) {
        return axios.post('/islemler/listeler/navlunMasraflarExcel' ,data).then(res=>res.data)
    },




    getDigerMasraflar(year) {
        return axios.get('/islemler/listeler/digerMasraflar/' + year).then(res=>res.data)
    },
    getDigerMasraflarExcel(data) {
        return axios.post('/islemler/listeler/digerMasraflarExcel' ,data).then(res=>res.data)
    },


    getMekusMasraflar(year) {
        return axios.get('/islemler/listeler/mekusMasraflar/' + year).then(res=>res.data)
    },
    getMekusMasraflarExcel(data) {
        return axios.post('/islemler/listeler/mekusMasraflarExcel' ,data).then(res=>res.data)
    },


    getKomisyonMasraflar(year) {
        return axios.get('/islemler/listeler/komisyonMasraflar/' + year).then(res=>res.data)
    },
    getKomisyonMasraflarExcel(data) {
        return axios.post('/islemler/listeler/komisyonMasraflarExcel' ,data).then(res=>res.data)
    },


    getBankaVeEvrakMasraflar(year) {
        return axios.get('/islemler/listeler/bankaVeEvrakMasraflar/' + year).then(res=>res.data)
    },
    getBankaVeEvrakMasraflarExcel(data) {
        return axios.post('/islemler/listeler/bankaVeEvrakMasraflarExcel' ,data).then(res=>res.data)
    },
    /*Temsilci Satışçılar Raporları */

    getTemsilciSatislariAll(username) {
        return axios.get('/raporlar/temsilciSatislariAll/' + username).then(res=>res.data)
    },
    getTemsilciSatislariAllDetay(ay,username) {
        return axios.get('/raporlar/temsilciSatislariAllDetay/' + ay + '/' + username).then(res=>res.data)
    },
    getTemsilciSatislariAllDetaySatislar(ay,username) {
        return axios.get('/raporlar/temsilciSatislariAllDetaySatislar/' + ay + '/' + username).then(res=>res.data)
    },
    getTemsilciSatislariAllDetayYuklemeler(ay,username) {
        return axios.get('/raporlar/temsilciSatislariAllDetayYuklemeler/' + ay + '/' + username).then(res=>res.data)
    }
    

    
}

export default raporService;