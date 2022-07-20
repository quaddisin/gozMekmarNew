<template>

    <DataTable :value="kasaDetaylari" responsiveLayout="scroll">
        <CoLumn field="firmaadi" header="Firmaadi"></CoLumn>
        <CoLumn field="ebat" header="Taş Ebatı"></CoLumn>
        <CoLumn field="kasaOlculeri" header="Kasa Ölçüleri"></CoLumn>
    </DataTable>


</template>
<script>
import service from '../../service/SeleksiyonService';
export default {
    components: {
      
    },
    created() {
        service.getKasaDetayOlculeri().then(data => {
            console.log(data)
            this.kasaDetaylari = data
        })
    },
    data() {

        return {
            kasaDetaylari: null,
            


        }
    },
    

}
</script>