<template>
       <div class="p-fluid"> 
           <Toast position="bottomright" />
                       <div class="card card-w-title">
                       <div class="p-grid">
                           <div class="p-col-12 p-lg-4 ">
                               <div class="p-col-12 p-md-12">
                                  <!-- Ürün Kart Bilgileri -->
                                  <urun-kart-bilgi :dis_urun_giris="dis_urun_giris"  /> 
                               </div>
                               <div class="p-col-12 p-md-12">
                                   <Card class="tedarikciCard"  >
                                       <template slot="content" >
                                           <div class="p-grid fluid">
                                               <div class="p-col-12 p-lg-6">
                                                   <AutoComplete :disabled="dis_urun_giris" @blur="$v.tedarikci.$touch()" @click="sec"  v-model="tedarikci" :suggestions="filterTedarikciList" @complete="aramaTedarikci($event)" 
                                                   field="firmaAdi" placeholder="Tedarikçi" :dropdown="true" >
                                                   <template #items="slotProps" >
                                                       <div class="p-clearfix p-autocomplete-brand-item">
                                                          <div>
                                                               {{slotProps.firmaAdi}}
                                                          </div>
                                                       </div>
                                                   </template>
                                                   </AutoComplete>
                                                   <ValidationMessage v-if="$v.tedarikci.$error && !dis_urun_giris">**</ValidationMessage>
                                               </div>
                                               <div class="p-col p-lg-6">
                                                   <span class="">
                                                      <!--<input-currency :disAktif="dis_urun_giris" :value="alisFiyati" @input="siparis.alisFiyati = alisFiyati = $event"  />-->
                                                      
                                                      <MoneyInput 
                                                      @money_input_text_change="siparis.alisFiyati = $event"
                                                      :text_value="siparis.alisFiyati"
                                                      :disAktif="dis_urun_giris"
                                                      label="Alış Fiyatı ($)"
                                                      v-model='alis_Fiyati'
                                                      />
                                                   </span>
                                               </div>
                                               <div class="p-col p-lg-6">
                                                   <span class="p-float-label">
                                                       <!--<InputText :disabled="dis_urun_giris" id="alisFiyati_Tl" v-model="siparis.alisFiyati_TL" />-->
                                                     
                                                     <MoneyInput 
                                                      @money_input_text_change="siparis.alisFiyati_TL = $event"
                                                      :text_value="siparis.alisFiyati_TL"
                                                      :disAktif="dis_urun_giris"
                                                      label="Alış Fiyatı (TL)"
                                                      />
                                                   </span>
                                               </div>
                                               <div class="p-col p-lg-6">
                                                   <span class="p-float-label">
                                                       <!--<input-currency :disAktif="dis_urun_giris" :value="satisFiyati" @input="siparis.satisFiyati = satisFiyati = $event"  />-->
                                                         <MoneyInput 
                                                      @money_input_text_change="siparis.satisFiyati = $event"
                                                      :text_value="siparis.satisFiyati"
                                                      :disAktif="dis_urun_giris"
                                                      label="Satış Fiyati ($)"
                                                      />
                                                       
                                                   </span>
                                               </div>
                                           </div>
                                       </template>
                                   </Card>
                               </div>
                               <div class="p-col-12 p-md-12">
                                   <Button label="Özel İşçilik" v-if="!yeniSiparis" class="p-button-success p-button-rounded" 
                                   :disabled="dis_ozelIscilik" @click="ozelIscilikFormAc" />
                                    <Dialog :visible.sync="dialogIscilik" :style="{width: '500px;'}" header="Sipariş Ekstra Gider Girişi" :modal="true"  >
                                        <div class="p-cardialog-content" style="height: 500px;background-color:#f4f4f4; ">
                                            <iscilik :siparisNo="siparisNo" :urunKartId="siparis.urunKartId" />
                                        </div>
                                    </Dialog>

                               </div>
                               <div class="p-col-12 p-lg-12">
                                   <Card>
                                       <template slot="content">
                                           <div class="p-grid fluid siparisMiktar">
                                               <div class="p-col-4">
                                                   <AutoComplete :disabled="dis_urun_giris" @blur="$v.urunBirim.$touch()" v-model="urunBirim" :suggestions="filterUrunBirimList" @complete="aramaBirim($event)" 
                                                   field="birimAdi"  :dropdown="true" style="font-size:12px;">
                                                   <template #items="slotProps" >
                                                       <div class="p-clearfix p-autocomplete-brand-item">
                                                          <div class="siparisMiktar">
                                                               {{slotProps.birimAdi}}
                                                          </div>
                                                       </div>
                                                   </template>
                                                   </AutoComplete>
                                                   <ValidationMessage v-if="$v.urunBirim.$error && !dis_urun_giris">**</ValidationMessage>
                                               </div>
                                               <div class="p-col-2">
                                                   <span class="p-float-label">
                                                       <InputText :disabled="dis_urun_giris" @blur="$v.siparis.miktar.$touch()"    @input="miktar_input_event($event)" id="miktar" v-model="siparis.miktar" />
                                                       <label for="input">Miktar</label>
                                                   </span>
                                                   <ValidationMessage v-if="$v.siparis.miktar.$error && !dis_urun_giris">**</ValidationMessage>
                                               </div>
                                               <div class="p-col-2">
                                                   <span class="p-float-label">
                                                       <InputText :disabled="dis_urun_giris" id="kasaAdet" v-model="siparis.kasaAdet" />
                                                       <label for="input">Kasa</label>
                                                   </span>
                                               </div>
                                               <div class="p-col-2">
                                                   <span class="p-float-label">
                                                       <InputText v-text-center :disabled="dis_urun_giris" @blur="$v.siparis.siraNo.$touch()" id="siraNo" v-model="siparis.siraNo" />
                                                       <label for="input">Sıra</label>
                                                   </span>
                                                   <ValidationMessage v-if="$v.siparis.siraNo.$error && !dis_urun_giris">**</ValidationMessage>
                                               </div>
                                                <div class="p-col-2">
                                                   <span class="p-float-label">
                                                       <InputText :disabled="dis_urun_giris" id="ozelMiktar"   @input="ömiktar_input_event($event)" v-model="siparis.ozelMiktar" />
                                                       <label for="input">Ö.M2</label>
                                                   </span>
                                               </div>
                                               <div class="p-col-2" style="padding-top:7px;">
                                                   <span class="p-float-label">
                                                       <InputText :disabled="dis_urun_giris" id="ton"  @input="tmiktar_input_event($event)" v-model="siparis.ton" />
                                                       <label for="input">Ton</label>
                                                   </span>
                                               </div>

                                           </div>
                                       </template>
                                   </Card>
                               </div>
                           </div>
                           <div class="p-col-12 p-lg-8">
                               <div class="p-col-12 p-lg-12">
                               <Card>
                                   <template slot="content">
                                       <div class="p-grid fluid">
                                           <div class="p-col-6">
                                              <b-field label="EN - Açıklama"  labelPosition="on-border"> 
                                               <Textarea :disabled="dis_urun_giris" id="musteriAciklama" @blur="$v.siparis.musteriAciklama.$touch()" v-model="siparis.musteriAciklama" rows="7" cols="15" />
                                               <ValidationMessage v-show="$v.siparis.musteriAciklama.$error && !dis_urun_giris">* Zorunlu</ValidationMessage>
                                               </b-field>
                                           </div>
                                           
                                           <div class="p-col-6">
                                               <b-field label="TR - Açıklama"  labelPosition="on-border">   
                                                <Textarea :disabled="dis_urun_giris" id="uretimAciklama" @blur="$v.siparis.uretimAciklama.$touch()" v-model="siparis.uretimAciklama" rows="7" cols="15" />
                                                <ValidationMessage v-if="$v.siparis.uretimAciklama.$error && !dis_urun_giris">* Zorunlu</ValidationMessage>
                                                 </b-field>
                                           </div>
                                       </div>
                                   </template>
                               </Card>
                               </div>
                               <div class="p-col-12 p-lg-12">
                                <Card>
                                    <template slot="header">
                                        <div class="p-grid fluid">
                                            <div class="p-col-10">
                                                <span class="p-float-label">
                                                    <InputText :disabled="dis_urun_giris" id="not" v-model="not" type="text" />
                                                    <label for="input" >Not Ekle </label>
                                                </span>
                                            </div>
                                            <div class="p-col-2">
                                                <Button :disabled="dis_urun_giris" icon="pi pi-save" />
                                            </div>
                                            <div class="p-col-12" style="height:120px;">
                                                <Listbox :disabled="dis_urun_giris" v-model="selectNot" :options="siparis.notlar" optionLabel="not" />
                                            </div>
                                        </div>
                                    </template>
                                </Card>
                               </div>

                                 <div class="p-col-12 p-lg-12">
                               <Card>
                                   <template slot="content">
                                       <div class="p-grid">
                                           <div class="p-col-2">
                                               <Button :disabled="dis_yeni" @click="btn_yeni_click" class="p-button-rounded p-button-secondary" label="Yeni" icon="pi pi-file-o" iconPos="left" />
                                           </div>
                                           <div class="p-col-2">
                                               <Button :disabled="dis_iptal" @click="btn_iptal_click" label="İptal" class="p-button-rounded p-button-danger" icon="pi pi-times" iconPos="left"/>
                                           </div>
                                            <div class="p-col-2">
                                               <Button :disabled="dis_ekle" @click="btn_ekle_click" label="Ekle" class="p-button-rounded p-button-success"  icon="pi pi-plus" iconPos="left"  />
                                           </div>
                                         <div class="p-col-2">
                                               <Button :disabled="dis_degistir" @click="btn_degistir_click" class="p-button-rounded p-button-warning" label="Değiştir" icon="pi pi-refresh" iconPos="left"/>
                                         </div>
                                        <div class="p-col-2">
                                               <Button :disabled="dis_sil" @click="btn_sil_click" label="Sil" class="p-button-rounded"  style="background-color:yellow;color:black;" icon="pi pi-times-circle" iconPos="left" />
                                        </div>
                                        
                                       </div>
                                   </template>
                               </Card>
                           </div>
                           </div>
                           
                       </div>
                     
                       <div class="p-grid">
                           <div class="p-col-12 p-md-12">
                          
                             <DataTable class="p-datatable-responsive p-datatable-cars" :value.sync="siparisUrunler" style="font-size:60%;" :selection.sync="selectUrun"
                              dataKey="id" :filter="filters" :loading="siparisUrunLoading" selectionMode="single" @row-select="siparisUrunSec" >
                               <Column field="siraNo" header="S" headerStyle="width:60%;" bodyStyle="text-align:center">
                                    <template #body="slotProps" >
                                        {{slotProps.data.siraNo}}
                                    </template>
                               </Column>
                               <Column field="tedarikciAdi" header="Kimden" headerStyle="width:90%;">
                                    <template #body="slotProps" >
                                        {{slotProps.data.tedarikciAdi}}
                                    </template>
                               </Column>
                               <Column field="iscilik" header="İşçilik" headerStyle="width:70%;">
                                    <template #body="slotProps" >
                                        {{slotProps.data.iscilik}}
                                    </template>
                               </Column>
                               <Column field="urunAdi" header="Ürün Adı" headerStyle="width:120%">
                                    <template #body="slotProps" >
                                        {{slotProps.data.urunAdi}}
                                    </template>
                               </Column>
                               <Column field="en" header="E" headerStyle="width:85%;" bodyStyle="text-align:center">
                                    <template #body="slotProps" >
                                        {{slotProps.data.en}}
                                    </template>
                               </Column>
                               <Column field="boy" header="B" headerStyle="width:85%;" bodyStyle="text-align:center">
                                    <template #body="slotProps" >
                                        {{slotProps.data.boy}}
                                    </template>
                               </Column>
                               <Column field="kenar" header="K" headerStyle="width:80%;" bodyStyle="text-align:center">
                                    <template #body="slotProps" >
                                        {{slotProps.data.kenar}}
                                    </template>
                               </Column>
                               <Column field="yuzeyIslem" header="İşlem" headerStyle="width:190%">
                                    <template #body="slotProps" >
                                        {{slotProps.data.yuzeyIslem}}
                                    </template>
                               </Column>
                               <Column field="m2" header="M2" headerStyle="width:80%;" bodyStyle="text-align:center;">
                                    <template #body="slotProps" >
                                       <div style="text-align:center;"> {{slotProps.data.m2}}</div>
                                    </template>
                                    <template #footer >
                                        <div>{{toplam_m2 | toDecimal}}</div>
                                    </template>
                                  
                               </Column>
                               <Column field="adet" header="Adet" headerStyle="width:80%;" bodyStyle="text-align:center">
                                    <template #body="slotProps" >
                                        {{slotProps.data.adet | toDecimal}}
                                    </template>
                                     <template #footer >
                                        <div>{{toplam_adet | toDecimal}}</div>
                                    </template>
                               </Column>
                               <Column field="mt" header="Mt" headerStyle="width:80%;" bodyStyle="text-align:center">
                                    <template #body="slotProps" >
                                        {{slotProps.data.mt | toDecimal}}
                                    </template>
                                     <template #footer >
                                        <div>{{toplam_mt | toDecimal}}</div>
                                    </template>
                               </Column>
                               <Column field="ton" header="Ton" headerStyle="width:80%;" bodyStyle="text-align:center">
                                    <template #body="slotProps" >
                                        {{slotProps.data.ton}}
                                    </template>
                                     <template #footer >
                                        <div>{{toplam_ton | toDecimal}}</div>
                                    </template>
                               </Column>
                               <Column field="kasaAdet" header="Kasa"  headerStyle="width:80%;" bodyStyle="text-align:center">
                                    <template #body="slotProps" >
                                        {{slotProps.data.kasaAdet}}
                                    </template>
                                     <template #footer >
                                        <div>{{toplam_kasa | toDecimal}}</div>
                                    </template>
                               </Column>
                               <Column field="satisToplam" header="Tutar" headerStyle="width:110%" bodyStyle="text-align:center">
                                    <template #body="slotProps" >
                                        {{formatPrice(slotProps.data.satisToplam )}}
                                    </template>
                                     <template #footer >
                                        <div>{{formatPrice(toplam_tutar)}}</div>
                                    </template>
                               </Column>
                              
                             </DataTable>
                           </div>
                       </div>
                       </div>
                   </div>
                   
