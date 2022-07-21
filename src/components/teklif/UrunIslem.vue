<template>
    <div class="p-fluid" >
      
         <div class="p-grid">
             <div class="p-col-12">
                <div class="card">
                    <div class="p-grid">
                        <div class="p-col-12">
                            <div class="p-grid urunInput">
                                <div class="p-col-12 p-md-1">
                                    <div class="p-grid">
                                        <div class="p-col-12 p-md-12">
                                            <label v-text-center forHtml="uruntarihi">Tarih</label>
                                        </div>
                                        <div class="p-col-12 p-md-12">
                                            <Calendar id="uruntarihi" v-model="urunTarihi" @date-select="urunTarihiDegisim" dateFormat="dd.mm.yy" />
                                        </div>
                                    </div>
                                </div>
                                <div class="p-col-12 p-md-2">
                                    <div class="p-grid">
                                        <div class="p-col-12 p-md-12">
                                            <label v-text-center forHtml="kategori">Kategori</label>
                                        </div>
                                        <div class="p-col-12 p-md-12">
                                         <AutoComplete v-model="kategori" :suggestions="filterKategoriList" @complete="aramaKategori($event)"
                                         :dropdown="true" field="name" @item-select="degisimKategori"  >
                                             <template #items="slotProps">
                                                 <div class="p-clearfix p-autocomplete-brand-item">
                                                     <div>{{slotProps.name}}</div>
                                                 </div>
                                             </template>
                                         </AutoComplete> 
                                        </div>
                                    </div>
                                </div>
                                <div class="p-col-12 p-md-2">
                                    <div class="p-grid">
                                        <div class="p-col-12 p-md-12">
                                            <label v-text-center forHtml="input">Ürün</label>
                                        </div>
                                        <div class="p-col-12 p-md-12">
                                         
                                             <AutoComplete v-model="urunL" :suggestions="filterUrunList" @complete="aramaUrun($event)"
                                                :dropdown="true" field="name" @item-select="degisimUrun"  >
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.name}}</div>
                                                    </div>
                                                </template>
                                            </AutoComplete> 
                                        </div>
                                    </div>
                                </div>
                                <div class="p-col-12 p-md-1" style="width:200px;">
                                    <div class="p-grid">
                                        <div class="p-col-12 p-md-12">
                                            <label v-text-center forHtml="input">En Boy</label>
                                        </div>
                                        <div class="p-col-12 p-md-12">
                                           
                                             <AutoComplete v-model="enBoy" :suggestions="filterEnBoyList" @complete="aramaEnBoy($event)"
                                                :dropdown="true" field="name" @item-select="degisimEnBoy"  >
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.name}}</div>
                                                    </div>
                                                </template>
                                            </AutoComplete> 
                                        </div>
                                    </div>
                                </div>
                                <div class="p-col-12 p-md-1" style="width:100px;">
                                    <div class="p-grid">
                                        <div class="p-col-12 p-md-12">
                                            <label v-text-center forHtml="input">K</label>
                                        </div>
                                        <div class="p-col-12 p-md-12">
                                           
                                             <AutoComplete v-model="kalinlik" :suggestions="filterKalinlikList" @complete="aramaKalinlik($event)"
                                                :dropdown="true" field="name" @item-select="degisimKalinlik"  >
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.name}}</div>
                                                    </div>
                                                </template>
                                            </AutoComplete> 
                                        </div>
                                    </div>
                                
                                </div>
                                <div class="p-col-12 p-md-2">
                                    <div class="p-grid">
                                        <div class="p-col-12 p-md-12">
                                            <label v-text-center forHtml="input">Yüzey İşlem</label>
                                        </div>
                                        <div class="p-col-12 p-md-12">
                                        
                                           <AutoComplete v-model="yuzey" :suggestions="filterYuzeyList" @complete="aramaYuzey($event)"
                                                :dropdown="true" field="name" @item-select="degisimYuzey"  >
                                                <template #items="slotProps">
                                                    <div class="p-clearfix p-autocomplete-brand-item">
                                                        <div>{{slotProps.name}}</div>
                                                    </div>
                                                </template>
                                            </AutoComplete> 
                                        </div>
                                    </div>
                                </div>
                                <div class="p-col-12 p-md-1"  style="width:100px;">
                                    <div class="p-grid">
                                        <div class="p-col-12 p-md-12">
                                            <label forHtml="input">Fob Fiyat</label>
                                        </div>
                                        <div class="p-col-12 p-md-12">
                                            <currency-input :value="urun.fobFiyat" :disAktif="false" @input="urun.fobFiyat = $event" />
                                        </div>
                                    </div>
                                </div>
                                <div class="p-col-12 p-md-1"  style="width:100px;">
                                    <div class="p-grid">
                                        <div class="p-col-12 p-md-12">
                                            <label forHtml="input">Seçim F</label>
                                        </div>
                                        <div class="p-col-12 p-md-12">
                                            <currency-input  :value="urun.teklifFiyat" :disAktif="dis_teklifFiyat" @input="urun.teklifFiyat = $event" />
                                        </div>
                                    </div>
                                </div>
                                <div class="p-col-12 p-md-1" style="width:100px;">
                                    <div class="p-grid">
                                        <div class="p-col-12 p-md-12">
                                            <label forHtml="input">Birim</label>
                                        </div>
                                        <div class="p-col-12 p-md-12">
                                             
                                              <AutoComplete v-model="birim" :suggestions="filterBirimList" @complete="aramaBirim($event)"
                                                :dropdown="true" field="name" @item-select="degisimBirim"  >
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
                        </div>
                    
                    </div>
                </div>
             </div>
         </div>
         <div class="p-grid">
            <div class="p-col-3">
               <div class="card p-offset-1">
                   <div class="p-grid">
                        <div class="p-col-12 p-md-6">
                    <Button style="background-color:#00FFFF;color:black;" label="Proforma" conPos="left" icon="fas fa-file-invoice-dollar" @click="proformaVisible = true"/>
                    <Dialog :visible.sync="proformaVisible" :style="{width: '500px'}" :modal="true" header="Proforma" >
                        <div class="p-cardialog-content" style="height: 500px;background-color:#f4f4f4;">
                            <div class="p-grid">
                                <div class="p-col-12">
                                    <div class="card">
                                        <div class="p-grid">
                                            <div class="p-col-12 p-md-4">
                                                <label forHtml="input">Po :</label>
                                            </div>
                                            <div class="p-col-12 p-md-8">
                                                <InputText type="text"/> 
                                            </div>
                                             <div class="p-col-12 p-md-4">
                                                <label forHtml="input">Tarih :</label>
                                            </div>
                                            <div class="p-col-12 p-md-8">
                                                 <Calendar v-model="proformaTarihi" @date-select="proformaTarihiDegisim" dateFormat="dd.mm.yy" />
                                            </div>
                                            <div class="p-col-12 p-md-6">
                                                <custom-file-input />
                                            </div>
                                            <div class="p-col-12 p-md-6">
                                                <Button label="Proforma Aç" />
                                            </div>
                                            <div class="p-col-12 p-md-4">
                                                <label forHtml="input">Tutar : </label>
                                            </div>
                                            <div class="p-col-12 p-md-8">
                                                <currency-input :value="teklif.proformaTutar" :disAktif="false" @input="teklif.proformaTutar = $event" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>

                </div>

                <div class="p-col-12 p-md-6">
                    <Button style="background-color:#DC143C" label="Numune" iconPos="left" icon="fas fa-file-invoice" @click="numuneVisible = true" />
                     <Dialog :visible.sync="numuneVisible" :style="{width: '600px'}" :modal="true" header="Numune Takip" >
                        <div class="p-cardialog-content" style="height: 580px;background-color:#f4f4f4;">
                            <div class="p-grid">
                                <div class="p-col-12">
                                    <div class="card">
                                        <div class="p-grid">
                                            <div class="p-col-12 p-md-4">
                                                <label forHtml="input">Giriş Tarihi</label>
                                            </div>
                                             <div class="p-col-12 p-md-8">
                                                 <Calendar v-model="numuneGirisTarihi" @date-select="numuneTarihiDegisim" dateFormat="dd.mm.yy" />
                                            </div>
                                            <div class="p-col-12 p-md-4">
                                                <label forHtml="input">Tracking No</label>
                                            </div>
                                            <div class="p-col-12 p-md-8">
                                               <InputText type="text" v-model="teklif.numuneTrackingNo" />
                                            </div>
                                            <div class="p-col-12 p-md-4">
                                                <label forHtml="input">Ödenen</label>
                                            </div>
                                            <div class="p-col-12 p-md-8">
                                                <currency-input :value="teklif.numuneOdenenTutar" :disAktif="false" @input="teklif.numuneOdenenTutar = $event" />
                                            </div>
                                            <div class="p-col-12 p-md-4">
                                                <label forHtml="input">Alınan</label>
                                            </div>
                                            <div class="p-col-12 p-md-8">
                                                <currency-input :value="teklif.numuneAlinanTutar" :disAktif="false" @input="teklif.numuneAlinanTutar = $event" />
                                            </div>
                                            <div class="p-col-12 p-md-4">
                                                <label forHtml="input">H.Tarihi</label>
                                            </div>
                                            <div class="p-col-12 p-md-8">
                                                 <Calendar v-model="numuneHatirlatmaTarihi" @date-select="numuneHatirlatmaTarihiDegisim" dateFormat="dd.mm.yy"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
                   </div>
               </div>
            </div>
            <div class="p-col-4">
                <div class="card">
                    <div class="p-grid">
                        <div class="p-col-12 p-col-md-4 p-lg-4">
                            <Button label="Ekle" iconPos="left" icon="fas fa-plus-circle" v-tooltip="'ürün ekle'"  class="p-button-info" @click="urunEkle" />
                        </div>
                        <div class="p-col-12 p-col-md-4 p-lg-4">
                            <Button :disabled="dis_urunSil" label="Sil" iconPos="left" icon="fas fa-trash-alt" v-tooltip="'ürün sil'" @click="urunSil"  class="p-button-danger"/>
                        </div>
                        <div class="p-col-12 p-col-md-4 p-lg-4">
                            <Button label="vazgeç" iconPos="left" icon="fas fa-minus-circle" class="p-button-secondary" />
                        </div>
                    </div>
                </div>
            </div>
               <div class="p-col-4">
                 <div class="card">
                    <div class="p-grid">
                        <div class="p-col-12 p-md-6 p-lg-4">
                             <Button label="T.Kaydet" iconPos="left" icon="fas fa-save" v-tooltip="'teklif kaydet'" class="p-button-success" @click="teklifKaydet" />
                        </div>
                        <div class="p-col-12 p-md-6 p-lg-4">
                            <Button :disabled="dis_teklifSil" label="T.Sil" iconPos="left" icon="fas fa-trash-alt" v-tooltip="'teklif sil'" class="p-button-warning" />
                        </div>
                        <div class="p-col-12 p-md-3">
                            <Checkbox id="takip" v-model="teklif.takipEt" :binary="true"/>
                            <label for="takip" class="p-checkbox-label">Takip Et</label>
                        </div>

                    </div>
                </div>
            </div>
         </div>
        
    </div>
