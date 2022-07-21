<template>
    <section>
        <div class="columns">
            <div class="column is-4">
                <div class="columns">
                    <urun-kart-bilgi :dis_urun_giris="dis_urun_giris"  />
                </div>
                <div class="columns">
                    <div class="column is-12 custom-box">
                        <div class="columns is-multiline">
                            <div class="column is-6">
                                <b-field>
                                    <b-autocomplete
                                    placeholder="Tedarikçi"
                                    :data="filterTedarikciList"
                                    v-model="tedarikci"
                                    @input="aramaTedarikci($event)"
                                    size="is-small"
                                    @blur="$v.tedarikci.$touch()"
                                    >
                                    </b-autocomplete>
                                    <ValidationMessage v-if="$v.tedarikci.$error && !dis_urun_giris">**</ValidationMessage>
                                </b-field>
                            </div>
                            <div class="column is-6">
                                <b-field label="Alış Fiyatı" label-position="on-border" >
                                    <b-input v-model="siparis.alisFiyati" size="is-small" placeholder="A.Fiyatı $" v-currency />
                                </b-field>
                            </div>
                            <div class="column is-6">
                                <b-field label="A.Fiyatı" label-position="on-border" >
                                    <b-input v-model="siparis.alisFiyati_TL" size="is-small" placeholder="A.Fiyatı TL" v-currency />
                                </b-field>
                            </div>
                             <div class="column is-6">
                                <b-field label="S.Fiyatı" label-position="on-border" >
                                    <b-input v-model="siparis.satisFiyati" size="is-small" placeholder="S.Fiyatı $" />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-button v-if="!yeniSiparis" :disabled="dis_ozelIscilik" @click="ozelIscilikFormAc" type="is-success" expanded></b-button>
                                <Dialog :visible.sync="dialogIscilik" :style="{width: '500px;'}" header="Sipariş Ekstra Gider Girişi" :modal="true"  >
                                        <div class="p-cardialog-content" style="height: 500px;background-color:#f4f4f4; ">
                                            <iscilik :siparisNo="siparisNo" :urunKartId="siparis.urunKartId" />
                                        </div>
                                </Dialog>

                            </div>

                        </div>
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-12 custom-box">
                        <div class="columns is-multiline">
                            <div class="column is-3">
                                <b-field>
                                    <b-autocomplete 
                                    size="is-small" 
                                    placeholder="Birim"
                                    :disabled="dis_urun_giris"
                                    @blur="$v.urunBirim.$touch()"
                                    v-model="urunBirim"
                                    :data="filterUrunBirimList"
                                    @input="aramaBirim($event)"
                                    >
                                    </b-autocomplete>
                                    <ValidationMessage v-if="$v.urunBirim.$error && !dis_urun_giris">**</ValidationMessage>
                                </b-field>
                            </div>
                            <div class="column ">
                                <b-field>
                                    <b-input 
                                    v-model="siparis.miktar" 
                                    :disabled="dis_urun_giris" 
                                    @blur="$v.siparis.miktar.$touch()" 
                                    size="is-small" placeholder="miktar" 
                                    v-currency
                                    @input="miktarDegisim($event)"  
                                    />
                                </b-field>
                                <ValidationMessage v-if="$v.siparis.miktar.$error && !dis_urun_giris">**</ValidationMessage>
                            </div>
                            <div class="column">
                                <b-field>
                                    <b-input 
                                    size="is-small" 
                                    placeholder="Kasa" 
                                    :disabled="dis_urun_giris"
                                    v-model="siparis.kasaAdet"
                                    />
                                </b-field>
                            </div>
                            <div class="column">
                                <b-field>
                                    <b-input 
                                    size="is-small" 
                                    placeholder="Sıra" 
                                    :disabled="dis_urun_giris"
                                    v-model="siparis.siraNo"
                                    @blur="$v.siparis.siraNo.$touch()"
                                    />
                                </b-field>
                                <ValidationMessage v-if="$v.siparis.siraNo.$error && !dis_urun_giris">**</ValidationMessage>
                            </div>
                            <div class="column">
                                <b-field>
                                    <b-input 
                                    size="is-small" 
                                    placeholder="ö.m2"
                                    :disabled="dis_urun_giris"
                                    v-model="siparis.ozelMiktar"
                                    
                                    />
                                </b-field>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-8" style="margin-left:10px">
               <div class="columns">
                   <div class="column is-12 custom-box">
                       <div class="columns is-multiline">
                           <div class="column is-6">
                               <b-field>
                                   <b-input 
                                   type="textarea" 
                                   size="is-small"
                                   :disabled="dis_urun_giris"
                                   @blur="$v.siparis.musteriAciklama.$touch()"
                                   v-model="siparis.musteriAciklama"
                                   />
                               </b-field>
                               <ValidationMessage v-show="$v.siparis.musteriAciklama.$error && !dis_urun_giris">* Zorunlu</ValidationMessage>
                           </div>
                           <div class="column is-6">
                               <b-field>
                                   <b-input 
                                   type="textarea" 
                                   size="is-small"
                                   :disabled="dis_urun_giris"
                                   @blur="$v.siparis.uretimAciklama.$touch()"
                                   v-model="siparis.uretimAciklama"
                                   />
                               </b-field>
                               <ValidationMessage v-if="$v.siparis.uretimAciklama.$error && !dis_urun_giris">* Zorunlu</ValidationMessage>
                           </div>
                       </div>
                   </div>
               </div>
               <div class="columns">
                   <div class="column is-12 custom-box">
                       <div class="columns is-multiline">
                           <div class="column is-8">
                               <b-field>
                                   <b-input size="is-small" />
                               </b-field>
                           </div>
                           <div class="column is-4">
                               <button class="button is-success is-small">
                                   <span class="icon is-small">
                                       <i class="fas fa-plus"></i>
                                   </span>
                               </button>
                           </div>
                           <div class="column is-12">
                               <b-table height="80px" :columns="hatirlatmaColumns" ></b-table>
                           </div>
                       </div>
                   </div>
               </div>
               <div class="columns">
                   <div class="column is-12 custom-box">
                       <div class="columns is-multiline">
                           <div class="column">
                             <b-button :disabled="dis_yeni" @click="btn_yeni_click" type="is-light" icon-pack="fas" icon-left="file-alt">Yeni</b-button>
                           </div>
                           <div class="column">
                               <b-button :disabled="dis_iptal" @click="btn_iptal_click" type="is-danger" icon-pack="fas" icon-left="times">İptal</b-button>
                           </div>
                           <div class="column">
                               <b-button :disabled="dis_ekle" @click="btn_ekle_click" type="is-success" icon-pack="fas" icon-left="plus">Ekle</b-button>
                           </div>
                           <div class="column">
                               <b-button :disabled="dis_degistir" @click="btn_degistir_click" type="is-info" icon-pack="fas" icon-left="sync-alt">Değiştir</b-button>
                           </div>
                            <div class="column">
                               <b-button :disabled="dis_sil" @click="btn_sil_click" type="is-warning" icon-pack="fas" icon-left="trash-alt">Sil</b-button>
                           </div>
                       </div>
                   </div>
               </div>
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <b-table height="500px" :columns="siparisColumns">
                </b-table>
            </div>
        </div>
    </section>
