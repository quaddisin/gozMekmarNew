<template>
    <section>
        <b-loading :is-full-page="true" v-model:active.sync="getLoadStatus" :can-cancel="true"></b-loading>
        <div class="columns is-multiline ">
            <Dialog :visible="isDisplay">
                <template #header>
                    <h3>Üretim Fazlası Dikkat !</h3>
                </template>

                Üretim Fazlası Mevcut
                Yinede Kaydetmek Ister misiniz?

                <template #footer>
                    <Button @click="isfazlaMiKayit" label="No" icon="pi pi-times" class="p-button-text" />
                    <Button @click="fazlaKayit" label="Yes" icon="pi pi-check" autofocus />
                </template>
            </Dialog>

            <Dialog :visible="isDisplay2" :modal="true">
                <template #header>
                    <h3>Ürün bilgileri eşleşmiyor</h3>
                </template>

                Yinede Kaydetmek Ister misiniz?

                <template #footer>
                    <Button @click="isEslesmiyor" label="No" icon="pi pi-times" class="p-button-text" />
                    <Button @click="isYinedeKaydet" label="Yes" icon="pi pi-check" autofocus />
                </template>
            </Dialog>
            <div class="column is-4">
                <div class="box">
                    <div class="columns is-multiline">
                        <div class="column is-12">
                            <b-field>
                                <b-select :disabled="slk_form" @input="kayitTurDegisim($event)" v-model="kayit_tur"
                                    expanded size="is-small" placeholder="Kayıt Tur Seç">
                                    <option>Stok</option>
                                    <option>Sipariş</option>
                                </b-select>
                            </b-field>
                        </div>
                        <div class="column is-12">
                            <b-field>
                                <b-autocomplete field="name" v-model="siparis" :data="filterSiparisList"
                                    @select="option => selected = option" @input="siparisSecim"
                                    placeholder="Sipariş Seç" size="is-small" :disabled="slk_form">
                                    <template v-slot="props">
                                        {{props.option.name}}
                                    </template>
                                </b-autocomplete>
                            </b-field>
                        </div>
                        <div class="column is-12">
                            <b-field>
                                <b-select @input="siparisDetayDegisim" v-model="siparis_detay" expanded size="is-small"
                                    placeholder="Sipariş Detay Seç" :disabled="dis_siparis_detay">
                                    <option v-for="item in seleksiyon_siparisdetay" :key="item.id">{{item.tanim}}
                                    </option>
                                </b-select>
                            </b-field>
                        </div>
                        <div class="column is-12">
                            <b-field label="Sipariş Ürün Kart" label-position="on-border">
                                <b-input disabled v-model="detail.tanim" />
                            </b-field>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="columns is-multiline">
                        <div class="column is-8">
                            <b-field>
                                <b-input v-if="detail.urunkartid" size="is-small" v-model="detail.urunkartid"
                                    :disabled="slk_form" @input="urunkart_change_event($event)" />
                            </b-field>
                        </div>
                        <div class="column is-4">
                            <b-button expanded class="" @click="urunKartShow" size="is-small" type="is-success"
                                :disabled="slk_form">Seç </b-button>
                        </div>
                        <div class="column is-6">
                            <b-field label="Kasa No" label-position="on-border">
                                <b-input size="is-small" v-model="detail.kasano" :disabled="slk_form"
                                    @focus="$event.target.select()" @click="$event.target.select()" />
                            </b-field>
                        </div>
                        <div class="column is-6">
                            <b-field>
                                <b-autocomplete field="name" v-model="ocak" :data="filterOcakList"
                                    @select="option => selected = option" placeholder="Ocak Seç" size="is-small"
                                    :disabled="slk_form">
                                    <template v-slot="props">
                                        {{props.option.name}}
                                    </template>
                                </b-autocomplete>
                            </b-field>
                        </div>
                        <div class="column is-6">
                            <b-field label="Düzenleyen" label-position="on-border">
                                <b-input size="is-small" v-model="detail.duzenleyen" :disabled="slk_form" />
                            </b-field>
                        </div>
                        <div class="column is-6">
                            <b-field label="Kasalayan" label-position="on-border">
                                <b-input size="is-small" v-model="detail.kasalayan" :disabled="slk_form" />
                            </b-field>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-4">
                <div class="box">
                    <div class="columns is-multiline">
                        <div class="column is-12">
                            <b-field label-position="on-border" label="Tedarikçi">
                                <b-autocomplete field="name" v-model="tedarikci" :data="filterTedarikciList"
                                    @select="option => selected = option" @input="tedarikciSecim"
                                    placeholder="Tedarikçi Seç" size="is-small" :disabled="slk_form">
                                    <template v-slot="props">
                                        {{props.option.name}}
                                    </template>
                                </b-autocomplete>
                            </b-field>
                        </div>
                        <div class="column is-12">
                            <b-field label="Tarih" label-position="on-border">
                                <b-datepicker :show-week-number="false" placeholder="Click to select..."
                                    icon="calendar-today" size="is-small" v-model="tarih" :disabled="slk_form"
                                    trap-focus>
                                </b-datepicker>
                            </b-field>
                        </div>
                        <div class="column is-12">
                            <b-field label-position="on-border" label="Birim">
                                <div class="columns is-multiline is-centered">
                                    <div v-for="item in seleksiyon_urunbirimlist" :key="item.id" class="column is-2">
                                        <b-radio name="name" :native-value="item.id" v-model="urunbirim"
                                            @input="urunbirim_degisim">
                                            {{item.name}}
                                        </b-radio>
                                    </div>
                                </div>
                                <!--<b-autocomplete
                                field="name"
                                v-model="urunbirim"
                                :data="filterUrunBirimList"
                                @select="option => selected = option"
                                @input="urunBirimSecim"
                                placeholder="Ürün Birim Seç"
                                size="is-small"
                                :disabled="slk_form"
                              >
                                <template slot-scope="props">
                                    {{props.option.name}}
                                </template>
                              </b-autocomplete>-->
                            </b-field>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="columns is-multiline">
                        <div class="column is-4">
                            <b-field label="Kutu Sayısı" label-position="on-border">
                                <b-input size="is-small" v-model="detail.kutuadet" :disabled="slk_form"
                                    @focus="$event.target.select()" @click="$event.target.select()"
                                    @input="toplam_adet_hesapla" />
                            </b-field>
                        </div>
                        <div class="column is-4">
                            <b-field label="Kutu İçi Adet" label-position="on-border">
                                <b-input size="is-small" v-model="detail.kutuiciadet" :disabled="slk_form"
                                    @focus="$event.target.select()" @click="$event.target.select()"
                                    @input="toplam_adet_hesapla" />
                            </b-field>
                        </div>
                        <div class="column is-4">
                            <b-field label="Toplam Adet" label-position="on-border">
                                <b-input size="is-small" v-model="detail.adet" :disabled="slk_form"
                                    @input="m2_hesaplama" @focus="$event.target.select()"
                                    @click="$event.target.select()" />
                            </b-field>
                        </div>
                        <div class="column is-4">
                            <b-field label="Sipariş Miktarı" label-position="on-border" type="is-warning">
                                <b-input @focus="$event.target.select()" @click="$event.target.select()"
                                    @input="miktar_input_event($event)" size="is-small" v-model="detail.miktar"
                                    :disabled="isInputValue" />
                            </b-field>
                        </div>
                        <div class="column is-4">
                            <b-field label="SQM" label-position="on-border">
                                <b-input @focus="$event.target.select()" @click="$event.target.select()"
                                    @input="sqm_input_event($event)" size="is-small" v-model="detail.sqm_miktar"
                                    :disabled="slk_form" />
                            </b-field>
                        </div>
                        <div class="column is-4">
                            <b-field label="Kasa" label-position="on-border">
                                <b-input size="is-small" v-model="kasaadet" :disabled="slk_form"
                                    @focus="$event.target.select()" @click="$event.target.select()" />
                            </b-field>
                        </div>

                        <div class="column is-3">
                            <b-field>
                                <b-checkbox size="is-small" v-model="detail.kutu" :disabled="slk_form">Kutu</b-checkbox>
                            </b-field>
                        </div>
                        <div class="column is-3">
                            <b-field>
                                <b-checkbox size="is-small" v-model="detail.bagli" :disabled="slk_form">Bağlı
                                </b-checkbox>
                            </b-field>
                        </div>
                        <div class="column is-3">
                            <b-field>
                                <b-checkbox size="is-small" v-model="detail.disarda" :disabled="slk_form">Dışarıda
                                </b-checkbox>
                            </b-field>
                        </div>

                        <div class="column is-12">
                            <b-field label="Notlar" label-position="on-border" type="is-danger"
                                message="Doldurmayı unutmayınız!">
                                <b-input class="p-invalid" size="is-small" v-model="notlar" :disabled="slk_form" />
                            </b-field>
                        </div>
                    </div>
                </div>
            </div>
            <div class="column is-4">
                <div class="box">
                    <div class="columns is-multiline">
                        <div class="column is-6">
                            <b-field label-position="on-border" label="Kategori">
                                <b-input size="is-small" :disabled="true" v-model="detail.kategoriadi" />
                            </b-field>
                        </div>
                        <div class="column is-6">
                            <b-field label-position="on-border" label="Ürün Adı">
                                <b-input size="is-small" :disabled="true" v-model="detail.urunadi" />
                            </b-field>
                        </div>
                        <div class="column is-6">
                            <b-field label-position="on-border" label="Ebat">
                                <b-input size="is-small" :disabled="true" v-model="detail.ebat" />
                            </b-field>
                        </div>
                        <div class="column is-6">
                            <b-field label-position="on-border" label="Kenar İşlem">
                                <b-input size="is-small" :disabled="true" v-model="detail.kenarislem" />
                            </b-field>
                        </div>
                    </div>
                </div>
                <div class="box">
                    <div class="columns">
                        <div class="column is-12">
                            <b-table :data="seleksiyon_uretimozetlist" :columns="columns" :bordered="true">
                                <template #footer>
                                    <div class="columns is-multiline">
                                        <div id="gun" class="column is-3">
                                            <span>{{toplam_gun | toDecimal}}</span>
                                        </div>
                                        <div id="ay" class="column is-3">
                                            <span>{{toplam_ay | toDecimal}}</span>
                                        </div>
                                        <div id="yil" class="column is-3">
                                            <span>{{toplam_yil | toDecimal}}</span>
                                        </div>
                                    </div>
                                </template>
                            </b-table>
                        </div>
                    </div>
                    <div class="column is-3" style="margin-left:300px;">

                        <span>BULUNAMADI</span>
                        <InputSwitch v-model="detail.bulunamayan" style="margin-left:25px;" />
                    </div>
                </div>
            </div>
        </div>
        <div class="columns is-multiline ">
            <div class="column is-12">
                <div class="box">
                    <div class="columns is-multiline is-centered">
                        <div class="column is-2">
                            <b-button :disabled="slk_dis_yeni_btn" @click="btn_yeni_click" icon-pack="far"
                                icon-left="file" expanded>
                                Yeni
                            </b-button>
                        </div>
                        <div class="column is-2">
                            <b-button :disabled="slk_dis_vazgec_btn" @click="btn_vazgec_click" icon-pack="far"
                                icon-left="window-close" expanded type="is-warning">
                                Vazgeç
                            </b-button>
                        </div>
                        <div class="column is-2">
                            <b-button :disabled="slk_dis_kaydet_btn" @click="btn_kaydet_click" icon-pack="fas"
                                icon-left="save" expanded type="is-success">
                                Kaydet
                            </b-button>
                        </div>
                        <div class="column is-2">
                            <b-button :disabled="slk_dis_guncelle_btn" @click="btn_guncelle_click" icon-pack="far"
                                icon-left="share-square" expanded type="is-link">
                                Güncelle
                            </b-button>
                        </div>
                        <div class="column is-2">
                            <b-button :disabled="slk_dis_sil_btn" @click="btn_sil_click" icon-pack="fas"
                                icon-left="window-close" expanded type="is-danger">
                                Sil
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <UrunKartMenu :is_seleksiyon="true" @urunKartSelect="urunkart_change_event($event)" />

    </section>
