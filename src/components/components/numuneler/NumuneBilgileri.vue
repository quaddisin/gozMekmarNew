<template>
       <div class="p-fluid"> 
           <Toast position="bottomright" />
                       <div class="card card-w-title">
                        <div class="p-grid">
                           <div class="p-col-12 p-lg-4 ">
                               <div class="p-col-12 p-md-12">
                                   <div class="column is-12 custom-box">
                        <div class="columns is-multiline">
                            
                           
                            <div class="column is-12">
                                  <AutoComplete
                                              v-model="kategori" 
                                              :suggestions="filterKategoriList"
                                              @complete="aramaKategori($event)"
                                              :dropdown="true"
                                              field="name"
                                              :disabled="dis_urunler" 
                                               @item-select="degisimKategori"
                                              placeholder="Kategori" >
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.name}}</div>
                                                    </div>
                                                </template>
                                         </AutoComplete>
                            </div>
                            <div class="column is-12">
                              <AutoComplete v-model="urunL" :suggestions="filterUrunList" @complete="aramaUrun($event)"
                                                :dropdown="true" field="name" placeholder="Ürün" :disabled="dis_urunler" @item-select="degisimUrun"  >
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.name}}</div>
                                                    </div>
                                                </template>
                                            </AutoComplete>
                            </div>
                             <div class="column is-12">
                                  <AutoComplete v-model="yuzey" :suggestions="filterYuzeyList" @complete="aramaYuzey($event)"
                                                :dropdown="true" field="name" placeholder="Yüzey" :disabled="dis_urunler"  @item-select="degisimYuzey"  >
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.name}}</div>
                                                    </div>
                                                </template>
                                            </AutoComplete>
                            </div>
                            <div class="column is-12">
                               <AutoComplete v-model="enBoy" :suggestions="filterEnBoyList" @complete="aramaEnBoy($event)"
                                                :dropdown="true" field="name" placeholder="En x Boy"  :disabled="dis_urunler" @item-select="degisimEnBoy"  >
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.name}}</div>
                                                    </div>
                                                </template>
                                            </AutoComplete>
                            </div>
                            <div class="column is-12">
                                
                                             <AutoComplete v-model="kalinlik" :suggestions="filterKalinlikList" @complete="aramaKalinlik($event)"
                                                :dropdown="true" field="name" :disabled="dis_urunler" placeholder="Kalınlık" @item-select="degisimKalinlik"  >
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.name}}</div>
                                                    </div>
                                                </template>
                                            </AutoComplete>
                            </div>
                            
                        </div>
                    </div>
                               </div>
                             
                             <div class="p-col-12 p-md-12">
                                   <Card class="tedarikciCard"  >
                                       <template slot="content" >
                                           <div class="p-grid fluid">
                                               <div class="p-col-12 p-lg-6">
                                                <AutoComplete v-model="tedarikci" :suggestions="filterTedarikciList" @complete="aramaTedarikci($event)"
                                                    :dropdown="true" field="name"   :disabled="dis_urunler" placeholder="Tedarikçi" @item-select="degisimTedarikci"  >
                                                    <template #items="slotProps">
                                                        <div class="p-clearfix p-autocomplete-brand-item">
                                                            <div>{{slotProps.name}}</div>
                                                        </div>
                                                    </template>
                                                 </AutoComplete>
                                                 
                                               </div>
                                               <div class="p-col p-lg-6">
                                                   <span class=" ">Alış
                                                     
                                                       
                                                      <div  class="p-col-12">
                                                     <currency-input :value="urun.alis" :disabled="dis_urunler"  @input="urun.alis = $event" />
                                                     </div>
                                                     
                                                   </span>
                                               </div>
                                               <div class="p-col p-lg-6">
                                                  
                                                     
                                               </div>
                                               <div class="p-col p-lg-6">
                                                   <span class="p-float-label"> Satış
                                                       <div  class="p-col-12">
                                                     <currency-input :value="urun.satis" :disabled="dis_urunler" @input="urun.satis = $event" />
                                                     </div>
                                                        
                                                       
                                                   </span>
                                               </div>
                                           </div>
                                       </template>
                                   </Card>
                               </div>
                              
                               <div class="p-col-12 p-lg-12">
                                   <Card>
                                       <template slot="content">
                                           <div class="p-grid fluid ">
                                               <div class="p-col-4">
                                                  
                                                   <AutoComplete v-model="birim" :suggestions="filterBirimList" @complete="aramaBirim($event)"
                                                    :dropdown="true" field="name" placeholder="Birim"  :disabled="dis_urunler"  @item-select="degisimBirim"  >
                                                    <template #items="slotProps">
                                                        <div class="p-clearfix p-autocomplete-brand-item">
                                                            <div>{{slotProps.name}}</div>
                                                        </div>
                                                    </template>
                                                </AutoComplete>
                                               </div>
                                               <div class="p-col p-lg-5">
                                                   <span class="p-float-label"> Miktar
                                                       <div  class="p-col-12">
                                                     <b-input :value="urun.miktar" :disabled="dis_urunler" :disAktif="false" @input="urun.miktar = $event" />
                                                     </div>
                                                        
                                                       
                                                   </span>
                                               </div>
                                           
                                              <div class="p-col p-lg-5">
                                                   <span class="p-float-label"> Sira
                                                       <div  class="p-col-12">
                                                     <b-input :value="urun.sira" :disabled="dis_urunler" :disAktif="false" @input="urun.sira = $event" />
                                                     </div>
                                                        
                                                       
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
                                             <Textarea rows="7" cols="15" />
                                            
                                           </div>
                                           
                                           <div class="p-col-6">
                                             <Textarea rows="7" cols="15" />
                                            
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
                                               <Button class="p-button-rounded p-button-secondary"   @click="teklifYeniIslem" label="Yeni" icon="pi pi-file-o" iconPos="left" />
                                           </div>
                                           <div class="p-col-2">
                                               <Button  label="İptal"  @click="btn_iptal_click"   class="p-button-rounded p-button-danger" icon="pi pi-times" iconPos="left"/>
                                           </div>
                                           
                                         <div class="p-col-2">
                                               <Button  class="p-button-rounded p-button-warning" @click="teklifYeniUrunIslem" label="Ekle" icon="pi pi-refresh" iconPos="left"/>
                                         </div>
                                        <div class="p-col-2">
                                               <Button label="Sil"  @click="teklifUrunSilmeIslemi"  class="p-button-rounded"  style="background-color:yellow;color:black;" icon="pi pi-times-circle" iconPos="left" />
                                        </div>
                                        
                                       </div>
                                   </template>
                               </Card>
                           </div>
                          </div>
                           
                       </div>
                       

                        
                           </div>
                       <div class="p-grid">
                           <div class="p-col-12 p-md-12">
                          
                             <DataTable class="p-datatable-responsive p-datatable-cars" 
                                   :value="urunListesi"
                                    :loading="urunLoading"
                                    selectionMode="single"
                                    dataKey="id"
                                    :selection.sync="selectUrun"
                                    :disabled="dis_urunlistesi"
                                    @row-select="teklifUrunSec"
                        >
                                
                              
                               <Column field="tedarikci" header="Kimden" headerStyle="width:90%;">
                                      <template #body="slotProps">
                                        {{slotProps.data.tedarikci}}
                                    </template>
                               </Column>
                           
                               <Column field="urunAdi" header="Ürün Adı" headerStyle="width:120%">
                                     <template #body="slotProps">
                                        {{slotProps.data.urunAdi}}
                                    </template>
                               </Column>
                               <Column field="enBoy" header="W x L" headerStyle="width:85%;" bodyStyle="text-align:center">
                                    <template #body="slotProps">
                                        {{slotProps.data.enBoy}}
                                    </template>
                               </Column>
                               
                               <Column field="kalinlik" header="K" headerStyle="width:80%;" bodyStyle="text-align:center">
                                  <template #body="slotProps">
                                        {{slotProps.data.kalinlik}}
                                    </template>
                               </Column>
                               <Column field="yuzeyIslem" header="İşlem" headerStyle="width:190%">
                                     <template #body="slotProps">
                                        {{slotProps.data.yuzeyIslem}}
                                    </template>
                               </Column>
                               <Column field="m2" header="M2" headerStyle="width:80%;" bodyStyle="text-align:center;">
                                    <template #body="slotProps">
                                        {{slotProps.data.m2}}
                                    </template>
                              </Column>
                               <Column field="adet" header="Adet" headerStyle="width:80%;" bodyStyle="text-align:center;">
                                    <template #body="slotProps">
                                        {{slotProps.data.adet}}
                                    </template>
                              </Column>
                               <Column field="mt" header="Mt" headerStyle="width:80%;" bodyStyle="text-align:center;">
                                    <template #body="slotProps">
                                        {{slotProps.data.mt}}
                                    </template>
                              </Column>
                               <Column field="ton" header="Ton" headerStyle="width:80%;" bodyStyle="text-align:center;">
                                   <template #body="slotProps">
                                        {{slotProps.data.ton}}
                                    </template>
                              </Column>
                            
                             
                            
                               <Column field="satisToplam" header="Tuta1r" headerStyle="width:110%" bodyStyle="text-align:center">
                                    <template #body="slotProps">
                                        {{formatPriceDolar(slotProps.data.satisToplam)  }}
                                    </template>
                               </Column>
                              
                             </DataTable>
                           </div>
                       </div>
        </div>
 
                   
