<template>
    <div class="fluid">
        <Toast position="bottomright" />
        <div class="p-grid">
            <div class="p-col-12 p-lg-9">
                <TabView>
                    <TabPanel header="SİPARİŞ BİLGİLERİ">
                        <siparis-bilgileri :siparisUrunler="siparisUrunler" :siparisUrunLoading="siparisUrunLoading"
                            :urunModel="urunModel" :yeniSiparis="yeniSiparis" :urunler_yeni="urunler_yeni"
                            :urunler_degisenler="urunler_degisenler" :urunler_silinenler="urunler_silinenler"
                            :siparisNo="dtSiparisNo" @siparisBilgileriDegisim="kayitDurum = $event"
                            @siparisUrunDegisim="faturaBilgileriGuncelle" />
                    </TabPanel>
                    <TabPanel header="PROFORMA BİLGİLERİ">
                        <proforma-bilgileri :profData="profData" @proformaBilgileriDegisim="kayitDurum = $event"
                            @odemeTur="odemeTurDegisim($event)" @navlunDigerTutarDegisim="faturaBilgileriGuncelle"
                            :siparisNo="dtSiparisNo" :siparisUrunler="siparisUrunler" />
                    </TabPanel>
                    <TabPanel header="MASRAFLAR">
                        <masraflar :siparisNo="dtSiparisNo" :yeniSiparis="yeniSiparis" />
                    </TabPanel>
                    <TabPanel header="TEDARİKÇİLER">
                        <tedarikciler :siparisUrunler="siparisUrunler" :siparisNo="dtSiparisNo" />
                    </TabPanel>
                    <TabPanel header="EVRAKLAR">
                        <evraklar :siparisNo="dtSiparisNo" :siparisUrunler="siparisUrunler" />
                    </TabPanel>
                    <TabPanel header="ÇEKİ LİSTESİ">
                        <ceki-listesi :siparisNo="dtSiparisNo" :yeniSiparis="yeniSiparis" />
                    </TabPanel>
                    <TabPanel header="KALAN SİPARİŞ BİLGİSİ">
                        <gidecek-sip-bilgileri :selectOrderNo="dtSiparisNo"></gidecek-sip-bilgileri>
                    </TabPanel>
                    <TabPanel header=" CHAT">
                        <chat :siparisNo="dtSiparisNo" :yeniSiparis="yeniSiparis" />
                    </TabPanel>



                </TabView>
            </div>
            <div class="p-col-14 p-lg-3">
                <div class="p-grid">
                    <div class="p-col-12" style="justify-content: center;display:flex;">
                        <Button :disabled="kayitDurum" @click="siparisKaydet" label="KAYDET" class="kaydetButton"
                            icon="pi pi-save" style="width:200px;" />

                        <!--<Button  @click="siparisBol" label="Siparişi Böl" class="kaydetButton" icon="pi pi-save" style="width:200px;" />-->

                    </div>
                    <div class="p-col-12 p-lg-12">
                        <Card>
                            <template slot="subtitle">
                                <span style="text-decoration: underline;"> Sipariş Bilgileri</span>
                            </template>
                            <template slot="content">
                                <div class="p-grid" style="margin-top: 5%;">
                                    <div class="p-col-12">
                                        <b-field label="Order Numarası" labelPosition="on-border">
                                            <InputText style="width: 80%;" :disabled="!yeniSiparis"
                                                @blur="$v.siparis.siparisNo.$touch()" v-model="siparis.siparisNo" />
                                            <ValidationMessage v-if="$v.siparis.siparisNo.$error">* Zorunlun Alan
                                            </ValidationMessage>
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Sipariş Tarihi" labelPosition="on-border">
                                            <Calendar v-model="siparisTarihi" :disabled="!yeniSiparis"
                                                @blur="$v.siparis.siparisTarihi.$touch()" :value="siparis.siparisTarihi"
                                                :showIcon="true" dateFormat="dd/mm/yy"
                                                @date-select="siparisTarihiDegisim" />
                                            <ValidationMessage v-if="$v.siparis.siparisTarihi.$error">* Zorunlun Alan
                                            </ValidationMessage>
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Tahmini Yükleme" labelPosition="on-border">
                                            <Calendar v-model="TahminiyuklemeTarihi"
                                                @blur="$v.siparis.TahminiyuklemeTarihi.$touch()"
                                                :value="siparis.TahminiyuklemeTarihi" :showIcon="true"
                                                dateFormat="dd/mm/yy" @date-select="TahminiyuklemeTarihiDegisim" />
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Müşteri Adı" labelPosition="on-border">
                                            <AutoComplete :disabled="!yeniSiparis" v-model="musteri"
                                                :suggestions="filterMusteriList" @complete="aramaMusteri($event)"
                                                field="firmaAdi" placeholder="Müşteri" :dropdown="true"
                                                @item-select="musteriDegisim" @blur="$v.musteri.$touch()">
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.firmaAdi}}</div>
                                                    </div>
                                                </template>
                                            </AutoComplete>
                                            <ValidationMessage v-if="$v.musteri.$error">* Zorunlu Alan
                                            </ValidationMessage>
                                        </b-field>
                                    </div>
                                </div>
                            </template>
                        </Card>
                    </div>

                    <div class="p-col-12 p-lg-12">
                        <Card>
                            <template slot="content">
                                <div class="p-grid">
                                    <div class="p-col-12">
                                        <b-field label="Satış Temsilcisi" labelPosition="on-border">

                                            <AutoComplete v-model="kullanici" :suggestions="filterKullaniciList"
                                                @complete="aramaKullanici($event)" field="kullaniciAdi"
                                                placeholder="Satışçı" :dropdown="true" @blur="$v.kullanici.$touch()"
                                                @item-select="kullaniciDegisim">
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.kullaniciAdi}} </div>
                                                    </div>
                                                </template>
                                            </AutoComplete>

                                            <ValidationMessage v-if="$v.kullanici.$error">* Zorunlu Alan
                                            </ValidationMessage>

                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Operasyon Takibi" labelPosition="on-border">

                                            <AutoComplete v-model="kullaniciOp"
                                                :suggestions="filterOperasyonKullaniciList"
                                                @complete="aramaOperasyonKullanici($event)" field="kullaniciAdi"
                                                placeholder="Operasyon" :dropdown="true" @blur="$v.kullaniciOp.$touch()"
                                                @item-select="kullaniciOpDegisim">
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.kullaniciAdi}}</div>
                                                    </div>
                                                </template>
                                            </AutoComplete>

                                            <ValidationMessage v-if="$v.kullaniciOp.$error">* Zorunlu Alan
                                            </ValidationMessage>

                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Finans Sorumlusu" labelPosition="on-border">

                                            <AutoComplete v-model="kullaniciFinans"
                                                :suggestions="filterFinansmanKullaniciList"
                                                @complete="aramaFinansmanKullanici($event)" field="kullaniciAdi"
                                                placeholder="Finansman" :dropdown="true"
                                                @item-select="kullaniciFinansmanDegisim">
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.kullaniciAdi}}</div>
                                                    </div>
                                                </template>
                                            </AutoComplete>

                                        </b-field>
                                    </div>

                                </div>
                            </template>
                        </Card>
                    </div>
                    <div class="p-col-12 p-lg-12">
                        <Card>
                            <template slot="subtitle">
                                <span style="text-decoration: underline;">Fatura Bilgileri</span>
                            </template>
                            <template slot="content">
                                <div class="p-grid" style="margin-top:10px;">
                                    <div class="p-col-12">
                                        <b-field label="Toplam" labelPosition="on-border">
                                            <input-currency :disAktif="true" style="text-align:center;width: 80%;"
                                                :value="siparis.malBedeli" @input="siparis.malBedeli = $event" />
                                        </b-field>
                                    </div>

                                    <div class="p-col-12">
                                        <b-field label="Navlun" labelPosition="on-border">
                                            <input-currency :disAktif="true" style="text-align:center;width: 80%;"
                                                :value="siparis.navlunSatis" @input="siparis.navlunSatis = $event" />
                                        </b-field>
                                    </div>

                                    <div class="p-col-12">
                                        <b-field label="Diğer" labelPosition="on-border">
                                            <input-currency :disAktif="true" style="text-align:center;width: 80%;"
                                                :value="siparis.digerTutarToplam"
                                                @input="siparis.digerTutarToplam = $event" />
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Genel Toplam" labelPosition="on-border">
                                            <input-currency :disAktif="true" style="text-align:center;width: 80%;"
                                                :value="siparis.genelToplam" @input="siparis.genelToplam = $event" />
                                        </b-field>
                                    </div>

                                    <div class="p-col-12">
                                        <b-field label="Peşinat" labelPosition="on-border">
                                            <input-currency style="text-align:center;width: 80%;" :disAktif="disPesinat"
                                                :value="siparis.pesinat" @input="siparis.pesinat = $event" />
                                        </b-field>
                                    </div>


                                </div>
                            </template>
                        </Card>
                    </div>
                    <div class="p-col-12 p-lg-12">
                        <Card>
                            <template slot="subtitle">
                                <span style="text-decoration: underline;">Yükleme Detayları</span>
                            </template>
                            <template slot="content">
                                <div class="p-grid" style="margin-top:20px;">
                                    <div class="p-col-12">
                                        <b-field label="Yükleme Tarihi" labelPosition="on-border">
                                            <Calendar v-model="yuklemeTarihi" :showIcon="true" dateFormat="dd/mm/yy" />
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="ETA Tarihi" labelPosition="on-border">
                                            <Calendar v-model="eta" :showIcon="true" dateFormat="dd/mm/yy" />
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Konteyner No" labelPosition="on-border">
                                            <InputText style="text-align:left;width: 80%;"
                                                v-model="siparis.konteynerNo" />
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Fatura No" labelPosition="on-border">
                                            <InputText style="text-align:center;width: 80%;"
                                                v-model="siparis.siparisFaturaNo" />
                                        </b-field>
                                    </div>

                                </div>
                            </template>
                        </Card>
                    </div>
                    <div class="p-col-12 p-lg-12">
                        <Card>
                            <template slot="subtitle">
                                <span style="text-decoration: underline;">Maliyet Toplamları</span>
                            </template>
                            <template slot="content">
                                <div class="p-grid" style="margin-top:8%;">
                                    <div class="p-col-12">
                                        <b-field label="Üretici" labelPosition="on-border">
                                            <input-currency style="width: 80%;" :disAktif="true"
                                                :value="maliyet.uretici" @input="maliyet.uretici = $event" />
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Özel İşçilik" labelPosition="on-border">
                                            <input-currency style="width: 80%;" :disAktif="true"
                                                :value="maliyet.iscilik" @input="maliyet.iscilik = $event" />
                                        </b-field>
                                    </div>

                                    <div class="p-col-12">
                                        <b-field label="Navlun" labelPosition="on-border">
                                            <input-currency style="width: 80%;" :disAktif="true" :value="maliyet.navlun"
                                                @input="maliyet.navlun = $event" />
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Diğer" labelPosition="on-border">
                                            <input-currency style="width: 80%;" :disAktif="true"
                                                :value="maliyet.digerTutar" @input="maliyet.digerTutar = $event" />
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Komisyon" labelPosition="on-border">
                                            <input-currency style="width: 80%;" :disAktif="true"
                                                :value="maliyet.komisyon" @input="maliyet.komisyon = $event" />
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Mekus Masraflar" labelPosition="on-border">
                                            <input-currency style="width: 80%;" :disAktif="true"
                                                :value="maliyet.mekus_masraf" @input="maliyet.mekus_masraf = $event" />
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="FOB Masraflar" labelPosition="on-border">
                                            <input-currency style="width: 80%;" :disAktif="true"
                                                :value="maliyet.fobMasraf" @input="maliyet.fobMasraf = $event" />
                                        </b-field>
                                    </div>
                                    <div class="p-col-12">
                                        <b-field label="Toplam Masraflar" labelPosition="on-border">
                                            <input-currency :disAktif="true"
                                                style="color:red;width: 80%; font-weight: bold;"
                                                :value="maliyet.genelToplam" @input="maliyet.genelToplam = $event" />
                                        </b-field>
                                    </div>

                                    <div class="p-col-12">
                                        <b-field label="Profit (USD) " labelPosition="on-border">
                                            <input-currency :disAktif="true"
                                                style="color:green;width: 80%; font-weight: bold;"
                                                :value="siparis.genelToplam-maliyet.genelToplam" />
                                        </b-field>
                                    </div>


                                </div>
                            </template>
                        </Card>
                    </div>

                </div>
            </div>


        </div>
        <Dialog :visible.sync="isSipBolForm" :modal="true" :breakpoints="{'960px': '75vw', '640px': '100vw'}"
            :style="{width: '50vw'}">
            <siparisBolmeAlani :sipBilgiler="sipData" :isPesinat="isPesinat">


            </siparisBolmeAlani>
        </Dialog>


    </div>
