<template>
    <AutoComplete
    
    v-model="modelvalue" 
    :suggestions="filterList"
    @complete="completeMethod($event)"
    @item-select="modelDegisim"
    :dropdown="true"
    field="name"
    
    >
        <template #items="slotProps">
            <div  class="p-clearfix p-autocomplete-brand-item">
                <div style="font-size:8px">{{slotProps.name}}</div>
            </div>
        </template>
    </AutoComplete>
</template>
<script>
export default {
    
    data(){

        return {

            filterList : null,
        }
    },
    props : ['dataList','modelvalue'],
    methods : {
        completeMethod(event){

            setTimeout(() => {
               
               let result;

               if(event.query.length == 0) result = [...this.dataList];
               else {

                   result  = this.dataList.filter((x)=> {

                       return x.name.toLowerCase().startsWith(event.query.toLowerCase())
                   })
               }

               this.filterList = result;
               
            }, 250);
        },
        modelDegisim(){

            this.$emit('textCompleteEvent',this.modelvalue.id);
        },
        

    }
}
</script>
