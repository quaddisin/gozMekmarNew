const state = {

    ayrinti_listesi : null,
    hepsi_ayrinti_listesi : null,
    uretim_ayrinti : null,
    hepsi_uretim_ayrinti : null,
    musteri_ayrinti_mekmar : null,
    musteri_ayrinti_hepsi : null,
    aylik_teklif__ayrinti : null,
    siparis_ayrinti_yil : null,
    siparis_ayrinti_ay : null,
    //efes ayrinti
    sevk_ay_hepsi_efes : null,
    sevk_ay_mekmar_efes  : null,
    sevk_yil_mekmar_efes : null,
    sevk_yil_hepsi_efes : null,
    sip_yil_hepsi_efes  : null,
    sip_yil_mekmar_efes  : null,
    sip_ay_mekmar_efes  : null,
    sip_ay_hepsi_efes : null,
    kullanici_sip_ay : null,
    kullanici_sip_yil : null,
    kullanici_sevk_ay : null,
    kullanici_sevk_yil : null
}

const actions = {

    anasayfa_sevk_data_yukle_act({commit},data){

        commit('anasayfa_sevk_data_yukle_mut',data)
    },
    anasayfa_sevk_hepsi_yukle_act({commit},data){

        commit('anasayfa_sevk_hepsi_yukle_mut',data)
    },
    anasayfa_uretim_data_yukle_act({commit},data){

        commit('anasayfa_uretim_data_yukle_mut',data)
    },
    anasayfa_uretim_hepsi_yukle_act({commit},data){

        commit('anasayfa_uretim_hepsi_yukle_mut',data)
    },
    anasayfa_musteri_data_yukle_act({commit},data){

        commit('anasayfa_musteri_data_yukle_mut',data)
    },
    anasayfa_musteri_hepsi_yukle_act({commit},data){

        commit('anasayfa_musteri_hepsi_yukle_mut',data)
    },
    anasayfa_teklif_mekmar_ayrinti_act({commit},data){

        commit('anasayfa_teklif_mekmar_ayrinti_mut',data)
    },
    anasayfa_siparis_ayrinti_act({commit},data){

        commit('anasayfa_siparis_ayrinti_mut',data)
    },
    anasayfa_siparis_ay_ayrinti_act({commit},data){

        commit('anasayfa_siparis_ay_ayrinti_mut',data)
    },
    hepsi_sevk_ay_ayrinti_efes_act({commit},data){

        commit('hepsi_sevk_ay_ayrinti_efes_mut',data)
    },
    mekmar_sevk_ay_ayrinti_efes_act({commit},data){

        commit('mekmar_sevk_ay_ayrinti_efes_mut',data)
    },
    hepsi_sevk_yil_ayrinti_efes_act({commit},data){

        commit('hepsi_sevk_yil_ayrinti_efes_mut',data)
    },
    mekmar_sevk_yil_ayrinti_efes_act({commit},data){

        commit('mekmar_sevk_yil_ayrinti_efes_mut',data)
    },
    hepsi_sip_ay_ayrinti_efes_act({commit},data){

        commit('hepsi_sip_ay_ayrinti_efes_mut',data)
    },
    mekmar_sip_ay_ayrinti_efes_act({commit},data){

        commit('mekmar_sip_ay_ayrinti_efes_mut',data)
    },
    hepsi_sip_yil_ayrinti_efes_act({commit},data){

        commit('hepsi_sip_yil_ayrinti_efes_mut',data)
    },
    mekmar_sip_yil_ayrinti_efes_act({commit},data){

        commit('mekmar_sip_yil_ayrinti_efes_mut',data)
    },
   kullanici_sipAy_act({commit},data){

        commit('kullanici_sipAy_act_mut',data)
    },
    kullanici_sipYil_act({commit},data){

        commit('kullanici_sipYil_act_mut',data)
    },
    kullanici_sevkAy_act({commit},data){

        commit('kullanici_sevkAy_mut',data)
    },
    kullanici_sevkYil_act({commit},data){

        commit('kullanici_sevkYil_mut',data)
    },
}

