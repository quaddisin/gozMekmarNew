import axios from '../helper/custom_axios'


const KontrolService = {


    musteriEtaTakipKontrol(){

        return axios.get('kontroller/musteriEtaTakipIslem').then(res => res.data)
    },
    musteriVadeTakipKontrol(){

        return axios.get('kontroller/finansVadeTakipIslem').then(res => res.data)
    }
}


export default KontrolService