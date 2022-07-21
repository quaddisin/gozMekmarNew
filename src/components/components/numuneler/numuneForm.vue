<template>
    <div class="fluid">
        <Toast position="bottomright" />
        <div class="p-grid">
            <div class="p-col-12 p-lg-9"  >
                <TabView>
                    <TabPanel  header="Numune Bilgileri" style="height: 800px;background-color:white; " >
                     <div class="p-fluid"> 
           <Toast position="bottomright" />
                      <b-field  class="w-title" label="ÜRÜN" label-position="on-border"  style="margin-top:3%;">
                       <div class="card card-w-title" >
                           
                        <div class="p-grid">
                           <div class="p-col-12 p-lg-12 ">
                               <div class="p-col-12 p-md-12">
                               
                                   <div class="column is-12 custom-box">
                                        <div class="columns is-multiline">
                                            
                                        
                                            <div class="column">
                                             <b-field label="Kategori" label-position="on-border" > 
                                                    <AutoComplete
                                                                v-model="kategori" 
                                                                :suggestions="filterKategoriList"
                                                                @complete="aramaKategori($event)"
                                                            
                                                                field="name"
                                                            
                                                                @item-select="degisimKategori"
                                                                
                                                                placeholder="Kategori" >
                                                                    <template #items="slotProps">
                                                                        <div class="p-clearfix p-autocomplete-brand-item">
                                                                            <div>{{slotProps.name}}</div>
                                                                        </div>
                                                                    </template>
                                                </AutoComplete>
                                              </b-field>
                                            </div>
                                              <div class="column">
                                               <b-field label="Birim" label-position="on-border" > 
                                                <AutoComplete v-model="birim" :suggestions="filterBirimList" @complete="aramaBirim($event)"
                                                    field="name" placeholder="Birim"   @item-select="degisimBirim"  >
                                                    <template #items="slotProps">
                                                        <div class="p-clearfix p-autocomplete-brand-item">
                                                            <div>{{slotProps.name}}</div>
                                                        </div>
                                                    </template>
                                                </AutoComplete>
                                             </b-field>
                                            </div>
                                            <div class="column">
                                                <b-field label="Miktar" label-position="on-border" >
                                                   <b-input :value="numune.Miktar"   :disAktif="false" @input="numune.Miktar = $event" />
                                                 </b-field>
                                            </div>
                                        
                                            
                                        </div>
                                   </div>
                                   
                               </div>
                             
                           
                               
                           </div>
                         
                         
                             
                       </div>
                       

                        
                           </div>
                      
                      </b-field >    
                       
                         <b-field  class="card card-w-title" label="ÖDEME" label-position="on-border"  style="margin-top:5%;">
                        <div class="w-title" >
                        <div class="p-grid">
                          
                           <div class="p-col-12 p-lg-12 ">
                               <div class="p-col-12 p-md-12">
                                   <div class="columns" >
                                       
                                            <div class="column" > 
                                                 
                                            <div>
                                             <h3 style="border-bottom:solid 1px  black; font-style: italic; ">Gönderi Tipi</h3>
                                                  <div class="p-field-radiobutton" style=" padding: .5rem;" >

                                                     <RadioButton :disabled="dis_takipEt" value="Customer Account" v-model="odeme"  @input=odemeSecim() name="odeme" />
                                                     <label   class="p-checkbox-label">Customer Account</label>
                                                </div>
                                                <div class="p-field-radiobutton" style=" padding: .5rem;" >
                                                    <RadioButton :disabled="dis_takipEt" value="Customer Paid to Mekmar" v-model="odeme" @input=odemeSecim() name="odeme" />
                                                     <label class="p-checkbox-label">Customer Paid to Mekmar</label>
                                                </div>
                                                <div class="p-field-radiobutton" style=" padding: .5rem;" >
                                                   
                                                      <RadioButton :disabled="dis_takipEt" value="Mekmar Paid" v-model="odeme"  @input=odemeSecim() name="odeme" />
                                                     <label   class="p-checkbox-label">Mekmar Paid</label>
                                                </div>
                                               </div>
                                                 
                                                 </div>
                                             <div class="column">  
                                                  <div>
                                                <h3 style="border-bottom:solid 1px  black; font-style: italic; ">Banka Seçimi</h3>
                                                    
                                                      <div class="p-field-radiobutton" style=" padding: .5rem;" >

                                                     <RadioButton  :disabled="dis_Odeme" value="Maya Paypal"  @input=bankSecim() name="banka" v-model="banka" />
                                                     <label   class="p-checkbox-label">Maya Paypal</label>
                                                </div>
                                                <div class="p-field-radiobutton" style=" padding: .5rem;" >
                                                    <RadioButton  :disabled="dis_Odeme"  value="Maya Bank" name="banka"  @input=bankSecim()  v-model="banka"/>
                                                     <label   class="p-checkbox-label">Maya Bank</label>
                                                </div>
                                                <div class="p-field-radiobutton" style=" padding: .5rem;" >
                                                   
                                                      <RadioButton  :disabled="dis_Odeme" value="Mekmar Bank" name="banka"  @input=bankSecim()   v-model="banka" />
                                                     <label   class="p-checkbox-label">Mekmar Bank</label>
                                                </div>
                                                   
                                               </div>
                                                </div>
                                             <div class="column">   
                                                     <h3 style="border-bottom:solid 1px  black; font-style: italic; ">Kurye Detay</h3>
                                                   
                                                     
                                                   
                                                      <div class="columns" style="padding: 15px 15px;">
                                                        <div class="column is-2"> 
                                                               <span style="font-weight: bold;color:red;">  Alış : </span>
                                                         </div>
                                                           <div class="column is-3"> 
                                                               <b-field label="$" label-position="on-border" >
                                                                     <currency-input :value="numune.kuryeAlis"  :disabled="dis_Alis" @input="numune.kuryeAlis = $event" /> 
                                                                </b-field>
                                                         </div>
                                                          <div class="column is-3"> 
                                                               <b-field label="₺" label-position="on-border" >
                                                                  <TL :value="numune.TL_Alis"  :disabled="dis_Alis" @input="numune.TL_Alis = $event" /> 
                                                                </b-field>
                                                         </div>
                                                          <div class="column is-3"> 
                                                               <b-field label="€" label-position="on-border" >
                                                                 <Euro :value="numune.Euro_Alis"  :disabled="dis_Alis" @input="numune.Euro_Alis = $event" /> 
                                                                </b-field>
                                                         </div>
                                                    
                                                           
                                                 </div>
                                               
                                               
                                                  
                                                 <div class="columns" style="padding: 15px 15px;">
                                                    
                                                       <div class="column is-2"> 
                                                               <span  style="font-weight: bold;color:green;"> Satış : </span>
                                                         </div>
                                                           <div class="column is-3"> 
                                                               <b-field label="$" label-position="on-border" >
                                                                      <currency-input :value="numune.kuryeSatis"  :disabled="dis_Satis"  @input="numune.kuryeSatis = $event" />
                                                                </b-field>
                                                         </div>
                                                          <div class="column is-3"> 
                                                               <b-field label="₺" label-position="on-border" >
                                                                  <TL :value="numune.TL_Satis"  :disabled="dis_Satis" @input="numune.TL_Satis = $event" /> 
                                                                </b-field>
                                                         </div>
                                                          <div class="column is-3"> 
                                                               <b-field label="€" label-position="on-border" >
                                                                 <Euro :value="numune.Euro_Satis"  :disabled="dis_Satis" @input="numune.Euro_Satis = $event" /> 
                                                                </b-field>
                                                         </div>
                                                    
                                                           
                                                 </div>
                                                 
                                                  
                                              
                                             </div>
                                            
                                        
                                      
                                       
                                   </div>
                               </div>
                             
                           
                              
                              
                               
                           </div>
                      
                       
                             
                       </div>
                       

                        
                           </div>
                         </b-field>
                         
                            <div class="p-col-12 p-lg-12">
                            <b-field  label="NOT" label-position="on-border"  style="margin-top:5%;">
                               <Card>
                                   <template slot="content">
                                       <div class="p-grid fluid">
                                           <div class="p-col-12">
                                             <Textarea rows="4" cols="8"   style="border:1px solid #47c4eb;"  v-model="numune.aciklama" />
                                           
                                           </div>
                                           
                                         
                                       </div>
                                   </template>
                               </Card>
                               </b-field>  
                               </div>
                            
                        </div>
                   
                    </TabPanel>
                  <TabPanel header="Ödeme Bilgileri" style="height: 800px;background-color:white; " >
               <div class="columns" style="margin-top:5%;">
           
              
                    
                   
                    <div class="p-col-2">
                        <b-field label="Ödeme Tarihi" label-position="on-border">
                            <b-datepicker style="text-align:center;" v-model="date"  />
                        </b-field>
                    </div>
                
                   
                    <div class="p-col-2">
                        <b-field label="$" labelPosition="on-border">
                            <currency-input style="text-align:center;width: 80%;" :disabled="dis_finans"  v-model="numune.kuryeSatis"    @input="numune.kuryeSatis = $event" />
                        </b-field>
                    </div>
                     <div class="p-col-2">
                        <b-field label="₺" labelPosition="on-border">
                            <InputText style="text-align:center;width: 80%;"   :disabled="dis_finans"  v-model="numune.TL_Satis"    @input="numune.TL_Satis = $event" />
                        </b-field>
                    </div>
                     <div class="p-col-2">
                        <b-field label="€" labelPosition="on-border">
                            <InputText style="text-align:center;width: 80%;"  :disabled="dis_finans"  v-model="numune.Euro_Satis"    @input="numune.Euro_Satis = $event" />
                        </b-field>
                    </div>
                   <div class="p-col-3">
                          <b-field label="Banka" labelPosition="on-border">               
                        <InputText  type="text" style="text-align:center;width: 80%;"  :disabled="dis_finans" v-model="numune.bankaAdi" @change="bankSecim()"  />
                         </b-field> 
                                     
                     </div>
                  
                    
                  
                  
                 
               
            </div>
            <div  class="columns" style="margin-top:5%;">
                 <div class="p-col-3" >
                       <Button label="Kaydet"    @click="islem()" class="p-button-success"  icon="pi pi-save"  />
                      
                    </div>
                   
            </div>
           
        
                </TabPanel>
                <TabPanel header="Images" style="height: 800px;background-color:white; " >
                     <div class="p-col-12 p-lg-12">
                     
                               <div class="p-grid">
                                   
                                 
                                 
                                   <div class="p-col-6" >
                                       <div class="p-col-6">
                                             <custom-file-input   style="width :190px;" baslik="Upload 1 " @sunucuDosyaYolla="numuneDosyaGonder($event)" />
                                      </div>
                                         <h2>Image 1 <span style="font-style: italic; size:8px">: Ürünlerin Ön Yüzü </span></h2>  
                                        <br>
                                        <a :href="numuneLink" target="_blank" >
                                            <img :src="numuneLink" width="500" title="Resmi indirmek için tıklayınız." alt="Resim Yüklü Değil"  height="580" style="border: none;" allowfullscreen webkitallowfullscreen /> 
                                            
                                        </a>
                                       
                                   </div>
                                    <div class="p-col-6" >
                                         <div class="p-col-6">
                                             <custom-file-input   style="width :190px;" baslik="Upload 2 " @sunucuDosyaYolla="numuneDosyaGonder2($event)" />
                                      </div>
                                     <h2>Image 2 <span style="font-style: italic; size: 8px">: Ürünlerin Arka Yüzü</span></h2>   
                                          <br>  
                                        <a :href="numuneLink2" target="_blank" >
                                            <img :src="numuneLink2" width="500" title="Resmi indirmek için tıklayınız."  alt="Resim Yüklü Değil" height="580" style="border: none;" allowfullscreen webkitallowfullscreen /> 
                                            
                                        </a>
                                       
                                   </div>
                                  
                                   
                                   
                                   
                                  
                               </div>
                        
                   </div>
                </TabPanel>
                  
                </TabView>
            </div>
            <div class="p-col-12 p-lg-3">
               <div class="p-grid">
                   <div class="p-col-12" style="justify-content: center;display:flex;" >
                       <Button label="KAYDET" class="p-button-success" :disabled="dis_kaydet"   @click="teklifKayitIslemi" icon="pi pi-save" style="width:200px;" />
                   </div>
                  
                   <div class="p-col-12 p-lg-12">
                       <Card>
                           <template slot="subtitle">
                               <span>Numune Bilgi</span>
                           </template>
                           <template slot="content">
                               <div class="p-grid">
                                   <div class="p-col-8">
                                       <span>Po Numarası</span>
                                   </div>
                                    <div class="p-inputgroup">
                                       <span class="p-inputgroup-addon">
                                           <i class=" " style="padding: 8px 8px;"></i>
                                         <InputText  :disabled="dis_numuneBilgi" type="text" v-model="numune.numuneNo"  />
                                       </span>
                                   </div>
                                  
                                  
                                  
                                   <div class="p-col-8">
                                       <span>Gönderilme Tarihi</span>
                                   </div>
                                   <div class="p-inputgroup">
                                        <span class="p-inputgroup-addon">
                                          <i class="fas fa-calendar-alt" style="padding: 8px 8px;"></i>
                                         <Calendar 
                                           v-model="giristarih" 
                                         
                                           :value="numune.giristarih" 
                                         
                                            dateFormat="dd/mm/yy" 
                                            @date-select="siparisTarihiDegisim" />
                               
                                        </span>
                                   </div>
                                   <div class="p-col-8">
                                       <span>Teslim Tarihi</span>
                                   </div>
                                <div class="p-inputgroup">
                                        <span class="p-inputgroup-addon">
                                          <i class="fas fa-calendar-alt" style="padding: 8px 8px;"></i>
                                       <Calendar 
                                           v-model="yukleme_tarihi" 
                                         
                                           :value="numune.yukleme_tarihi" 
                                          
                                            dateFormat="dd/mm/yy" 
                                            @date-select="yuklemeTarihiDegisim" />
                                        </span>
                                   </div>
                                   <div class="p-col-8">
                                       <span>Müşteri</span>
                                   </div>
                                   <div class="p-inputgroup">
                                     <span class="p-inputgroup-addon">
                                          <i class="pi pi-user" style="padding: 8px 8px;"></i>
                                      
                                         <AutoComplete v-model="musteri" :suggestions="filterMusteriList" @complete="aramaMusteri($event)" 
                                                field="musteriAdi" @item-select="musteriDegisim" @change="musteriChangeEvent($event)"
                                               >
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.musteriAdi}}</div>
                                                    </div>
                                                </template>
                                       </AutoComplete>
                                       </span>
                                   </div>
                                    <div class="p-col-8">
                                       <span>Ülke</span>
                                   </div>
                                   <div class="p-inputgroup">
                                       <span class="p-inputgroup-addon">
                                          <i class="fas fa-globe-asia" style="padding: 8px 8px;">  </i>
                                       <AutoComplete   v-model="ulke" :suggestions="filterUlkeList" @complete="aramaUlke($event)" 
                                           field="ulkeAdi" @item-select="ulkeDegisim"  @change="ulkeChangeEvent($event)">
                                            <template #items="slotProps">
                                                <div class="p-clearfix p-autocomplete-brand-item">
                                                    <div>{{slotProps.ulkeAdi}}</div>
                                                </div>
                                    </template>
                                     
                                      </AutoComplete>
                                      </span>
                                   </div>
                                    <div class="p-col-8">
                                       <span>Adres</span>
                                   </div>
                                   <div class="p-inputgroup">
                                       <span class="p-inputgroup-addon">
                                          <i class="fas fa-map-marker" style="padding: 12px 12px;">  </i>
                                      
                                             <Textarea rows="5" cols="20"       v-model="numune.adres" />
                                           
                                           
                                      </span>
                                   </div>
                                   
                                     <div class="p-col-8">
                                       <span>Temsilci</span>
                                   </div>
                                   <div class="p-inputgroup">
                                     <span class="p-inputgroup-addon">
                                          <i class="pi pi-user" style="padding: 8px 8px;"></i>
                                      
                                       <AutoComplete  v-model="temsilci" :suggestions="filterTemsilciList" @complete="aramaTemsilci($event)" 
                                        field="name" @item-select="temsilciDegisim" >
                                        <template #items="slotProps">
                                            <div class="p-clearfix p-autocomplete-brand-item">
                                                <div>{{slotProps.name}}</div>
                                            </div>
                                        </template>
                                </AutoComplete>
                                    
                                       </span>
                                   </div>
                                   
                               </div>
                           </template>
                       </Card>
                   </div>
                   <div class="p-col-12 p-lg-12">
                       <Card>
                          
                           <template slot="content">
                               <div class="p-grid">
                                   <div class="p-col-12" >
                                       
                                   
                                     
                                   </div>
                               </div>
                                 <div class="p-col-8">
                                    <span>Tracking No</span>
                                </div>
                                    <div class="p-col-8">
                                           <InputText  style="width:220px;" type="text" v-model="numune.takip_No"  />
                                                
                                    </div>
                                    <div class="p-col p-lg-8">
                                             <span>Parite</span>
                                                <div  class="p-col-12">
                                                    <b-input :value="numune.parite" style="width:220px;"  @input="numune.parite = $event" />
                                                 </div>
                                                  
                                 </div>
                                   
                                
                                
                                  
                                  
                                               
                           </template>
                       </Card>
                   </div>
                
                  
                  
                   
               </div>
            </div>
        </div>
    </div>