</template>

<script>
import TedarikciService from '../../../service/TedarikciService';
import UrunService from '../../../service/UrunService';
import store from '../../../store/store'
import UrunKartBilgi from './UrunKartBilgi';
//import CurrencyInput from '../../shared/CurrencyInput';
import { required } from 'vuelidate/lib/validators';
import Iscilik from './Iscilik';
import MoneyInput from '../../shared/MoneyInput'

import {eventListener} from '../../../main'

export default {

    components : {

         urunKartBilgi : UrunKartBilgi, 
         //inputCurrency : CurrencyInput,
         iscilik : Iscilik,
         MoneyInput,
        
         
    },
    methods: {
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return "$" +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
          sec(){
           
               
          },
          miktar_input_event(event){

            if(event) this.siparis.miktar = event.replace(',','.')
        },
         ömiktar_input_event(event){

            if(event) this.siparis.ozelMiktar = event.replace(',','.')
        },
        tmiktar_input_event(event){
            if(event) this.siparis.ton = event.replace(',','.')
        },
        tmiktar_topla() {
            
        },
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
             this.siparis.adet = 0;

             if(this.siparis.urunBirimId == 1) {
                 this.siparis.m2 = this.siparis.miktar;
                 this.siparis.urunbirimAdi = "M2" 
                 }
             if(this.siparis.urunBirimId == 2) {
                 this.siparis.adet = this.siparis.miktar;
                 this.siparis.urunbirimAdi = "Adet"
                 }
             if(this.siparis.urunBirimId == 3) 
                {
                 this.siparis.mt = this.siparis.miktar;
                 this.siparis.urunbirimAdi = "Mt"
                 }
             
             
                 

             this.siparis.miktar = this.siparis.miktar

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
            eventListener.$emit("sipBilgileri",this.siparisUrunler)
            
        },
        btn_degistir_click(){
            this.urunIslemleri()
            let index = this.indexBul(this.siparis.id,this.siparisUrunler)
            this.siparisUrunler[index] = this.siparis
            if(!this.yeniSiparis)this.degisen_urun_islem()
            this.dataSatirTopla(this.siparisUrunler)
            store.dispatch('tedarikci_als_fiyati_act',this.siparisUrunler)
            this.form_btn_reset()
            this.$toast.add({severity:'success', summary: 'Bilgi Ekranı', detail:'Ürün Değiştirildi', life: 3000});
            this.$emit('siparisUrunDegisim');
            eventListener.$emit('tedarikciler', this.siparisUrunler)
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

                this.toplam_m2 +=Number(liste[key].m2)
                this.toplam_mt += Number(liste[key].mt)
                this.toplam_adet += Number(liste[key].adet)
                this.toplam_ton += Number(liste[key].ton)
                
                if(liste[key].kasaAdet) this.toplam_kasa += Number(liste[key].kasaAdet) 
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
              alis_Fiyati:0,
              
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
        store.dispatch('tedarikci_als_fiyati_act',this.siparisUrunler)
       
         
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

    .cardTedarikci .p-inputtext{

       height : 20px;
       font-size : 5px;
    }
    .p-datatable{

        font-size: 11px;
    }
    .siparisMiktar{

        font-size: 10px;
    }
    .siparisMiktar input{

        font-size: 11px;
    }
    
</style>