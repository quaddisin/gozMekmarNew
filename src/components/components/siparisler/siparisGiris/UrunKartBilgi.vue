<template>
<div>
      <Card>
                                   <template slot="content">
                                       <div class="p-grid fluid">
                                           <div class="p-col-12 p-lg-10">
                                               <span class="p-float-label"> 
                                                   <InputText :disabled="dis_urun_giris" id="urunid" type="text" v-model="getSiparisUrunKart.id"/>
                                                   <label for="input" >Ürün Kod</label>
                                               </span>
                                           </div>
                                           <div class="p-col-12 p-lg-2">
                                               <Button :disabled="dis_urun_giris" icon="pi pi-plus" @click="urunKartShow" />
                                           </div>
                                           <div class="p-col-12 p-lg-12">
                                              <span class="p-float-label">
                                                  <InputText id="kategoriAdi" type="text" v-model="getSiparisUrunKart.kategoriAdi" disabled />
                                                  <label for="input" >Kategori Adı </label>
                                              </span>
                                           </div>
                                           <div class="p-col-12 p-lg-12">
                                              <span class="p-float-label">
                                                  <InputText id="urunAdi" type="text" v-model="getSiparisUrunKart.urunAdi" disabled />
                                                  <label for="input" >Ürün Adı </label>
                                              </span>
                                           </div>
                                           <div class="p-col-12 p-lg-12">
                                              <span class="p-float-label">
                                                  <InputText id="yuzeyIslem" type="text" v-model="getSiparisUrunKart.yuzeyIslem" disabled />
                                                  <label for="input" >İşlem</label>
                                              </span>
                                           </div>
                                           <div class="p-col-12 p-lg-12">
                                              <span class="p-float-label">
                                                  <InputText id="ebat" type="text" v-model="getSiparisUrunKart.ebat" disabled />
                                                  <label for="input" >Ebat</label>
                                              </span>
                                           </div>
                                       </div>
                                   </template>
    </Card>
    <urun-kart-menu :is_seleksiyon="false"  /> 
</div>
</template>

<script>
import UrunKartMenu from '../../shared/UrunKartMenu';
import { mapGetters } from 'vuex';
export default {
    
     props:{

         
         dis_urun_giris : {
             type : Boolean,
             required : false,
             default : true
         }

     },
     data(){

         return {

             urunler : {}
         }
     },

     components :{

         urunKartMenu : UrunKartMenu 
     },
     methods: {

         urunKartShow(){

             this.$emit('urunKartShow'); 

             //const liste = this.$store.getters.getUrunKartMenuList;

             
         },
         
     },
     computed : {

         ...mapGetters(['getSiparisUrunKart'])
     }
}
</script>