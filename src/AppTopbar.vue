<template >
	<div class="layout-topbar">
		<Toast position="bottomright" />
		<button class="p-link layout-menu-button" @click="onMenuToggle">
			<span class="pi pi-bars"></span>
		</button>
		<div class="" style="float:right" >
			<div class="badge-is-zero" v-if="isNotification <= 0">{{isNotification}}</div>
			
			<Button class="badge-is-not-zero" v-custom:mousemove="isMouseMove"  @click="display==false ? display=true:display=false" v-else-if="isNotification > 0" :label="isNotification">
			</Button>
			
			<div v-if="display" class="bildirimDialog" :class="{bildirimDialogExpanded:expanded}"  @mouseleave="emitButonLow" >
				<h3 style="text-align:center;margin-top:5px;color:#ffe291;font-weight:bold;">SATIŞÇI</h3>
				<div class="bildirimDialogSub" v-for="i in notificationData" :key="i" >
					<a class="bildirimDialogSubLink" style="cursor:text">
						<p class="bildirimDialogSubBaslikMusteri" ><Button class="bildirimDialogSubBaslikMusteriButton" @click="satisciMusteri" :label="i.musteriadi" ref="buttonClicked"></Button></p>
						<p class="bildirimDialogSubBaslik" @click="baslikClicked">{{i.baslik}}</p> 
						<p class="bildirimDialogSubContent" @click="baslikClicked">{{i.hatirlatma_notu}}</p>
					</a>
				</div>
				<h3 style="text-align:center;margin-top:5px;color:#ffe291;font-weight:bold;" v-if="hatirlatmaTrueDatas.lenght>0">TEKLİF</h3>
				<div class="bildirimDialogSub" v-for="i in hatirlatmaTrueDatas" :key="i" >
					<a class="bildirimDialogSubLink2" href="https://goz.mekmar.com/teklifListesi">
						<p class="bildirimDialogSubBaslik2" >{{i.title}}</p> 
						<p class="bildirimDialogSubContent2" >{{i.hatirlatmaAciklama}}</p>
					</a>
				</div>

			</div>

			<Dialog :visible.sync="is_satisform" :style="{width: '2100px;',height : '2500px;'}" header="Ayrıntı Listesi" :modal="true" >
					<section>
						<div class="columns">
							<div class="column is-12">
								<CustomersDetay :select_satisci="select_satisci" />
							</div>
						</div>
					</section>
            </Dialog>



		</div>
		
		
	</div>
</template>

<script>
import service from './service/Customers'
import {eventListener} from './main'
import CustomersDetay from './views/customers/CustomersDetay';
export default {
	computed:{
	},
	components : {
		CustomersDetay
	},
	directives:{
		custom:{
			bind(el,binding){
				const arg = binding.arg;
				const fnk = binding.value;
				el.addEventListener(arg,fnk);
			}
		}
	},
	data(){
		return{
			hatirlatmaTrueDatas:'',
			notificationToolTip:'',
			hatirlatmadurumu:null,
			isNotification:0,
			year:null,
			month:null,
			day:null,
			display:false,
			notificationData :null,
			expanded:true,
			bildirimClass:'bildirimDialogActive',
			is_satisform:false,
			select_satisci:''

		}
	},
	
    methods: {
		isMouseMove(){
			this.display = true
		},
		emitButonLow(){
			this.display = false
		},
        onMenuToggle(event) {
			this.expanded = !this.expanded
            this.$emit('menu-toggle', event);
			eventListener.$emit('menu-Toggle',this.expanded)
        },
		satisciMusteri(event){
			this.expanded = false
			eventListener.$emit('appSubBar',true)

			this.is_satisform = true
			this.select_satisci = event.target.firstChild.data
			this.$store.dispatch('loadBegin')
                
				service.getCustomersDetayListe(this.select_satisci).then(data => {
                    this.$store.dispatch('musteri_ayrinti_yukle_act',data)
                                this.is_satisform = true
                                this.$store.dispatch('loadEnd')
                    })
		},
		baslikClicked(){
			this.$refs.buttonClicked.click()
		}		
    },
	created(){
		const users = JSON.parse(localStorage.getItem('user'))
		service.getCustomersHatirlatmaListe(users.id).then(data=>{
			this.isNotification = data.length
			this.notificationData = data
			eventListener.$on('hatirlatmadurumu' , (data)=>{
					this.hatirlatmadurumu = data
					this.isNotification = this.hatirlatmadurumu.boyut + this.isNotification
					eventListener.$emit('isNotification',this.isNotification)
					
				})
			
			if(this.isNotification >0 || this.hatirlatmadurumu.durum){
				setTimeout(() => {
					this.$toast.add({severity:'success', summary: 'Satışçı Takip Bildirimi', detail: this.isNotification +' ' + 'Yeni Bildiriminiz Var'});
				}, 8000);
				
			}
		})
		
	},
	mounted(){
		setTimeout(() => {
			eventListener.$emit('satisciDatas',this.notificationData)
			eventListener.$on('hatirlatmaTrueDatas',(data)=>{
				this.hatirlatmaTrueDatas = data
			})
		}, 1000);
		
	}
	
}
</script>