</template>

<script>
import TedarikciService from '../../../service/TedarikciService';
import UrunService from '../../../service/UrunService';
import UrunKartBilgi from './UrunKartBilgi';
//import CurrencyInput from '../../shared/CurrencyInput';
import { required } from 'vuelidate/lib/validators';
import Iscilik from './Iscilik';
import {eventListener} from '../../../main'


export default {

    components : {

         urunKartBilgi : UrunKartBilgi,
         //inputCurrency : CurrencyInput,
         iscilik : Iscilik
    },
    methods: {
          
        aramaTedarikci(event){

            
            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.tedarikciList];

                 }
                 else {

                     result = this.tedarikciList.filter((ted) => {
                        
                         return ted.firmaAdi.toLowerCase().startsWith(event.query.toLowerCase())
                     })

                     
                 }

                 this.filterTedarikciList = result;
            },250)
        },
       aramaBirim(event){

         

            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.urunBirimList];

                 }
                 else {

                     result = this.urunBirimList.filter((ted) => {
                        
                         return ted.birimAdi.toLowerCase().startsWith(event.query.toLowerCase())
                     })

                      
                 }

                 this.filterUrunBirimList = result;
            },250)
        },
        idOlustur() {
            let result = '';
            let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let charactersLength = characters.length;
            for ( var i = 0; i < 8; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        },
        indexBul(id,liste) {
            let index = -1;
            if(!liste != null){

            
                for (let i = 0; i < liste.length; i++) {
                    if (liste[i].id === id) {
                        index = i;
                        break;
                    }
                }
            }

            return index;
        },
        diziUzunluk(liste){

            let uzunluk = 0;

            for(let key in liste){

              if(liste[key])  uzunluk = uzunluk + 1;
            }

            return uzunluk;
        },
        kayitKontrol(){

            const kontrol = this.diziUzunluk(this.urunler_yeni) + this.diziUzunluk(this.urunler_degisenler) + this.diziUzunluk(this.urunler_silinenler);
            let durum = true;
            if(kontrol > 0) durum = false;
            this.$emit('siparisBilgileriDegisim',durum);
        },
        urunIslemleri(){

             const urunKart = this.$store.getters.getSiparisUrunKart;
             this.siparis.urunAdi = urunKart.urunAdi;
             this.siparis.urunKartId = urunKart.id;
             this.siparis.en = urunKart.en;
             this.siparis.boy = urunKart.boy;
             this.siparis.kenar = urunKart.kenar;
             this.siparis.yuzeyIslem = urunKart.yuzeyIslem;
             this.siparis.tedarikciAdi = this.tedarikci.firmaAdi;
             this.siparis.tedarikciId = this.tedarikci.id;
             this.siparis.urunBirimId = this.urunBirim.id;
             this.siparis.m2 = 0;
             this.siparis.mt = 0;
             this.siparis.ton = 0;
             this.siparis.adet = 0;

             if(this.siparis.urunBirimId == 1) this.siparis.m2 = this.siparis.miktar;
             if(this.siparis.urunBirimId == 2) this.siparis.adet = this.siparis.miktar;
             if(this.siparis.urunBirimId == 3) this.siparis.mt = this.siparis.miktar;
             if(this.siparis.urunBirimId == 4) this.siparis.ton = this.siparis.miktar;

             this.siparis.satisToplam = this.siparis.satisFiyati * this.siparis.miktar;

             //id kontrol
             if(!this.siparis.id){
                 this.siparis.id = this.idOlustur()
             }

        },
        form_btn_reset(){

            this.dis_yeni = false;
            this.dis_iptal = true;
            this.dis_ekle  = true;
            this.dis_degistir = true;
            this.dis_urun_giris = true;
            this.dis_sil = true;
            this.dis_stokal = true;
            this.dis_ozelIscilik = true;
            this.urun = {};
            this.$store.dispatch('siparisUrunKartAct',{})
            this.selectUrun = null;
            this.siparis = null;
            this.tedarikci = null
            this.siparis = {}
            this.urunBirim = null;
            this.alisFiyati = 0;
            this.satisFiyati = 0;
        },

        btn_yeni_click(){
            
            this.dis_yeni = true;
            this.dis_iptal = false;
            this.dis_ekle = false;
            this.dis_urun_giris = false;
            this.dis_ozelIscilik = true;

            this.siparis = {...this.urunModel}

            
            
        },
        btn_iptal_click(){
            
            this.form_btn_reset()
        },
        btn_ekle_click(){
           
            if(this.$v.$invalid){

                this.$toast.add({severity:'error', summary: 'Uyarı Ekranı', detail:'Zorunlu Alanlar Eklenmeli',  life: 3000});
                return
            }

            
            this.urunIslemleri();
            this.siparisUrunler.push({...this.siparis});
            if(!this.yeniSiparis)this.yeni_urun_islem()
            this.dataSatirTopla(this.siparisUrunler);
            this.form_btn_reset();
            this.$toast.add({severity:'success', summary: 'Bilgi Ekranı', detail:'Ürün Eklendi', life: 3000});
            this.$emit('siparisUrunDegisim');
            eventListener.$emit('isSipControl', true)
            
            
        },
        btn_degistir_click(){
            this.urunIslemleri()
            let index = this.indexBul(this.siparis.id,this.siparisUrunler)
            this.siparisUrunler[index] = this.siparis
            if(!this.yeniSiparis)this.degisen_urun_islem()
            this.dataSatirTopla(this.siparisUrunler)
            this.form_btn_reset()
            this.$toast.add({severity:'success', summary: 'Bilgi Ekranı', detail:'Ürün Değiştirildi', life: 3000});
            this.$emit('siparisUrunDegisim');
        },
        btn_sil_click(){
            let index = this.indexBul(this.siparis.id,this.siparisUrunler)
            if(!this.yeniSiparis)this.silinen_urun_islem()
            this.siparisUrunler.splice(index,1)
            this.dataSatirTopla(this.siparisUrunler)
            this.form_btn_reset()
            this.$toast.add({severity:'warn', summary: 'Bilgi Ekranı', detail:'Ürün Silindi.', life: 3000});
            this.$emit('siparisUrunDegisim');
        },

        siparisUrunSec(event){

            this.dis_yeni = true;
            this.dis_degistir = false;
            this.dis_iptal = false;
            this.dis_sil = false;
            this.dis_urun_giris = false;
            this.dis_ozelIscilik = false;

            if(this.selectUrun){

                this.siparis = {...event.data};
                this.alisFiyati = this.siparis.alisFiyati;
                this.satisFiyati = this.siparis.satisFiyati;
                this.urunBirim = this.urunBirimList.find(x=>x.id == this.siparis.urunBirimId)
                this.tedarikci = this.tedarikciList.find(x=>x.id == this.siparis.tedarikciId)
                this.$store.dispatch('siparisFormUrunGuncelleAct',this.siparis.urunKartId)
            }
        },
        dataSatirTopla(liste){

            this.toplam_m2 = 0
            this.toplam_mt = 0
            this.toplam_adet = 0
            this.toplam_ton = 0
            this.toplam_kasa = 0
            this.toplam_tutar = 0

            for (let key in liste){

                this.toplam_m2 += liste[key].m2
                this.toplam_mt += liste[key].mt
                this.toplam_adet += liste[key].adet 
                this.toplam_ton += liste[key].ton
                this.toplam_kasa += liste[key].kasaAdet 
                this.toplam_tutar += liste[key].satisToplam

            }
        },
        yeni_urun_islem(){
            this.urunler_yeni.push({...this.siparis})
            
            this.kayitKontrol();
        },
        degisen_urun_islem(){

            if( this.diziUzunluk(this.urunler_yeni) > 0 ){

                let yeniUrunKontrol = this.indexBul(this.siparis.id,this.urunler_yeni)

                if(yeniUrunKontrol != -1){

                    this.urunler_yeni[yeniUrunKontrol] = {...this.siparis}
                }
                else {

                    let index = this.indexBul(this.siparis.id,this.urunler_degisenler)

                    if(index == -1){
                         
                         this.urunler_degisenler.push({...this.siparis})
                    }
                     
                    else this.urunler_degisenler[index] = {...this.siparis}
                }
            }
            else{

                let index = this.indexBul(this.siparis.id,this.urunler_degisenler)
                if(index == -1) this.urunler_degisenler.push({...this.siparis})
                else this.urunler_degisenler[index] = {...this.siparis}
            }
            this.kayitKontrol();
        },
        silinen_urun_islem(){

            let yeniUrun = this.indexBul(this.siparis.id,this.urunler_yeni)
          
            if(yeniUrun != -1){

                this.urunler_yeni.splice(yeniUrun,1)
            }
            else {

                this.urunler_silinenler.push({...this.siparis})
                let degisenUrun = this.indexBul(this.siparis.id,this.urunler_degisenler)

                if(degisenUrun != -1){

                    this.urunler_degisenler.splice(degisenUrun,1)
                }
            }
            this.kayitKontrol();
            
        },
        ozelIscilikFormAc(){

            this.dialogIscilik = true;
        },
        miktarDegisim(event){

            alert('miktarDegisim',event)
        }

    },
    data () {

        return {
              
              siparis : {
                 
              },
              not : "",
              selectNot:  {},
              tedarikci : null,
              tedarikciList : null,
              filterTedarikciList : null,
              urunBirim : null,
              filterUrunBirimList : null,
              urunBirimList : null,
              urunler : null,
              selectUrun : null,
              filters : {},
              dis_yeni : false,
              dis_iptal : true,
              dis_ekle : true,
              dis_degistir : true,
              dis_stokal: true,
              dis_sil : true,
              dis_urun_giris : true,
              dis_ozelIscilik : true,
              dialogIscilik : false,
              toplam_m2 : 0,
              toplam_mt : 0,
              toplam_adet : 0,
              toplam_ton : 0,
              toplam_kasa : 0,
              toplam_tutar : 0,
              satisFiyati : 0,
              alisFiyati : 0,
              
            hatirlatmaColumns : [
                { 
                    field : 'not',
                    label : 'not',
                    width : 40,

                }
            ],
            siparisColumns : [ 

                {
                    field : 'siraNo',
                    label : 'S',
                    numeric : true,
                    centered : true
                },
                {
                    field : 'tedarikciAdi',
                    label : 'Kimden',
                    width :  '80' ,
                    searchable : true
                },
                {
                    field : 'iscilik',
                    label : 'İşçilik'
                },
                {
                    field : 'urunAdi',
                    label : 'Ürün Adı',
                    width : '90'
                },
                {
                    field : 'en',
                    label : 'E',
                    width : '60',
                    searchable : true
                },
                {
                    field : 'boy',
                    label : 'B',
                    width : '60',
                    searchable : true
                },
                {
                    field : 'kenar',
                    label : 'K',
                    width : '60',
                    searchable : true
                },
                {
                    field : 'yuzeyIslem',
                    label : 'İşlem',
                    width : '170'
                },
                {
                    field : 'm2',
                    label : 'M2',
                    width : '60',
                    numeric : true,
                    centered : true
                },
                {
                    field : 'adet',
                    label : 'Adet',
                    width : '60',
                    numeric : true,
                    centered : true
                },
                {
                    field : 'mt',
                    label : 'Mt',
                    width : '60',
                    numeric : true,
                    centered : true
                },
                {
                    field : 'ton',
                    label : 'Ton',
                    width : '60',
                    numeric : true,
                    centered : true
                },
                {
                    field : 'kasaAdet',
                    label : 'Kasa',
                    width : '60',
                    numeric : true,
                    centered : true
                },
                {
                    field : 'satisToplam',
                    label : 'Tutar',
                    width : '60',
                    numeric : true,
                    centered : true
                }
            ]
            
        }
    },
     props :{

         siparisUrunler : null,
         urunModel : null,
         siparisNo : null,
         siparisUrunLoading :{

             type : Boolean,
             required : false,
             default : false
         },
        urunler_yeni : {
            type : Array,
            required : true
        },
        urunler_degisenler : {
            type : Array,
            required : true
        },
        urunler_silinenler : {
            type : Array,
            required : true
        },
         yeniSiparis : {
             type : Boolean
         },
         
    },
    validations : {

        tedarikci : {

            required
        },
        urunBirim : {

            required
        },
        siparis : {

            miktar :{
                required
            },
            siraNo : {required},
            musteriAciklama : {required},
            uretimAciklama : {required}
        }

    },  
    urunService : null,
    tedarikciService : null,
    created(){

        
        this.urunService = new UrunService()
        this.tedarikciService = new TedarikciService()
    },
    mounted(){

        this.urunService.getUrunBirimList().then(data => {
            this.urunBirimList = data
          
        })
        this.tedarikciService.getTedarikciMenuList().then(data => this.tedarikciList = data)

        this.dataSatirTopla(this.siparisUrunler)

        
        
    },
   
    
}
</script>

<style scoped>
     .custom-box{

        width: 100%;
        transition: 0.4s;
        box-shadow: 3px 3px 14px 2px rgba(0,0,0,0.18), -3px -3px 14px 2px rgba(0,0,0,0.10);
        
        margin-top:10px;
        
    }
</style>