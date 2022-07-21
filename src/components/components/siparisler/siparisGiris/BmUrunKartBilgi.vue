<template>
    <section>
         <div class="columns">
                    <!-- Ürün Kart -->
                    <div class="column is-12 custom-box">
                        <div class="columns is-multiline">
                            <div class="column is-8">
                                <b-field>
                                    <b-input v-model="getSiparisUrunKart.id" :disabled="dis_urun_giris" size="is-small" placeholder="Ürün Kod" />
                                </b-field>
                            </div>
                            <div class="column is-4">
                                <button :disabled="dis_urun_giris" class="button is-info is-small" @click="urunKartShow">
                                    <span class="icon is-small">
                                        <i class="fas fa-plus"></i>
                                    </span>
                                </button>
                            </div>
                            <div class="column is-12">
                                <b-field>
                                    <b-input v-model="getSiparisUrunKart.kategoriAdi" :disabled="dis_urun_giris" size="is-small" placeholder="Kategori Adı" />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field>
                                    <b-input v-model="getSiparisUrunKart.urunAdi" :disabled="dis_urun_giris" size="is-small" placeholder="Ürün Adı" />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field>
                                    <b-input v-model="getSiparisUrunKart.yuzeyIslem" :disabled="dis_urun_giris" size="is-small" placeholder="İşlem" />
                                </b-field>
                            </div>
                            <div class="column is-12">
                                <b-field>
                                    <b-input v-model="getSiparisUrunKart.ebat" :disabled="dis_urun_giris" size="is-small" placeholder="Ebat" />
                                </b-field>
                            </div>
                        </div>
                    </div>
                </div>
    </section>
</template>
<script>
//import UrunKartMenu from '../../shared/UrunKartMenu';
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

         //urunKartMenu : UrunKartMenu
     },
     methods: {

         urunKartShow(){

             this.$emit('urunKartShow');
         },
         
     },
     computed : {

         ...mapGetters(['getSiparisUrunKart'])
     }
}
</script>