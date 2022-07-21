<template>
    <div class="p-fluid">
        <div class="p-grid">
            <div class="p-col-6">
                <div class="card card-w-title">
                    <div class="p-grid">
                        <div class="p-col-12 p-md-4">
                            <span>Teslim Şekli</span>
                        </div>
                        <div class="p-col-12 p-md-8">
                            <AutoComplete v-model="teslimTur" @input="$v.profData.teslimTurId.$touch()"
                                :suggestions="filterTeslimTurList" @complete="aramaTeslimTur($event)"
                                field="teslimTurAdi" placeholder="Teslim Şekli Seçiniz" :dropdown="true"
                                @item-select="teslimTurDegisim">
                                <template #items="slotProps">
                                    <div class="p-clearfix p-autocomplete-brand-item">
                                        <div>
                                            {{slotProps.teslimTurAdi}}
                                        </div>
                                    </div>
                                </template>
                            </AutoComplete>
                            <ValidationMessage v-show="$v.profData.teslimTurId.$error">* Zorunlu Alan
                            </ValidationMessage>
                        </div>
                        <div class="p-col-12 p-md-4">
                            <span>Ödeme Şekli</span>
                        </div>
                        <div class="p-col-12 p-md-8">
                            <AutoComplete v-model="odemeTur" :suggestions="filterOdemeTurList"
                                @complete="aramaOdemeTur($event)" field="odemeTurAdi" placeholder="Ödeme Türünü Seçiniz"
                                :dropdown="true" @item-select="odemeTurDegisim" @blur="$v.profData.odemeTurId.$touch()">
                                <template #items="slotProps">
                                    <div class="p-clearfix p-autocomplete-brand-item">
                                        <div>
                                            {{slotProps.odemeTurAdi}}
                                        </div>
                                    </div>
                                </template>
                            </AutoComplete>
                            <ValidationMessage v-show="$v.profData.odemeTurId.$error">* Zorunlu Alan</ValidationMessage>
                        </div>
                        <div class="p-col-12 p-md-4">
                            <span>Vade</span>
                        </div>
                        <div class="p-col-12 p-md-8">
                            <Calendar ref="vadeCalendar" v-model="vade" @blur="$v.profData.vade.$touch()"
                                :showIcon="true" dateFormat="dd/mm/yy" @date-select="vadeDegisim" />
                        </div>
                        <div class="p-col-12 p-md-4">
                            <span>Sevk Ülke Adı</span>
                        </div>
                        <div class="p-col-12 p-md-5">
                            <AutoComplete v-model="ulke" :suggestions="filterUlkeList" @complete="aramaUlke($event)"
                                field="ulkeAdi" placeholder="Ülke Seçiniz" :dropdown="true"
                                @blur="$v.profData.ulkeId.$touch()" @item-select="ulkeDegisim">
                                <template #items="slotProps">
                                    <div class="p-clearfix p-autocomplete-brand-item">
                                        <img src="assets/layout/images/country-log/Afghanistan-64.png" width="32"
                                            style="display: inline-block; margin: 5px 0 2px 5px" />
                                        <div>{{slotProps.ulkeAdi}}
                                        </div>
                                    </div>
                                </template>
                            </AutoComplete>
                            <ValidationMessage v-show="$v.profData.ulkeId.$error">* Zorunlu Alan</ValidationMessage>
                        </div>
                        <div class="p-col-12 p-md-3">
                            <InputText v-model="profData.ulke" />
                        </div>
                        <div class="p-col-12 p-md-4">
                            <span>Ödeme Açıklama</span>
                        </div>
                        <div class="p-col-12 p-md-8">
                            <InputText v-model="profData.odemeAciklama" @change="veriDegisim" />
                        </div>
                        <div class="p-col-12 p-md-4">
                            <span>Liman</span>
                        </div>
                        <div class="p-col-12 p-md-8">
                            <InputText v-model="profData.liman" @change="veriDegisim" />
                        </div>
                        <div class="p-col-12 p-md-4">
                            <span>Konteyner Ayrıntı</span>
                        </div>
                        <div class="p-col-12 p-md-8">
                            <InputText v-model="profData.konteynerAyrinti" @change="veriDegisim" />
                        </div>

                        <div class="p-col-12 p-md-4">
                            <span>Evrak Gideri</span>
                        </div>
                        <div class="p-col-12 p-md-8">
                            <currency-input2 v-model="profData.evrakGideri" @change="veriDegisim" />
                        </div>
                        <div class="p-col-12 p-md-4">
                            <span>Komisyon</span>
                        </div>
                        <div class="p-col-12 p-md-8">
                            <currency-input2 v-model="profData.komisyon" @change="veriDegisim" />
                        </div>


                        <div class="p-col-12 p-md-4">
                            <span>Fatura</span>
                        </div>
                        <div class="p-col-12 p-md-8">
                            <AutoComplete v-model="faturaTur" :suggestions="filterFaturaTurList"
                                @complete="aramaFaturaTur($event)" field="faturaKesimTurAdi"
                                placeholder="Fatura Türünü Seçiniz" :dropdown="true" @item-select="faturaTurDegisim"
                                @blur="$v.profData.faturaKesimTurId.$touch()">
                                <template #items="slotProps">
                                    <div class="p-clearfix p-autocomplete-brand-item">
                                        <div>
                                            {{slotProps.faturaKesimTurAdi}}
                                        </div>
                                    </div>
                                </template>
                            </AutoComplete>
                            <ValidationMessage v-show="$v.profData.faturaKesimTurId.$error">* Zorunlu Alan
                            </ValidationMessage>

                        </div>
                        <div class="p-col-8">
                            <Checkbox :disabled="dis_takipEt" id="takip" v-model="profData.depo" @change="DepoDegisim"
                                :binary="true" />
                            <label for="takip" style="background-color:yellow" class="p-checkbox-label">Atlanta
                                SM</label>


                        </div>
                        <div class="p-col-8">
                            <Checkbox :disabled="dis_sigorta" v-model="profData.sigorta_id" @change="SigortaDegisim"
                                :binary="true" />
                            <label class="p-checkbox-label">Sigorta</label>


                        </div>
                    </div>
                </div>
                <b-field class="card card-w-title" label="HİZMET SATIŞ / ALIŞ " label-position="on-border"
                    style="margin-top:5%;">
                    <div class="p-col-12">
                        <div class="p-grid" v-on:keyup.ctrl="scaleValueFunc">
                            <div class="p-col-3">
                                <b-field label="Navlun Satış" labelPosition="on-border">


                                    <currency-input2 @change="currencyDegisim('navlunSatis',$event)"
                                        v-model="profData.navlunSatis" :disAktif="dis_urun_giris" />


                                    <!--İnput NavlunSatis Bölmesi                                  
                                <InputText v-model="profData.navlunSatis"  @change="currencyDegisim('navlunSatis',$event),veriDegisim"/>
                                -->


                                </b-field>
                            </div>
                            <div class="p-col-3">
                                <b-field label="Açıklama" style="font-size:2px;" labelPosition="on-border">
                                    <InputText v-model="profData.navlunFirma" @change="veriDegisim" />
                                </b-field>
                            </div>
                            <div class="p-col-3">
                                <b-field label="Navlun Alış" labelPosition="on-border">
                                    <currency-input2 @change="currencyDegisim('navlunAlis',$event)"
                                        v-model="profData.navlunAlis" :disAktif="dis_urun_giris" />
                                </b-field>
                            </div>
                            <div class="p-col-3">
                                <b-field label="Not" labelPosition="on-border">
                                    <InputText v-model="profData.navlunMekmarNot" @change="veriDegisim" />
                                </b-field>
                            </div>
                        </div>
                        <div class="p-grid">
                            <div class="p-col-3">
                                <b-field label="Diğer-1 Satış" labelPosition="on-border">
                                    <currency-input2 @change="currencyDegisim('detayTutar_1',$event)"
                                        v-model="profData.detayTutar_1" :disAktif="dis_urun_giris" />
                                </b-field>
                            </div>
                            <div class="p-col-3">
                                <b-field label="Açıklama" labelPosition="on-border">
                                    <InputText v-model="profData.detayAciklama_1" @change="veriDegisim" />
                                </b-field>
                            </div>


                            <div class="p-col-3">
                                <b-field label="Diğer-1 Alış" labelPosition="on-border">
                                    <currency-input2 @change="currencyDegisim('detayAlis_1',$event)"
                                        v-model="profData.detayAlis_1" :disAktif="dis_urun_giris" />
                                </b-field>
                            </div>

                            <div class="p-col-3">
                                <b-field label="Not" labelPosition="on-border">
                                    <InputText v-model="profData.detayMekmarNot_1" @change="veriDegisim" />
                                </b-field>
                            </div>
                        </div>
                        <div class="p-grid">
                            <div class="p-col-3">
                                <b-field label="Diğer-2 Satış" labelPosition="on-border">
                                    <currency-input2 @change="currencyDegisim('detayTutar_2',$event)"
                                        v-model="profData.detayTutar_2" :disAktif="dis_urun_giris" />
                                </b-field>
                            </div>
                            <div class="p-col-3">
                                <b-field label="Açıklama" labelPosition="on-border">
                                    <InputText v-model="profData.detayAciklama_2" @change="veriDegisim" />
                                </b-field>
                            </div>
                            <div class="p-col-3">
                                <b-field label="Diğer-2 Alış" labelPosition="on-border">
                                    <currency-input2 @change="currencyDegisim('detayAlis_2',$event)"
                                        v-model="profData.detayAlis_2" :disAktif="dis_urun_giris" />
                                </b-field>
                            </div>
                            <div class="p-col-3">
                                <b-field label="Not" labelPosition="on-border">
                                    <InputText v-model="profData.detayMekmarNot_2" @change="veriDegisim" />
                                </b-field>
                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-3">
                                <b-field label="Diğer-3 Alış" labelPosition="on-border">
                                    <currency-input2 @change="currencyDegisim('detayTutar_3',$event)"
                                        v-model="profData.detayTutar_3" :disAktif="dis_urun_giris" />
                                </b-field>
                            </div>
                            <div class="p-col-3">
                                <b-field label="Açıklama" labelPosition="on-border">
                                    <InputText v-model="profData.detayAciklama_3" @change="veriDegisim" />
                                </b-field>
                            </div>
                            <div class="p-col-3">
                                <b-field label="Diğer-3 Alış" labelPosition="on-border">
                                    <currency-input2 @change="currencyDegisim('detayAlis_3',$event)"
                                        v-model="profData.detayAlis_3" :disAktif="dis_urun_giris" />
                                </b-field>
                            </div>
                            <div class="p-col-3">
                                <b-field label="Not" labelPosition="on-border">
                                    <InputText v-model="profData.detayMekmarNot_3" @change="veriDegisim" />
                                </b-field>
                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-3">
                                <b-field label="Mekus Masrafı" labelPosition="on-border">
                                    <currency-input2 @change="currencyDegisim('detayTutar_4',$event)"
                                        v-model="profData.detayTutar_4" :disAktif="diger_4" />
                                </b-field>
                            </div>
                        </div>

                        <div class="p-grid">
                            <div class="p-col-3">
                                <b-field label="Sigorta" labelPosition="on-border">

                                    <currency-input2 @change="currencyDegisim('sigorta_tutar',$event)"
                                        v-model="profData.sigorta_tutar" :disAktif="sigorta_tutar" />
                                </b-field>
                            </div>
                        </div>
                    </div>

                </b-field>
            </div>
            <div class="p-col-6">
                <div class="card card-w-title">
                    <div class="p-grid">
                        <div class="p-col-12 p-md-12 p-lg-12">
                            <Card>
                                <template slot="subtitle">
                                    <span>Üretim Açıklama</span>
                                </template>
                                <template slot="content">
                                    <Textarea rows="6" :autoResize="false" cols="30" v-model="profData.uretimAciklama"
                                        @change="veriDegisim" />
                                </template>
                            </Card>
                        </div>
                        <div class="p-col-12 p-md-12">
                            <Card>
                                <template slot="subtitle">
                                    <span>Sevkiyat Açıklama</span>
                                </template>
                                <template slot="content">
                                    <Textarea rows="6" :autoResize="false" cols="30" v-model="profData.sevkiyatAciklama"
                                        @change="veriDegisim" />
                                </template>
                            </Card>
                        </div>
                        <div class="p-col-12 p-md-12">
                            <Card>
                                <template slot="subtitle">
                                    <span>Finans Açıklama</span>
                                </template>
                                <template slot="content">
                                    <Textarea rows="6" :autoResize="false" cols="30" v-model="profData.finansAciklama"
                                        @change="veriDegisim" />
                                </template>
                            </Card>
                        </div>

                        <div class="p-col-12 p-md-12" style="margin-top: 10px">
                            <custom-file-input style="margin-left: 155px" baslik="Proforma Yükle"
                                @sunucuDosyaYolla="faturaDosyaGonder($event)" />

                        </div>
                        <div class="p-col-12 p-md-12">
                            <span style="color : red;margin-left: 35px;"> * Siparişi oluşturduktan sonra yükleme
                                yapınız.</span><br>
                            <span style="color : red;margin-left: 35px;"> * Pdf formatında ve dosya isminin ' . '
                                içermediğine dikkat ediniz! </span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SiparisService from '../../../service/SiparisService';
