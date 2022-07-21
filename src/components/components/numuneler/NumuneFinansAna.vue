<template>
    <section>
         <div class="column is-12 " style="margin-left:-11px;">
               
                  <b-select size="is-small" v-model="select_yil" @input="YilSecim(select_yil)" >
                      <option v-for="item in yil_listesi" :key="item.id" >
                          {{item.yil}}
                      </option>
                  </b-select>
             
            </div>
        <div class="columns is-multiline is-centered">
           
            <div class="column is-9 is-centered">
                <DataTable
                :value="liste"
                :loading="loading"
                 selectionMode="single"
                 :sortOrder="-1"
                 
                 :scrollable="true"
                 scrollHeight="490px"
                :selection.sync="select"
                 :filters.sync="filters"
                dataKey="id"
                @row-select="depo_item_sec($event)"
               
                >

                <template #header>
               <div class="columns is-multiline">
                    <div class="column is-12">
                       <span style="font-size:14px;"> Numune Alacak Listesi</span>
                    </div>
                   
                    
                </div>
            </template>  

                    <Column field="musteriadi" header="Müşteri"  bodyStyle="text-align:left;" >
                        <template #body="slotProps">
                            {{slotProps.data.musteriadi}}
                        </template>
                         <template #filter>
                                      <InputText type="text" v-model="filters['musteriadi']" class="p-column-filter" />
                                </template>
                    </Column>
                   
                      <Column field="kuryeAlis" header="USD-Alış" bodyStyle="text-align:center;" headerStyle="background-color:#EC7063 ;color:white">
                        <template #body="slotProps">
                            {{formatPriceDolar(slotProps.data.kuryeAlis)}}
                        </template>
                      
                     <template #footer>
						{{formatPriceDolar(kuryeAlis_toplam )}}
					</template>
                        
                    </Column>
                    <Column field="kuryeSatis" header="USD-Satış" bodyStyle="text-align:center;" headerStyle="background-color:#45B39D ;color:white">
                        <template #body="slotProps">
                            {{formatPriceDolar(slotProps.data.kuryeSatis)}}
                        </template>
                      
                     <template #footer>
						{{formatPriceDolar(kuryeSatis_toplam )}}
					</template>
                        
                    </Column>
                    <Column field="TL_Alis" header="TL-Alış" bodyStyle="text-align:center;"  headerStyle="background-color:#EC7063 ;color:white">
                        <template #body="slotProps">
                            {{formatPriceTL(slotProps.data.TL_Alis)}}
                        </template>
                          <template #footer>
						{{formatPriceTL(TLAlis_Toplam )}}
					</template>
                      
                    
                        
                    </Column>
                     <Column field="TL_Satis" header="TL-Satış" bodyStyle="text-align:center;"  headerStyle="background-color:#45B39D ;color:white">
                        <template #body="slotProps">
                            {{formatPriceTL(slotProps.data.TL_Satis)}}
                        </template>

                        <template #footer>
						{{formatPriceTL(TLSatis_Toplam )}}
					</template>
                                            
                    
                        
                    </Column>
                     <Column field="Euro_Alis" header="EUR-Alış" bodyStyle="text-align:center;"  headerStyle="background-color:#EC7063 ;color:white">
                        <template #body="slotProps">
                            {{formatPriceEuro(slotProps.data.Euro_Alis)}}
                        </template>
                        
                        <template #footer>
						{{formatPriceEuro(EuroAlis_Toplam )}}
					</template>
                      
                    
                        
                    </Column>
                     <Column field="Euro_Satis" header="EUR-Satış" bodyStyle="text-align:center;" headerStyle="background-color:#45B39D ;color:white">
                        <template #body="slotProps">
                            {{formatPriceEuro(slotProps.data.Euro_Satis)}}
                        </template>
                        <template #footer>
						{{formatPriceEuro(EuroSatis_Toplam )}}
					</template>
                      
                    
                        
                    </Column>
                
                      
                   
                </DataTable>
            </div>
            <div class="column is-3 is-centered">
                <DataTable
                :value="banka_list"
                :loading="loading"
               
                 :sortOrder="-1"
                 
                 :scrollable="true"
                 scrollHeight="490px"
               
               
                >

                <template #header>
               <div class="columns is-multiline">
                    <div class="column is-12">
                       <span style="font-size:14px;"> Bankaya Gelen Ödeme Tutarı</span>
                    </div>
                   
                    
                </div>
            </template>  
                   <Column field="banka" header="Banka"  bodyStyle="text-align:center;" >
                        <template #body="slotProps">
                            {{slotProps.data.banka}}
                        </template>
                         
                    </Column>
                    <Column field="bedel" header="Total"  bodyStyle="text-align:center;" >
                        <template #body="slotProps">
                            {{formatPriceDolar(slotProps.data.bedel)}}
                        </template>
                          <template #footer>
						{{formatPriceDolar(banka_toplami )}}
					</template>
                    </Column>
                   
                     
                
                         
              
                     

                  
                   
                </DataTable>
            </div>
             <Dialog   :visible.sync="is_form" :style="{width: '1800px'}"   :header.sync="form_baslik"  :modal="true">
                <div class="columns centered" style="height: 700px;background-color:white; margin-left:115px">
                    <numuneMasraflar :select_depo="select_depo"    />
                </div>
          </Dialog>
        
        </div>
    </section>
