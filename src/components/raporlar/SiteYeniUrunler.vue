<template>
    <section>
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="has-text-centered subtitle">Site Yeni Eklenen Ürünler</h2>
            </div>
            <div class="column is-12">
                <DataTable
                :value="urunlist"
                :loading="loading"
                :scrollable="true" 
                scrollHeight="370px"
                dateKey="id"
                selectionMode="single"
                :selection.sync="selectUrun"
                @row-select="urunSec($event)"
                >
                  <Column field="id" header="ID" headerStyle="width:60px" bodyStyle="text-align:center;align-items:center">
                        <template #body="slotProps">
                            {{slotProps.data.id}}
                        </template>
                    </Column>
                    <Column field="kategoriadi" header="Kategori" headerStyle="width:110px;">
                        <template #body="slotProps">
                            {{slotProps.data.kategoriadi}}
                        </template>
                    </Column>
                    <Column field="urunadi" header="Ürün">
                        <template #body="slotProps">
                            {{slotProps.data.urunadi}}
                        </template>
                    </Column>
                    <Column field="foto" header="Foto" headerStyle="width:120px">
                        <template #body="slotProps">
                           <img :src="slotProps.data.foto" width="50" height="50" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
         <Dialog  :visible.sync="isUrunDetay" :header.sync="getUrunBaslik" :style="{width: '1500px', height : '1500px'}" :modal="true" >
        <section>
            <div class="container">
                <div class="columns">
                    <div class="column is-12">
                        <MekmarUrunDetay  
                        :yeniurun="false"
                        :kategoriList="kategoriList"
                        />
                    </div>
                </div>
            </div>
        </section>
    </Dialog>
    </section>
</template>

<script>
import service from '../../service/RaporService'
import MekmarUrunDetay from '../../views/mekmar-com/MekmarUrunDetay'
import kategoriService from '../../service/MekmarPanelService'
import { mapGetters } from 'vuex'
export default {
    components : {
        MekmarUrunDetay
    },
    data(){

        return {

            urunlist :null,
            loading : false,
            selectUrun : null,
            kategoriList : null,
            isUrunDetay : false
        }
    },
    created(){

        this.listeYukle()
        
    },
    computed : {

        ...mapGetters(['getUrunBaslik'])
    }, 
    methods: {

        listeYukle(){

            this.loading = true 

            service.getSiteYeniUrunList().then(data => {
               
               kategoriService.getKategoriList().then(res => {

                   this.kategoriList = res.kategorilist

                  

                    this.urunlist = data
                    this.loading = false
               })
            })
        },
        urunSec(event){

            this.selectUrun = event.data
            
               this.$store.dispatch('setUrunBaslik',`ID : ${event.data.id}`)
                this.$store.dispatch('loadBegin')
                this.keyList = [];
                kategoriService.getProductDetailData(event.data.id).then(data => {
                  
                    this.$store.dispatch('loadUrun',data)                   
                    this.$store.dispatch('loadEnd')
                    this.isUrunDetay = true;
                })

        }
    }
}
</script>
<style scoped>
  .p-datatable{

        font-size:10px;
    }
	
</style>