<template>

    <Dialog :visible.sync="dialogVisible" :style="{width: '750px',marginLeft:'800px' }" header="Card Details"
        :modal="true">
        <draggable>
            <div class="p-cardialog-content " style="height: 600px;">
                <div class="p-grid p-fluid" v-if="getUrunKartMenuList">

                    <DataTable :value.sync="getUrunKartMenuList" :selection.sync="selectUrunKart" selectionMode="single"
                        dataKey="id" :paginator="true" :rows="15" :filters="filters" :scrollable="true"
                        scrollHeight="500px" @row-select="urunKartSec">
                        <Column field="id" header="Kart Id" headerStyle="width: 10%">
                            <template #body="slotProps">
                                {{slotProps.data.id}}
                            </template>
                            <template #filter>
                                <div tabindex="1">
                                    <InputText type="text" v-model="filters['id']" class="p-column-filter" />
                                </div>
                            </template>
                        </Column>
                        <Column field="kategoriAdi" header="Kategori" headerStyle="width: 15%">
                            <template #body="slotProps">
                                {{slotProps.data.kategoriAdi}}
                            </template>
                            <template #filter>
                                <div tabindex="1">
                                    <InputText type="text" v-model="filters['kategoriAdi']" class="p-column-filter" />
                                </div>
                            </template>
                        </Column>
                        <Column field="urunAdi" header="Ürün" headerStyle="width: 15%">
                            <template #body="slotProps">
                                {{slotProps.data.urunAdi}}
                            </template>
                            <template #filter>
                                <div tabindex="2">
                                    <InputText type="text" v-model="filters['urunAdi']" class="p-column-filter" />
                                </div>
                            </template>
                        </Column>
                        <Column field="yuzey_1" header="Y1" headerStyle="width: 10%">
                            <template #body="slotProps">

                                {{slotProps.data.yuzey_1}}

                            </template>
                            <template #filter>
                                <div tabindex="3">
                                    <InputText type="text" v-model="filters['yuzey_1']" class="p-column-filter" />
                                </div>
                            </template>
                        </Column>
                        <Column field="yuzey_2" header="Y2" headerStyle="width: 10%">
                            <template #body="slotProps">
                                {{slotProps.data.yuzey_2}}
                            </template>
                            <template #filter>
                                <div tabindex="4">
                                    <InputText type="text" v-model="filters['yuzey_2']" class="p-column-filter" />
                                </div>
                            </template>
                        </Column>
                        <Column field="yuzey_3" header="Y3" headerStyle="width: 10%">
                            <template #body="slotProps">
                                {{slotProps.data.yuzey_3}}
                            </template>
                            <template #filter>
                                <div tabindex="5">
                                    <InputText type="text" v-model="filters['yuzey_3']" class="p-column-filter" />
                                </div>
                            </template>
                        </Column>
                        <Column field="en" header="En" headerStyle="width: 10%">
                            <template #body="slotProps" bodyStyle="text-align: center">
                                {{slotProps.data.en}}
                            </template>
                            <template #filter>
                                <div tabindex="6">
                                    <InputText type="text" v-model="filters['en']" class="p-column-filter" />
                                </div>
                            </template>
                        </Column>
                        <Column field="boy" header="Boy" headerStyle="width: 10%">
                            <template #body="slotProps">
                                {{slotProps.data.boy}}
                            </template>
                            <template #filter>
                                <div tabindex="7">
                                    <InputText type="text" v-model="filters['boy']" class="p-column-filter" />
                                </div>
                            </template>
                        </Column>
                        <Column field="kenar" header="Kenar" headerStyle="width: 10%">
                            <template #body="slotProps">
                                {{slotProps.data.kenar}}
                            </template>
                            <template #filter>
                                <div tabindex="8">
                                    <InputText type="text" v-model="filters['kenar']" class="p-column-filter"
                                        tabindex="8" />
                                </div>
                            </template>
                        </Column>
                    </DataTable>

                </div>
            </div>
        </draggable>

    </Dialog>



</template>

<script>

import { mapGetters } from 'vuex';
import socket from '../../service/SocketService';
import VueResizable from 'vue-resizable'
export default {
   
    data() {

        return {

             car : {},
             dialogVisible : false,
             urunMenuList : null,
             selectUrunKart : null,
             filters:{},
             urunKartlar : null
        }
    },
    
    methods : {

         setDialog(){

             this.dialogVisible = true;

         },
         props : ['is_seleksiyon'],
         urunKartSec(){

             this.dialogVisible = false;
            
             this.$emit('urunKartSelect',this.selectUrunKart.id)
             if (!this.is_seleksiyon) {
                
                this.$store.dispatch('siparisUrunKartAct', this.selectUrunKart)
            
            } 
             else {
                this.$store.dispatch('siparisUrunKartAct',this.selectUrunKart)

            }

         },
      
    },
    created(){

         this.$parent.$on('urunKartShow',this.setDialog)

        this.$parent.$on('seleksiyonUrunKartShow', this.setDialog)
        this.$parent.$on('uretimRaporUrunKartShow',this.setDialog)
       socket.siparis.on('urunkart_yeni_emit',(data)=>{

             this.$store.dispatch('yeniKartEkleAct',data);
             
         })

         socket.siparis.on('urunkart_guncelleme_emit',(data) =>{

             this.$store.dispatch('kartGuncellemeAct',data);

              const _filter = {...this.filters};

              this.filters = null;
              this.filters = _filter;
         })

        

      
         
    },
    mounted() {
        
    },
    computed : {
        ...mapGetters(['getUrunKartMenuList']),
        VueResizable
    }
}
</script>
<style scoped>
  .dialogMenu{

      width: 1500px;
      height: 750px;
  }
  .p-datatable{

      font-size:12px;
  }
  .p-dialog{
      
  }
</style>