</template>

<script>
import service from '../../service/NumuneService'
import { required } from 'vuelidate/lib/validators';




export default {

    components : {

      
         
    },
      
    props : {

         yeniSiparis :{
          

            type : Boolean,
         
    
         },  
        select_numune : {

             type : String,
             required : false,            
             default : ""
        },
        urunListesi1 :{
            type : Array
        }
        
    },
    data () {
     return  {
         numune : {},
        selectUrun : null,
         dis_urunlistesi : true,
         numune_listesi : null,
         dis_urun_giris : false,
         urunkayit : false,
         tedarikci : null,
         tedarikciList : null,
         filterTedarikciList : null,
         musteri : null,
         musteriList : null,
         filterMusteriList : null,
         kategori : null,
         kategoriList : null,
         dis_urunler : false,
         filterKategoriList : null,
         birim : null,
         birimList : null,
         filterBirimList : null,
         urunL : null,
         urun : null,
         dtUrun : null,
         alis : 0,
         urunListesi : null,
         urunLoading : false,
         urunList : null,
         filterUrunList : null,
         name : null,
         yuzeyList : null,
         yuzey : null,
         filterYuzeyList : null,
         enBoyList : null,
         enBoy : null,
         filterEnBoyList: null,
         kalinlikList : null,
         kalinlik : null,
         filterKalinlikList : null,
         degisim_yeni_urun : [],
         degisim_guncellenen_urun : [],
         degisim_silinen_urun : [],
         guncellenenMusteri :[],
         kategoriadd :[],
         urunadd :[],
         validations : {
             kategori : { 
            id : {required}
            },
            urunL : { 
                id : {required}
            },
            enBoy : { 
                id : { required }
            },
            kalinlik : { 
                id : { required }
            },
            yuzey : { 
                id : { required }
            },
            birim : { 
                id : { required }
            }
         }
           
            
        
     }
        
    },
   created(){
      
       this.urunkayit = this.yeniSiparis;
       this.urunListesi1 = 1
       
           
        if(this.urunkayit){

           this.yeniKayitBaslangicIslemler();
         }
         if(!this.urunkayit){
           
            this.urunLoading = true;
            this.dis_urunlistesi = true;
            service.getNumune(this.select_numune).then(data => {
          
                 this.numune = data.numune;
                 this.urunListesi = data.urunler;
                 this.dtUrun = data.numuNeModel;
                 this.urun = {...this.dtUrun};
                
                 this.urunLoading = false;
                 this.dis_urunlistesi = false;
                 if(this.numune)
               
                 this.teklifListeleriYukle();
               
            })
        }
   
    },
     methods : {
          formatPriceDolar(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            
            return "$" +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
         teklifYeniIslem(){
              this.dis_urunler = false
          },
         btn_iptal_click(){
            
            this.form_btn_reset()
        },
         form_btn_reset(){

           
            this.dis_urunler = true
        },
          teklifUrunSilmeIslemi(){

            let index = this.indexBul(this.urun.id,this.urunListesi);
             this.urunListesi.splice(index,1);
             
             this.dis_urunSil = true;

            if(!this.urunkayit){

                //yeni ürünlerdeki kontrol
                let yeniUrunKontrol = this.indexBul(event.id,this.degisim_yeni_urun);
                if (yeniUrunKontrol != -1) {

                    this.degisim_yeni_urun.splice(yeniUrunKontrol,1)
                    return 
                }

                let guncellemeKontrol =  this.indexBul(event.id,this.degisim_guncellenen_urun);

                if(guncellemeKontrol != -1) this.degisim_guncellenen_urun.splice(guncellemeKontrol,1);

                this.degisim_silinen_urun.push({...this.urun});

               
            }

               this.urun = this.dtUrun;
               this.dis_urunSil = true;
              
               this.kategori = null;
               this.urunL = null;
               this.kalinlik = null;
               this.enBoy = null;
               this.yuzey = null;
               this.birim = null;
               this.tedarikci = null;

          

            },
           

           teklifKayitIslemi(){
         
                if(this.urunkayit)this.yeniTeklifKayit();
                if(!this.urunkayit)this.teklifGuncelleme();
            

            //code sonu

          },
        yeniTeklifKayit(){

            
         
                this.urunLoading = true;
                const veri = {

                    teklif : this.teklif,
                    urunler : this.urunListesi,
                    kullaniciAdi : this.$store.getters.getUser
                }
            
            
           
             
            service.setNumuneKayit(veri).then(data => {

               

                if(data.status){

                     this.$toast.add({severity:'success', summary: 'Bilgi Ekranı', detail:'Yeni Teklif Kaydı Yapıldı',  life: 5000});
                     //socket.siparis.emit('teklif_yeni_event',veri.kullaniciAdi);
                     
                     this.numune.id = data.Id;
                     this.urunkayit = false;
                    
                     this.urunLoading = false;
                     return;
                }
                else {

                     this.$toast.add({severity:'error', summary: 'Uyarı Ekranı', detail:'Teklif kaydı yapılamadı',  life: 5000});
                }

                this.urunLoading = false;
                this.dis_teklifkaydet = false;
                 })
        },
          teklifGuncelleme(){
           
           this.urunLoading = true;
           if(this.kayit_kontrol()){
            const veri = {

                numue : this.numune,
                eklenenUrunler : this.degisim_yeni_urun,
                guncellenenUrunler : this.degisim_guncellenen_urun,
                silinenUrunler : this.degisim_silinen_urun,
                kullaniciAdi : this.$store.getters.getUser,
                guncellenenMusteri :this.guncellenenMusteri,
                kategoriadd : this.kategoriadd,
                
            }

          
            service.setNumuneGuncelleme(veri).then(data => {

              
                if(data.status){

                       this.$toast.add({severity:'success', summary: 'Bilgi Ekranı', detail:'Teklif Bilgileri Değiştirildi.',  life: 1000});
                       //socket.siparis.emit('teklif_guncelleme_event',veri.kullaniciAdi);
              }
                else {

                     this.$toast.add({severity:'error', summary: 'Uyarı Ekranı', detail:'Teklif kaydı yapılamadı',  life: 5000});
                }

                this.urunLoading = false;
            })
           }
           
        },
          urun_kontrol(){

            let durum = true
            for(let key in this.urunListesi){

                const item = this.urunListesi[key]
                const urun = this.urun

                if(
                    item.birim == urun.birim && item.enBoy == urun.enBoy && item.fobFiyat == urun.fobFiyat 
                    && item.kalinlik == urun.kalinlik && item.teklifFiyat == urun.teklifFiyat && 
                    item.kategoriAdi == urun.kategoriAdi && item.urunAdi == urun.urunAdi && item.yuklemeTipi == urun.yuklemeTipi
                    && item.yuzeyIslem == urun.yuzeyIslem
                )
                {

                    durum = false
                }
            }

            return durum
        },
           teklifYeniUrunIslem(){
                this.dis_urunler = false
               
                this.urun.kategoriAdi = this.kategori.name ? this.kategori.name : this.kategori;
                this.urun.urunAdi = this.urunL.name ? this.urunL.name : this.urunL;
                this.urun.enBoy = this.enBoy.name ? this.enBoy.name : this.enBoy;
                this.urun.kalinlik = this.kalinlik.name ? this.kalinlik.name : this.kalinlik;
                this.urun.yuzeyIslem = this.yuzey.name ? this.yuzey.name : this.yuzey;
                this.urun.tedarikci = this.tedarikci.name ? this.tedarikci.name : this.tedarikci;
                this.urun.urunBirim = this.birim.name ? this.birim.name : this.birim;
                this.urun.satisToplam = this.urun.satis * this.urun.miktar;
             
                if(this.urunListesi == null) this.urunListesi = [];
                
                let index = this.indexBul(this.urun.id,this.urunListesi);
                if(index == -1){
                    this.urun.id = this.idOlustur();
                    if(!this.urunkayit){
                        
                        this.degisim_yeni_urun.push({...this.urun});
                    }
                    this.urunListesi.push({...this.urun});
                }
                else {
                    if(!this.urunkayit){
                        //değişim yeni ürünlerde kontrolü
                        let kontrol = this.indexBul(this.urun.id,this.degisim_yeni_urun);
                        //eklenmesi için yeni üründe olmaması lazım
                        if(kontrol == -1){

                            this.degisim_guncellenen_urun.push({...this.urun});
                        }
                    }
                    this.urunListesi[index] = {...this.urun};
                    this.selectUrun = {...this.urun};
                }

                    this.urun = {...this.dtUrun};
                    this.dis_urunSil = true;               
                    this.kategori = null;
                    this.urunL = null;
                    this.kalinlik = null;
                    this.enBoy = null;
                    this.yuzey = null;
                    this.tedarikci = null;
                    this.birim = null;
                   
                   
           
                    

            
 
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
        
        
         
         
          teklifUrunSec(){
             
            this.dis_urunler = false
            this.urun = {...this.selectUrun};
            
            this.kategori = this.kategoriList.find(x=>x.id == this.urun.kategoriId);
            this.urunL = this.urunList.find(x=>x.id == this.urun.urunId);
            this.kalinlik = this.kalinlikList.find(x=> x.id == this.urun.kalinlikId);
            this.enBoy = this.enBoyList.find(x=> x.id == this.urun.enBoyId);
            this.yuzey = this.yuzeyList.find(x=>x.id == this.urun.yuzeyIslemId);
            this.birim = this.birimList.find(x=>x.id ==this.urun.urunBirim_id);
            this.tedarikci = this.tedarikciList.find(x=>x.id == this.urun.tedarikci_id);
            
    },
        aramaKalinlik(event){

            setTimeout(()=> {

                let result;
                if(event.query.length == 0) result = [...this.kalinlikList];
                else {

                    result = this.kalinlikList.filter((x)=>{

                        return x.name.toLowerCase().startsWith(event.query.toLowerCase())
                    })
                }
                this.filterKalinlikList = result;

            },250)
          },
          
        degisimKalinlik(){

            this.urun.kalinlikId = this.kalinlik.id;
            this.urun.kalinlik = this.kalinlik.name;
        },
         
         aramaEnBoy(event){

            setTimeout(()=> {

                let result;
                if(event.query.length == 0) result = [...this.enBoyList];
                else {

                    result = this.enBoyList.filter((x)=>{

                        return x.name.toLowerCase().startsWith(event.query.toLowerCase())
                    })
                }
                this.filterEnBoyList = result;

            },250)
        },
        degisimEnBoy(){

            this.urun.enBoyId = this.enBoy.id;
            this.urun.enBoy = this.enBoy.name;
        },
         aramaYuzey(event){

            setTimeout(()=> {

                let result;
                if(event.query.length == 0) result = [...this.yuzeyList];
                else {

                    result = this.yuzeyList.filter((x)=>{

                        return x.name.toLowerCase().startsWith(event.query.toLowerCase())
                    })
                }
                this.filterYuzeyList = result;

            },250)
        },
        degisimYuzey(){

            this.urun.yuzeyIslemId = this.yuzey.id;
            this.urun.yuzeyIslem = this.yuzey.name;
        },
          aramaUrun(event){

            setTimeout(()=> {
               

                let result;
                if(event.query.length == 0) result = [...this.urunList];
                else {

                    result = this.urunList.filter((x)=>{

                        return x.name.toLowerCase().startsWith(event.query.toLowerCase())
                    })
                }
                this.filterUrunList = result;
                

            },250)
        },
        degisimUrun(){
           

            this.urun.urunId = this.urunL.id;
            this.urun.urunAdi = this.urunL.name;
        },
         degisimKategori(){
           
            this.urun.kategoriId = this.kategori.id;
            this.urun.kategoriAdi = this.kategori.name;
           
        
         },   
         aramaKategori(event){

            setTimeout(()=>{

                let result;
               

                if(event.query.length == 0) result = [...this.kategoriList];
                else{

                    result = this.kategoriList.filter((x)=>{

                        return x.name.toLowerCase().startsWith(event.query.toLowerCase())
                    })
                }

                this.filterKategoriList = result;

            },250)
        },
        
        aramaTedarikci(event){
       
            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.tedarikciList];

                 }
                 else {

                     result = this.tedarikciList.filter((ted) => {
                        
                         return ted.name.toLowerCase().startsWith(event.query.toLowerCase())
                     })

                     
                 }
                 
                 this.filterTedarikciList = result;
            },250)
        },
         aramaBirim(event){
       
            setTimeout(()=>{

                 let result;
                 if(event.query.length === 0){

                      result = [...this.birimList];

                 }
                 else {

                     result = this.birimList.filter((ted) => {
                        
                         return ted.name.toLowerCase().startsWith(event.query.toLowerCase())
                     })

                     
                 }
                 
                 this.filterBirimList = result;
            },250)
        },
         degisimTedarikci(){
           
            this.urun.tedarikci_id = this.tedarikci.id;
            this.urun.tedarikci= this.tedarikci.name;
           
        
         }, 
          degisimBirim(){
           
            this.urun.urunBirim_id = this.birim.id;
            this.urun.urunBirim = this.birim.name;
           
        
         }, 
         teklifListeleriYukle(){

              service.getFormListeler().then(data => {
              
          
                this.musteriList = data.musteriList;
                this.ulkeList = data.ulkeList;
                
                this.kategoriList = data.kategoriList;
                this.urunList = data.urunList;
                this.enBoyList = data.enBoyList;
                this.kalinlikList = data.kalinlikList;
                this.tedarikciList = data.tedarikciList;
                this.yuzeyList = data.yuzeyList;
                this.birimList = data.birimList;
              
               

                this.urunLoading = false;
                this.dis_urunlistesi = false;
             })
        },
          yeniKayitBaslangicIslemler(){
            
            this.dis_takipEt = true;
            this.urunLoading = true;
            this.dis_urunlistesi = true;

         
            this.teklifListeleriYukle();
            service.getNumuneModel().then(data => {
             
               
                this.numune = data.numune;
                this.dtUrun = data.numuneUrun;
                this.urun = {...this.dtUrun};
                
              
                
                this.urunListesi = null;
                this.urunLoading = false;
                this.dis_urunlistesi = false;
            })
        },
     },
     
    mounted(){
        
        
        
        
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