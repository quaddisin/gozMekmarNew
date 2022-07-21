<template >
    <section>
     
          
               
                <div class="p-col-12 p-md-11">
                    <div  class="p-col-10 p-md-10" style="margin-left: 50px">
                
                    <DataTable 
                        :value="yuklemeList" 
                        
                         class="p-datatable-customers" 
                        >
                    
                        <Column field="faturano" header="#"  bodyStyle="text-align:center;"  headerStyle="width:5%;"  ></Column>
                        <Column field="yuklemeTarihi"  headerStyle="width:5%;"   bodyStyle="text-align:center" header="Evrak Yukleme Tarihi"></Column>
                        <Column field="adi" header="Evrak Adı"  headerStyle="width:10%;"  bodyStyle="text-align:left"  ></Column>
                    
                        <Column    header="İndir"  headerStyle="width:4%;"  bodyStyle="text-align:center">
                        <template #body="slotProps">
                                <Button type="button"  
                           
                                    :disabled="slotProps.data.adi.length > 0  ? false : true"
                                    @click="faturaDowload(slotProps.data.id)"  icon="fas fa-download" class="p-button" style="margin-right: .5em; background-color:#3CB371;"></Button>
                            </template>
                        </Column>
                        <Column field="kullanici" headerStyle="width:5%" bodyStyle="text-align:center">
                       
                        </Column>
                        <template #footer>
                        </template>
                   </DataTable>
                   
                   </div>
                  
              </div>
             
      
    </section>
</template>
<script>
import service from '../../../service/OperasyonService'



export default {
  
   
     data(){
        
        return{
               select_row : null,
              yuklemeList : null
        }
    },
     
    props : ['siparisNo'],
    created() {
        
       service.getEvrakFaturaList(this.siparisNo).then(data => {
              this.yuklemeList = data.fatura_listesi
              console.log(data.fatura_listesi)
          
          
            

       });
	},
    methods : {
         
           evrak_indir(dosya_link,dosya_adi){

                    this.$store.dispatch('loadBegin')
                    const link = document.createElement('a')
                    link.href = dosya_link
                    
                    link.setAttribute('download',`${dosya_adi}.pdf`)
                    document.body.appendChild(link)
                    link.click()
                    this.$store.dispatch('loadEnd')
                  
         },
       
        teklifDowload(id){
            
            this.evrak_indir(this.aylik_teklif__ayrinti[id].teklif_cloud_dosya,'Teklif')
                  
        },
        faturaDowload(id){
           
              window.open(this.yuklemeList[id].Draft, "_blank");
          //  this.evrak_indir(this.yuklemeList[id].Draft,'Fatura')
         },
    },
    computed: {

       
 
}}
</script>
<style  scoped>
   
  
  .p-datatable{

        font-size:11px;
    }
</style>