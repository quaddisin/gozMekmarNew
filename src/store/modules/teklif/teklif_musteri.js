const state = {

    musteriTeklifList : null,
    musteriTeklif : null,
    ulkeList: null,
    takvimList:null,
}

const actions = {

    loadTeklifMusteriList({commit},data){ 

        commit('loadTeklifMusteriListMut',data);
    },
    loadTeklifMusteri({commit},data){

        commit('loadTeklifMusteriMut',data);
    },
    guncelleMusteriList({commit},data){

        commit('guncelleMusteriListMut',data)
    },
    loadTeklifYeniMusteriAct({commit},data){

        commit('loadTeklifYeniMusteriMut',data)
    },

    loadTakvimListesi({commit},data){

        commit('loadTakvimListesiMut', data)
        console.log("loadTakvimListesi",data)
    },


    
}

const mutations = {

    loadTeklifMusteriListMut(state,data){

        state.musteriTeklifList = data.musteriList;
        state.ulkeList = data.ulkeList;
    },
    loadTeklifMusteriMut(state,data){

        state.musteriTeklif = data;
       
    },
    loadTeklifYeniMusteriMut(state,data){

        state.musteriTeklif = data
    },

    loadTakvimListesiMut(state,data){

        state.takvimList = data
        console.log("loadTakvimListesiMut",data)

    },


    guncelleMusteriListMut(state,data){

        console.log('Store : ', data)

        for(let key in state.musteriTeklifList){

            const item = state.musteriTeklifList[key];

            if(item.id == data.id){

                console.log('store if içi');

                state.musteriTeklifList[key] = data;
            }
        }
    }
}
const getters = {

    musteriTeklifList(state){

        return state.musteriTeklifList;
    },
    musteriTeklif(state){

        return state.musteriTeklif;
    },
    ulkeList(state){

        return state.ulkeList;
    },
    takvimList(state) {
        
        return state.takvimList;

    }
}

export default {

    state,
    actions,
    mutations,
    getters
}