</template>

<script>
import SiparisBilgileri from './siparisGiris/SiparisBilgileri';
import ProformaBilgileri from './siparisGiris/ProformaBilgileri';
import Masraflar from './siparisGiris/Masraflar';
import Tedarikciler from './siparisGiris/Tedarikciler';
import SiparisService from '../../service/SiparisService';
import MusteriService from '../../service/MusteriService';
import KullaniciService from '../../service/KullaniciService';
import LocalService from '../../service/LocalService';
import CekiListesi from './siparisGiris/CekiListesi';
import Evraklar from './siparisGiris/Evraklar';
import Chat from './siparisGiris/Chat';
import CurrencyInput2 from '../shared/CurrencyInput2';
import { required } from 'vuelidate/lib/validators';
import socket from '../../service/SocketService';
import { mapGetters } from 'vuex'
import store from '../../store/store';
import SiparisBolmeAlani from './siparisListeler/SiparisBolmeAlani.vue'
import GidecekSipBilgileriRaporuUretim from '../../views/raporlar/GidecekSipBilgileriRaporuUretim.vue'
export default {
    data () {

         return {
            sipData:null,
            isSipBolForm:false,
            isYeniSiparisForm : false,
            siparisFormBaslik : '',
            dialogVisible : false,
            yeniSiparis2 : true,
            siparisTarihi : null,
            TahminiyuklemeTarihi : null,
            yuklemeTarihi : null,
            eta : null,
            musteri : null,
            musteriList : null,
            filterMusteriList : null,
            kullanici : null,
             kullaniciOp : null,
             kullaniciFinans : null,
            kullaniciList : null,
            OperasyonkullaniciList : null,
            FinansmankullaniciList : null,
            filterKullaniciList : null,
            filterOperasyonKullaniciList : null,
            filterFinansmanKullaniciList : null,
            siparis : null,
            siparisUrunler : {},
            siparisUrunLoading : true,
            disPesinat : true,
            urunModel : null,
            urunler_yeni : [],
            urunler_degisenler: [],
            urunler_silinenler : [],
            kayitDurum : true,
            maliyet : {
                fobMasraf : 0,
                uretici : 0,
                navlun : 0,
                komisyon : 0,
                digerTutar : 0,
                genelToplam : 0,
                iscilik : 0,
                mekus_masraf : 0

            },
            localMasraflar : null,
            profData : {

            },
            isPesinat:true,
            
         }
    },
    props : {

        dtSiparisNo : {

             type : String,
             required : false,            
             default : ""
        },
        yeniSiparis : {
            type : Boolean,
            default : true
        }
    },
    computed : {

        ...mapGetters([
           
           
            'kayit_kontrol_degeri'
           
       ])
     },
    validations : {

        profData :{
            teslimTurId : {required},
            odemeTurId :{required},
            ulkeId : {required},
            faturaKesimTurId : {required}
        },
        musteri : {required},
        kullanici : {required},
        kullaniciOp : {required},
      
        siparis : {

            siparisNo : {required},
            siparisTarihi : {required},
            
        }
    },
    watch:{
        kayit_kontrol_degeri:function(){
            
            this.kayitDurum = this.kayit_kontrol_degeri

            
            
        }
    },
    components :{
        siparisBolmeAlani : SiparisBolmeAlani,
        siparisBilgileri : SiparisBilgileri,
        proformaBilgileri : ProformaBilgileri,
        masraflar : Masraflar,
        tedarikciler : Tedarikciler,
        cekiListesi: CekiListesi,
        inputCurrency : CurrencyInput2,
        evraklar : Evraklar,
        chat: Chat,
        gidecekSipBilgileri: GidecekSipBilgileriRaporuUretim,
      
      
      
    },
    siparisService : null,
    musteriService : null,
    kullaniciService : null,
    localService : null,
    methods : {
        siparisBol(){
            this.isSipBolForm = true
            if(this.sipData.siparis.pesinat>0){
                this.isPesinat = false
            }
        },
        aramaMusteri(event){

            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.musteriList];

                 }
                 else {

                     result = this.musteriList.filter((ted) => {
                        
                         return ted.firmaAdi.toLowerCase().startsWith(event.query.toLowerCase())
                     })
                 }

                 this.filterMusteriList = result;
            },250)
        },
        aramaKullanici(event){

            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.kullaniciList];

                 }
                 else {

                     result = this.kullaniciList.filter((ted) => {
                        
                         return ted.kullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase())
                     })

                      
                 } 

                 this.filterKullaniciList = result;
            },250)
        },
        aramaOperasyonKullanici(event){

            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.OperasyonkullaniciList];

                 }
                 else {

                     result = this.OperasyonkullaniciList.filter((ted) => {
                        
                         return ted.kullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase())
                     })

                      
                 } 

                 this.filterOperasyonKullaniciList = result;
            },250)
        },
        aramaFinansmanKullanici(event){

            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.FinansmankullaniciList];

                 }
                 else {

                     result = this.FinansmankullaniciList.filter((ted) => {
                        
                         return ted.kullaniciAdi.toLowerCase().startsWith(event.query.toLowerCase())
                     })

                      
                 } 

                 this.filterFinansmanKullaniciList = result;
            },250)
        },
        siparisTarihiDegisim(){
            
            this.siparis.siparisTarihi = this.localService.getDateString(this.siparisTarihi)
            

        },
        TahminiyuklemeTarihiDegisim(){
            
            this.siparis.TahminiyuklemeTarihi = this.localService.getDateString(this.TahminiyuklemeTarihi)
            this.kayitDurum = false
        },
        faturaBilgileriGuncelle(){

            //ürün toplamı alma
            this.siparis.malBedeli = 0;

            for (let key in this.siparisUrunler){

                this.siparis.malBedeli += this.siparisUrunler[key].satisToplam;
            }

            this.siparis.digerTutarToplam = this.siparis.detayTutar_1 + this.siparis.detayTutar_2 + this.siparis.detayTutar_3;

            this.siparis.genelToplam = this.siparis.malBedeli + this.siparis.navlunSatis + this.siparis.digerTutarToplam;

           

            this.maliyetYenile();
        },
       
       siparisKaydet(){
           if (this.kayitDurum != true){
               this.kayitDurum = true
                store.dispatch("kayit_kontrol_degeri_act",true)
                this.$v.$touch();
                    
                if(this.$v.$invalid){
                    this.$toast.add({severity:'error', summary: 'Uyarı Ekranı', detail:'Zorunlu Alanlar Eklenmeli',  life: 3000});
                    
                    return;
                }
                
                if(this.yeniSiparis)this.yeniSiparisKayit();
                else this.siparisGuncelleme();
           }else{
               this.$toast.add({severity:'error',summary:'Uyarı Ekranı',detail:'Sipariş iki kez kaydedilemez'})
           }
           
            
       },
       yeniSiparisKayit(){
           const username = (this.$store.getters.getUser).toUpperCase();
            const username2 = (this.$store.getters.getUser).toLowerCase();
            this.ad = username[0]+username2.substring(1)
       
           this.siparis.kayit_kisi =  this.ad
         
           this.siparis.siparisDurumId = 2;
           if(this.siparis.odemeTurId == 1 || this.siparis.odemeTurId == 2) this.siparis.siparisDurumId = 1;

           const siparisVeri = {

               siparis : this.siparis,
               siparisUrunler : this.siparisUrunler
           }
           this.kayitDurum = true
           this.siparisService.setSiparisKaydet(siparisVeri)
           .then(data => {
              
               if(data.status == true){

                   this.$toast.add({severity:'success', summary: 'Bilgi Ekranı', detail:'Sipariş Kaydı Tamamlandı.',  life: 5000});
                   this.kayitDurum = true;
                   socket.siparis.emit('siparis_yeni_event',this.siparis.siparisNo);
                   this.yeniSiparis = false;
                   this.kayitDurum = false
                   socket.siparis.emit('anaSayfaDegisiklikEvent', data.anaSayfaDegisiklikList)
                   return;
               }
               else {

                   this.$toast.add({severity:'error', summary: 'Bilgi Ekranı', detail:'Sipariş Kaydı Yapılamadı. Tekrar Deneyiniz',  life: 5000});
                   this.kayitDurum = false
               }
                
           })
           
       },
       siparisGuncelleme(){
           
        const username = (this.$store.getters.getUser).toUpperCase();
		const username2 = (this.$store.getters.getUser).toLowerCase();
		this.ad = username[0]+username2.substring(1)
           this.siparis.kayit_kisi =  this.ad
         
           
           const siparisVeri = {

               siparis : this.siparis,
               urunlerYeni : this.urunler_yeni,
               urunlerDegisenler : this.urunler_degisenler,
               urunlerSilinenler : this.urunler_silinenler
           }

           this.siparisService.setSiparisGuncelle(siparisVeri)
           .then(data => {
               if(data.status == true){
                   this.$toast.add({severity:'success', summary: 'Bilgi Ekranı', detail:'Sipariş Değişiklikleri Yapıldı.',  life: 5000});
                   this.urunler_yeni = [];
                   this.kayitDurum = true;
                   let siparisDurum = ''
                   if (this.siparis.siparisDurumId == 1) siparisDurum = 'bekleyen';
                   if (this.siparis.siparisDurumId == 2) siparisDurum = 'üretim';
                   if (this.siparis.siparisDurumId == 3) siparisDurum = 'sevk';
                   socket.siparis.emit('siparis_guncelleme_event',{siparisNo : this.siparis.siparisNo,siparisTur:siparisDurum});
                   socket.siparis.emit('anaSayfaDegisiklikEvent', data.anaSayfaDegisiklikList)
                  
               }
               else {

                   this.$toast.add({severity:'error', summary: 'Bilgi Ekranı', detail:'Sipariş Değişiklik Kaydı Yapılamadı. Tekrar Deneyiniz',  life: 5000});
               }
           })
       },
       odemeTurDegisim(event){
           const username = (this.$store.getters.getUser).toLowerCase();
           
           this.disPesinat = true;
           if(event == 1) this.siparis.pesinat = this.siparis.genelToplam;
           if(event == 2){
               if (username =='huseyin'){
                   this.disPesinat = false;
               }
               
           }
       },
       musteriDegisim(){

           if(this.musteri){

               this.siparis.musteriId = this.musteri.id;
           }
       },
       kullaniciDegisim(){

           if(this.kullanici){

               this.siparis.siparisSahibi = this.kullanici.id;
               this.kayitDurum = false
               this.siparis.opChange = true
           }
       },
      kullaniciOpDegisim(){

           if(this.kullaniciOp){

               this.siparis.operasyon = this.kullaniciOp.id;
               this.kayitDurum = false;
               this.siparis.opChange = true
                
          }
       },
        kullaniciFinansmanDegisim(){

           if(this.kullaniciFinans){

               this.siparis.finansman = this.kullaniciFinans.id;
               this.kayitDurum = false
                
          }
       },
       maliyetYenile(){

           this.maliyet.fobMasraf = 0;
           this.maliyet.uretici = 0;
           this.maliyet.iscilik = this.siparis.iscilikTutar;
         
           //local masraflar
           for(let key in this.localMasraflar){

               this.maliyet.fobMasraf += this.localMasraflar[key].tutar;
           }

           //ürünler
           for(let key in this.siparisUrunler){

               let data = this.siparisUrunler[key];

               this.maliyet.uretici += (data.alisFiyati * data.miktar);
           }

           this.maliyet.navlun = this.siparis.navlunAlis;
           this.maliyet.komisyon = this.siparis.komisyon;
           this.maliyet.digerTutar = this.siparis.detayAlis_1 + this.siparis.detayAlis_2 + this.siparis.detayAlis_3;
           this.maliyet.mekus_masraf = this.siparis.mekus_masraf
           this.maliyet.genelToplam = this.maliyet.fobMasraf + this.maliyet.uretici + this.maliyet.navlun + this.maliyet.digerTutar + this.maliyet.iscilik +this.maliyet.mekus_masraf ;

       },
       musteriListYukle(){
            this.musteriService.getMusteriList().then(data => {

            this.musteriList = data
            
             this.musteri = data.find(x=>x.id == this.siparis.musteriId)
        });
       },
       kullaniciListYukle(){

            
        this.kullaniciService.getKullaniciList().then(data => {

            this.kullaniciList = data

            this.kullanici = data.find(x=>x.id == this.siparis.siparisSahibi)
            this.kullaniciOp = data.find(x=>x.id == this.siparis.operasyon)
            
           
             
        } )
      
       this.kullaniciService.getOperasyonKullaniciList().then(data => {

            this.OperasyonkullaniciList = data

            this.FinansmankullaniciList = data
            this.kullaniciFinans = data.find(x=>x.id == this.siparis.finansman)
            this.kullaniciOp = data.find(x=>x.id == this.siparis.operasyon)
            
        } )
       }
         
    },
    created(){ 

        this.siparisService = new SiparisService()
        this.musteriService = new MusteriService()
        this.kullaniciService = new KullaniciService()
        this.localService = new LocalService()
        
        
    },
    mounted(){
       
        socket.siparis.on('siparis_iscilik_emit',data => {

            this.siparis.iscilikTutar = data.iscilikToplam;
           
        })
        
         if(!this.yeniSiparis){ 
              
              this.siparisService.getSiparis(this.dtSiparisNo).then(data => {


                 this.sipData = data
                 this.siparis = data.siparis;
                 this.kullaniciListYukle();
                 this.musteriListYukle();



                
                 this.siparisUrunler = data.siparisUrunler;
                 this.profData = data.siparis;
                 this.urunModel = data.urunModel;
                 this.siparisUrunLoading = false;
               
                 this.siparisTarihi = this.localService.getStringDate(this.siparis.siparisTarihi);
                 const d = new Date(this.siparis.TahminiyuklemeTarihi)   
                var year = d.getFullYear();
               
                if(year <="1900"){
                  
                    this.TahminiyuklemeTarihi = null;
                }else{
                    
                    this.TahminiyuklemeTarihi = this.localService.getStringDate(this.siparis.TahminiyuklemeTarihi);
                }

                //
                const d2 = new Date(this.siparis.eta)
                var year2 = d2.getFullYear();
                if(this.siparis.siparisDurumId == 3){
                     this.yuklemeTarihi = this.localService.getStringDate(this.siparis.yuklemeTarihi)


                     
                 }

                if(year2<="1900"){
                    this.eta = null;
                }else{
                    
                 if(this.siparis.eta.length > 0) {
                     this.eta = this.localService.getStringDate(this.siparis.eta)
                 }
                }
                

                 /*if(this.siparis.siparisDurumId == 3){
                     this.yuklemeTarihi = this.localService.getStringDate(this.siparis.yuklemeTarihi)
                 }

                 if(this.siparis.eta.length > 0) {
                     this.eta = this.localService.getStringDate(this.siparis.eta)
                 }*/
                 
                  this.siparisService.getMasrafListesi(this.dtSiparisNo)
                .then(data => {
               
                this.localMasraflar = data.filter(x => x.tur !='Navlun')
                this.localMasraflar = this.localMasraflar.filter(x => x.tur !='Özel İşçilik')
                this.maliyetYenile();
             })

                 this.siparisUrunLoading = false;

                 
             })

            

            
         }
         else {

              this.siparisService.getSiparisModel().then(data =>{
                 this.siparis = data.siparis;
                
                 this.kullaniciListYukle();
                 this.musteriListYukle();
                 this.maliyetYenile();
                 this.siparisUrunler = data.siparisUrunler;
                 this.profData = data.siparis;
                 this.siparisUrunLoading = false;  
                 this.urunModel = data.urunModel;
                 
               
             })
         }
    }
}
</script>
<style scoped>
  .p-float-label{

      font-size: 8px;
  }
    .kaydetButton{
        background-color: #347062;
        border-radius:15px;
        transition:all 1.1s 0s linear;
    }
    

</style>