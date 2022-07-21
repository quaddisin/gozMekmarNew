<template>
    <section>

        <div class="columns is-centered" style="margin-top:-15px;margin-left:-22px;">
            <div class="column is-5" style="margin-top:-13px;">
                <DataTable :value="seleksiyon_uretimozetlist">
                    <Column field="tanim" header="Üretici" bodyStyle="text-align:center;">
                        <template #body="slotProps">
                            {{slotProps.data.tanim}}
                        </template>
                        <template #footer>
                            Toplam
                            <p style="font-size:10px">
                                (Mekmar + Mekmoz)
                            </p>

                        </template>
                    </Column>
                    <Column field="gun" header="Bugün" bodyStyle="text-align:center;">
                        <template #body="slotProps">
                            {{formatDecimal(slotProps.data.gun)}}
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_gun )}}
                        </template>
                    </Column>
                    <Column field="ay" header="Ay" bodyStyle="text-align:center;">
                        <template #body="slotProps">
                            {{formatDecimal(slotProps.data.ay )}}
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_ay)}} ({{formatDecimal(toplam_m_mek)}})
                        </template>
                    </Column>
                    <Column field="yil" header="Yıl" bodyStyle="text-align:center;">
                        <template #body="slotProps">
                            {{formatDecimal(slotProps.data.yil)}}
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_yil) }}
                        </template>
                    </Column>

                </DataTable>
            </div>
            <div class="column is-1">
                <b-button @click="btn_yeni_click" icon-pack="far" icon-left="file" expanded type="" class="yeniButton">
                    Yeni
                </b-button>
            </div>
            <div class="column is-1">
                <b-button :disabled="slk_enb_mekmar" @click="btn_mekmar_click" expanded type="" class="mekmarButton">
                    Mekmer
                </b-button>
                <b-button :disabled="slk_enb_dis" @click="btn_dis_click" expanded type="" class="disButton">
                    Dış
                </b-button>
                <b-button :disabled="slk_enb_mekmer_dis" @click="btn_mekmer_dis_click" expanded type="" class="disMekmerButton">
                    Mekmer Dış
                </b-button>
            </div>

            <div class="column is-1" v-if="isDesktop">

                <b-button @click="excel_cikti_click" type="is-dark">
                    <i class="far fa-file-excel"> Excel </i>
                </b-button>
            </div>
            <div v-if="isDesktop">
                <div class="column is-12 box"
                    style="height: 119px;background-color:#f4f4f4;margin-left:-10px;padding-right:15px;">
                    <h5 class="subtitle">Etiket Çıkart</h5>
                    <div class="columns is-multiline">
                        <div class="column is-6">
                            <b-datepicker size="is-small" icon="calendar-today" v-model="son_tarih"
                                placeholder="Tarih Giriniz ! ">
                                <button class="button is-danger">
                                    <span>Temizle</span>
                                </button>
                            </b-datepicker>
                        </div>
                        <div class="column is-5">
                            <b-button @click="etiket_cikti_click" type="is-dark">
                                <i class="fas fa-tags"> Etiket </i>
                            </b-button>
                        </div>

                    </div>

                </div>
                <div class="column is-12 box"
                    style="height: 175px;background-color:#f4f4f4;margin-left:-10px;padding-right:15px;margin-top:-15px;">
                    <div class="columns">
                        <div class="column is-6">
                            <Dropdown v-model="codeSelected" style="width:150px;" :options="etiketlerVeikKutu"
                                optionLabel="urun" @change="isDropDownChange" placeholder="Veik Kutu Etiketi" />

                        </div>
                        <div class="column is-6">
                            <Dropdown v-model="codeSelectedKasa" style="width:150px;" :options="etiketlerVeikKasa"
                                optionLabel="urun" @change="isDropDownChangeTwo" placeholder="Veik Kasa Etiketi" />
                        </div>
                    </div>

                    <div class="columns">
                        <div class="column is-6">
                            <Dropdown v-model="codeSelected" style="width:150px;" :options="etiketlerNovaKutu"
                                optionLabel="urun" @change="isDropDownChangeThree" placeholder="Nova Kutu Etiketi" />

                        </div>
                        <div class="column is-6">
                            <Dropdown v-model="codeSelectedKasa" style="width:150px;" :options="etiketlerNovaKasa"
                                optionLabel="urun" @change="isDropDownChangeFour" placeholder="Nova Kasa Etiketi" />
                        </div>
                    </div>
                    <div class="columns is-centered">
                        <Button type="button" @click="etiketDowload()" icon="fas fa-download" label="Indir"
                            style="margin-right: .5em;padding-bottom: 2px;"></Button>
                    </div>
                </div>


            </div>


        </div>





        <Dialog v-model:visible.sync="is_uretimform" :style="{width : '1500px'}" header="Seleksiyon Form" :modal="true">
            <section>
                <div class="container">
                    <div class="columns">
                        <div class="column is-12">
                            <UretimForm :kayitstatu="true" :kasano="0" />
                        </div>
                    </div>
                </div>
            </section>
        </Dialog>
    </section>
