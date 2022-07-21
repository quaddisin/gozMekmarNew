<template>
    <section>
        <div class="columns is-multiline card">

            <div  class="" style="margin-left: 20px">
                <div class="columns is-12 ">
              
               
                    <div class="column is-12">
                          <b-button  @click="yeniSiparisAc" v-yeniButonu:mousemove="'#65b9a4'" type="is-success"  expanded>Yeni</b-button>
                    </div>
                   
                    <div class="column is-12" style="margin-top:6px;">
                    
                        <b-select size="is-small" v-model="select_yil" @input="YilSecim(select_yil)" >
                            <option v-for="item in yil_listesi" :key="item.id" >
                                {{item.yil}}
                            </option>
                        </b-select>
                    
                    </div>
             
          
            </div>
         </div>
            <div class="column is-12 seleksiyon-list" >
                <DataTable
                :value="numune_listesi"
              
                :filters="filters"  
                :paginator="true" 
                :rows="15"
                rowGroupMode="rowspan"
                :groupRowsBy="groups"
                @row-select="numuneSec($event)"
                selectionMode="single"
                dataKey="id"
                :loading="loading"
              
            
               >
                <template #header>
               <div class="columns is-multiline">
                    <div class="column is-12">
                       <span style="font-size:14px;">Numune Listesi</span>
                    </div>
                   
                    
                </div>
            </template>  
                    <Column field="tarih" header="Gönderilme Tarihi" headerStyle="width:3%;"  bodyStyle="text-align:center" >
                        <template #body="slotProps">
                            {{slotProps.data.tarih}}
                        </template>
                          <template #filter>
                            <InputText type="text" v-model="filters['tarih']" class="p-column-filter" />
                        </template>
                    </Column>
                     <Column field="temsilci" header="T" headerStyle="width:2%"  bodyStyle="text-align:center">
                        <template #body="slotProps">
                           <img class="dairesel" :src="slotProps.data.link"   bodyStyle="text-align:center" width="40" height="40" />
                        </template>
                    </Column>
               
                     <Column field="musteriadi" header="Müşteri" headerStyle="width:3%;"  bodyStyle="text-align:left"  >
                        <template #body="slotProps">
                            {{slotProps.data.musteriadi}}
                        </template>
                          <template #filter>
                            <InputText type="text" v-model="filters['musteriadi']" class="p-column-filter" />
                        </template>
                        
                    </Column>
                    <Column field="numuneNo" header="Po Numarası"  headerStyle="width:5%;" bodyStyle="text-align:center" >
                        <template #body="slotProps">
                            {{slotProps.data.numuneNo}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['numuneNo']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kategori" header="Kategori Adı"  headerStyle="width:5%;" bodyStyle="text-align:left" >
                        <template #body="slotProps">
                            {{slotProps.data.kategori}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kategori']" class="p-column-filter" />
                        </template>
                    </Column>
                 
                  
                   
                     <Column field="miktar" header="Miktar"  headerStyle="width:3%;" bodyStyle="text-align:center"  >
                        <template #body="slotProps">
                          {{slotProps.data.miktar + '  /  ' + slotProps.data.birim}} 
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['miktar']" class="p-column-filter" />
                        </template>
                     <template #footer>
					{{miktar_toplam }}
					</template>
                    </Column>
                       
                   
                 
                </DataTable>
            </div>
        </div>
         <Dialog   :visible.sync="is_numuneform" :style="{width: '2000px'}"   :header.sync="siparisFormBaslik"  :modal="true">
         <div class="p-cardialog-content" style="height: 1500px;background-color:#f4f4f4; ">
             <numuneForm :select_numune="select_numune"  :yeniSiparis="false" />
         </div>
      </Dialog>
       <Dialog   :visible.sync="is_numuneform2" :style="{width: '2000px'}"   :header.sync="siparisFormBaslik"  :modal="true">
         <div class="p-cardialog-content" style="height: 1500px;background-color:#f4f4f4; ">
             <numuneForm :select_numune="select_numune"  :yeniSiparis="true"  />
         </div>
      </Dialog>
      
    </section>
</template>
<script>
import service from '../../service/NumuneService'
import numuneForm from './numuneForm'


export default {
    
   
    data(){

        return {
            numune_listesi : null,
            filters : {},
            loading : false,
            satis_toplam : 0,
            miktar_toplam :0,
            yeniSiparis : true,
            is_numuneform : false,
            is_numuneform2 : false,
            yil_listesi : null,
            select_yil : null,
             groups : [
               
                'tarih',
                'musteriadi',
                'numuneNo'            
               
            ], 
            select_numune : '',
            siparisFormBaslik : null,
        
        
        }
    },
      components : {

        numuneForm
    },
   created(){
       this.loading = true; 
         service.getNumuneYilListesi().then(data => {

            this.yil_listesi = data.yil_listesi2
             
            this.select_yil = this.yil_listesi[0].yil
           

            service.getNumuneAnaListesi(this.select_yil).then(data => {

                
                this.numune_listesi = data.numune_list
               
                this.genel_toplam(this.numune_listesi)
                 this.loading = false;
                
            })

            
        })
    
   },
    methods : {
            YilSecim(select_yil){

              
                service.getNumuneAnaListesi(select_yil).then(data => {

                
                this.numune_listesi = data.numune_list
               
                this.genel_toplam(this.numune_listesi)
                 this.loading = false;
                
            })

            }
            ,
            genel_toplam(liste){
                
               this.satis_toplam = 0
               this.miktar_toplam = 0
           

               for(let key in liste){

                const item = liste[key]
           
                this.satis_toplam += item.satisToplam
                this.miktar_toplam += item.miktar
         }
        
   },
         yeniSiparisAc(){
              
             this.selectedSiparis = null
             this.select_numune = ""
             this.selectSiparis = true;
             this.siparisFormBaslik = "Yeni Numune Girişi"
            
             this.is_numuneform2 = true;
         },
        
          numuneSec(event){
             this.loading = true; 
            this.select_numune = event.data.numuneNo;
            this.siparisFormBaslik = event.data.musteriadi + " - " +  this.select_numune
          
            this.$store.dispatch('seleksiyonSelectItemActions')          
            this.is_numuneform = true
            this.loading = false;
            this.created()
        },
  
        formatPriceDolar(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return "$" +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
   
       
        

        
        
    }
}
</script>
 <style  scoped>
   
    .p-datatable{

        font-size:11px;
    }
     .dairesel{



    border-radius: 150px;

    -webkit-border-radius: 150px;

    -moz-border-radius: 150px;



    }
    .p-button-rounded{

        background-color: green;
       
    }
</style>