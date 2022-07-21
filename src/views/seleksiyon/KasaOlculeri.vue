<template>
    <b-button @click="excel_cikti_click_kasa_olculeri"
        style="margin-bottom:10px;width:15px;height:20px;background-color:#f0f4f4;border:none;"><i
            class="fa-solid fa-file-excel fa-2xl"></i></b-button>
    <br>
    <ButTon label="Yeni" @click="isSelectNew"></ButTon>
    <DataTable :value="kasaDetaylari" responsiveLayout="scroll" @row-select="isKasaOlcuSelect" selectionMode="single">
        <CoLumn field="firmaadi" header="Firmaadi"></CoLumn>
        <CoLumn field="ebat" header="Taş Ebatı"></CoLumn>
        <CoLumn field="kasaOlculeri" header="Kasa Ölçüleri"></CoLumn>
    </DataTable>
    <DiaLog v-model:visible.sync="is_select_new" header="Kasa Ölçüleri Yeni" :modal="true">
        <KasaOlculeriDetayYeni>
        </KasaOlculeriDetayYeni>
    </DiaLog>
    <DiaLog v-model:visible.sync="is_select_chest" eader="Kasa Ölçüleri Detay" :modal="true">
        <KasaOlculeriDetay :kasaDatas=kasaDatas>

        </KasaOlculeriDetay>

    </DiaLog>


</template>
<script>
import service from '../../service/SeleksiyonService';
import KasaOlculeriDetayYeni from './KasaOlculeriDetayYeni'
import KasaOlculeriDetay from './KasaOlculeriDetay'
export default {
    components: {
        KasaOlculeriDetayYeni,
        KasaOlculeriDetay
    },
    created() {
        service.getKasaDetayOlculeri().then(data => {
            this.kasaDetaylari = data
        })
    },
    data() {

        return {
            kasaDetaylari: null,
            is_select_new: false,
            is_select_chest: false,
            kasaDatas:{},


        }
    },
    methods: {
        isSelectNew() {
            this.is_select_new = true
        },
        excel_cikti_click_kasa_olculeri() {
            this.$store.dispatch('loadBegin') //loading png gösteriyor


            const data = this.kasaDetayları

            service.getKasaOlculeriExcelListesi(data).then(response => {

                if (response.status) {
                    console.log("excell", this.servis_adres)

                    const link = document.createElement('a')
                    link.href = this.servis_adres + 'siparisler/dosyalar/kasaOlculeriExcelCikti'


                    link.setAttribute('download', 'kasadetay_listesi.xlsx')
                    document.body.appendChild(link)
                    link.click()
                    this.is_excel = false
                    this.$store.dispatch('loadEnd') // loading sonlandırma png

                }
            })

        },
        isKasaOlcuSelect(event) {
            this.kasaDatas = event
            this.is_select_chest = true
        }
    }
    

}
</script>