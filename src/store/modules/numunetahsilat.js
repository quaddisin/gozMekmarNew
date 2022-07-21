const state = {

    nthmusteri : null,
    nthmusteri_list : null,
    nthmusteri_list_toplam_tutar : 0,
    nthmusteri_list_toplam_masraf : 0
}

const actions = {

    numunetahsilatLoadAct({commit},data){

        commit('numunetahsilatLoadMut',data)
    },
    numunetahsilatSecimAct({commit},data){

        commit('numunetahsilatSecimMut',data)
    }
}

const mutations = {

    numunetahsilatLoadMut(state,data){

        state.nthmusteri = data.musteri_data
        state.nthmusteri_list = data.musteri_list

        state.nthmusteri_list_toplam_tutar = 0
        state.nthmusteri_list_toplam_masraf = 0

        for(let key in state.nthmusteri_list){

            const item = state.nthmusteri_list[key]

            state.nthmusteri_list_toplam_tutar += item.tutar
            state.nthmusteri_list_toplam_masraf += item.masraf
        }
    },
    numunetahsilatSecimMut(state,data){
        
        state.nthmusteri = data
    }
}

const getters = {

    nthmusteri(state){

        return state.nthmusteri
    },
    nthmusteri_list(state){

        return state.nthmusteri_list
    },
    nthmusteri_list_toplam_tutar(state){

        return state.nthmusteri_list_toplam_tutar
    },
    nthmusteri_list_toplam_masraf(state){

        return state.nthmusteri_list_toplam_masraf
    }
}


export default {

    state,
    actions,
    mutations,
    getters
}