import LocalService from '../../../service/LocalService';
import store from '../../../store/store';

import Opservice from '../../../service/OperasyonService'
import CurrencyInput2 from '../../shared/CurrencyInput2';
import CustomInputFile from '../../../components/shared/CustomInputFile';
import fileService from '../../../service/FileService';
import { required } from 'vuelidate/lib/validators';
import {eventListener} from '../../../main'

export default {
    
    components :{

     
             
         customFileInput : CustomInputFile,
        
        CurrencyInput2 : CurrencyInput2
        
        
    },
    
    data () {
        return {

             proforma : null,
             teslimTur : null,
             diger_4 : true,
             dis_urun_giris :  false,
             sigorta_tutar : true,
             teslimTurList :null,
             filterTeslimTurList : null,
             odemeTur : null,
             odemeTurList : null,
             filterOdemeTurList : null,
             faturaTur : null,
             faturaKesimTurList : null,
             filterFaturaTurList : null,
             ulke : null,
             ulkeList : null,
             dis_takipEt : true,
             dis_sigorta : true,
             filterUlkeList : null,
             vade : null,
             esProfData : null,
             detayMekmarNot_4 : 'Mekus Masrafı',
             detay4_aciklama : true,
             detay4 : 0,
             scaleValue:"",
             
           

        }
    },
    props : { 
      
       
         profData : {

             type : Object,
             default : function(){

                 return {}
             }
         },
         siparisNo : null, 
         siparisUrunler : null
    },
    validations : {

         profData : {

             teslimTurId : {required},
             odemeTurId : {required},
             ulkeId : {required},
             faturaKesimTurId : {required}
         }
    },
    siparisService : null,
    localService : null,
    created(){
        
        this.siparisService = new SiparisService();
        this.localService = new LocalService();
        this.esProfData = {...this.profData};
        store.dispatch("navlun_ilk_degeri_act",this.esProfData)

        this.$v.$touch()
        this.yeniKayitBaslangicIslemler();
       
        if (this.profData.depo){
            this.diger_4 = true
            this.dis_takipEt = true
        }
        if (this.profData.sigorta_id){
            this.sigorta_tutar = false
        } 
       
         if(this.profData.teslimTurId == 9 || this.profData.teslimTurId == 10 || this.profData.teslimTurId == 12 )
            {
               
                this.dis_sigorta = false;
        }
        
            
       
    },
    mounted(){
        eventListener.$on('sipBilgileri', data => {
            if (data.length > 0) {
                this.dis_takipEt = false
            }
        })
        this.siparisService.getTeslimTurList().then(data => {
            this.teslimTurList = data

            this.teslimTur = this.teslimTurList.find(x=>x.id == this.profData.teslimTurId)
             
        });
        this.siparisService.getOdemeTurList().then(data => {  
            this.odemeTurList = data
            this.odemeTur = this.odemeTurList.find(x=>x.id == this.profData.odemeTurId)
        });

         this.siparisService.getFaturaKesimTurList().then(data => {  
            this.faturaKesimTurList = data
          
            this.faturaTur = this.faturaKesimTurList.find(x=>x.id == this.profData.faturaKesimTurId)
        });
        this.siparisService.getUlkeList().then(data => {   

            this.ulkeList = data

            this.ulke = this.ulkeList.find(x=>x.id == this.profData.ulkeId);

          
         
        });
      
        if(this.profData.vade.length > 0) {
            
             this.vade = this.localService.getStringDate(this.profData.vade)
            
        }
       
        this.yeniKayitBaslangicIslemler()
        
    },
    methods:{
        scaleValueFunc(){
            this.scaleValue = "transform:scale(0.5)"
        },
        
        
        
        
        yeniKayitBaslangicIslemler(){
           
            
            Opservice.getEvrakFaturaModel().then(data => {
              
               
                this.evrak = data.evrak;
                this.id = null;
                this.siparisno = null;
           })
           },
          KayitIslemi(){
            
              
               this.evrak.id = 2
               this.evrak.siparisno = this.siparisNo //this.evrak verileri koydum
               this.evrak.kullaniciAdi = this.$store.getters.getUser,
               this.yeniTeklifKayit();
             
         
        },  
          yeniTeklifKayit(){

           
            const veri = {

                evrak : this.evrak,
               
            }
           Opservice.setEvrakFaturaKayit(veri).then(data => {

               
               
                if(data.status){

                     //alert("Evrak başarılı şekilde yüklendi , Evraklardan görüntüleyebilirsiniz . ")
                     //socket.siparis.emit('teklif_yeni_event',veri.kullaniciAdi);
                     this.evrak.id = 2;
                     this.evrak.siparisno = this.siparisNo;
                   
                     return;
                }
                else {

                     // alert("Evrak yüklenemedi ,Lütfen tekrar deneyiniz . ")
                }

              
               
            })
           },
        faturaDosyaGonder(event){
         
             const d = 2
          
             fileService.faturaDosyaGonder(event,d, this.siparisNo).then(data => {
              
               console.log("faturaDosyaGonder ",data)
            
                Opservice.setEvrakFaturaKayit(this.evrak).then(veri => {
                    
                    if(veri.status){
                        
                        alert("Evrak başarılı şekilde yüklendi!")
                       
                       
                        
 
                             }
                    else{
                        
                        alert("Ops! Lütfen Tekrar Deneyiniz!")
                       
                        
 
                             }        
                        })
               })
      
             this.KayitIslemi()
                
         },
         aramaTeslimTur(event){
            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.teslimTurList];

                 }
                 else {

                     result = this.teslimTurList.filter((ted) => {
                        
                         return ted.teslimTurAdi.toLowerCase().startsWith(event.query.toLowerCase())
                     })

                      
                 }
                 
                 this.filterTeslimTurList = result;
            },250)
        },
        aramaOdemeTur(event){
            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.odemeTurList];

                 }
                 else {

                     result = this.odemeTurList.filter((ted) => {
                        
                         return ted.odemeTurAdi.toLowerCase().startsWith(event.query.toLowerCase())
                     })

                      
                 }

                 this.filterOdemeTurList = result;
            },250)
        },

        aramaFaturaTur(event){
            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.faturaKesimTurList];

                 }
                 else {

                     result = this.faturaKesimTurList.filter((ted) => {
                        
                         return ted.faturaKesimTurAdi.toLowerCase().startsWith(event.query.toLowerCase())
                     })

                      
                 }

                 this.filterFaturaTurList = result;
            },250)
        },
        aramaUlke(event){

            

            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.ulkeList];

                 }
                 else {

                     result = this.ulkeList.filter((ted) => {
                        
                         return ted.ulkeAdi.toLowerCase().startsWith(event.query.toLowerCase())
                     })

                      
                 }

                 this.filterUlkeList = result;
            },250)
        },
        teslimTurDegisim(){

            this.profData.teslimTurId = this.teslimTur.id
          
            if(this.teslimTur.id == 9 || this.teslimTur.id == 10 || this.teslimTur.id == 12 )
            { 
               
                this.dis_sigorta = false;
            }
            else{
                 this.dis_sigorta = true;
                 this.profData.sigorta_id = 0
            }
            this.kayitKontrol()
        },
        odemeTurDegisim(){

            this.profData.odemeTurId = this.odemeTur.id
            console.log(this.odemeTur.id)
            if (this.odemeTur.id == 3) {
                this.profData.pesinat = 0
            }
            this.kayitKontrol()
            this.$emit('odemeTur',this.odemeTur.id)
        },
        faturaTurDegisim(){
            
            this.profData.faturaKesimTurId = this.faturaTur.id
        
            this.kayitKontrol();
            this.$emit('faturaTur',this.faturaTur.id)
        },
        vadeDegisim(){
            
            this.profData.vade = this.localService.getDateString(this.vade)
           
           
            this.kayitKontrol();
        },
        ulkeDegisim(){

            this.profData.ulkeId = this.ulke.id;
            this.kayitKontrol();
        },
        kayitKontrol(){

            let index = 0;
           
            if(this.esProfData.teslimTurId != this.profData.teslimTurId) index = index +1;
            if(this.esProfData.odemeTurId != this.profData.odemeTurId) index = index +1;
            if(this.esProfData.faturaKesimTurId != this.profData.faturaKesimTurId) index = index +1;
            if(this.esProfData.vade != this.profData.vade) index = index +1;
            if(this.esProfData.odemeAciklama != this.profData.odemeAciklama) index = index +1;
            if(this.esProfData.konteynerAyrinti != this.profData.konteynerAyrinti) index = index +1;
            if(this.esProfData.evrakGideri != this.profData.evrakGideri) index = index +1;
            if(this.esProfData.komisyon != this.profData.komisyon) index = index +1;
          
            if(this.esProfData.navlunSatis != this.profData.navlunSatis) index = index +1;
            if(this.esProfData.navlunFirma != this.profData.navlunFirma) index = index +1;
            if(this.esProfData.navlunAlis != this.profData.navlunAlis) index = index +1;
            if(this.esProfData.navlunMekmarNot != this.profData.navlunMekmarNot) index = index +1;

            if(this.esProfData.detayTutar_1 != this.profData.detayTutar_1) index = index +1;
            if(this.esProfData.detayAciklama_1 != this.profData.detayAciklama_1) index = index +1;
            if(this.esProfData.detayAlis_1 != this.profData.detayAlis_1) index = index +1;
            if(this.esProfData.detayMekmarNot_1 != this.profData.detayMekmarNot_1) index = index +1;

            if(this.esProfData.detayTutar_2 != this.profData.detayTutar_2) index = index +1;
            if(this.esProfData.detayAciklama_2 != this.profData.detayAciklama_2) index = index +1;
            if(this.esProfData.detayAlis_2 != this.profData.detayAlis_2) index = index +1;
            if(this.esProfData.detayMekmarNot_2 != this.profData.detayMekmarNot_2) index = index +1;

            if(this.esProfData.detayTutar_3 != this.profData.detayTutar_3) index = index +1;
            if(this.esProfData.detayAciklama_3 != this.profData.detayAciklama_3) index = index +1;
            if(this.esProfData.detayAlis_3 != this.profData.detayAlis_3) index = index +1;
            if(this.esProfData.detayMekmarNot_3 != this.profData.detayMekmarNot_3) index = index +1;

             if(this.esProfData.detayTutar_4 != this.profData.detayTutar_4) index = index +1;
            if(this.esProfData.detayAciklama_4 != this.profData.detayAciklama_4) index = index +1;

            if(this.esProfData.uretimAciklama != this.profData.uretimAciklama) index = index +1;
            if(this.esProfData.sevkiyatAciklama != this.profData.sevkiyatAciklama) index = index +1;
            if(this.esProfData.finansAciklama != this.profData.finansAciklama) index = index +1;
            if(this.esProfData.ulkeId != this.profData.ulkeId) index = index +1;

             if(this.esProfData.sigorta_id != this.profData.sigorta_id) index = index +1;
             if(this.esProfData.depo != this.profData.depo) index = index +1;
           

            let durum = true;
            
            if(index > 0) durum = false;

            this.$emit('proformaBilgileriDegisim',durum);

        },
        veriDegisim(){
            
            this.kayitKontrol()

            
          
        },
        
        DepoDegisim(){
            
            var top  = 0
            var topAdet = 0
           
            const d = new Date();
            let year = d.getFullYear();
            this.dis_takipEt = this.profData.depo
            this.diger_4 = true

          if(year == '2022')
          {
              if (this.profData.depo == true){
                 for (let i = 0; i< this.siparisUrunler.length; i++)
                  
                  {  
                     
                      if ( this.siparisUrunler[i].urunbirimAdi== 'M2')
                          top += this.siparisUrunler[i].m2
                          
                      if (this.siparisUrunler[i].urunbirimAdi == 'Adet'){
                          topAdet += this.siparisUrunler[i].kasaAdet
                      }
                      if (this.siparisUrunler[i].urunbirimAdi == 'Mt'){
                          topAdet += this.siparisUrunler[i].kasaAdet
                      }
                           
                  }
                 
                if (top >0 && topAdet >0){
                    
                    top = top * 6;
                    topAdet = topAdet * 50;
                    this.profData.detayTutar_4 = top + topAdet
                }else if (top >0 && topAdet ==0){
                    this.profData.detayTutar_4 = top * 6
                }else if (top ==0 && topAdet >0){
                    this.profData.detayTutar_4 = topAdet * 50
                }


                 //this.profData.detayTutar_4 = top*6
                 
                  this.diger_4 = true
              }
              else{
                    
                   this.profData.detayTutar_4 = 0
                   this.diger_4 = true
              }
          }
          else if (year == '2021') {
            if (this.profData.depo == true){
               
                for (let i = 0; i< this.siparisUrunler.length; i++)
                  
                  {  
                     
                      if ( this.siparisUrunler[i].m2 != null)
                          top += this.siparisUrunler[i].m2
                          
                      if (this.siparisUrunler[i].adet !=null){
                          topAdet += this.siparisUrunler[i].adet 
                      }
                           
                  }
                 //this.profData.detayTutar_4 = top*5.5
                 if (top >0 && topAdet >0){
                    
                    top = top * 5.5;
                    topAdet = topAdet * 50;
                    this.profData.detayTutar_4 = top + topAdet
                    
                }else if (top >0 && topAdet ==0){
                    this.profData.detayTutar_4 = top * 5.5
                }else if (top ==0 && topAdet >0){
                    this.profData.detayTutar_4 = topAdet * 50
                }
                 this.diger_4 = false
            }
            else{
                this.profData.detayTutar_4 = 0
                this.diger_4 = true
            }
            
           
           }
           
          else {
            if(this.profData.depo == true){
                     this.diger_4 = false

                for (let i = 0; i< this.siparisUrunler.length; i++)
                  
                  {  
                     
                      if ( this.siparisUrunler[i].m2 != null)
                          top += this.siparisUrunler[i].m2
                          

                    if (this.siparisUrunler[i].adet !=null){
                          topAdet += this.siparisUrunler[i].adet 
                      }
                           
                  }
                 //this.profData.detayTutar_4 = top*4
                 if (top >0 && topAdet >0){
                    
                    top = top * 4;
                    topAdet = topAdet * 50;
                    this.profData.detayTutar_4 = top + topAdet
                    
                }else if (top >0 && topAdet ==0){
                    this.profData.detayTutar_4 = top * 4
                }else if (top ==0 && topAdet >0){
                    this.profData.detayTutar_4 = topAdet * 50
                }
                
            }
             else{
                this.profData.detayTutar_4 = 0
                this.diger_4 = true
            }
           }
          
        },
        
        SigortaDegisim(){
            if(this.profData.sigorta_id)
            {
               this.sigorta_tutar = false
            }
            else
            {  
               this.sigorta_tutar = true
                this.profData.sigorta_tutar = 0
            }
             this.kayitKontrol()
        },
        currencyDegisim(property,_value){
        
           let value = parseFloat(_value);
            if(property == "navlunSatis") {
                this.profData.navlunSatis = value
                this.dis_urun_giris = true
                
                
            }
            if(property == "navlunAlis") this.profData.navlunAlis = value;
            if(property == "detayTutar_1") this.profData.detayTutar_1 = value;
            if(property == "detayAlis_1") this.profData.detayAlis_1 = value;
            if(property == "detayTutar_2") this.profData.detayTutar_2 = value;
            if(property == "detayAlis_2") this.profData.detayAlis_2 = value;
            if(property == "detayTutar_3") this.profData.detayTutar_3 = value;
            if(property == "detayTutar_4") this.profData.detayTutar_4 = value;
            if(property == "detayAlis_3") this.profData.detayAlis_3 = value;

            this.kayitKontrol();
            this.$emit('navlunDigerTutarDegisim');

        }
        
    }
    
    

  
};



</script>

<style>



</style>