const mutations = {

    anasayfa_sevk_data_yukle_mut(state,data)
    {

        state.ayrinti_listesi = data.ayrinti_listesi
    },
    anasayfa_sevk_hepsi_yukle_mut(state,data)
    {

        state.hepsi_ayrinti_listesi = data.hepsi_ayrinti_listesi
    },
    anasayfa_uretim_data_yukle_mut(state,data)
    {

        state.uretim_ayrinti = data.uretim_ayrinti
    },
    anasayfa_uretim_hepsi_yukle_mut(state,data)
    {

        state.hepsi_uretim_ayrinti = data.hepsi_uretim_ayrinti
    },
    anasayfa_musteri_data_yukle_mut(state,data)
    {

        state.musteri_ayrinti_mekmar = data.musteri_ayrinti_mekmar
    },
    anasayfa_musteri_hepsi_yukle_mut(state,data)
    {

        state.musteri_ayrinti_hepsi = data.musteri_ayrinti_hepsi
    }
    ,
    anasayfa_teklif_mekmar_ayrinti_mut(state,data)
    {

        state.aylik_teklif__ayrinti = data.aylik_teklif__ayrinti
    },
    anasayfa_siparis_ayrinti_mut(state,data)
    {
       
        state.siparis_ayrinti_yil = data
    },
    anasayfa_siparis_ay_ayrinti_mut(state,data)
    {
      
        state.siparis_ayrinti_ay = data
    },
    //efes ayrinti
    hepsi_sevk_ay_ayrinti_efes_mut(state,data)
    {
      
        state.sevk_ay_hepsi_efes = data
    },
    mekmar_sevk_ay_ayrinti_efes_mut(state,data)
    {
      
        state.sevk_ay_mekmar_efes = data
    },
    mekmar_sevk_yil_ayrinti_efes_mut(state,data)
    {
      
        state.sevk_yil_mekmar_efes = data
    },
    hepsi_sevk_yil_ayrinti_efes_mut(state,data)
    {
      
        state.sevk_yil_hepsi_efes = data
    },
    hepsi_sip_yil_ayrinti_efes_mut(state,data)
    {
      
        state.sip_yil_hepsi_efes = data
    },
    mekmar_sip_yil_ayrinti_efes_mut(state,data)
    {
      
        state.sip_yil_mekmar_efes = data
    },
    mekmar_sip_ay_ayrinti_efes_mut(state,data)
    {
      
        state.sip_ay_mekmar_efes = data
    },
    hepsi_sip_ay_ayrinti_efes_mut(state,data)
    {
      
        state.sip_ay_hepsi_efes = data
    },
    kullanici_sipAy_act_mut(state,data)
    {
      
        state.kullanici_sip_ay = data
    },
    kullanici_sipYil_act_mut(state,data)
    {
      
        state.kullanici_sip_yil = data
    },
    kullanici_sevkAy_mut(state,data)
    {
      
        state.kullanici_sevk_ay = data
    },
    kullanici_sevkYil_mut(state,data)
    {
      
        state.kullanici_sevk_yil = data
    }
}

const getters = {

    ayrinti_listesi(state){

        return state.ayrinti_listesi
    },
    hepsi_ayrinti_listesi(state){

        return state.hepsi_ayrinti_listesi
    },
    uretim_ayrinti(state){

        return state.uretim_ayrinti
    },
    hepsi_uretim_ayrinti(state){

        return state.hepsi_uretim_ayrinti
    },
    musteri_ayrinti_mekmar(state){

        return state.musteri_ayrinti_mekmar
    },
    musteri_ayrinti_hepsi(state){

        return state.musteri_ayrinti_hepsi
    },
    aylik_teklif__ayrinti(state){

        return state.aylik_teklif__ayrinti
    },
    siparis_ayrinti_yil(state){
       
       
        return state.siparis_ayrinti_yil
    },
    siparis_ayrinti_ay(state){
     
       
        return state.siparis_ayrinti_ay
    },
    sevk_ay_hepsi_efes(state){
     
       
        return state.sevk_ay_hepsi_efes
    },
    sevk_ay_mekmar_efes(state){
     
       
        return state.sevk_ay_mekmar_efes
    },
    sevk_yil_mekmar_efes(state){
     
       
        return state.sevk_yil_mekmar_efes
    },
    sevk_yil_hepsi_efes(state){
     
       
        return state.sevk_yil_hepsi_efes
    },
    sip_yil_hepsi_efes(state){
     
       
        return state.sip_yil_hepsi_efes
    },
    sip_yil_mekmar_efes(state){
     
       
        return state.sip_yil_mekmar_efes
    },
    sip_ay_mekmar_efes(state){
     
       
        return state.sip_ay_mekmar_efes
    },
    sip_ay_hepsi_efes(state){
     
       
        return state.sip_ay_hepsi_efes
    },
    kullanici_sip_ay(state){
     
       
        return state.kullanici_sip_ay
    },
    kullanici_sip_yil(state){
     
       
        return state.kullanici_sip_yil
    },
    kullanici_sevk_ay(state){
     
       
        return state.kullanici_sevk_ay
    },
    kullanici_sevk_yil(state){
     
       
        return state.kullanici_sevk_yil
    },

}

export default {

    state,
    actions,
    mutations,
    getters
}

