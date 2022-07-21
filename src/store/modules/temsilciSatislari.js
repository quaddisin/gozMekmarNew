
import RaporService from '../../service/RaporService'
const state = {
    temsilciSatislariYuklenmemis: null,
    temsilciSatislariYuklenmemisTopSip:null,
    temsilciSatislariYuklenmemisTopOdenen:null,


    temsilciSatislariYuklenmis: null,
    temsilciSatislariYuklenmisTopSip: null,
    temsilciSatislariYuklenmisTopOdenen: null,
    temsilciSatislariYuklenmisTopAlacak:null,



    temsilciSatislariYuklenmemisGelenBedel: null,
    temsilciSatislariYuklenmemisGelenBedelTop:null,


    temsilciSatislariYuklenmisGelenBedel: null,
    temsilciSatislariYuklenmisGelenBedelTop:null,

    temsilciSatislariYuklenmemisAylik: null,
    temsilciSatislariYuklenmemisAylikTopBedel: null,
    
    temsilciSatislariYuklenmisAylik: null,
    temsilciSatislariYuklenmisAylikTopBedel:null,

    temsilciSatislariTamamiAylik: null,
    temsilciSatislariTamamiAylikDetay: null,
    temsilciSatislariTamamiAylikDetayTopMiktar: null,
    temsilciSatislariTamamiAylikDetayTopBedel :null,
    temsilciSatislariTamamiAylikTopBedel: null,
    
    
    
    
}

const actions = {
    temsilci_satislari_yuklenmemis_act({ commit },username) {
        RaporService.getTemsilciSatislariAll(username).then(data => {
            commit('temsilci_satislari_yuklenmemis_mut', data.yuklenmemis)
            commit('temsilci_satislari_yuklenmis_mut', data.yuklenmis)
            commit('temsilci_satislari_yuklenmemis_gelen_bedel_mut', data.yuklenmemisGelenBedel)
            commit('temsilci_satislari_yuklenmis_gelen_bedel_mut', data.yuklenmisGelenBedel)
            commit('temsilci_satislari_yuklenmemis_aylik_mut', data.aylikYapilanSatis)
            commit('temsilci_satislari_yuklenmis_aylik_mut', data.aylikYapilanYukleme)
            commit('temsilci_satislari_tamami_aylik_mut',data.aylikYapilanTumSatis)
        })
    },
    temsilci_satislari_tamami_detay_act({ commit }, data) {
        
        
        commit('temsilci_satislari_tamami_detay_mut',data)
    }
    
}

const mutations = {
    temsilci_satislari_yuklenmemis_mut(state,data) {
        state.temsilciSatislariYuklenmemis = data
        state.temsilciSatislariYuklenmemisTopSip=0
        state.temsilciSatislariYuklenmemisTopOdenen = 0
        for (let i of data) {
            state.temsilciSatislariYuklenmemisTopSip+= i.siparisTotal
            state.temsilciSatislariYuklenmemisTopOdenen += i.gelenOdemeler
        }
    },
    temsilci_satislari_yuklenmis_mut(state,data) {
        state.temsilciSatislariYuklenmis = data
        state.temsilciSatislariYuklenmisTopSip=0
        state.temsilciSatislariYuklenmisTopOdenen = 0
        state.temsilciSatislariYuklenmisTopAlacak = 0
        for (let i of data) {
            state.temsilciSatislariYuklenmisTopSip+= i.siparisTotal
            state.temsilciSatislariYuklenmisTopOdenen += i.gelenOdemeler
            state.temsilciSatislariYuklenmisTopAlacak += i.odenecekKalanBedel
        }
    },
    temsilci_satislari_yuklenmemis_gelen_bedel_mut(state, data) {
        state.temsilciSatislariYuklenmemisGelenBedel = data
        state.temsilciSatislariYuklenmemisGelenBedelTop = 0
        for (let i of data) {
            state.temsilciSatislariYuklenmemisGelenBedelTop += i.yuklenmemisGelenBedel
        }
    },
    temsilci_satislari_yuklenmis_gelen_bedel_mut(state, data) {
        state.temsilciSatislariYuklenmisGelenBedel = data
        state.temsilciSatislariYuklenmisGelenBedelTop = 0
        for (let i of data) {
            state.temsilciSatislariYuklenmisGelenBedelTop += i.yuklenmemisGelenBedel
        }
    },
    temsilci_satislari_yuklenmemis_aylik_mut(state, data) {
        state.temsilciSatislariYuklenmemisAylik = data
        state.temsilciSatislariYuklenmemisAylikTopBedel=0
        for (let i of data) {
            state.temsilciSatislariYuklenmemisAylikTopBedel += i.aylikUretimdekiSiparisBedel
        }
    },
    temsilci_satislari_yuklenmis_aylik_mut(state, data) {
        state.temsilciSatislariYuklenmisAylik = data
        state.temsilciSatislariYuklenmisAylikTopBedel=0
        for (let i of data) {
            state.temsilciSatislariYuklenmisAylikTopBedel += i.aylikUretimdekiSiparisBedel
        }
    },
    temsilci_satislari_tamami_aylik_mut(state, data) {
        state.temsilciSatislariTamamiAylik = data
        state.temsilciSatislariTamamiAylikTopBedel=0
        
        for (let i of data) {
            state.temsilciSatislariTamamiAylikTopBedel += i.aylikUretimdekiSiparisBedel
            
        }
    },
    temsilci_satislari_tamami_detay_mut(state, data) {
        state.temsilciSatislariTamamiAylikDetay = data
        state.temsilciSatislariTamamiAylikDetayTopMiktar = 0
        state.temsilciSatislariTamamiAylikDetayTopBedel = 0
        for (let i of data) {
            state.temsilciSatislariTamamiAylikDetayTopBedel += i.aylikSiparisTamamiBedel
            state.temsilciSatislariTamamiAylikDetayTopMiktar += i.aylikSiparisTamamiMiktar
        }
    }

}