</template>
<script>
import { mapGetters } from 'vuex'
import service from '../../service/SeleksiyonService'
import LocalService from '../../service/LocalService'
import UrunKartMenu from '../../components/shared/UrunKartMenu'
import socket from '../../service/SocketService';
import SiparisService from '../../service/SiparisService'
export default {
    filters:{
        toDecimal: function (value){
            if (!value) { return value }

            return parseFloat(value).toFixed(2) 
        }
    },
    components : {

        UrunKartMenu,
    },
    data(){

        return {
            notlar:'',
            isProductNew:false,
            isDisplay2:false,
            turlist : [
                {name : 'Stok', id : 1},
                {name : 'Sipariş',id: 2}
            ],
            select_tur : null,
            siparis : '',
            ocak : '',
            tedarikci : '',
            siparisdetaylist : null,
            siparis_detay : '',
            kayit_tur : null,
            dis_siparis_list : true,
            dis_siparis_detay : true,
            urunbirim : null,
            isDisplay:false,
            en:"",
            boy:"",
            fazlamiData: null,
            columns : [

                {
                    field : 'tanim',
                    label : 'Üretici'

                },
                {
                    field : 'gun',
                    label : 'Bugün',
                    numeric : true,
                    centered : true
                },
                {
                    field : 'ay',
                    label : 'Ay',
                    numeric : true,
                    centered : true
                },
                {
                    field : 'yil',
                    label : 'Yıl',
                    numeric : true,
                    centered : true
                }
            ],
            toplam_gun : 0,
            toplam_ay : 0,
            toplam_yil : 0,
            detail : null,
            kasaadet : 1,
            tarih : null,
            seleksiyon_siparisdetay : null,
            isInputValue:false
        }
    },
    
    localService : null,
    siparisService : null,
    props : ['kasano','kayitstatu'], 
    created(){
        this.localService = new LocalService()
        this.siparisService = new SiparisService()
        if(!this.kayitstatu){

            
            service.getUrunDetay(this.kasano).then(data => {
                
                this.detail = data 
                
                this.dis_siparis_list = true
                this.dis_siparis_detay = false              
                const kayittur = this.detail.kayit_tur
                this.kayit_tur = (kayittur == 'Sipariş' || kayittur == 'Stok') ? kayittur : 'Stok'
               
                //sipariş bilgilerini getirilmesi
                if(this.kayit_tur == 'Sipariş'){

                    this.dis_siparis_list = false 
                    this.siparis = this.detail.siparisaciklama
                    this.dis_siparis_detay = false
                    
                }

                //tedarikçi seçimi
                this.tedarikci = this.seleksiyon_tedarikcilist.find(x=>x.id == this.detail.tedarikciid).name
                // ürün birim seçimi 
                this.urunbirim = this.detail.urunbirimid //this.seleksiyon_urunbirimlist.find(x=> x.id == this.detail.urunbirimid).name
                 // tarih bilgisinin alınması                
                this.tarih = this.localService.getStringDate(this.detail.tarih)
                //ürün ocak yüklemesi
                this.ocak = this.seleksiyon_ocaklist.find(x=>x.id == this.detail.urunocakid).name
                //ürün türünün seçilmesi
                this.kayit_tur = this.detail.uretimturid == 1 ? 'Stok' : 'Sipariş'
                this.notlar = this.detail.aciklama
                //sipariş ayrıntı bilgilerinin yüklenmesi
                if(this.kayit_tur == 'Sipariş'){
                    this.dis_siparis_list = false
                    this.siparis = this.detail.siparisaciklama
                    this.siparisSecim()
                    //sipariş kalem listesi
                    const selectSiparisDetay = this.seleksiyon_siparisdetaylist.filter(x=>x.siparisno == this.siparis)
                    this.siparis_detay = selectSiparisDetay.find(x=>x.urunkart_id == this.detail.urunkartid).tanim
                    

                    //this.siparis_detay = this.detail.sipariskart.tanim 
                    
                }
                
                
                
            })
        }
        else {

            if(this.kayitstatu){

                service.getUrunDetayModel().then(data => {

                    this.detail = data
                    
                })
            }
        }

        for(let key in this.seleksiyon_uretimozetlist){

            const item = this.seleksiyon_uretimozetlist[key]

            this.toplam_gun += item.gun 
            this.toplam_ay += item.ay 
            this.toplam_yil += item.yil 
        }
    },   
    computed : {

        ...mapGetters([ 
            'seleksiyon_siparislist',
            'seleksiyon_siparisdetaylist',      
            'seleksiyon_ocaklist',
            'seleksiyon_tedarikcilist',
            'seleksiyon_urunbirimlist',
            'seleksiyon_uretimozetlist',
             'slk_dis_yeni_btn',
            'slk_dis_kaydet_btn',
            'slk_dis_vazgec_btn',
            'slk_dis_guncelle_btn',
            'slk_dis_sil_btn',
            'slk_enb_mekmar',
            'slk_form',
            'getUrunKartMenuList',
            'select_seleksiyon_kart',
            'getLoadStatus'
        ]),
        
        filterSiparisList(){

            return this.seleksiyon_siparislist.filter((option) => {
                
                return option.name
                .toString()
                .toLowerCase()
                .indexOf(this.siparis.toLowerCase()) >= 0
            })
        },
          filterOcakList(){

            return this.seleksiyon_ocaklist.filter((option) => {
                
                return option.name
                .toString()
                .toLowerCase()
                .indexOf(this.ocak.toLowerCase()) >= 0
            })
        },
        filterTedarikciList(){

            return this.seleksiyon_tedarikcilist.filter((option) => {
                
                return option.name
                .toString()
                .toLowerCase()
                .indexOf(this.tedarikci.toLowerCase()) >= 0
            })
        },
        filterUrunBirimList(){

            return this.seleksiyon_urunbirimlist.filter((option) => {
                
                return option.name
                .toString()
                .toLowerCase()
                .indexOf(this.urunbirim.toLowerCase()) >= 0
            })
        },
    },
    methods : {
        isYinedeKaydet(){
            this.isDisplay2 = false
            setTimeout(() => {
              const item = this.seleksiyon_siparisdetay.find(x=> x.tanim === this.siparis_detay)
              
              
         //ürün kartı bilgisini göndermek için
         
         
            if(item) {
             
             
                this.urunkart_change_event(item.urunkart_id)
                this.tedarikci = item.tedarikci 
                this.urunbirim = item.urunbirimid
            } 
           
          }, 1000);
        },
        siparisSecim(){
           
            const kontrol = this.seleksiyon_siparislist.find(x=>x.name == this.siparis);
             
            if(kontrol){

                this.$store.dispatch('loadBegin')
                service.getSiparisUretimDetayList(this.siparis).then(data => {


                    this.$store.dispatch('loadSiparisDetay',data)
                    this.seleksiyon_siparisdetay = data

                    

                    this.dis_siparis_detay = true 

                    if(this.siparis) this.dis_siparis_detay = false;

                    this.detail.siparisaciklama = this.siparis 
                    this.$store.dispatch('loadEnd')
                })
            }
        },
        seleksiyonKasaNo(){
            service.getSeleksiyonFirmaKasaNo().then(value => {
                    
                    this.detail.kasano = value.kasano
                    this.$store.dispatch('loadEnd')
                    
                    
            })
        },        
        tedarikciSecim(){ 

          
            const item = this.seleksiyon_tedarikcilist.find(x=>x.name == this.tedarikci)

            if(item.id == 1 || item.id == 123 ) {
                console.log("tedarikciler")
                
            }else{
                if (this.kayitstatu) {
                    this.kasaNoAuto()
                } else {
                    
                    let kasaNo = this.detail.kasano.toString()
                    console.log(kasaNo.length)
                    if (kasaNo.length == 5) {
                        this.kasaNoAuto()
                    } 
                }
                
            }
            
        },
        urunBirimSecim() {
            
        },
        kasaNoAuto() {
            this.$store.dispatch('loadBegin')
            service.getDisFirmaKasaNo().then(value => {

                this.detail.kasano = value.kasano
                this.$store.dispatch('loadEnd')

            })
        },
        
        kayitTurDegisim(event){
            this.tedarikci = "Mekmer"
            this.urunbirim = 1
            this.detail.duzenleyen = "Muhsin"
            this.dis_siparis_list = true;
            this.dis_siparis_detay = true;
            this.detail.kayit_tur = event

            if(this.kasano){
                this.kasano = this.kasano
            }else{
                this.seleksiyonKasaNo()
            }





            if(event == 'Sipariş') this.dis_siparis_list = false;
            else {

                this.siparis = ''
                
                this.detail.siparisaciklama = 'Stok'
            }
        },
        siparisDetayDegisim(){

          setTimeout(() => {
              const item = this.seleksiyon_siparisdetay.find(x=> x.tanim === this.siparis_detay)
              
              
         //ürün kartı bilgisini göndermek için
         
         if (item.urunkart_id==this.detail.urunkartid){
            if(item) {
             
             
                this.urunkart_change_event(item.urunkart_id)
                this.tedarikci = item.tedarikci 
                this.urunbirim = item.urunbirimid
            } 
         }else{
             
             if(this.kayitstatu==true){
                 if(item) {
             
             
                this.urunkart_change_event(item.urunkart_id)
                this.tedarikci = item.tedarikci 
                this.urunbirim = item.urunbirimid
                } 
             }else{
                 this.isDisplay2 = true
             }
             
         }
           
          }, 1000);
          
           
        },
        
       async dataSifirla(){

           await service.getUrunDetayModel().then(data => {

                this.detail = data
                this.siparis = ""
                this.tedarikci = ""
                this.tarih = null
                this.notlar=''
                this.urunbirim = ""
                this.kayit_tur = ""
                this.siparis_detay = ""
                this.ocak = ""
                this.kasaadet = 1
                
            })   
        },
        btn_yeni_click(){
            
            this.$store.dispatch('loadBegin')
            this.dataSifirla().then(()=>{

                this.$store.dispatch('seleksiyonYeniClickActions')
                this.$store.dispatch('loadEnd')
            })




            

            //this.seleksiyonKasaNo()

        },
        fazlaKayit(){
            if(this.detail){
                  if(this.kayit_kontrol()){
                        this.$store.dispatch('loadBegin')
                        this.kayit_kontrol()

                        this.coklu_kayit()

                        
                    }
            }
            this.isDisplay = false


        },
        isfazlaMiKayit(){
            this.isDisplay = false
        },
        isEslesmiyor(){
            this.isDisplay2=false
        },
        btn_kaydet_click(){

            if(this.detail){
                if(this.detail.kayit_tur=='Stok'){
                  if(this.kayit_kontrol()){
                        this.$store.dispatch('loadBegin')
                        this.kayit_kontrol()

                        this.coklu_kayit()

                        //kasa sayısı alınacak toplama göre hareket edilecek
                    }
                }else{
                    const fazlamiValue={
                        po:this.detail.siparisaciklama,
                        urunkartid:this.detail.urunkartid

                    }
                    service.getIsUretimFazlası(fazlamiValue).then(data=>{
                        this.fazlamiData = data
                        
                    })
                    const result = parseFloat(this.fazlamiData.uretimtoplami) + parseFloat(this.detail.miktar)
                    if(result > this.fazlamiData.siparismiktari){
                        this.isDisplay = true
                    }else{
                        if(this.kayit_kontrol()){
                        this.$store.dispatch('loadBegin')
                        this.kayit_kontrol()

                        this.coklu_kayit()

                        //kasa sayısı alınacak toplama göre hareket edilecek
                        }
                    }
                }
                


                
            }
        },
        coklu_kayit(){

            service.uretimCokluKayit(this.detail).then(data => {
                
                if(!data.kasa_kontrol){
                    alert('Kasa no daha önce kullanılmış kontrol ediniz.')
                    this.$store.dispatch('loadEnd')
                    return
                }
                 if(!data.kayit_durum){

                        alert('Seleksiyon kaydı yapılamadı sonra tekrar deneyin.')
                        this.$store.dispatch('loadEnd')
                        return
                }

                if(data.kayit_durum){

                    this.$store.dispatch('seleksiyonKaydetClickActions')
                    socket.siparis.emit('seleksiyon_coklukayit_event',data.kasa_list)

                    if(this.kayit_tur == 'Sipariş'){

                        this.siparisService.getSiparisUrun(this.siparis).then(siparis_data => {

                                socket.siparis.emit('seleksiyon_siparisdegisim_event',siparis_data)
                                        
                                this.dataSifirla()
                                this.$store.dispatch('loadEnd')
                        })
                    }
                    else{

                         this.dataSifirla()
                         this.$store.dispatch('loadEnd')
                    }
                }
            })
        },
        tek_kayit(){
             
             service.uretimKayit(this.detail).then(data => {
                     
                   
                    if(!data.kasa_kontrol){

                        alert('kasa no daha önce kullanılmış kontrol ediniz.')
                        this.$store.dispatch('loadEnd')
                        return
                    }

                    if(!data.kayit_durum){

                        alert('Seleksiyon kaydı yapılamadı sonra tekrar deneyin.')
                        this.$store.dispatch('loadEnd')
                        return
                    }

                    if(data.kayit_durum){

                        this.$store.dispatch('seleksiyonKaydetClickActions')
                             service.getUretim(this.detail.kasano).then(uretim => {
                                 
                                 socket.siparis.emit('seleksiyon_yenikayit_event',uretim)
                                 if(this.detail.uretimturid == 2) {

                                     this.siparisService.getSiparisUrun(this.siparis).then(siparis_data => {

                                         socket.siparis.emit('seleksiyon_siparisdegisim_event',siparis_data)
                                        
                                         this.dataSifirla()
                                         this.$store.dispatch('loadEnd')
                                     })
                                 }
                                 else {

                                     this.dataSifirla()
                                     this.$store.dispatch('loadEnd')
                                 }
                                 
                             })
                    }
                })


        },
        btn_vazgec_click(){

            this.$store.dispatch('seleksiyonVazgecClickActions')
        },
        btn_guncelle_click(){
            
            if(this.kayit_kontrol()){
            this.$store.dispatch('loadBegin')

           service.uretimGuncelle(this.detail).then(status => {

                if(status){

                    service.getUretim(this.detail.kasano).then(uretim_data => {
                        socket.siparis.emit('seleksiyon_kayitguncelle_event',uretim_data)

                        if(this.detail.uretimturid == 2) {

                            this.siparisService.getSiparisUrun(this.siparis).then(siparis_data => {
                                console.log('getSiparisUrun', siparis_data);
                                socket.siparis.emit('seleksiyon_siparisdegisim_event',siparis_data)
                                        
                                this.dataSifirla()
                                this.$store.dispatch('seleksiyonGuncelleClickActions')
                                this.$store.dispatch('loadEnd')

                                this.$emit('seleksiyon_form_kapat')

                            })
                        }
                        else {

                            this.dataSifirla()
                            this.$store.dispatch('seleksiyonGuncelleClickActions')
                            this.$store.dispatch('loadEnd')
                            this.$emit('seleksiyon_form_kapat')
                        }
                    })
                }
            })
            
            }

        },
        btn_sil_click(){

            this.$store.dispatch('seleksiyonSilClickActions')
            this.$store.dispatch('beginEnd')
            service.uretimSil(this.detail.kasano).then(status => {

                if(status){

                    socket.siparis.emit('seleksiyon_kayitsil_event',this.detail.id)
                    if(this.kayit_tur == 'Sipariş'){
                        this.siparisService.getSiparisUrun(this.siparis).then(siparis_data => {
                            
                            socket.siparis.emit('seleksiyon_siparisdegisim_event',siparis_data)
                            this.dataSifirla()
                            this.$store.dispatch('loadEnd')
                            this.$emit('seleksiyon_form_kapat')
                        })
                    }
                    else {

                         this.dataSifirla()
                         this.$store.dispatch('loadEnd')
                         this.$emit('seleksiyon_form_kapat')
                    }

                }
            })
        },
        urunkart_change_event(event){
           const urun_kart = this.getUrunKartMenuList.find(x=>x.id == event)

           if(urun_kart){
                this.detail.kategoriadi = urun_kart.kategoriAdi 
                this.detail.ebat = urun_kart.ebat 
                this.detail.urunadi = urun_kart.urunAdi 
                this.detail.kenarislem = urun_kart.yuzeyIslem
                this.en = urun_kart.en
                this.boy = urun_kart.boy
                this.detail.urunkartid = event
                
           }
           else{

               this.detail.kategoriadi = ""
               this.detail.ebat = ""
               this.detail.urunadi = ""
               this.detail.kenarislem = ""
               
           }
        },
        urunKartShow(){

            this.$emit('seleksiyonUrunKartShow')
        },
        urunbirim_degisim(){

            
            this.detail.sqm_miktar = 0
            this.detail.miktar = 0
            if(this.urunbirim == 1){
                this.isInputValue = false
            }else if (this.urunbirim ==2){
                this.isInputValue = true
            }
            
            
        },
        kayit_kontrol(){

                

                if(this.kayit_tur == '' ){

                    alert('Üretim Kayıt Tür Şeklini Belirtiniz.')
                    return false
                }
                if(this.ocak == '' ){

                    alert('Lütfen ocak giriniz..')
                    return false
                }
                if(this.tedarikci == '' ){

                    alert('Tedarikçi seçiniz..')
                    return false
                }
                if(this.tarih == null){

                    alert('Tarih giriniz..')
                    return false
                }
                
                

                if(this.kayit_tur == 'Sipariş'){

                    if(this.siparis == '' ){

                        alert('Sipariş no giriniz..')
                        return false
                    }

                    if(this.siparis_detay == '' && this.detail.urunkartid == null ){

                        alert('Sipariş kalem seçimi yapınız..')

                        return false
                    }
                }

                if(this.urunbirim == ''){

                    alert('Ürün Birim Seçimi Yapınız..')
                    return false
                }

                if(this.kasaadet == null){

                    alert('Kasa sayısı belirtilmeli..')
                    return false
                }

                if(this.kasaadet <= 0){

                    alert('Kasa sayısı en az 1 olmalıdır.')
                    return false
                }
                if(this.kasano == null){

                    alert('Kasano girilmesi gerekiyor..')
                    return false
                }
                if(this.notlar == ''){
                    alert('Not girilmesi gerekiyor.')
                    return false
                }


                //tedarikçi seçimi
                this.detail.tedarikciid = this.seleksiyon_tedarikcilist.find(x=>x.name == this.tedarikci).id
                // ürün birim seçimi 
                this.detail.urunbirimid = this.urunbirim
                 // tarih bilgisinin alınması                
                this.detail.tarih = this.localService.getDateString(this.tarih)
                //ürün ocak yüklemesi
                this.detail.urunocakid = this.seleksiyon_ocaklist.find(x=>x.name == this.ocak).id
                //üretim tür bilgisi
                this.detail.uretimturid = this.kayit_tur == 'Stok' ? 1 : 2
                this.detail.urundurumid = 1
                this.detail.kayit_sayisi = this.kasaadet
                this.detail.aciklama = this.notlar

                return true
        },
        miktar_input_event(event){
            if(event) this.detail.miktar = event.replace(',','.')
            if(this.urunbirim == 1){
                this.detail.sqm_miktar = this.detail.miktar  
            }

            
                
        },

        sqm_input_event(event){
            if(event) this.detail.sqm_miktar = event.replace(',','.')
    
        },
        m2_hesaplama(){

            if(this.urunbirim == 1){
                if(this.en == "ANT" && this.boy == "PAT"){
                this.detail.miktar = (this.detail.kutuadet * 0.74338688)
                this.detail.miktar = this.formatdecimal(this.detail.miktar)
                this.detail.sqm_miktar = this.detail.miktar
                }else if (this.en == '20,3' && this.boy == 'SET'){
                    this.detail.miktar = (this.detail.kutuadet * 0.494914)
                    this.detail.miktar = this.formatdecimal(this.detail.miktar)
                    this.detail.sqm_miktar = this.detail.miktar

                }else if (this.boy == "FREE" || this.boy == "SLAB" || this.boy == "VAR" || this.boy == "Free" || this.boy == "Various" || this.boy == "Random"){
                    this.detail.miktar = 0
                    this.detail.sqm_miktar = this.detail.miktar
                }
                    
                else{

                    this.en = this.en.replace("," , ".")
                    this.boy = this.boy.replace("," , ".")
                    this.detail.miktar = this.formatdecimal((this.detail.adet * this.en * this.boy) / 10000)
                    this.detail.sqm_miktar = this.detail.miktar
                    
                }
            }else if (this.urunbirim ==2){
                
                this.detail.miktar = this.detail.adet
                if(this.en == "ANT" && this.boy == "PAT"){
                this.detail.sqm_miktar = (this.detail.kutuadet * 0.74338688)
                this.detail.sqm_miktar = this.formatdecimal(this.detail.sqm_miktar)
                this.detail.miktar = (this.detail.kutuadet * this.detail.kutuiciadet)
                }else if (this.en == '20,3' && this.boy == 'SET'){
                    this.detail.sqm_miktar = (this.detail.kutuadet * 0.494914)
                    this.detail.sqm_miktar = this.formatdecimal(this.detail.sqm_miktar)
                    this.detail.miktar = this.detail.kutuadet * this.detail.kutuiciadet
                }else if (this.boy == "FREE" || this.boy == "SLAB" || this.boy == "VAR" || this.boy == "Free" || this.boy == "Various" || this.boy == "Random"){
                    this.detail.sqm_miktar = 0
                    this.detail.miktar = this.detail.kutuadet * this.detail.kutuiciadet
                }
                    
                else{

                    this.en = this.en.replace("," , ".")
                    this.boy = this.boy.replace("," , ".")
                    this.detail.sqm_miktar = this.formatdecimal((this.detail.adet * this.en * this.boy) / 10000)
                    
                }
            }
            
            
            
        },
        formatdecimal(value){
            return (value/1).toFixed(2).replace(',', '.')
        },
        // Kutulu Ürünlerde
        toplam_adet_hesapla(){
            this.m2_hesaplama()
            if(this.detail.kutuadet > 0 && this.detail.kutuiciadet > 0 ){

                this.detail.adet = this.detail.kutuadet * this.detail.kutuiciadet
            }
        },
        
    },
    
}
</script>
<style  scoped>
    .btn_urunkart{

        margin-top:5px;
    }
    #gun{

        margin-left:80px;
    }
    
</style>