</template>
<script>
import CurrencyInput from '../../components/shared/CurrencyInput';
import CustomInputFile from '../../components/shared/CustomInputFile';
import LocalService from '../../service/LocalService';

export default {
    components:{

        currencyInput : CurrencyInput,      
        customFileInput : CustomInputFile,
        
    },
    data () {

        return{
            urunTarihi : null,
            proformaVisible : false,
            proformaTarihi : null,
            numuneVisible : false,
            numuneGirisTarihi : null,
            numuneHatirlatmaTarihi : null,
            filterKategoriList : null,
            filterUrunList : null,
            filterEnBoyList: null,
            filterKalinlikList : null,
            filterYuzeyList : null,
            filterBirimList : null,
        }
    },
    props : [
        'kategoriList',
        'urunList',       
        'enBoyList',
        'kalinlikList',
        'yuzeyList',
        'urun',
        'teklif',       
        'urunLoading',
        'dis_urunSil',
        'dis_teklifSil',
        'dis_teklifFiyat',
        'kategori',
        'urunL',
        'kalinlik',
        'enBoy',
        'yuzey',
        'birimList',
        'birim'

    ],
    methods:{
      
        urunTarihiDegisim(){

            this.urun.tarih = this.localService.getDateString(this.urunTarihi);
        },
        birimDegisim(){
           
            this.urun.birim = this.selectBirim.name;
        },
        proformaTarihiDegisim(){

            this.teklif.proformaTarihi = this.localService.getDateString(this.proformaTarihi);
        },
        numuneHatirlatmaTarihiDegisim(){
            this.teklif.numuneHatirlatmaTarihi = this.localService.getDateString(this.numuneHatirlatmaTarihi);
        },
        numuneTarihiDegisim(){
            this.teklif.numuneGirisTarihi = this.localService.getDateString(this.numuneGirisTarihi);
        },
        urunEkle(){

           if(this.dis_teklifFiyat) this.urun.teklifFiyat = this.urun.fobFiyat; 
           this.$emit('teklifYeniUrun',this.urun); 
           this.urunTarihi = null;
        },
        urunSil(){
           
            if(this.urun.id){

                this.$emit('teklifUrunSil',this.urun.id)
            }
        },
        teklifKaydet(){

            this.$emit('yeniTeklifKayit');
        },
        aramaKategori(event){

            setTimeout(()=> {

                let result;
                if(event.query.length == 0) result = [...this.kategoriList];
                else {

                    result = this.kategoriList.filter((x)=>{

                        return x.name.toLowerCase().startsWith(event.query.toLowerCase())
                    })
                }
                this.filterKategoriList = result;

            },250)
        },
        degisimKategori(){

            this.urun.kategoriId = this.kategori.id;
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
        },
        aramaBirim(event){

            setTimeout(()=> {

                let result;
                if(event.query.length == 0) result = [...this.birimList];
                else {

                    result = this.birimList.filter((x)=>{

                        return x.name.toLowerCase().startsWith(event.query.toLowerCase())
                    })
                }
                this.filterBirimList = result;

            },250)
        },
        degisimBirim(){

            this.urun.birimId = this.birim.id;
        }
        

    },
    localService : null,
    created(){

        this.localService = new LocalService();
        
    }
}
</script>