</template>

<script>


import { required } from 'vuelidate/lib/validators';
import service from '../../service/NumuneService'
import LocalService from '../../service/LocalService';
import fileService from '../../service/FileService';
import CurrencyInput from '../../components/shared/CurrencyInput2';
import CurrencyInput_TL from '../../components/shared/CurrencyInput_TL';
import CurrencyInput_Euro from '../../components/shared/CurrencyInput_Euro';
import CustomInputFile from '../../components/shared/CustomInputFile';
import socket from '../../service/SocketService'

export default {
    
  
    
      data () {
          
     return  {
        
         musteri : null,
         banka: null,
         dis_finans: true,
         odeme : null,
         date : new Date(),
         odemeTutari:0,
         musteri_data : null,
         musteri_list: null,
         numuneLink : '',
         numuneLink2 : '',
         dis_Odeme : false,
       
         dis_Alis: false,
         dis_Satis : false,
         musteriList : null,
         filterMusteriList : null,
         ulke : null,
         ulkeList : null,
         filterUlkeList : null,
         temsilci : null,
         temsilciList : null,
         filterTemsilciList : null,
         dis_numuneBilgi : false,
          numune : {},
          dis_kaydet: false,
         
          dis_takipEt : false,
          dis_urunlistesi : false,
        
          numune_listesi : null,
         
          urunkayit : false,
          
          urunAciklama : "",
          
          yukleme_tarihi : null,
          giristarih : null,
          
          kategori : null,
         
          kategoriList : null,
          dis_urunler : true,
          filterKategoriList : null,
          birim : null,
          birimList : null,
          filterBirimList : null,
         
          
         
        
          urunLoading : false,
          urunList : null,
        
          name : null,
          
          dis_numuneDosyaAc : true,
          
         
          guncellenenMusteri :[],
          kategoriadd :[],
         
         
          validations : {
             kategori : { 
            id : {required}
            },
           
            
            birim : { 
                id : { required }
            }
         }
     }
        
    },
    components : {
             
        currencyInput : CurrencyInput,   
        TL:CurrencyInput_TL,   
        Euro:CurrencyInput_Euro,
        customFileInput : CustomInputFile,
        
        
    },
     props : {

        select_numune : {

             type : String,
             required : false,            
             default : ""
        },
        yeniSiparis : {
            type : Boolean,
            default : true
        },
       
    },
     localService : null,
    
   created(){
        this.localService = new LocalService()
        this.urunkayit = this.yeniSiparis;
       
           
        if(this.urunkayit){

           this.yeniKayitBaslangicIslemler();
         }
         if(!this.urunkayit){
            this.loading = true
            this.urunLoading = true;
            this.dis_urunlistesi = true;
            
           
          
          
            service.getNumune(this.select_numune).then(data => {


            
          
                 this.numune = data.numune;
                
                 this.banka=this.numune.bankaAdi
                 this.odeme = this.numune.gonderiAdi
              
                 if(!this.odeme)
                 {   
                    
                     this.dis_Odeme  = true
                      this.dis_Alis = true
                     this.dis_Satis = true
                 }
                 this.kategori = this.numune.kategoriAdi
                 this.birim = this.numune.urunBirim
                 this.dtUrun = data.numuNeModel;
                 this.urun = {...this.dtUrun};
                 this.dis_numuneBilgi = true
                 this.odemeSecim()
                 this.urunLoading = false;
                 this.dis_urunlistesi = false;
                 this.loading = false;
                 if(this.numune.numuneCloud){

                       this.numuneLink = `https://file-service.mekmar.com/file/download/numune/numuneDosya/${this.numune.id}/${this.numune.numuneCloudDosya}`
                     this.dis_numuneDosyaAc = false;
                 }
                if(this.numune.numuneCloud2){

                       this.numuneLink2 = `https://file-service.mekmar.com/file/download/numune/numuneDosya/${this.numune.id}/${this.numune.numuneCloudDosya2}`
                     this.dis_numuneDosyaAc = false;
                 }
                 if(this.numune)
                  service.getNumuneMusteriTahsilatListe(this.numune.musteriId,this.numune.numuneNo).then(data => {
               
                   
                    this.musteri_list = data.musteri_list[0]
                  
                    
                    this.date = this.localService.getStringDate(this.musteri_list.tarih);
                    this.odemeTutari = this.musteri_list.tutar
                    if(this.musteri_list.banka){
                          this.banka = this.musteri_list.banka
                          this.bankSecim()
                          this.odemeSecim()
                    }
                  else {
                       this.bankSecim()
                  }
               
                
               })
               
                 this.teklifListeleriYukle();
                
                
               
            })
        }
         
    } ,
    methods : {
         degistir_finans(){
            this.is_kaydet = true
            if(!this.date){

                alert('Tarih Seçiniz..')
                return
            }
            const users = JSON.parse(localStorage.getItem('user'))
            const data = {

                tutar : this.odemeTutari,
                tarih : this.localService.getDateString(this.date),
                banka : this.numune.bankaAdi,
                siparisno : this.numune.numuneNo,
                musteri_id : this.numune.musteriId,
                kullaniciadi : users.kullaniciAdi,
                id: this.musteri_list.id



            }


            service.numunetahsilatGuncelleme(data).then(res => {

                if(res){
                    alert("Başarı Şekilde Guncelle Yapıldı!")
                    socket.siparis.emit('numunetahsilat_kayitdegisim_event',data.siparisno)
                    this.default_data()
                }
            } )
        },
          islem(){
            
              if(this.musteri_list){
                 
                  this.degistir_finans()

              }
              else{
                  
                  this.kaydet_finans()
                  }
          },
          kaydet_finans(){ 
          
            if(!this.date){

                alert('Tarih Seçiniz..')
                return
            }

            this.is_loading = true
             const users = JSON.parse(localStorage.getItem('user'))
            const data = {

                tutar : this.numune.kuryeSatis,
                tarih : this.localService.getDateString(this.date),
                banka : this.numune.bankaAdi,
                siparisno : this.numune.numuneNo,
                musteri_id : this.numune.musteriId,
                kullaniciadi : users.kullaniciAdi
            }

       
            service.numunetahsilatKaydetme(data).then(res => {

                if(res){
                    alert("Başarı Şekilde Kayıt İşlemi Yapıldı!")
                    socket.siparis.emit('numunetahsilat_kayitdegisim_event',data.siparisno)
                    this.default_data()
                }
            })
            
        },
         odemeSecim(){
          
            
            if (this.odeme){
                
                 this.numune.gonderiAdi = this.odeme
                 console.log('numune.gonderiAdi',this.numune.gonderiAdi)
                 if(this.odeme =="Customer Account"){
                     this.numune.gonderiId =1
                     this.dis_Alis = true
                     this.dis_Satis = true
                     this.dis_Odeme = true
                     this.banka = ""
                     this.numune.bankaAdi = ""
                    this.numune.bankaId = 0 
                    this.numune.kuryeSatis = 0
                    this.numune.kuryeAlis = 0

                     
                 }
                 else if(this.odeme =="Customer Paid to Mekmar"){
                     this.numune.gonderiId =2
                     this.dis_Alis = false
                     this.dis_Satis = false
                     this.dis_Odeme = false
                 }
                 else if(this.odeme =="Mekmar Paid"){
                      this.numune.gonderiId = 3
                      this.dis_Alis = false
                      this.dis_Satis = true
                      this.dis_Odeme = true
                      this.banka = ""
                      this.numune.bankaAdi = ""
                      this.numune.bankaId = 0 
                      this.numune.kuryeSatis = 0
                 }
            }
            
          },
          bankSecim(){
             
                if(!this.odeme){
                    alert("Gönderi Tipini Seçiniz.")
                }
                else if (this.odeme){
               
                 this.numune.bankaAdi = this.banka
                 if(this.banka =="Maya Paypal"){
                     this.numune.bankaId =1
                 }
                 else if(this.banka =="Maya Bank"){
                     this.numune.bankaId =2
                 }
                 else if(this.banka =="Mekmar Bank"){
                     this.numune.bankaId =3
                 }
            }
          },
          numuneDosyaGonder(event){ 
           
            
            fileService.numuneNumuneGonder(event,this.numune.id).then(data => {
           
               
               if(data.Status){
                   
                   this.numune.numuneCloud = true;
                   this.numune.numuneCloudDosya = data.dosyaAdi;

                   service.setNumuneDosyaKayit(this.numune).then(veri => {
                  
                       if(veri.Status){

                           
                           this.dis_numuneDosyaAc = false;
                           
                           this.numuneLink = `https://file-service.mekmar.com/file/download/numune/numuneDosya/${this.numune.id}/${this.numune.numuneCloudDosya}`
                         
                       }
                   })
               }
           })
          },
           numuneDosyaGonder2(event){ 
           
            
            fileService.numuneNumuneGonder(event,this.numune.id).then(data => {
           
               
               if(data.Status){
                   
                   this.numune.numuneCloud2 = true;
                   this.numune.numuneCloudDosya2 = data.dosyaAdi;

                   service.setNumuneDosyaKayit2(this.numune).then(veri => {
                  
                       if(veri.Status){

                           
                           this.dis_numuneDosyaAc = false;
                           
                           this.numuneLink2 = `https://file-service.mekmar.com/file/download/numune/numuneDosya/${this.numune.id}/${this.numune.numuneCloudDosya2}`
                         
                       }
                   })
               }
           })
          },
          formatPriceDolar(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
         ulkeChangeEvent(){
            let ulke = this.ulkeList.find(x=>x.ulkeId == this.ulke);
           
            if(!ulke){
                
                 this.numune.ulke = null;
            }
            else {
             
                this.musteri = this.musteriList.find(x=>x.musteriAdi == this.musteri);
               
            }
         },
         musteriChangeEvent(){
          
             
         this.numune.musteriAdi = this.musteri
              console.log("musteriChangeEvent",this.musteri)
               console.log("musteriChangeEvent 2 ", this.numune.musteriAdi)
              
           },
         musteriDegisim(){

         
            this.numune.musteriId = this.musteri.id;

            
            this.numune.musteriAdi = this.musteri.musteriAdi
           this.musteri = this.musteriList.find(x=>x.id == this.musteri.id); 
         
           
            if(!this.musteri) {

                
                this.dis_ulke = false;
            }
          },
         ulkeDegisim(){

         
            this.numune.ulke = this.ulke.id;
           
           
           this.ulke = this.ulkeList.find(x=>x.id == this.ulke.id);
           
            if(!this.ulke) {

                
                this.dis_ulke = false;
            }
           },
        temsilciDegisim(){

          
            this.numune.temsilci_id = this.temsilci.id;
           
           this.temsilci = this.temsilciList.find(x=>x.id == this.temsilci.id);
           
            if(!this.temsilci) {

                
                this.dis_ulke = false;
            }
          },
         teklifYeniIslem(){
              this.dis_urunler = false
              this.btn_guncelle = false
              this.btn_iptal = false
                this.selectUrun = null;
           
              
              
          },
          teklifIptalIslem(){
              this.dis_urunler = true
              this.btn_yeni = false
              this.btn_guncelle = true
              this.btn_sil = true
              this.selectUrun = null;
           
              this.form_btn_reset()

          },
        
         form_btn_reset(){

           
            this.dis_urunler = true
           
            this.birim = null
            this.kategori = null
           
            this.selectUrun = null
            
           
        },
         
       
        
         
         degisimKategori(){
           
            
            this.numune.kategoriId = this.kategori.id;
            this.numune.kategoriAdi = this.kategori.name;
           
        
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
        
         siparisTarihiDegisim(){
        
            this.numune.giristarih = this.localService.getDateString(this.giristarih)
          
        },
         yuklemeTarihiDegisim(){
        
            this.numune.yukleme_tarihi = this.localService.getDateString(this.yukleme_tarihi)
           
        },
          degisimBirim(){
           
            this.numune.urunBirimId = this.birim.id;
            this.numune.urunBirim = this.birim.name;
           
        
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
               this.dis_kaydet = false ;
               this.birim = null;
             

          

            },
            teklifKayitIslemi(){
              if(this.kayit_kontrol){
         
                    if(this.urunkayit)this.yeniTeklifKayit();
                    if(!this.urunkayit)this.teklifGuncelleme();
            
              }
            //code sonu

          },
           kayit_kontrol(){
          
         
            if(this.musteri == '' ){

                alert('Lütfen Müşteri Adını Giriniz.')
                return false
            }
            if(this.ulke == '' ){

                alert('Lütfen Ulke Adını Giriniz.')
                return false
            }
            if(this.temsilci == '' ){

                alert('Lütfen Temsilci Adını Giriniz.')
                return false
            }
            if(this.urunListesi == null){

                alert('Lütfen Ürün Bilgilerini Giriniz.')
                return false
            }    
            if(this.giristarih == null){

                alert('Lütfen Numune Tarihini Giriniz.')
                return false
            }  
            else   return true  
           

        },
        
          yeniTeklifKayit(){

             
            
                this.urunLoading = true;
                this.dis_kaydet = true ;
                const veri = {

                    numune : this.numune,

                    kullaniciAdi : this.$store.getters.getUser
                }
           
             

            service.setNumuneKayit(veri).then(data => {
               

                if(data.status){

                     this.$toast.add({severity:'success', summary: 'Bilgi Ekranı', detail:'Yeni Numune Kaydı Yapıldı',  life: 5000});
                     //socket.siparis.emit('teklif_yeni_event',veri.kullaniciAdi);
                    socket.siparis.emit('anaSayfaDegisiklikEvent', data.anaSayfaDegisiklikList)
                     this.numune.id = data.Id;
                     this.urunkayit = false;
                    
                     this.urunLoading = false;
                     return;
                }
                else {

                     this.$toast.add({severity:'error', summary: 'Uyarı Ekranı', detail:'Numune kaydı yapılamadı',  life: 5000});
                }

                this.urunLoading = false;
                this.dis_teklifkaydet = false;
               
                 })
                   this.dis_kaydet = true ;
      
      
       },
          teklifGuncelleme(){
           
           this.urunLoading = true;
           this.dis_kaydet = false ;
            const veri = {

                numune : this.numune,
                eklenenUrunler : this.degisim_yeni_urun,
                guncellenenUrunler : this.degisim_guncellenen_urun,
              
                kullaniciAdi : this.$store.getters.getUser,
                guncellenenMusteri :this.guncellenenMusteri,
                kategoriadd : this.kategoriadd,
                
            }

            
            service.setNumuneGuncelleme(veri).then(data => {

          
              
                if(data.status){

                       this.$toast.add({severity:'success', summary: 'Bilgi Ekranı', detail:'Numune Bilgileri Değiştirildi.',  life: 1000});
                       //socket.siparis.emit('teklif_guncelleme_event',veri.kullaniciAdi);
                    socket.siparis.emit('anaSayfaDegisiklikEvent', data.anaSayfaDegisiklikList)
              }
                else {

                     this.$toast.add({severity:'error', summary: 'Uyarı Ekranı', detail:'Numune kaydı yapılamadı',  life: 5000});
                }

                this.urunLoading = false;
                
            })
            this.dis_kaydet = true ;
           
          },
             teklifYeniUrunIslem(){
                this.dis_urunler = false
                this.btn_sil = false
                this.btn_yeni = false
                
                if(this.numune.urunBirim == '')  {
                    alert("Ürün Birimini seçiniz.")
                }
                
                else if(this.numune.miktar == 0)  {
                    alert("Ürün Miktarını Yazınız.")
                }
            
            
                this.numune.kategoriAdi = this.kategori.name ? this.kategori.name : this.kategori;
               
                this.numune.urunBirim = this.birim.name ? this.birim.name : this.birim;
              
                this.numune.UrunAciklama = this.numune.urunAciklama
                
                if (this.numune.urunBirim == 'M2')  
                   {
                       this.numune.m2 = this.urun.miktar;
                       this.numune.mt = 0
                       this.numune.ton = 0
                       this.numune.adet = 0
                     }
                if (this.numune.urunBirim == 'Adet') 
                  {
                      this.urun.adet = this.urun.miktar;
                      this.urun.mt = 0
                      this.urun.ton = 0
                      this.urun.m2 = 0
                      }
                if (this.numune.urunBirim == 'Mt') 
                   {
                       this.urun.mt = this.urun.miktar;
                       this.urun.m2 = 0
                       this.urun.ton = 0
                       this.urun.adet = 0
                       }
                if (this.numune.urunBirim == 'Ton') 
                  {
                     
                      this.urun.ton = this.urun.miktar;
                      this.urun.mt = 0
                      this.urun.m2 = 0
                      this.numune.adet = 0}
                
              
                if(this.urunListesi == null) this.urunListesi = [];
                
                let index = this.indexBul(this.urun.id,this.urunListesi);
                if(index == -1){
                    this.urun.id = this.idOlustur();
                    if(!this.urunkayit){
                        
                        this.degisim_yeni_urun.push({...this.urun});
                    }
                    this.urunListesi.push({...this.numune});
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
                     this.dis_kaydet = false ;
                    this.birim = null;
                    
                    this.form_btn_reset()
                   
           
                    

            
 
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
            this.btn_sil = false
            this.btn_guncelle = false
            this.btn_iptal = false
            this.btn_yeni = true
            this.urun = {...this.selectUrun};
       
            
            this.kategori = this.kategoriList.find(x=>x.id == this.numune.kategoriId);
            
            this.birim = this.birimList.find(x=>x.id ==this.numune.urunBirimId);
           
            this.urunAciklama = this.numune.aciklama
        
            
    },
     
          yeniKayitBaslangicIslemler(){
            
           
            this.urunLoading = true;
            this.dis_urunlistesi = true;
            this.musteri_list = null; 
            if(!this.odeme)
                 {   
                     
                     this.dis_Odeme  = true
                      this.dis_Alis = true
                     this.dis_Satis = true
                 }
              
            this.teklifListeleriYukle();
            service.getNumuneModel().then(data => {
              
               
                this.numune = data.numune;
                 this.urunLoading = false;
                this.dis_urunlistesi = false;
            })
        },
          aramaMusteri(event){
            setTimeout(()=>{

                let result;
               
                if(event.query.length == 0) result = [...this.musteriList];
               
                else {

                    result = this.musteriList.filter((x)=>{

                        return x.musteriAdi.toLowerCase().startsWith(event.query.toLowerCase())
                    })
                }

                this.filterMusteriList = result;
                this.dis_kaydet = false ;
                console.log("aramaMusteri",result)

            },250)
        },
         aramaUlke(event){
            setTimeout(()=>{

                let result;
               
                if(event.query.length == 0) result = [...this.ulkeList];
               
                else {

                    result = this.ulkeList.filter((x)=>{

                        return x.ulkeAdi.toLowerCase().startsWith(event.query.toLowerCase())
                    })
                }

                this.filterUlkeList = result;

            },250)
        },
         aramaTemsilci(event){
            setTimeout(()=>{

                let result;
               
                if(event.query.length == 0) result = [...this.temsilciList];
               
                else {

                    result = this.temsilciList.filter((x)=>{

                        return x.name.toLowerCase().startsWith(event.query.toLowerCase())
                    })
                }

                this.filterTemsilciList = result;

            },250)
        },
         teklifListeleriYukle(){

              service.getFormListeler().then(data => {
                

                this.musteriList = data.musteriList;
                this.ulkeList = data.ulkeList;
                this.temsilciList = data.temsilciList
                
                this.kategoriList = data.kategoriList;
               
                this.birimList = data.birimList;
                this.urunAciklama = data.urunAciklama;
               if(!this.urunkayit){   

                   this.musteri = this.musteriList.find(x=> x.id == this.numune.musteriId);
                   this.ulke = this.ulkeList.find(x=> x.id == this.numune.ulke);
                  
                   this.temsilci = this.temsilciList.find(x=> x.id == this.numune.temsilci_id);
                     this.giristarih = this.localService.getStringDate(this.numune.giristarih);
            
                 this.yukleme_tarihi = this.localService.getStringDate(this.numune.yukleme_tarihi);
                  
               }
              

                this.urunLoading = false;
                this.dis_urunlistesi = false;
             })
        },
    } 
   
}
</script>
<style scoped>
  .p-float-label{

      font-size: 8px;
  }

/* Responsive layout - makes a two column-layout instead of four columns */
@media screen and (max-width: 900px) {
  .column {
    width: 50%;
  }
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
.btn {
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 14px 28px;
  font-size: 16px;
  cursor: pointer;
}

/* Green */
.success {
  border-color: #04AA6D;
  color: green;
}

.success:hover {
  background-color: #04AA6D;
  color: white;
}

/* Blue */
.info {
  border-color: #2196F3;
  color: dodgerblue
}

.info:hover {
  background: #2196F3;
  color: white;
}

/* Orange */
.warning {
  border-color: #ff9800;
  color: orange;
}

.warning:hover {
  background: #ff9800;
  color: white;
}

/* Red */
.danger {
  border-color: #f44336;
  color: red
}

.danger:hover {
  background: #f44336;
  color: white;
}

/* Gray */
.default {
  border-color: #e7e7e7;
  color: black;
}

.default:hover {
  background: #e7e7e7;
}


</style>