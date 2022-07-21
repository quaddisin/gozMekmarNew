<template>
    <section>
        <div class="columns is-multiline">
            <div class="column is-12">
                <h2 class="has-text-centered subtitle">Bu Ay Yeni Eklenen Siparişler   </h2>
            </div>
          
            <div class="column is-12 rapor">
                <DataTable
                :value="siparis_listesi"
                :loading="loading"
                :scrollable="true" 
                scrollHeight="359px"
                dateKey="id"
                @kisitliSiparisSecim="siparisSecim($event)"
               
                >
                  <Column field="id" header="ID" headerStyle="width:30px" bodyStyle="text-align:center;align-items:center">
                        <template #body="slotProps">
                            {{slotProps.data.id}}
                        </template>
                    </Column>
                    <Column field="order" header="Orders" headerStyle="width:50px;" bodyStyle="text-align:left;">
                        <template #body="slotProps">
                            {{slotProps.data.order}}
                        </template>
                    </Column>
                    <Column  header="Genel Tutar" headerStyle="width:150px;">
                        <template #body="slotProps">
                            {{slotProps.data.fob  | toCurrency}} (F) + {{slotProps.data.ddp  | toCurrency}} (Diğer) = <span style="font-weight: bold;">{{slotProps.data.toplam  | toCurrency}} </span>(C/D)
                        </template>
                    </Column>
                    <Column field="brand" header="Proforma" headerStyle="width:30px" bodyStyle="text-align:center">
                    <template #body="slotProps">
                        <Button type="button" 
                         :disabled="slotProps.data.durum != -1  ? false : true"
                        @click="proformaDowload(slotProps.data.id)"   icon="fas fa-cloud-download-alt" class="p-button-success" style="margin-right: .5em"></Button>
                    </template>
                </Column>
                  
                        
                   
                </DataTable>
                <br>
                
            </div>
        </div>
    
    </section>
</template>

<script>
import service from '../../service/RaporService'


export default {
    
    components : {
       
       },
    data(){

        return {
             siparis_listesi : null,
            

         
        }
    },
    created(){
        

        service.getYeniSiparisList().then(data => {
           
            this.siparis_listesi = data
           
        }) 
        
    },
    computed : {

    }, 
    methods: {

     evrak_indir(dosya_link,dosya_adi){

                    this.$store.dispatch('loadBegin')
                    const link = document.createElement('a')
                    link.href = dosya_link
                    
                    link.setAttribute('download',`${dosya_adi}.pdf`)
                    document.body.appendChild(link)
                    link.click()
                    this.$store.dispatch('loadEnd')
                  
        },
       
        proformaDowload(id){
        
          //  this.evrak_indir(this.siparis_listesi[id].link,'Proforma')
          this.evrak_indir(this.siparis_listesi[id-1].link,'Proforma')
         
         
          
                  
        },
      
       
    }
}
</script>
<style scoped>
  .p-datatable{

        font-size:10px;
    }
	
</style>