<style scoped>
	.bildirimDialogSubBaslikMusteriButton{
		width: 294px;
		height: auto;
		border:1px solid gray;
		border-top-left-radius: 10px;
		border-bottom-right-radius: 10px;
		background-color:#195f61;
		text-align:center;
		
	}
	.bildirimDialogSubBaslikMusteri{
		padding-top:10px;
		font-weight:bold;
		color:gray;
		font-size:15px;
	}
	.bildirimDialogSubBaslik{
		padding-top:10px;
		font-weight:bold;
		color:white;
		font-size:15px;
		text-align: center;
	}
	.bildirimDialogSubContent{
		padding-top:5px;
		padding-bottom:5px;
		color:white;
		font-size:11px;
		border-bottom:2px solid #c0fcf6;
		text-align: center;
	}
	.bildirimDialogSubBaslik2{
		padding-top:10px;
		font-weight:bold;
		color:#fcba03;
		font-size:15px;
	}
	.bildirimDialogSubContent2{
		padding-top:5px;
		padding-bottom:5px;
		color:#fcba03;
		font-size:11px;
		border-bottom:2px solid #c0fcf6;
	}
	.bildirimDialogSubLink{
		color: black;
		text-align:center;
	}
	.bildirimDialogSubLink2{
		color: black;
		text-align:center;
	}
	.bildirimDialogSubLink2:hover p{
		color: white;
		transition: 1.1s 0s linear all;
		text-align:center;
	}
	
	.bildirimDialogSub{
		width: 300;
		height: auto;
		margin-left: 20px;
		margin-right: 20px;
		transition: all 1.1s 0s linear;
	}
	
	.badge-is-zero{
		width:35px;
		height:35px;
		background-color: red;
		color: white;
		margin-top:-3px;
		line-height: 35px;
		text-align:center;
		border-radius: 10px;
	}
	.badge-is-not-zero{
		width:35px;
		height:35px;
		background-color: blue;
		color:white;
		border:none;
		box-shadow: 2px 2px 4px black;
		border-radius: 10px;
		animation:badgeAnimation 2s 0s linear infinite alternate;
		margin-top:-3px;
		line-height: 35px;
		text-align:center;
	}

	@keyframes badgeAnimation {
		from{ 
			background-color: #008cd4;
		}
		to{ 
			background-color: #5ac040;
		}
	}
	.badge-is-not-zero:hover{
		color: white;
		animation:none;
	}
	.badge-is-not-zero:active{
		background-color:white;
		color: black;
		animation:none;
	}
	.bildirimDialog{
		position:absolute;
		top: 50px;
		left:1170px;
		width:350px;
		height:430px;
		overflow-x: hidden;
		overflow-y: scroll;
		z-index: 99;
		background-color:#414141;
		border-radius: 5px;
		padding-top: 15px;
		padding-bottom: 30px;
		line-height:18px;
		
			}

	.bildirimDialogExpanded{
		position:absolute;
		top: 50px;
		left:920px;
		width:350px;
		height:430px;
		overflow-x: hidden;
		overflow-y: scroll;
		z-index: 99;
		background-color: #414141;
		border-radius: 5px;
		padding-top: 15px;
		padding-bottom: 30px;
		line-height:18px;
			}
	@media screen and (max-width:1517px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:1099px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:1500px)  and (max-width:1516px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:1099px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:1480px)  and (max-width:1499px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:1085px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:1460px)  and (max-width:1479px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:1080px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:1100px) and (max-width:1199px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:775px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:1050px) and (max-width:1100px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:680px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:1000px) and (max-width:1050px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:635px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:990px) and (max-width:1000px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:630px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:970px) and (max-width:990px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:590px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:950px) and (max-width:970px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:560px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:930px) and (max-width:950px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:530px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:900px) and (max-width:930px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:510px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (min-width:870px) and (max-width:900px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:490px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
	@media screen and (max-width:600px) {
			.bildirimDialog{
				position:absolute;
				top: 50px;
				left:85px;
				width:350px;
				height:auto;
				opacity:1;
			}
		}
</style>