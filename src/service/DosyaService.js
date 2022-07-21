import axios from '../helper/panel_axios';



const DosyaService = {


    fotoGonder(form){

        return axios.post('panel/mekmarusa/fotoGonder',form,{
            headers : {'Content-Type': 'multipart/form-data'}
        }).then(res => res.data)
    },
    
}


export default DosyaService;