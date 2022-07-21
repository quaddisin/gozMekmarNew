<template>
    <div>
        <div  class="card" >
		<span class="title" style="font-size:14px;">R15 : Konteyner Takip Listesi</span>
		
		<div class="column is-12 is-centered rapor" style="margin-left:0px;">
			<DataTable mekmarTakip
			:value="this.rapor == 'Musterim' ? takiplistem : (this.rapor == 'Mekmar' ? mekmarTakip : hepsiTakip)"
			
			:loading="loading"
			:scrollable="true" 
			scrollHeight="190px"
			dateKey="id"
			
			
			>
			<Column field="sira" header="#" headerStyle="width:5px" bodyStyle="text-align:center;align-items:center">
					<template #body="slotProps">
						{{slotProps.data.sira}}
					</template>
			</Column>
			
			<Column field="musteriadi" header="Müşteri Adı" headerStyle="width:25px" bodyStyle="text-align:center;">
					<template #body="slotProps">
						{{slotProps.data.musteriadi}}
					</template>
				</Column>
				<Column field="siparisno" header="PO" headerStyle="width:25px" bodyStyle="text-align:center;align-items:center">
					<template #body="slotProps">
						{{slotProps.data.siparisno}}
					</template>
				</Column>
				<Column field="sevk_tarihi" header="Sevk Tarihi" headerStyle="width:20px;" bodyStyle="text-align:center;">
					<template #body="slotProps">
						{{slotProps.data.sevk_tarihi}}
					</template>
				</Column>
					<Column field="line" header="Hat" headerStyle="width:15px;" bodyStyle="text-align:left;">
					<template #body="slotProps">
						{{slotProps.data.line}}
					</template>
				</Column>
				<Column field="konteynerno" header="Konteyner Numarası" headerStyle="width:40px;" bodyStyle="text-align:left;">
					<template #body="slotProps">
						{{slotProps.data.konteynerno}}
					</template>
				</Column>
				<Column field="eta" header="Eta" headerStyle="width:20px;background-color :#66b040;" bodyStyle="text-align:center;">
					<template #body="slotProps">
						{{slotProps.data.eta}}
					</template>
				</Column>
				<Column field="liman" header="Liman" headerStyle="width:20px;" bodyStyle="text-align:center;">
					<template #body="slotProps">
						{{slotProps.data.liman}}
					</template>
				</Column>
			<Column field="kalan_sure" header="Kalan Süre" headerStyle="width:20px;" bodyStyle="text-align:center;">
					<template #body="slotProps">
						{{slotProps.data.kalan_sure}}
					</template>
				</Column>
					<Column field="pesinat" header="Peşinat" headerStyle="width:20px;" bodyStyle="text-align:center;">
					<template #body="slotProps">
						{{formatPrice(slotProps.data.pesinat)}}
					</template>
				</Column>
				
			<Column field="kalan_alacak" header="Kalan Alacak" headerStyle="width:25px;" bodyStyle="text-align:center;">
					<template #body="slotProps">
						{{formatPrice(slotProps.data.kalan_alacak) }}
					</template>
				</Column>
				
			</DataTable>
			<br>
			
		</div>

		
	</div>
    </div>
</template>

<script>

    import service from '../service/AnasayfaRapor';
    export default{
        components:{

        },
        data(){
            return{ 
                rapor : 'Musterim',
                mekmarTakip :[],
                takiplistem : [],
            }
        },
        methods:{
            formatDecimal(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
	
           
		formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return "$" +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          }
        },
        created(){
            this.$store.dispatch('loadBegin')
		
			
            service.getAnasayfaTakipListe().then(data => {
                console.log("getAnasayfaTakipListe",data.mekmar_takiplist)
                this.mekmarTakip = data.mekmar_takiplist
                this.hepsiTakip = data.hepsi_takiplist
                this.$store.dispatch('loadEnd')
			}),
            service.getAnasayfaMusteriList().then(data => {
			
			this.musteriSip = data.KullaniciSiparis[0]
			this.takiplistem = data.TakipList
			
			
			
				})
        },
        mounted(){

        }
    }

</script>

<style scoped>
	.dashboard .summary .title{

		font-size: 11px;
	}
	.dashboard .summary .count{

		font-size:13px;
	}
	.p-datatable{

        font-size:10px;
    }
	.p-datatable-responsive{
		font-size:10px;
	}
	.box{
		background-color:black;
	}
	.yesil{

		color: #527F62 ;
		background-color : #C8FDDA;
		font-weight: bold;
		font-size:11px;
	}
	.kirmizi{
		
		background-color: #F59C9C;
		color : #F23A3A;
		font-weight: bold;
		font-size:11px;
		
	}


	
</style>