const getters = {
    temsilciSatislariYuklenmemis(state) {
        return state.temsilciSatislariYuklenmemis
    },
    temsilciSatislariYuklenmis(state) {
        return state.temsilciSatislariYuklenmis
    },
    temsilciSatislariYuklenmemisGelenBedel(state) {
        return state.temsilciSatislariYuklenmemisGelenBedel
    },
    temsilciSatislariYuklenmisGelenBedel(state) {
        return state.temsilciSatislariYuklenmisGelenBedel
    },
    temsilciSatislariYuklenmemisAylik(state) {
        return state.temsilciSatislariYuklenmemisAylik
    },
    temsilciSatislariYuklenmisAylik(state) {
        return state.temsilciSatislariYuklenmisAylik
    },
    temsilciSatislariTamamiAylik(state) {
        return state.temsilciSatislariTamamiAylik
    },
    temsilciSatislariTamamiAylikDetay(state) {
        return state.temsilciSatislariTamamiAylikDetay
    },
    temsilciSatislariTamamiAylikDetayTopBedel(state) {
        return state.temsilciSatislariTamamiAylikDetayTopBedel
    },
    temsilciSatislariTamamiAylikDetayTopMiktar(state) {
        return state.temsilciSatislariTamamiAylikDetayTopMiktar
    },
    temsilciSatislariTamamiAylikTopBedel(state) {
        return state.temsilciSatislariTamamiAylikTopBedel
    },
    
    temsilciSatislariYuklenmemisAylikTopBedel(state) {
        return state.temsilciSatislariYuklenmemisAylikTopBedel
    },
    
    temsilciSatislariYuklenmisAylikTopBedel(state) {
        return state.temsilciSatislariYuklenmisAylikTopBedel
    },
    temsilciSatislariYuklenmemisTopSip(state) {
        return state.temsilciSatislariYuklenmemisTopSip
        
    },
    temsilciSatislariYuklenmemisTopOdenen(state) {
        return state.temsilciSatislariYuklenmemisTopOdenen
    },
    temsilciSatislariYuklenmisTopSip(state) {
        return state.temsilciSatislariYuklenmisTopSip
        
    },
    temsilciSatislariYuklenmisTopOdenen(state) {
        return state.temsilciSatislariYuklenmisTopOdenen
    },
    temsilciSatislariYuklenmisTopAlacak(state) {
        return state.temsilciSatislariYuklenmisTopAlacak
    },
    temsilciSatislariYuklenmemisGelenBedelTop(state) {
        return state.temsilciSatislariYuklenmemisGelenBedelTop
    },
    temsilciSatislariYuklenmisGelenBedelTop(state) {
        return state.temsilciSatislariYuklenmisGelenBedelTop
    },

        
}

export default {

    state,
    actions,
    mutations,
    getters
}