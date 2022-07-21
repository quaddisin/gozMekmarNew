import raporService from '../../service/RaporService';

const state = {

    gelenSiparisOzet : null,
    yukleneSiparisOzet : null,
    yuklenenSiparisAlacak : null,
    siparisGrafikRapor : null,
    siparisUretim : null,
    siparisYuklenen : null,
    siparisYuklenenGrafik : null,
    teklifRapor : null,
    finansRapor : null,
    progressBar : true,
    musteriUretim : null,
    list: []
}

const actions = {

    actSiparisOzetYukle({commit,state}){
       

        if(state.gelenSiparisOzet == null || state.yukleneSiparisOzet || state.yuklenenSiparisAlacak){

            raporService.getSiparisOzet().then(data => {
                
                commit('mutSiparisOzetYukle',data)  
            })
        }
    },
    actProgresBarDurdur({commit}){

        commit('mutProgresBarDurdur');
    }
}

const mutations = {

    mutSiparisOzetYukle(state,data){

        state.gelenSiparisOzet = data.gelenSiparisOzet;
        state.yukleneSiparisOzet = data.yuklenenSiparisOzet;
        state.yuklenenSiparisAlacak = data.yuklenenSiparisAlacak;
        state.siparisGrafikRapor = data.siparisGrafikRapor;
        state.siparisUretim = data.siparisUretim;
        state.siparisYuklenen = data.siparisYuklenen;
        state.siparisYuklenenGrafik = data.siparisYuklenenGrafik;
        state.teklifRapor = data.teklifRapor;
        state.finansRapor = data.finansRapor;
        state.progressBar = false;
        state.musteriUretim = data.musteriUretim;
    }
        
    
       
}

