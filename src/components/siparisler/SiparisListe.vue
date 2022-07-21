<template>
    <div>
        <div class="isDesktop" v-if="isDesktop">
            <div class="columns is-centered is-mobile" style="margin-left:5px;">
                <div class="column is-1 custom-box">

                    <div class="columns is-8 is-multiline is-centered">


                        <div class="column is-10" style="margin-top:24px;">
                            <b-button size="is-small" @click="yeniSiparisAc" v-yeniButonu:mousemove="'#63d4b9'"
                                expanded>Yeni</b-button>


                        </div>
                    </div>

                </div>



                <div class="column is-3 is-mobile custom-box">

                    <div class="block">
                        <div class="box is-multiline is-mobile" style="margin-top:-3px;height:80px;">


                            <div class="block-satici">
                                <h3>Tedarikçi : </h3>
                                <ul>
                                    <li>
                                        <b-radio v-model="FirmaAdi" name="name" @input="statuSecim2"
                                            native-value="Mekmer">Mekmer</b-radio>
                                    </li>
                                    <li>
                                        <b-radio v-model="FirmaAdi" name="name" @input="statuSecim2" native-value="Dis">
                                            Dış</b-radio>
                                    </li>
                                    <li>
                                        <b-radio v-model="FirmaAdi" name="name" @input="statuSecim2"
                                            native-value="Hepsi">Hepsi</b-radio>
                                    </li>
                                </ul>
                            </div>
                            <span class="block-satici">
                                <h3 style="margin-right:8px;white-space: pre;">Satıcı : </h3>
                                <ul>
                                    <li>
                                        <b-radio v-model="Fatura" name="name" @input="statuSecim3" native-value="Hepsi"
                                            style="padding-right:13px;">Hepsi</b-radio>
                                    </li>
                                    <li>
                                        <b-radio v-model="Fatura" name="name" @input="statuSecim3" native-value="Mekmar"
                                            style="padding-right:2px;">Mekmar</b-radio>
                                    </li>
                                    <li>
                                        <b-radio v-model="Fatura" name="name" @input="statuSecim3" native-value="Efes">
                                            Efes</b-radio>
                                    </li>
                                </ul>

                            </span>

                        </div>


                    </div>


                </div>

                <div class="column is-1 custom-box is-multiline is-mobile">
                    <div class="block is-multiline is-centered">

                        <div class="yearSelectedExpand" :class="{yearSelected:menuToggle}">
                            <b-select size="is-small" v-model="select_yil" @input="yil_degisim_event"
                                placeholder="Yıl Seç">
                                <option v-for="item in yil_listesi" :key="item.id">
                                    {{item.yil}}
                                </option>

                            </b-select>

                        </div>
                        <div class="hepsiSelectedExpand" :class="{hepsiSelected:menuToggle}">
                            <b-checkbox @input="siparisHepsiEvent" v-model="siparis_list_hepsi">
                                Hepsi
                            </b-checkbox>
                        </div>

                        <div class="uretimExcellExpand" :class="{uretimExcell:menuToggleExcell}">

                            <div>
                                <b-button @click="excel_cikti_click" type="is-dark" size="is-small"
                                    style="margin-right:5px;"><i class="far fa-file-excel">TR </i></b-button>


                                <b-button @click="excel_cikti_click_en" type="is-dark" size="is-small"><i
                                        class="far fa-file-excel">EN </i></b-button>

                            </div>
                        </div>






                    </div>


                </div>
                <div class="column is-5 custom-box is-centered">

                    <div class="box" style="margin-top:-2px;">
                        <b-field label="Pazarlama" label-position="on-border" style="height:40px;">
                            <br> <br> <br>
                            <b-radio v-model="marketing" name="name" @input="statuSecim" native-value="Hepsi">Hepsi
                            </b-radio>
                            <b-tooltip label="Mekmar" position="is-bottom" type="is-success" class="pazarlamaToopTip">
                                <b-radio v-model="marketing" name="name" @input="statuSecim" native-value="Mekmar"><img
                                        class="dairesel"
                                        :src="'https://mekmar-image.fra1.digitaloceanspaces.com/logo/logo-mekmar.png'"
                                        width="50" height="50" /></b-radio>
                            </b-tooltip>

                            <b-tooltip label="Ghana" position="is-bottom" type="is-success" class="pazarlamaToopTip">
                                <b-radio v-model="marketing" name="name" @input="statuSecim" native-value="Ghana"><img
                                        class="dairesel"
                                        :src="'https://mekmar-image.fra1.digitaloceanspaces.com/marketing/ihg.jpg'"
                                        width="50" height="50" title="Ghana" /></b-radio>
                            </b-tooltip>

                            <b-tooltip label="İç Piyasa" position="is-bottom" type="is-success"
                                class="pazarlamaToopTip">
                                <b-radio v-model="marketing" name="name" @input="statuSecim" native-value="İç Piyasa">
                                    <img class="dairesel"
                                        :src="'https://mekmar-image.fra1.digitaloceanspaces.com/marketing/ic_piyasa.jpg'"
                                        width="50" height="50" title="İç Piyasa" />
                                </b-radio>
                            </b-tooltip>

                            <b-tooltip label="SM" position="is-bottom" type="is-success" class="pazarlamaToopTip">
                                <b-radio v-model="marketing" name="name" @input="statuSecim" native-value="SM"><img
                                        class="dairesel"
                                        :src="'https://mekmar-image.fra1.digitaloceanspaces.com/marketing/sm.jpeg'"
                                        width="50" height="50" title="SM" /> </b-radio>
                            </b-tooltip>

                            <b-tooltip label="Maya" position="is-bottom" type="is-success" class="pazarlamaToopTip">
                                <b-radio v-model="marketing" name="name" @input="statuSecim" native-value="Maya"><img
                                        class="dairesel"
                                        :src="'https://mekmar-image.fra1.digitaloceanspaces.com/marketing/maya.jpeg'"
                                        width="50" height="50" title="MAYA" /> </b-radio>
                            </b-tooltip>

                            <b-tooltip label="SU" position="is-bottom" type="is-success" class="pazarlamaToopTip">
                                <b-radio v-model="marketing" name="name" @input="statuSecim" native-value="SU"><img
                                        class="dairesel"
                                        :src="'https://mekmar-image.fra1.digitaloceanspaces.com/marketing/su.jpg'"
                                        width="50" height="50" title="SU" /> </b-radio>
                            </b-tooltip>

                        </b-field>

                    </div>

                </div>

                <div class="column is-1 custom-box" style="width:125px;">
                    <div class="columns is-centered" style="margin-top:-10px;margin-right:0px;margin-left:-30px;">
                        <div class="column is-4 is-centered " style="text-align:center;">
                            <div class="column is-1 renk" style="text-align:center;">
                                <b-tooltip label="Hazır" position="is-bottom" type="is-success">
                                    <b-button type="is-success" v-uretimBilgileriAlani="'#22d161'" expanded
                                        size="is-small">H</b-button>
                                </b-tooltip>
                            </div>
                            <div class="column is-1 renk" style="text-align:center;">
                                <b-tooltip label="İç Sipariş Formu Yok" position="is-bottom" type="is-danger">
                                    <b-button type="is-danger" v-uretimBilgileriAlani="'#ff365d'" expanded
                                        size="is-small">S</b-button>
                                </b-tooltip>
                            </div>
                        </div>
                        <div class="column is-4  is-centered" style="text-align:center;">
                            <div class="column is-1 renk">
                                <b-tooltip label="Dışarıda Hazır" position="is-bottom" type="is-info">
                                    <b-button type="is-info" v-uretimBilgileriAlani="'#1a7bf1'" expanded
                                        size="is-small">D</b-button>
                                </b-tooltip>

                            </div>

                            <div class="column is-1 renk " style="text-align:center;">
                                <b-tooltip label="Fazla Üretim" position="is-bottom" type="is-dark">
                                    <b-button type="is-dark" v-uretimBilgileriAlani="'#000'" expanded size="is-small">F
                                    </b-button>
                                </b-tooltip>
                            </div>
                        </div>
                        <div class="column is-4 is-centered " style="text-align:center;">
                            <div class="column is-1 renk">
                                <b-tooltip label="Üretim Başladı" position="is-bottom" type="is-light">
                                    <b-button type="is-light" v-uretimBilgileriAlani="'#fff'" expanded size="is-small">Ü
                                    </b-button>
                                </b-tooltip>
                            </div>
                            <div class="column is-1 renk" style="text-align:center;">
                                <b-tooltip label="Henüz Üretime Girmemiş" position="is-bottom" type="is-warning">
                                    <b-button style="background-color:#ffba01" v-uretimBilgileriAlani="'#ffdc57'"
                                        expanded size="is-small">G</b-button>
                                </b-tooltip>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div v-if="!alan_gizle">
                <SiparisListeKisitli :siparisler="siparisler" :loading="loading"
                    @siparisKisitliEmit="alan_gizle = $event" @kisitliSiparisSecim="siparisSecim($event)"
                    :siparisTur="siparisTur" :hasPage="hasPage" :baslik="baslik" :pr_satisToplami="satisToplami"
                    :arkaPlanRengi="backColor" :user="usrName" :tonTopla="tonToplami" :desktop="isDesktop" />
            </div>
            <!-- Gösterilecek Alanlar -->
            <div v-if="alan_gizle">
                <SiparisListeHepsi :siparisler="siparisler" :loading="loading" @siparisHepsiEmit="alan_gizle = $event"
                    @hepsiSiparisSecim="siparisSecim($event)" :siparisTur="siparisTur" :hasPage="hasPage"
                    :baslik="baslik" :pr_satisToplami="satisToplami" :arkaPlanRengi="backColor" :desktop="isDesktop" />
            </div>



            <Dialog :visible.sync="dialogVisible" :style="{width: '2000px'}" :header.sync="siparisFormBaslik"
                :modal="true">
                <div class="p-cardialog-content" style="height: 1900px;background-color:#f4f4f4; ">
                    <siparis-giris-form :dtSiparisNo="dtSiparisNo" :yeniSiparis="yeniSiparis" />
                </div>
            </Dialog>
            <Dialog :visible.sync="isYeniSiparisForm" :style="{width: '2000px'}" :modal="true"
                header="Yeni Sipariş Form">
                <section>
                    <div class="container">
                        <div class="columns">
                            <div class="column is-12 siparis-form">
                                <bmSiparisGirisForm />
                            </div>
                        </div>
                    </div>
                </section>
            </Dialog>
        </div>
        <div class="isMobile" v-else>
            <div class="columns is-centered is-mobile">

                <div class="column is-9 is-mobile custom-box">

                    <div class="block">
                        <div class="box is-multiline is-mobile" style="margin-top:-3px;height:80px;">


                            <div class="block-satici">
                                <h3>Tedarikçi : </h3>
                                <ul>
                                    <li>
                                        <b-radio v-model="FirmaAdi" name="name" @input="statuSecim2"
                                            native-value="Mekmer">Mekmer</b-radio>
                                    </li>
                                    <li>
                                        <b-radio v-model="FirmaAdi" name="name" @input="statuSecim2" native-value="Dis">
                                            Dış</b-radio>
                                    </li>
                                    <li>
                                        <b-radio v-model="FirmaAdi" name="name" @input="statuSecim2"
                                            native-value="Hepsi">Hepsi</b-radio>
                                    </li>
                                </ul>
                            </div>
                            <span class="block-satici">
                                <h3 style="margin-right:8px;white-space: pre;">Satıcı : </h3>
                                <ul>
                                    <li>
                                        <b-radio v-model="Fatura" name="name" @input="statuSecim3" native-value="Hepsi"
                                            style="padding-right:13px;">Hepsi</b-radio>
                                    </li>
                                    <li>
                                        <b-radio v-model="Fatura" name="name" @input="statuSecim3" native-value="Mekmar"
                                            style="padding-right:2px;">Mekmar</b-radio>
                                    </li>
                                    <li>
                                        <b-radio v-model="Fatura" name="name" @input="statuSecim3" native-value="Efes">
                                            Efes</b-radio>
                                    </li>
                                </ul>

                            </span>

                        </div>


                    </div>


                </div>



                <!--<div class="column is-1 custom-box" style="width:125px;">
                    <div class="columns is-centered" style="margin-top:-10px;margin-right:0px;margin-left:-30px;">
                        <div class="column is-4 is-centered " style="text-align:center;">
                            <div class="column is-1 renk" style="text-align:center;">
                                <b-tooltip label="Hazır" position="is-bottom" type="is-success">
                                    <b-button type="is-success" v-uretimBilgileriAlani="'#22d161'" expanded
                                        size="is-small">H</b-button>
                                </b-tooltip>
                            </div>
                            <div class="column is-1 renk" style="text-align:center;">
                                <b-tooltip label="İç Sipariş Formu Yok" position="is-bottom" type="is-danger">
                                    <b-button type="is-danger" v-uretimBilgileriAlani="'#ff365d'" expanded
                                        size="is-small">S</b-button>
                                </b-tooltip>
                            </div>
                        </div>
                        <div class="column is-4  is-centered" style="text-align:center;">
                            <div class="column is-1 renk">
                                <b-tooltip label="Dışarıda Hazır" position="is-bottom" type="is-info">
                                    <b-button type="is-info" v-uretimBilgileriAlani="'#1a7bf1'" expanded
                                        size="is-small">D</b-button>
                                </b-tooltip>

                            </div>

                            <div class="column is-1 renk " style="text-align:center;">
                                <b-tooltip label="Fazla Üretim" position="is-bottom" type="is-dark">
                                    <b-button type="is-dark" v-uretimBilgileriAlani="'#000'" expanded size="is-small">F
                                    </b-button>
                                </b-tooltip>
                            </div>
                        </div>
                        <div class="column is-4 is-centered " style="text-align:center;">
                            <div class="column is-1 renk">
                                <b-tooltip label="Üretim Başladı" position="is-bottom" type="is-light">
                                    <b-button type="is-light" v-uretimBilgileriAlani="'#fff'" expanded size="is-small">Ü
                                    </b-button>
                                </b-tooltip>
                            </div>
                            <div class="column is-1 renk" style="text-align:center;">
                                <b-tooltip label="Henüz Üretime Girmemiş" position="is-bottom" type="is-warning">
                                    <b-button style="background-color:#ffba01" v-uretimBilgileriAlani="'#ffdc57'"
                                        expanded size="is-small">G</b-button>
                                </b-tooltip>
                            </div>
                        </div>

                    </div>
                </div> -->

            </div>

            <div v-if="!alan_gizle">
                <SiparisListeKisitli :siparisler="siparisler" :loading="loading"
                    @siparisKisitliEmit="alan_gizle = $event" @kisitliSiparisSecim="siparisSecim($event)"
                    :siparisTur="siparisTur" :hasPage="hasPage" :baslik="baslik" :pr_satisToplami="satisToplami"
                    :arkaPlanRengi="backColor" :user="usrName" :tonTopla="tonToplami" :desktop="isDesktop" />
            </div>
            <div v-if="alan_gizle">
                <SiparisListeHepsi :siparisler="siparisler" :loading="loading" @siparisHepsiEmit="alan_gizle = $event"
                    @hepsiSiparisSecim="siparisSecim($event)" :siparisTur="siparisTur" :hasPage="hasPage"
                    :baslik="baslik" :pr_satisToplami="satisToplami" :arkaPlanRengi="backColor" :desktop="isDesktop" />
            </div>

            <Dialog :visible.sync="dialogVisible" :style="{width: '2000px'}" :header.sync="siparisFormBaslik"
                :modal="true">
                <div class="p-cardialog-content" style="height: 1900px;background-color:#f4f4f4; ">
                    <siparis-giris-form :dtSiparisNo="dtSiparisNo" :yeniSiparis="yeniSiparis" />
                </div>
            </Dialog>

        </div>
    </div>
