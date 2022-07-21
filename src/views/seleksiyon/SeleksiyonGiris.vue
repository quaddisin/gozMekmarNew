<template>
    <section>
        <div class="columns">
            <div class="column is-12">
                <SeleksiyonIslem />
            </div>
        </div>
        <div class="columns">
            <div class="column is-12">
                <UretimListe />
            </div>
        </div>
        
    </section>
</template>
<script>
import UretimListe from './UretimListe';
import SeleksiyonIslem from './SeleksiyonIslem';
import { mapGetters } from 'vuex';
export default {
    
    components : {

        UretimListe,       
        SeleksiyonIslem
    },    
    computed : {

        ...mapGetters([

            'slk_form'
        ]),

        is_form  : {

            get : ()=>{

                return this.slk_form
            },
            set : ()=> {

                !this.slk_form ? this.$store.dispatch('seleksiyonFormAcActions') : this.$store.dispatch('seleksiyonFormKapatActions')
            }
        }
    },
   
    methods : {
        
        baslangicIslemler(){}
    }
}
</script>