</template>
<script>

import service from '../../service/NumuneService'
import numuneMasraflar from './numuneMasraflar'
export default {
    
    
    components : {

        numuneMasraflar
    },
    data(){

        return {
            select_depo : 0,
            banka_toplami: 0,
            select : null,
            loading : false,
            is_form : false,
            form_baslik : "",
            liste : {},
            banka_list : null,
            filters : {},
            kuryeSatis_toplam : 0,
            kuryeAlis_toplam : 0,
            TLAlis_Toplam : 0,
            TLSatis_Toplam : 0,
            EuroAlis_Toplam : 0,
            EuroSatis_Toplam : 0,
            yil_listesi: null,
            select_yil : null,
            yil_baslik :''

            
            


        }
    },
    
   created() {
            this.loading = true;
            
            service.getNumuneYilListesi().then(data => {
            
            this.yil_listesi = data.yil_listesi
            this.select_yil = this.yil_listesi[0].yil

            
              service.getNumuneFinansListesi(this.select_yil).then(data => { 
               
               this.liste = data.numune_list
               this.banka_list = data.banka_list
               this.genel_toplam(this.liste)
               this.banka_toplam(this.banka_list)
                 this.loading = false;
            })

            
        })
         

    },
     mounted(){
        
             
     } ,
    methods : {
        banka_toplam(liste){
                
               this.banka_toplami = 0
            
             

               for(let key in liste){

                const item = liste[key]
               
                this.banka_toplami += item.bedel
               
               
               
               }
     },
        YilSecim(select_yil){

              
                service.getNumuneFinansListesi(select_yil).then(data => {

                
                this.liste = data.numune_list
                this.banka_list = data.banka_list
                this.genel_toplam(this.liste)
                this.banka_toplam(this.banka_list)
                 this.loading = false;
                
            })

            }
            ,
     
         genel_toplam(liste){
                
               this.kuryeSatis_toplam = 0
               this.kuryeAlis_toplam = 0
               this.TLAlis_Toplam =  0
               this.TLSatis_Toplam = 0
               this.EuroAlis_Toplam = 0
               this.EuroSatis_Toplam = 0
              
             

               for(let key in liste){

                const item = liste[key]
               
                this.kuryeSatis_toplam += item.kuryeSatis
                this.kuryeAlis_toplam += item.kuryeAlis
                this.TLAlis_Toplam +=  item.TL_Alis
               this.TLSatis_Toplam += item.TL_Satis
               this.EuroAlis_Toplam += item.Euro_Alis
               this.EuroSatis_Toplam += item.Euro_Satis
               
               
               }
     },
          formatPriceDolar(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
           
            return "$" +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
          formatPriceTL(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
           
            return "₺" +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
          formatPriceEuro(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
           
            return "€" +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
          depo_item_sec(event){
           
            this.select_depo = event.data.id;
            this.form_baslik = event.data.musteriadi 
          
            this.$store.dispatch('seleksiyonSelectItemActions')          
            this.is_form = true
        },
    }
     
}
</script>

<style  scoped>
    .p-datatable{

        font-size:12px;
    }
</style>