</template>
<script>

import SiparisService from '../../service/SiparisService';
import { mapGetters } from 'vuex';
import SiparisGirisForm from './SiparisGirisForm';
//import socket from '../../service/SocketService';
import BmSiparisGirisForm from './BmSiparisGirisForm';
import service from '../../service/SeleksiyonService';
import serviceRapor from '../../service/RaporService'

import SiparisListeKisitli from './siparisListeler/SiparisListeKisitli'
import SiparisListeHepsi from './siparisListeler/SiparisListeHepsi'
import {eventListener} from '../../main'
export default {
    props : { 

         siparisTur :{

             type : String,
             required : false,
             default : 'üretim'
         },
         hasPage : {
             type : Boolean,
             default : false
         },
        baslik : {
            type : String,
            default : ''
        }
    },
    data(){
        return {
            isDesktop:true,
            menuToggleExcell:false,
            menuToggle:false,
            yil_listesi : null,
            select_yil : null,
             yil_baslik : "",
            groups : [
                'sira',
                'tarih',
                'siparisNo',
                'musteriAdi',                
                'sure'
            ],   
            siparis_list_hepsi :true,         
            selectedSiparis :null,
            filters : {},
            siparisler : null,
            SiparislerHepsi:null,
            SiparislerEvent :null,
            dtSiparisler : null,
            loading : false,
            backColor:'',
            selectSiparis : true,
            dialogVisible : false,
            dtSiparisNo : '',
            siparisFormBaslik : '',
            yeniSiparis : true,
            marketing : 'Hepsi',
            Fatura : 'Hepsi',
            excel_cikti : 'Mekmer',
            FirmaAdi : "Hepsi",
            g_is_login:false,
            o_is_login:false,
            h_is_login:false,
            tonToplami:0,
            columnsShow : {
                sira : true,
                urunAdi : true
            },
            columns : [
                {
                    name : 'Sıra', value : 'Sıra',
                },
                {
                    name : 'Ürün Adı', value :'Ürün Adı'
                }
            ],
            selectedColumns : null,
            isYeniSiparisForm : false,
            alan_gizle : false,
            usrName:'',
            sipBolmeForm:false,
           
        }
    },
     computed : {

        ...mapGetters([
           
           
            'servis_adres',
            'getMobilWidth'
           
       ])
     },
    siparisService : null,
    
    created(){
        if (this.getMobilWidth < 600) {
            this.isDesktop = false
        }
         var userName = this.$store.getters.getUser
         this.usrName = userName
         
         if (userName == "ozlem"){
             this.backColor = '#FFC382'

             
         }else if(userName == 'gizem'){
             this.backColor ='#EF9A9A'

         }else if(userName=='hakan'){
             this.backColor='green'

         }
         this.siparisService = new SiparisService();
         this.selectedColumns = [...this.columns];
          this.siparisService = new SiparisService();
        serviceRapor.getYuklemeYilListesi().then(yil_list => {
            
            this.yil_listesi = yil_list 
            
            this.yil_baslik =  this.select_yil
           
           
            
        })
             this.loading = true;
            let siparisDurum = 2;
           

            if(this.siparisTur == "bekleyen") siparisDurum = 1;
            if(this.siparisTur == "sevk") siparisDurum = 3;
                this.siparisService.getSiparisList(siparisDurum,this.select_yil).then(data => {
                    this.siparisler = data

                    this.toplamGuncelle(this.siparisler)
                    this.dtSiparisler = data
                    this.loading= false;
                    this.toplamGuncelle(data);
                    this.tonToplama(data)
                })
      
        



         /* if(this.siparisTur == 'üretim'){
            
             socket.siparis.on('seleksiyon_siparisdegisim_emit',data => {

                const item_list = [...this.dtSiparisler]
                this.$store.dispatch('loadBegin')

                console.log('Gelen Değişim Datası : ', data)
                for(let key in data){

                    for (let _key in item_list){
                        
                        
                        if(item_list[_key].id == data[key].id){

                            item_list[key] = data[key]
                        }
                    }
                }

                this.dtSiparisler = null 

                this.dtSiparisler = item_list
                this.$refs.siparisData.value = this.dtSiparisler

                this.$store.dispatch('loadEnd')
             })
         }

          if(this.siparisTur == 'üretim' || this.siparisTur == 'bekleyen'){

             socket.siparis.on('siparis_yeni_emit',value => {

                this.siparisService.getSiparisUrun(value)
                .then(data => {

                      const yeniList = [];
                      for(let key in data){

                          const item = data[key];
                          yeniList.push(item);
                      }

                      for (let key in this.dtSiparisler){

                          const item = this.dtSiparisler[key]

                          item.sira += 1
                          yeniList.push(item)
                      }

                      this.dtSiparisler = null;

                      this.dtSiparisler = yeniList;

                      this.kayitYenileme();
                })
            })

         }

       
        
         socket.siparis.on('siparis_guncelleme_emit',(value) => {
                
                console.log('Socket Seleksiyon Güncelleme : ',value)
               if(this.siparisTur == value.siparisTur){

                   this.siparisService.getSiparisUrun(value.siparisNo)
                   .then(data => {

                       const yeniList = [];
                       let siraNo;
                       for(let key in this.dtSiparisler){

                           const item = this.dtSiparisler[key];

                           if(item.siparisNo == value.siparisNo){

                               siraNo = item.sira;
                               
                           }
                           else {

                               yeniList.push(item)
                           }
                       }
                       
                       
                       let index = 1;
                       const _yeniList = []
                       for (let key in yeniList){

                            const item = yeniList[key];
                            if(index == siraNo){
                              
                                for(let dt in data){

                                    data[dt].sira = siraNo;
                                    _yeniList.push(data[dt]);
                                }
                            }
                            else {

                                _yeniList.push(item);
                            }

                            index++;

                       }

                       this.dtSiparisler = null;
                       this.dtSiparisler = _yeniList;
                       this.siparisler = null;
                       this.siparisler = [...this.dtSiparisler];
                   })
               }
         })*/
    },
    mounted(){
        
         this.loading = true;
         let siparisDurum = 2;
         const d = new Date()
         const year = d.getFullYear()

         if(this.siparisTur == "bekleyen") siparisDurum = 1;
         if(this.siparisTur == "sevk") siparisDurum = 3;
              this.siparisService.getSiparisList(siparisDurum,year).then(data => {
                  this.siparisler = data
                  this.siparisHepsiEvent()
                  this.toplamGuncelle(this.siparisler)
                  this.dtSiparisler = data
                  this.loading= false;
                   this.toplamGuncelle(data);
              })
         
         eventListener.$on('menu-Toggle',(data)=>{

             if(data == false){
                 this.menuToggleExcell=true
                 this.menuToggle=true
             }else if(data==true){
                 this.menuToggleExcell=false
                 this.menuToggle=false
             }
         })

        
    },
    methods: {
            
        
           siparisHepsiEvent(){
                let siparisDurum = 2;
           

            if(this.siparisTur == "bekleyen") siparisDurum = 1;
            if(this.siparisTur == "sevk") siparisDurum = 3;
           
             if(this.siparis_list_hepsi){
               this.loading = true;
             
               this.siparisService.getSiparisHepsiList(siparisDurum).then(data => {
               this.siparisler = data
               this.SiparislerEvent = data
              
             
             
              
                
                this.loading= false;
                 
               })
             }
            else{
                 this.select_yil = this.yil_listesi.find(x=>x.yil == this.select_yil).yil
                 this.yil_baslik =  this.select_yil

               

             } 
            
                  
           
           
            },

         tonToplama(siparisler){
             console.log(siparisler)
             

         } ,
         yukleme_listesi_yukle(){
            this.loading = true;
            let siparisDurum = 2;
            

            if(this.siparisTur == "bekleyen") siparisDurum = 1;
            if(this.siparisTur == "sevk") siparisDurum = 3;
                this.siparisService.getSiparisList(siparisDurum,this.select_yil).then(data => {

                     this.siparisler = data
                     this.SiparislerHepsi = data
                     if(this.FirmaAdi !="Hepsi")
                        {
                            this.statuSecim2()
                        }
                     else if(this.marketing !="Hepsi")
                        {
                            this.statuSecim()
                        }
                     else if(this.Fatura !="Hepsi")
                        {
                            this.statuSecim3()
                        }
                     this.loading= false;
                 
          })
         },
        yil_degisim_event(){
        
            this.select_yil = this.yil_listesi.find(x=>x.yil == this.select_yil).yil
            this.yil_baslik =  this.select_yil
             this.yukleme_listesi_yukle()
        },
        excel_cikti_click_en(){
            const data = this.siparisler
            service.getUretimExcelListesi_En(data).then(data2=>{
                if(data2.status){
                    const link = document.createElement("a")
                    link.href=this.servis_adres + 'siparisler/dosyalar/uretimExcelCiktiEn'
                    link.setAttribute('download','Üretim_Listesi.xlsx')
                    document.body.appendChild(link)
                    link.click()
                    this.is_excel = false
                    this.$store.dispatch('loadEnd') // loading sonlandırma png
                }
            })



        },
        excel_cikti_click(){

             this.$store.dispatch('loadBegin') //loading png gösteriyor
            if(this.excel_cikti == 'Mekmer'){
              
                const data = this.siparisler
                console.log(this.siparisler)
               
                service.getUretimExcelListesi(data).then(response => {
                     console.log("getUretimExcelListesi",data)
                     if(response.status){
                           
                            const link = document.createElement('a')
                            link.href = this.servis_adres + 'siparisler/dosyalar/uretimExcelCikti' 

                            
                            link.setAttribute('download','Üretim_Listesi.xlsx')
                            document.body.appendChild(link)
                            link.click()
                            this.is_excel = false
                            this.$store.dispatch('loadEnd') // loading sonlandırma png
                           
                     }
                })
            }
          
        },
         toplamGuncelle(liste){
              let kasaToplami = 0;
              let siparisToplami = 0;
              let uretimToplami = 0;
              let satisToplami = 0;
              let tonToplami = 0;
               for(let key in liste){

                        const data = liste[key];

                        kasaToplami+= data.kasa;
                        siparisToplami+= data.siparisMiktari;
                        uretimToplami+= data.uretimMiktari;
                        satisToplami+= data.satisToplam;
                        tonToplami += data.ton;
                        
                   }

                const data = {

                    kasaToplami : kasaToplami,
                    siparisToplami : siparisToplami,
                    uretimToplami : uretimToplami,
                    satisToplami : satisToplami,
                    tonToplami: tonToplami,
                }

                this.$store.dispatch('loadToplamGuncelleAct',data)
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
         siparisFilterDegisim(event){

           this.toplamGuncelle(event.filterValue);
        },
         kayitYenileme() {

             const result = this.dtSiparisler.sort((a,b)=>{

                 const tarih1 = a;
                 const tarih2 = b;

                 if(tarih1 < tarih2) return -1;
                 if(tarih1 > tarih2) return 1;

                 return 0;
             })
             this.siparisler = null;
             this.toplamGuncelle(result);
             this.siparisler = [...result];
         },
         statuSecim2(){
             //statü değişiminde
           
            
            if(this.siparis_list_hepsi==false){
              if(this.FirmaAdi){

                  let result;
                   
                  if(this.FirmaAdi == "Hepsi"){
                      
                      result = this.SiparislerHepsi;
                  }

                  if (this.FirmaAdi != "Hepsi") {
                      result = [...this.SiparislerHepsi.filter(x=>x.tedarikciAdi === 'Mekmer')]
                      console.log(result)
                  }
                   if(this.FirmaAdi == "Dis"){
                           
                        this.siparisler = [...this.SiparislerHepsi.filter(x=>x.tedarikciAdi !== 'Mekmer' )]
                        result = [...this.siparisler.filter(x=>x.tedarikciAdi !== 'Mek-Moz'  )]
                        
                            
                     }

                  this.siparisler = result;
               
                  this.toplamGuncelle(this.siparisler);
              }
            }
            else
            {
       
              if(this.FirmaAdi){

                  let result;
                 
                  if(this.FirmaAdi == "Hepsi"){

                  
                      result = this.SiparislerEvent
                  }
                  if (this.FirmaAdi != "Hepsi") {
                     
                      result = [...this.SiparislerEvent.filter(x=>x.tedarikciAdi === 'Mekmer' || x.tedarikciAdi === 'Mek-Moz')]
                  }
                   if(this.FirmaAdi == "Dis"){
                           
                        this.siparisler = [...this.SiparislerEvent.filter(x=>x.tedarikciAdi !== 'Mekmer' )]
                        result = [...this.siparisler.filter(x=>x.tedarikciAdi !== 'Mek-Moz'  )]
                        
                            
                     }

                  this.siparisler = result;
             
                  this.toplamGuncelle(this.siparisler);
              }

            }
              
         },
         statuSecim3(){
             //statü değişiminde
             
            
              if(this.siparis_list_hepsi==false)
               {
                   if(this.Fatura){

                    let result;
                    
                    if(this.Fatura == "Hepsi"){

                        result = this.SiparislerHepsi
                    }
                    if (this.Fatura != "Hepsi") {
                        
                        result = [...this.SiparislerHepsi.filter(x=>x.faturaKesimTur === this.Fatura)]
                        
                    }
                    

                    this.siparisler = result;
                    
                    this.toplamGuncelle(this.siparisler);
                }
               }
             else{
                   if(this.Fatura){

                    let result;
                    
                    if(this.Fatura == "Hepsi"){

                        result = this.SiparislerEvent
                    }
                    if (this.Fatura != "Hepsi") {
                      
                        result = [...this.SiparislerEvent.filter(x=>x.faturaKesimTur === this.Fatura)]
                        
                    }
                    

                    this.siparisler = result;
                   
                    this.toplamGuncelle(this.siparisler);
                }

             }  
         },
         statuSecim(){
             //statü değişiminde
         
         if(this.siparis_list_hepsi==false){
              if(this.marketing){

                  let result;
                   
                  if(this.marketing == "Hepsi"){

                      result = [...this.SiparislerHepsi];
                  }
                  if (this.marketing != "Hepsi") {
                     
                      result = [...this.SiparislerHepsi.filter(x=>x.marketing === this.marketing)]
                      
                  }
                  
                  this.siparisler = result;
                   
                  this.toplamGuncelle(this.siparisler);
              }
         } 
         else{
             if(this.marketing){

                  let result;
                   
                  if(this.marketing == "Hepsi"){

                      result = [...this.SiparislerEvent];
                  }
                  if (this.marketing != "Hepsi") {
                     
                      result = [...this.SiparislerEvent.filter(x=>x.marketing === this.marketing)]
                      
                  }

                  this.siparisler = result;
                   
                  this.toplamGuncelle(this.siparisler);
              }

         }
         },
         siparisSecim(event){
          
            
             //sipariş seçildiğinde
            this.selectedSiparis = event
            this.selectSiparis = true;
             if(this.selectedSiparis) {
                
                  this.selectSiparis = false;
             }
             this.dtSiparisNo = event.siparisNo
             
             this.siparisFormBaslik = event.musteriAdi + " - " + this.dtSiparisNo
             this.yeniSiparis = false;
             this.dialogVisible = true;
         },
         filterDegisim(){
            
            this.toplamGuncelle(this.dtSiparisler);
            //this.servisMetotTest(this.$refs.siparisData.processedData)
         },
         yeniSiparisAc(){
              
             this.selectedSiparis = null
             this.dtSiparisNo = ""
             this.selectSiparis = true;
             this.siparisFormBaslik = "Yeni Sipariş"
             this.yeniSiparis = true;
             this.dialogVisible = true;
         },
        
         siparisAc(){

             this.dtSiparisNo = this.selectedSiparis.siparisNo
             
             this.siparisFormBaslik = this.selectedSiparis.musteriAdi + " - " + this.dtSiparisNo
             this.yeniSiparis = false;
             this.dialogVisible = true;
         },
         columSecim(){
             
             this.columnsShow.sira = this.selectedColumns.find(x=>x.name === 'Sıra') ? true : false
            
         },
         yeniSiparisForm(){

             this.isYeniSiparisForm = true;
         },
         
         gridGizlemeDegisim(event){
            
            this.$store.dispatch('loadBegin')

            if(event){

                alert("alan gösterimi başladı.")
            }
            this.$store.dispatch("loadEnd")
          
         }
        
          },
       
 
     
    
    components:{

        siparisGirisForm : SiparisGirisForm,
        bmSiparisGirisForm : BmSiparisGirisForm,
        SiparisListeKisitli,
        SiparisListeHepsi
    },
    showColumn(value){

        return this.selectedColumns.find(x=>x.name === value);
    }
}
</script>
<style scoped>
    .yearSelected{
        margin-left: 15px;
        margin-top:-5px;
    }
    .yearSelectedExpand{
        margin-left: 8px;
        margin-top:-5px;
    }

    .hepsiSelected{
        margin-left:22px;
        margin-bottom:5px;
        margin-top:7px;
    }
    .hepsiSelectedExpand{
        margin-left:14px;
        margin-top:7px;
    }
    .uretimExcell{
        display:inline-block;
        float:left;
        width:100px;
        text-align: center;
        
        
    }
    .uretimExcellExpand{
        display:inline-block;
        float:left;
        width:100px;
        margin-left:-7px;
        
    }
    .uretimExcell>div{
        display:inline-block;
        float:left;
        width:100px;
        text-align: center;
        margin-left:7px;
    }
 .genel{

      border:  1px;
      border-style: solid;
      border-color:blue;
      width: 50%;
 }
  .dairesel{



    border-radius: 150px;

    -webkit-border-radius: 150px;

    -moz-border-radius: 150px;




}
 .rowBorder{
     border : 1px;
     border: solid;
     border-top-color: red;
     border-color:black;

 }
 .ui-datatable column{

        border:  1px;
      border-style: solid;
      border-color:blue;
 }
 .p-column-filter {
    margin-top: 1em;
}

.p-datatable-header {
        border: 0 none;
        
        text-align: left;
        font-size: 20px;
    }

    .p-paginator {
        border: 0 none;
        padding: 1em;
    }

    .p-datatable-thead > tr > th {
        border: 0 none;
        text-align: left;
        
    }

        .p-column-title {
        font-size: 16px;
    }

   .p-datatable-tbody > tr > td {
        border: 0 none;
    }
    span {
        margin-top: .125em;
    }
    .ciktiMenu Button{

         margin-left: 5px;
    }
    .p-datatable{

        font-size : 12px;
    }
    #excel_button{

        margin-top:15px;
    }
    .renk{
        
         font-size : 5%;
       
         margin-top: -10px;
       

        
    }
    .pazarlamaToopTip{
        margin-left:15px;
    }
    .custom-box{

        width: 70%;
        transition: 0.4s;
        box-shadow: 3px 3px 24px 5px rgba(0,0,0,0.22), -3px -3px 24px 5px rgba(0,0,0,0.18);
        margin-right:20px;
        font-size : 11px;
        height:100px;
    }
    .siparis-form{

        height: 1800px;
    }
    .tarih_hide{

        display: none;
    }
    .tarih_show{

        display: inline;
    }
    .block-satici{
        display:block;
        float:left;
        width:300px;
        margin-left:-13px;
        margin-top:3px;
    }
    .block-satici>ul{
        display: block;
        float:left;

    }
    .block-satici>ul>li{
        display: block;
        float:left;
        margin-right:2px;
        width:75px;
    }
    .block-satici>h3{
        display: block;
        float: left;
        font-size: 11px;
        font-weight:bold;
        margin-right:10px;
        margin-top: -3px;
    }
   
    

</style>