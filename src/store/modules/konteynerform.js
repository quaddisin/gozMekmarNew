const state = {

    data:null
}

const actions = {

   konteyner_yukle_act({commit},data){

        commit('konteyner_yukle_mut',data)
    },
    nakliye_yukle_act({commit},data){

        commit('nakliye_yukle_mut',data)
    }
}

const mutations = {

    konteyner_yukle_mut(state,data)
    {
      
        state.data = data[0]
    },
    nakliye_yukle_mut(state,data)
    {
      
        state.data = data[0]
    }
}

const getters = {

    data(state){

        return state.data
    }
}

export default {

    state,
    actions,
    mutations,
    getters
}