const getters = {

    getGelenSiparisOzet(state){

        return state.gelenSiparisOzet;
    },
    getYuklenenSiparisOzet(state){

        return state.yukleneSiparisOzet;
    },
    getYuklenenSiparisAlacak(state){

        return state.yuklenenSiparisAlacak;
    },
    getSiparisGrafikMekmar(state){
        const d = new Date()
        const year = d.getFullYear()
        
           
         
        const basicData = {
            labels : state.siparisGrafikRapor.mekmar.labels,
            datasets : [],
            header: {
                
                center: 'title',
                label : 'Yüklenenler'
              
            }
        }
      
       
        basicData.datasets.push(
            {
                label : year + '-Yüklenenler' ,
               
                data : state.siparisGrafikRapor.mekmar.datasets[1].data  ,
                fill: false,
               
                backgroundColor: '#414141',
                borderColor: '#414141'
               
            }
        )
        basicData.datasets.push(
            {
                label: year +'-Gelen Sipariş',
                data : state.siparisGrafikRapor.mekmar.datasets[0].data, 
                fill: false,
                backgroundColor: '#0313fc',
                borderColor: '#0313fc',
              
                
            }
        )
        
       

        return basicData;
    },
   
 
       
    getSiparisGrafikHepsi(state){

        const basicData = {
            labels : state.siparisGrafikRapor.hepsi.labels,
            datasets : []
        }
        const d = new Date()
        const year = d.getFullYear()
        
        basicData.datasets.push(
            {
                label :  year + '-Yüklenenler',
                data : state.siparisGrafikRapor.hepsi.datasets[1].data,
                fill: false,
                backgroundColor: '#414141',
                borderColor: '#414141'
            }
        )

        basicData.datasets.push(
            {
                label:  year + 'Gelen Sipariş',
                data: state.siparisGrafikRapor.hepsi.datasets[0].data,
                fill: false,
                backgroundColor: '#0313fc',
                borderColor: '#0313fc',
            }
        )
      


        return basicData;
    },
    getSiparisUretimHepsi(state){

        return state.siparisUretim.hepsi;
    },
    getSiparisUretimMekmar(state){

        return state.siparisUretim.mekmar;
    },
    getSiparisUretimToplamHepsi(state){

        let toplam = 0

        for(let key in state.siparisUretim.hepsi){

            const data = state.siparisUretim.hepsi[key];

            toplam += data.miktar;
        }

        return toplam;
    },
    getSiparisUretimAmountHepsi(state){

        let amount = 0

        for(let key in state.siparisUretim.hepsi){

            const data = state.siparisUretim.hepsi[key];

            amount += data.total;
        }

        return amount;
    },
    getSiparisUretimToplamMekmar(state){

        let toplam = 0

        for(let key in state.siparisUretim.mekmar){

            const data = state.siparisUretim.mekmar[key];

            toplam += data.miktar;
        }

        return toplam;
    },
    getSiparisUretimAmountMekmar(state){

        let amount = 0

        for(let key in state.siparisUretim.mekmar){

            const data = state.siparisUretim.mekmar[key];

            amount += data.total;
        }

        return amount;
    },

    
			getSiparisYuklenenMekmar(state){

        return state.siparisYuklenen.mekmar;
         },
		

    
    getSiparisYuklenenHepsi(state){

        return state.siparisYuklenen.hepsi
    },
    getSiparisYuklenenToplamMekmar(state){

        let toplam = 0
        

        for(let key in state.siparisYuklenen.mekmar){

            const data = state.siparisYuklenen.mekmar[key];

            toplam += data.miktar;
           
        }

        return toplam ;
    },
    
    getSiparisYuklenenAmountMekmar(state){

      
        let amount = 0

        for(let key in state.siparisYuklenen.mekmar){

            const data = state.siparisYuklenen.mekmar[key];

            
            amount += data.total;
        }

        return  amount;
    },
    getSiparisYuklenenToplamHepsi(state){

        let toplam = 0

        for(let key in state.siparisYuklenen.hepsi){

            const data = state.siparisYuklenen.hepsi[key];

            toplam += data.miktar;
        }

        return toplam;
    },
    
    getSiparisYuklenenAmountHepsi(state){

        let amount = 0

        for(let key in state.siparisYuklenen.hepsi){

            const data = state.siparisYuklenen.hepsi[key];

            amount += data.total;
        }

        return amount;
    },
    getSiparisYuklenenGrafikList(state){

        return state.siparisYuklenenGrafik
    },
    getTeklifRapor(state){

        return state.teklifRapor;
    },
    getTeklifAylikTeklifSayisi(state){

        let toplam = 0

        for(let key in state.teklifRapor.aylik){

            const data = state.teklifRapor.aylik[key]

            toplam += data.teklifSayisi
        }

        return toplam;
    },
    getTeklifAylikProformaSayisi(state){

        let toplam = 0

        for(let key in state.teklifRapor.aylik){

            const data = state.teklifRapor.aylik[key]

            toplam += data.proformaSayisi
        }

        return toplam;
    },
    getTeklifYillikTeklifSayisi(state){

        let toplam = 0

        for(let key in state.teklifRapor.yillik){

            const data = state.teklifRapor.yillik[key]

            toplam += data.teklifSayisi
        }

        return toplam;
    },
    getTeklifYillikProformaSayisi(state){

        let toplam = 0

        for(let key in state.teklifRapor.yillik){

            const data = state.teklifRapor.yillik[key]

            toplam += data.proformaSayisi
        }

        return toplam;
    },
    getFinansRapor(state){

        return state.finansRapor;
    },
    getFinansMekmarToplam(state){

        let toplam = 0;

        for(let key in state.finansRapor.mekmar){

            const data = state.finansRapor.mekmar[key];

            toplam += data.bakiye;
        }

        return toplam;
    },
    getFinansMekmarEPesinat(state){

        let toplam = 0;

        for(let key in state.finansRapor.mekmar){

            const data = state.finansRapor.mekmar[key];

            toplam += data.Eskipesinat;
        }

        return toplam;
    },
    getFinansMekmarYPesinat(state){

        let toplam = 0;

        for(let key in state.finansRapor.mekmar){

            const data = state.finansRapor.mekmar[key];

            toplam += data.Yenipesinat;
        }

        return toplam;
    },
    getFinansHepsiToplam(state){

        let toplam = 0;

        for(let key in state.finansRapor.hepsi){

            const data = state.finansRapor.hepsi[key];

            toplam += data.bakiye;
        }

        return toplam;
    },
    getFinansHepsiEPesinat(state){

        let toplam = 0;

        for(let key in state.finansRapor.hepsi){

            const data = state.finansRapor.hepsi[key];

            toplam += data.Eskipesinat;
        }

        return toplam;
    },
    getFinansHepsiYPesinat(state){

        let toplam = 0;

        for(let key in state.finansRapor.hepsi){

            const data = state.finansRapor.hepsi[key];

            toplam += data.Yenipesinat;
        }

        return toplam;
    },
    getProgressBar(state){

        return state.progressBar;
    },
    getMusteriUretim(state){

        return state.musteriUretim;
    }


}

export default {

    state,
    actions,
    mutations,
    getters
}