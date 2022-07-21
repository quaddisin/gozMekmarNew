import Vue from 'vue';
import Vuex from 'vuex';
import urunKart from './modules/urunKart';
import auth from './modules/auth';
import siparis from './modules/siparis';
import anaSayfa from './modules/anaSayfa';
import depo from './modules/depo';
import load from './modules/load';
import local from './modules/local';
import mekmar from './modules/mekmar';
import musteriTeklif from './modules/teklif/teklif_musteri';
import seleksiyon from './modules/seleksiyon';
import seleksiyon_fonksiyon from './modules/seleksiyon_fonksiyon';
import sevk_takip from './modules/sevk_takip'
import siparis_toplam from './modules/siparis_toplam'
import finans from './modules/finans'
import tahsilat from './modules/tahsilat'
import finans_depo from './modules/finans_depo'
import yukleme from './modules/yukleme'
import tedarikci from './modules/tedarikci'
import musteri from './modules/musteri'
import customers from './modules/customers'
import customersislem from './modules/customersislem'
import maliyet_ayrinti from './modules/maliyet_ayrinti'
import pesinat from './modules/pesinat'
import uretimstok from './modules/uretimstok'
import sevsipayrinti from './modules/sevsipayrinti'
import efestahsilat from './modules/efestahsilat'
import efesfinans from './modules/efesfinans'
import efespesinat from './modules/efespesinat'
import anasayfaAyrinti from './modules/anasayfaAyrinti'
import evrakYukleme from './modules/evrakYukleme'
import numunetahsilat from './modules/numunetahsilat'
import users from './modules/users'
import atlanta from './modules/atlanta'
import finans_vade from './modules/finans_vade'
import evrakform from './modules/evrakform'
import konteynerform from './modules/konteynerform'
import tedarikciAlisFiyat from './modules/tedarikciAlisFiyat'
import kayitKontrolDegeri from './modules/kayitKontrol'
import seleksiyon_ocak_ayrinti from './modules/seleksiyon_ocak_ayrinti'
import mobilWidth from './modules/mobilWidth'
import temsilciSatislari from './modules/temsilciSatislari'
Vue.use(Vuex);

const store = new Vuex.Store({

    modules: {
        mobilWidth,
        urunKart,
        auth,
        siparis,
        anaSayfa,
        depo,
        load,
        local,
        mekmar,
        musteriTeklif,
        seleksiyon,
        seleksiyon_fonksiyon,
        sevk_takip,
        siparis_toplam,
        finans,
        efesfinans,
        tahsilat,
        efestahsilat,
        finans_depo,
        tedarikci,
        musteri,
        customers,
        customersislem,
        maliyet_ayrinti,
        pesinat,
        efespesinat,
        uretimstok,
        sevsipayrinti,
        yukleme,
        anasayfaAyrinti,
        evrakYukleme,
        numunetahsilat,
        users,
        atlanta,
        finans_vade,
        evrakform,
        konteynerform,
        tedarikciAlisFiyat,
        kayitKontrolDegeri,
        seleksiyon_ocak_ayrinti,
        temsilciSatislari
    }
});


export default store;