<template>
    <section>
        <div class="columns">
            <div class="column is-6">
                <div class="columns is-multiline">
                    <div class="column is-6" style="background-color: white">
                        <b-field label="Müşteri Adı" labelPosition="on-border">
                            <b-input v-model="nthmusteri.musteriadi" :disabled="true" />
                        </b-field>
                    </div>
                    <div class="column is-6" style="background-color: white">
                        <b-field label="Siparis No" labelPosition="on-border">
                            <b-input v-model="nthmusteri.siparisno" :disabled="true" />
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <b-field label="Tarih" label-position="on-border">
                            <b-datepicker v-model="date" :disabled="is_form"  />
                        </b-field>
                    </div>
                    <div class="column is-6" style="background-color: white">
                        <b-field label="Bakiye" label-position="on-border" >
                            <b-input   :disabled="true" v-model="nthmusteri.bakiye" />
                        </b-field>
                    </div>
                   
                    <div class="column is-6">
                        <b-field label="Tutar" labelPosition="on-border">
                            <b-input style="text-align:center;" v-model="nthmusteri.tutar" :disabled="is_form" />
                        </b-field>
                    </div>
                    <div class="column is-6">
                        <b-field label="Masraf" labelPosition="on-border">
                            <b-input v-model="nthmusteri.masraf" :disabled="is_form" />
                        </b-field>
                    </div>
                    <div class="column is-6">
                          <b-field label="Banka Seçimi" labelPosition="on-border">
                             <Dropdown v-model="selectBanka" style="background-color:white" :options="bankaList" optionLabel="name"  />
                             </b-field>
                        </div>
                     <div class="column is-12">
                        <b-field label="Not" labelPosition="on-border">
                            <b-input v-model="nthmusteri.aciklama"  type="textarea"></b-input>
                        </b-field>
                    </div>
                   
                    <div class="column is-4">
                        <b-button
                        :disabled="is_kaydet"
                        type="is-success"
                        @click="kaydet_click"
                        >
                        Yeni
                        </b-button>
                    </div>
                    <div class="column is-4">
                        <b-button
                        :disabled="is_degistir"
                        type="is-warning"
                        @click="degistir_click"
                        >
                        Guncelle
                        </b-button>
                    </div>
                    <div class="column is-4">
                        <b-button
                        :disabled="is_sil"
                        type="is-danger"
                        @click="sil_click"
                        >
                        Sil
                        </b-button>
                    </div>
                </div>
            </div>
            <div class="column is-6">
                <DataTable
                :value="nthmusteri_list"
                dataKey="id"
                selectionMode="single"
                :selection="select_list"
                :loading="is_loading"
                @row-select="tahsilat_secim($event)"
                >
                    <Column field="tarih" header="Tarih" bodyStyle="text-align:center;" >
                        <template #body="slotProps">
                            {{slotProps.data.tarih}}
                        </template>
                    </Column>
                     
                    <Column field="siparisno" header="Sipariş No" bodyStyle="text-align:center;" >
                        <template #body="slotProps">
                            {{slotProps.data.siparisno}}
                        </template>
                    </Column>
                    <Column field="tutar" header="Tutar" bodyStyle="text-align:center;">
                        <template #body="slotProps">
                            {{formatPrice (slotProps.data.tutar )}}
                        </template>
                        
                    </Column>
                    <Column field="masraf" header="Masraf" bodyStyle="text-align:center;" >
                        <template #body="slotProps">
                            {{formatPrice (slotProps.data.masraf )}}
                        </template>
                       
                    </Column>
                </DataTable>
            </div>
        </div>
    </section>
</template>
<script>
import { mapGetters } from 'vuex'
import LocalService from '../../service/LocalService'
import socket from '../../service/SocketService'
import service from '../../service/NumuneService'
export default {
    
    data(){

        return {

            is_form : false,
            date : new Date(),
            is_kaydet : false,
            is_sil : true,
            is_degistir : true,
            select_list : null,
            is_loading : false ,
            selectBanka : null,
            bankaList : [
                {id : 1, name : 'Maya Bank'},
                {id : 2, name : 'Maya Paypal'},
                {id : 3, name : 'Mekmar Bank'},
                {id : 4, name : 'Diğer'}
            ],
        }
    },
    localService : null,
    
    created(){
       
        this.localService = new LocalService()
        
         this.selectBanka = this.bankaList.find(x=> x.name == this.nthmusteri.banka);
    
    },
    mounted(){
       
    },
    computed : {

        ...mapGetters([
            'nthmusteri_list_toplam_masraf',
            'nthmusteri_list_toplam_tutar',
            'nthmusteri_list',
            'nthmusteri'
        ])
    },
    
    methods : {
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return "$" +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },

        tahsilat_secim(event){
       
            
            this.select_list = event.data
           
             this.selectBanka = this.bankaList.find(x=> x.name == this.nthmusteri.banka);
            this.date = this.localService.getStringDate(event.data.tarih)
           
            this.$store.dispatch('numunetahsilatSecimAct',event.data)
            this.is_kaydet = true
            this.is_degistir = false
            this.is_sil = false
        },
        default_data(){
            
            service.getNumuneMusteriTahsilatListe(this.nthmusteri.musteri_id,this.nthmusteri.siparisno).then(data => {
               
                this.$store.dispatch('numunetahsilatLoadAct',data)
                this.is_loading = false
                this.is_form = false
                this.date = new Date()
                this.is_kaydet = false
                this.is_sil = true
                this.is_degistir = true
                this.selectBanka = ""
            })
        },
        kaydet_click(){

            if(!this.date){

                alert('Tarih Seçiniz..')
                return
            }

            this.is_loading = true
            this.nthmusteri.banka = this.selectBanka.name;
            const data = this.nthmusteri;

            data.tarih = this.localService.getDateString(this.date)

            const users = JSON.parse(localStorage.getItem('user'))
            data.kullaniciadi = users.kullaniciAdi
          
            
            service.numunetahsilatKaydetme(data).then(res => {

                if(res){

                    socket.siparis.emit('numunetahsilat_kayitdegisim_event',data.siparisno)
                    this.default_data()
                }
            })
            
        },
        degistir_click(){
            this.is_kaydet = true
            if(!this.date){

                alert('Tarih Seçiniz..')
                return
            }
            this.nthmusteri.banka = this.selectBanka.name;
            const data = this.nthmusteri;

            data.tarih = this.localService.getDateString(this.date)

            const users = JSON.parse(localStorage.getItem('user'))
            data.kullaniciadi = users.kullaniciAdi

            service.numunetahsilatGuncelleme(data).then(res => {

                if(res){

                    socket.siparis.emit('numunetahsilat_kayitdegisim_event',data.siparisno)
                    this.default_data()
                }
            } )
        },
        sil_click(){

            if(!this.date){

                alert('Tarih Seçiniz..')
                return
            }
            const id = this.nthmusteri.id

            service.numunetahsilatSilme(id).then(res => {

                if(res){

                    socket.siparis.emit('numunetahsilat_kayitdegisim_event',this.nthmusteri.siparisno)
                    this.default_data()
                }
            })
        }
    }
}
</script>
<style  scoped>
    .input-style{

        text-align: center;
    }
</style>