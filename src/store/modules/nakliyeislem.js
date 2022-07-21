const state = {

    nakliye : null
    
}

const actions = {

    nakliye_liste_yukle_act({commit},data){

        commit('nakliye_liste_yukle_mut',data)
    },
   
    nakliye_model_sifirla_act({commit}){

        commit('nakliye_model_sifirla_mut')
    }
}

const mutations = {

    nakliye_liste_yukle_mut(state,data){

        state.nakliye = data.nakliye_model
   
    },
    nakliye_secim_mut(state,data){

        state.nakliye = data
    },
    nakliye_model_sifirla_mut(state){

        state.nakliye.id = null
        state.nakliye.firma_adi = ""
        state.nakliye.Firma_id = 0
        state.nakliye.siparisno = ""
        state.nakliye.faturaNo = ""
        state.nakliye.Tutar_tl = 0
        state.nakliye.kur = 0
        state.nakliye.Tutar_dolar = 0
        state.nakliye.tarih = ""
       
        
       
    }

}

const getters = {

    nakliye(state){

        return state.nakliye
    }
   
}


export default {

    state,
    actions,
    mutations,
    getters
}