</template>
<script>
import { mapGetters } from 'vuex'
import UretimForm from '../../views/seleksiyon/UretimForm'
import socket from '../../service/SocketService'
import service from '../../service/SeleksiyonService'
import LocalService from '../../service/LocalService'
import Opservice from '../../service/OperasyonService'

export default {
    
    components : {

        UretimForm
    },
    computed : {

        ...mapGetters([
            'slk_dis_yeni_btn',
            'slk_dis_kaydet_btn',
            'slk_dis_vazgec_btn',
            'slk_dis_guncelle_btn',
            'slk_dis_sil_btn',
            'slk_enb_mekmar',
            'slk_enb_dis',
            'slk_enb_mekmer_dis',
            'seleksiyon_uretimozetlist',
            'seleksiyon_mekmar_uretimlist',
            'seleksiyon_dis_uretimlist',
            'seleksiyon_mekmer_dis_uretimlist',
            'servis_adres',
            'getMobilWidth'
           
        ])
    },
    data(){

        return {
            seleksiyonData:null,
            etiketlerVeikKutu: [
                { code: 'SNS01', urun: 'MINA RUSTIC KENARI KIRIK (SNS01)' },
                { code: 'SNS02', urun: 'MINA RUSTIC DÜZ KENAR (SNS02)' },
                { code: 'SBR01', urun: 'SILVER RUSTIC KENARI KIRIK (SBR01)' },
                { code: 'SBR02', urun: 'SILVER RUSTIC DÜZ KENAR (SBR02)' },
                { code: 'SBY01', urun: 'ELA KENARI KIRIK (SBY01)' },
                { code: 'SBY02', urun: 'ELA DÜZ KENAR (SBY02)' },
                { code: 'SBS01', urun: 'PICASSO KENARI KIRIK (SBS01)' },
                { code: 'SBS02', urun: 'PICASSO DÜZ KENAR (SBS02)' },
                { code: 'ST-450', urun: 'MINA RUSTIC DÜZ KENAR (ST-450)' },
                { code: 'ST-448', urun: 'SILVER RUSTIC DÜZ KENAR (ST-448)' },
                { code: 'VKGD-SNS', urun: 'CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)' },
                { code: 'VKCS-FM01', urun: 'GOLD (VKCS-FM01)' },
                { code: 'VKCS-FM02', urun: 'SILVER (VKCS-FM02)' }
            ],

            etiketlerNovaKutu: [
                { code: 'FP-01', urun: 'SCABOS KENARI KIRIK (FP-01)' },
                { code: 'FP-02', urun: 'PICASSO KENARI KIRIK (FP-02)' },
                { code: 'FP-03', urun: 'IVORY RUSTIC KENARI KIRIK (FP-03)' },
                { code: 'FP-04', urun: 'CLASSIC MINA KENARI KIRIK (FP-04)' },
                { code: 'FP-05', urun: 'GOLDEN INK KENARI KIRIK (FP-05)' },
                { code: 'FP-06', urun: 'BAOMIX KENARI KIRIK (FP-06)' },
                { code: 'FP-07', urun: 'MINA RUSTIC KENARI KIRIK (FP-07)' },
                { code: 'FP-08', urun: 'VANILLA BEIGE KENARI KIRIK (FP-08)' },
                { code: 'FP-09', urun: 'ELA KENARI KIRIK (FP-09)' },
                { code: 'FP-10', urun: 'SILVER RUSTIC KENARI KIRIK (FP-10)' },

            ],


            etiketlerVeikKasa: [
                { code: 'SNS-01-K', urun: 'MINA RUSTIC KENARI KIRIK (SNS01)' },
                { code: 'SNS-02-K', urun: 'MINA RUSTIC DÜZ KENAR (SNS02)' },
                { code: 'SBR-01-K', urun: 'SILVER RUSTIC KENARI KIRIK (SBR01)' },
                { code: 'SBR-02-K', urun: 'SILVER RUSTIC DÜZ KENAR (SBR02)' },
                { code: 'SBY-01-K', urun: 'ELA KENARI KIRIK (SBY01)' },
                { code: 'SBY-02-K', urun: 'ELA DÜZ KENAR (SBY02)' },
                { code: 'SBS-01-K', urun: 'PICASSO KENARI KIRIK (SBS01)' },
                { code: 'SBS-02-K', urun: 'PICASSO DÜZ KENAR (SBS02)' },
                { code: 'ST-450-K', urun: 'MINA RUSTIC DÜZ KENAR (ST-450)' },
                { code: 'ST-448-K', urun: 'SILVER RUSTIC DÜZ KENAR (ST-448)' },
                { code: 'VKGD-SNS-K', urun: 'CLASSIC VEIN CUT DÜZ KENAR (VKGD-SNS)' },
                { code: 'VKCS-FM01-K', urun: 'GOLD (VKCS-FM01)' },
                { code: 'VKCS-FM02-K', urun: 'SILVER (VKCS-FM02)' }
            ],

            etiketlerNovaKasa: [
                { code: 'FP-01-K', urun: 'SCABOS KENARI KIRIK (FP-01)' },
                { code: 'FP-02-K', urun: 'PICASSO KENARI KIRIK (FP-02)' },
                { code: 'FP-03-K', urun: 'IVORY RUSTIC KENARI KIRIK (FP-03)' },
                { code: 'FP-04-K', urun: 'CLASSIC MINA KENARI KIRIK (FP-04)' },
                { code: 'FP-05-K', urun: 'GOLDEN INK KENARI KIRIK (FP-05)' },
                { code: 'FP-06-K', urun: 'BAOMIX KENARI KIRIK (FP-06)' },
                { code: 'FP-07-K', urun: 'MINA RUSTIC KENARI KIRIK (FP-07)' },
                { code: 'FP-08-K', urun: 'VANILLA BEIGE KENARI KIRIK (FP-08)' },
                { code: 'FP-09-K', urun: 'ELA KENARI KIRIK (FP-09)' },
                { code: 'FP-10-K', urun: 'SILVER RUSTIC KENARI KIRIK (FP-10)' },

            ],
            codeSelected: '',
            codeSelectedKasa: '',
            etiketKodu: '',
            etiketLink: '',
            code: '',
            uretim_tablo : "", 
            toplam_gun : 0,
            toplam_ay : 0,
            toplam_t_m:0,
            toplam_yil : 0,
            toplam_m_mek:0,
            son_tarih: null,
            isDesktop:true,
            filter_uretim_listesi : null,
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

            is_uretimform : false,
            selectedOrder: null,
            sipNo: [
                
            ]
            
        }
    },
    localService : null,
    created(){
        if (this.getMobilWidth < 600) {
            this.isDesktop = false
        }
         this.localService = new LocalService()
        socket.siparis.on('seleksiyon_kayitguncelle_emit',() => {

            this.$store.dispatch('loadBegin')
            service.getUretimOzetList().then(data => {

                
                this.$store.dispatch('seleksiyon_uretimozetlist_act',data.uretimozetlist)
                this.ozetlist_topla()
                this.$store.dispatch('loadEnd')
            })
        })

        if(this.seleksiyon_uretimozetlist){

            this.ozetlist_topla()

        }

        service.getUretimSipListesi().then(data=>{
            for(var i in data){
                this.sipNo.push({name:data[i].sipNo})
            }
        })




       
    },
    methods: {
        isDropDownChange(event) {
            this.code = event.value.code
        },
        isDropDownChangeTwo(event) {
            this.code = event.value.code
        },
        isDropDownChangeThree(event) {
            this.code = event.value.code
        },
        isDropDownChangeFour(event) {
            this.code = event.value.code
        },
        etiketDowload() {


            Opservice.getEtiketKayit(this.code).then(data => {
                this.evrak_indir(data, 'Etiket')
                this.codeSelected= ''
                this.codeSelectedKasa= ''
                this.etiketKodu= ''
                this.etiketLink= ''
                this.code= ''
            })



        },
        evrak_indir(dosya_link, dosya_adi) {
            this.$store.dispatch('loadBegin')
            const link = document.createElement('a')
            link.href = dosya_link
            link.setAttribute('download', `${dosya_adi}.doc`)
            document.body.appendChild(link)
            link.click()
            this.$store.dispatch('loadEnd')

        },
        formatDecimal(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return   val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
           etiket_cikti_click(){
            this.$store.dispatch('loadBegin')   
            let tarih = this.localService.getDateString(this.son_tarih)
            service.getSeleksiyonEtiketTarih(tarih).then(data => {
              console.log("getSeleksiyonEtiketTarih " ,data)

             service.getSeleksiyonEtiketList(data).then(responce=>{

                if(responce.status)
                {
                    const link = document.createElement('a')
                   
                    link.href = this.servis_adres + 'siparisler/dosyalar/seleksiyonEtiketCikti' 
                    
                    link.setAttribute('download','Seleksiyon Üretim Etiket.xlsx')
                    document.body.appendChild(link)
                    link.click()
                     this.$store.dispatch('loadEnd')
                   

                }
            }) 
             })
                 },
        excel_cikti_click(){
            
            this.$store.dispatch('loadBegin')
            if (this.slk_enb_mekmar == true) {
                this.seleksiyonData = this.seleksiyon_mekmar_uretimlist
            } else if (this.slk_enb_mekmer_dis == true) {
                this.seleksiyonData = this.seleksiyon_mekmer_dis_uretimlist
            } else if (this.slk_enb_dis == true) {
                this.seleksiyonData = this.seleksiyon_dis_uretimlist.disUretim
            }
            service.getSeleksiyonExcelList(this.seleksiyonData).then(responce=>{

                if(responce.status)
                {
                    const link = document.createElement('a')
                    //link.href = 'localhost:5000/' + 'siparisler/dosyalar/seleksiyonExcelCikti' 
                    link.href = this.servis_adres + 'siparisler/dosyalar/seleksiyonExcelCikti'
                    
                    link.setAttribute('download','seleksiyon_listesi.xlsx')
                    document.body.appendChild(link)
                    link.click()
                    this.$store.dispatch('loadEnd')
                   

                }
            })
         },
         
     

        btn_yeni_click(){


            this.$store.dispatch('seleksiyonYeniClickActions')
            this.is_uretimform = true

            
        },
        btn_kaydet_click(){

            this.$store.dispatch('seleksiyonKaydetClickActions')
        },
        btn_vazgec_click(){

            this.$store.dispatch('seleksiyonVazgecClickActions')
        },
        btn_guncelle_click(){

            this.$store.dispatch('seleksiyonGuncelleClickActions')
        },
        btn_sil_click(){

            this.$store.dispatch('seleksiyonSilClickActions')
        },
        btn_mekmar_click(){

            this.$store.dispatch('seleksiyonMekmarUretimSecActions')
        },
        btn_dis_click(){

            this.$store.dispatch('seleksiyonDisUretimSecActions')
        },
        btn_mekmer_dis_click() {
            this.$store.dispatch('seleksiyonMekmerDisUretimSecActions')
        },
        ozetlist_topla(){
             
             this.toplam_gun = 0
             this.toplam_ay = 0 
             this.toplam_yil = 0
             for(let key in this.seleksiyon_uretimozetlist){

                    const item = this.seleksiyon_uretimozetlist[key]
                    
                    
                    
                    this.toplam_gun += item.gun 
                    this.toplam_ay += item.ay 
                    this.toplam_yil += item.yil
                    if(this.seleksiyon_uretimozetlist[key].tanim == 'Mekmer' || this.seleksiyon_uretimozetlist[key].tanim == 'Mek-Moz'){
                        this.toplam_m_mek += this.seleksiyon_uretimozetlist[key].ay
                    }
            }
            
        }
    }
}
</script>

<style scoped>






    .yeniButton{
        background-color:#61b8a3;
        color:#fff;
    }
    .mekmarButton{
        background-color:#d2e02b;
        color:#fff;
    }
    .mekmarButton:disabled{
        color:#000;
    }
    .disButton{
        background-color:#3a6dc7;
        color:#fff;
    }
    .disButton:disabled{
        color:#000;
    }
    .disMekmerButton{
        background-color: #fa6e43;
            color: white;
    }
        .disMekmerButton {
            color: black;
        }
</style>