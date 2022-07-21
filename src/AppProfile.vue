<template>
	<div>

		<div class="layout-profile">			
			<div class="divImg">
				<img  :src="user.image" alt="" />
			</div>
			<button class="p-link layout-profile-link" @click="onClick">
				<span class="username">{{user.isim}}</span>
				<i class="pi pi-fw pi-cog"></i>
			</button>
			<transition name="layout-submenu-wrapper">
				<ul v-show="expanded">
					<li><button class="p-link" @click="accoundInformation"><i class="pi pi-fw pi-user"></i><span>Account</span></button></li>
					
					<li><button  @click="notification" class="p-link"><i class="pi pi-fw pi-inbox"></i><span >Notifications</span>
					
					<span v-if="isNotification>0" class="tag is-info">{{isNotification}}</span>
					<span v-else class="tag is-danger">{{isNotification}}</span>
					
					</button></li>
					<li><button class="p-link" id="signOut" ><i class="pi pi-sign-out"></i><span style="margin-top:-1px;"><a href="https://goz.mekmar.com/login" class="cikisLink">Sign Out</a></span></button></li>
				</ul>
			</transition>

			<Dialog :visible.sync="is_form11" :modal="true" v-custom:mouseleave="isMouseLeave" >
				<div class="columns" >
					<div class="column is-6" style="height: 350px;width:500px;background-color:#f4f4f4; " >
						<DataTable
			
							:value="hatirlatmaTrueDatas"
							:loading="loading"
							v-if="takvimdata.length>0"
							@row-select="isRowSelected"
							selectionMode="single"

						>
						<template #header>
							<div class="table-header">
								Teklifler
							</div>
						</template>
						<Column field="title" header="Müşteri" headerStyle="width:20px;" bodyStyle="text-align:center;">
							<template #body="slotProps">
							{{slotProps.data.title}}  
							</template>
						</Column>
						<Column field="start" header="Giriş Tarihi" headerStyle="width:20px;" bodyStyle="text-align:center;">
							<template #body="slotProps">
							{{slotProps.data.start}}  
							</template>
						</Column>
						<Column field="end" header="Son Tarih" headerStyle="width:20px;" bodyStyle="text-align:center;">
							<template #body="slotProps">
							{{slotProps.data.end}}  
							</template>
						</Column>
						<Column field="hatirlatmaAciklama" header="Hatirlatma" headerStyle="width:20px;" bodyStyle="text-align:center;">
							<template #body="slotProps">
							{{slotProps.data.hatirlatmaAciklama}}  
							</template>
						</Column>
						</DataTable>
						<DataTable v-else>
								Yaklaşan Etkinliğiniz Bulunmamaktadır.
						</DataTable>					
					</div>
					<div class="column is-6" style="height: 350px;width:500px;background-color:#f4f4f4; " >

						<DataTable
			
							:value="profileSatisciDatas"
							:loading="loading"
							v-if="profileSatisciDatas.length>0"
							@row-select="isRowSelected"
							selectionMode="single"
						>
						<template #header>
							<div class="table-header">
								Müşteri
							</div>
						</template>
						<Column field="musteriadi" header="Müşteri" headerStyle="width:20px;" bodyStyle="text-align:center;">
							<template #body="slotProps">
							{{slotProps.data.musteriadi}}  
							</template>
						</Column>
						<Column field="baslik" header="Başlık" headerStyle="width:20px;" bodyStyle="text-align:center;">
							<template #body="slotProps">
							{{slotProps.data.baslik}}  
							</template>
						</Column>
						<Column field="hatirlatma_notu" header="Not" headerStyle="width:20px;" bodyStyle="text-align:center;">
							<template #body="slotProps">
							{{slotProps.data.hatirlatma_notu}}  
							</template>
						</Column>
						</DataTable>
						<DataTable v-else>
								Yaklaşan Etkinliğiniz Bulunmamaktadır.
						</DataTable>					
					</div>
				</div>
			</Dialog>

			<Dialog :visible.sync="is_form12" :modal="true">
				<div class="columns">
					<div class="column is-10" style="height: 200px;width:500px;background-color:#f4f4f4; " >
						<div class="grid p-fluid">
							<div class="col-12 md:col-4">
								<div class="p-inputgroup">
									<span class="p-inputgroup-addon">
										<i class="pi pi-user"></i>
									</span>
									<InputText placeholder="Username" v-model="userUpdate.username" disabled />
									
								</div>
								<div class="p-inputgroup" style="margin-top:5px;">
									<span class="p-inputgroup-addon">
										<i class="pi pi-lock"></i>
									</span>
									<InputText v-bind:type="typeValue" v-model="userUpdate.userPassword" placeholder="Password" />
									<span v-if="typeValue=='password'"><Button @click="showPassword" icon="pi pi-unlock" style="height:40px"></Button></span>
									<span v-else><Button @click="showPassword" icon="pi pi-lock" style="height:40px"></Button></span>
								</div>
							</div>
							
						</div>
						<br /> <br />
						
						<Button @click="kullaniciGuncelle()" icon="pi pi-check" label="Güncelle"></Button>
						
					</div>
						
				</div>
				
			</Dialog>
			<Dialog :visible.sync="is_satisform" :style="{width: '2100px;',height : '2500px;'}" style="z-index:99;"  header="Ayrıntı Listesi" :modal="true" >
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
	import { mapGetters } from 'vuex';
	import teklifService from '../src/service/TeklifService';
	import {eventListener} from './main'
	import LoginService from './service/LoginService'
	import service from './service/Customers'
	import CustomersDetay from './views/customers/CustomersDetay';
	export default {
		directives: {
			custom:{
				bind(el,binding){
					const arg = binding.arg;
					const fnk = binding.value;
					el.addEventListener(arg,fnk);
				}
			}
		},
		props:['data']
		,
		data() {
			return {
				is_satisform:false,
				isNotification:null,
				profileSatisciDatas:null,
				passGuncellemeIsTrue:null,
				userPassword:'',
				userUpdate:{
					username:'',
					userPassword:''
				},
				expanded: false,
				user : {
					image : '',
					isim : ''
				},
				takvimLength:0,
				takvimDatas:[],
				hatirlatmaTrueDatas:[],
				hatirlatmaisTrue:null,
				takvimdata:null,
				is_form11:false,
				is_form12:false,
				year:"",
				month:"",
				day:"",
				typeValue:"password"
			}
		},
		components:{
			CustomersDetay
		},
		computed:{
				
				...mapGetters([
				'takvimList'
				]),
		},
		methods: {
			isRowSelected(event){
				this.is_satisform = true
				this.select_satisci = event.data.musteriadi
				this.$store.dispatch('loadBegin')
                
				service.getCustomersDetayListe(this.select_satisci).then(data => {
                    this.$store.dispatch('musteri_ayrinti_yukle_act',data)
                                this.is_satisform = true
                                this.$store.dispatch('loadEnd')
                    })
			},
			isMouseLeave(){
				this.is_form11=false
			},
			kullaniciGuncelle(){
				
				this.$store.dispatch('loadBegin')
                this.loginService.userPassGuncelle(this.userUpdate).then(data=>{
					
					if(data.status){
						this.$toast.add({severity:'success', summary: '', detail:'Parolanız Güncellendi',life:2000});
					}
					this.$store.dispatch('loadEnd')
					this.is_form12=false
				})
				
			},
			onClick(event){
				this.expanded = !this.expanded;
				event.preventDefault();
			},
			showPassword(){
				if(this.typeValue == 'password'){
					this.typeValue = 'text'
				}else{
					this.typeValue = 'password'
				}
			},
			notification(){
				this.is_form11 = true
				
				
			},
			takvimListesi(){
				teklifService.getTakvimList().then(data => {
                    this.takvimdata = data.takvimList
					var date = new Date();
					this.year = date.getFullYear();
					this.month = date.getMonth() +1
					this.day = date.getDate()
					this.month = this.month.toString()
					this.day = this.day.toString()
					if (this.day.length == 1){
						this.day = "0" + this.day
					}
					if (this.month.length == 1){
						this.month = "0" + this.month
					}
					var fulldate = this.year + '-' + this.month + '-' + this.day
					for(let i in this.takvimdata){
						if(this.takvimdata[i].hatirlatmaDurum == 'True'){
							this.hatirlatmaTrueDatas.push(this.takvimdata[i])
							
						}
					}
					eventListener.$emit('hatirlatmaTrueDatas',this.hatirlatmaTrueDatas)
					this.hatirlatmaisTrue = this.hatirlatmaTrueDatas[0].hatirlatmaDurum
					if(this.hatirlatmaisTrue =='True'){
						const hatirlatmaData={
							durum:true,
							boyut : this.hatirlatmaTrueDatas.length,
						}
						eventListener.$emit("hatirlatmadurumu",hatirlatmaData)
					}
					
					for (let j in this.hatirlatmaTrueDatas){
						
						if(this.hatirlatmaTrueDatas[j].end == fulldate){
							
							const veri={
								id:this.hatirlatmaTrueDatas[j].id, 
								isFalse:false
							}
							
							teklifService.setHatirlatilmaDurum(veri).then(data =>
								console.log(data)
							)
						}
					}
					
					
					
					
					
                    for(let key in this.takvimdata){

                        this.takvimdata[key].classNames=['eventColumn'];
                    }
                    
                    this.takvimList = this.takvimdata;
                    this.temsilciOzetList = data.temsilciOzetList;
                    this.hatirlatmaList = data.hatirlatmaList;
                    this.musteriOzetList = data.musteriOzetList;
                    this.temsilciLoading = false;
                    this.hatirlatmaLoading = false;
                    this.musteriOzetLoading = false;
					
                })
			},
			accoundInformation(){
				this.is_form12 = true
			}
			
		},
		
		mounted(){
			eventListener.$on('isNotification',(data)=>{
				this.isNotification = data
			})
			



		},
		created(){
			
			const localUser = JSON.parse(localStorage.getItem('user'))
			//assets/layout/images/personel/fadime.jpeg
			this.user.image = 'https://mekmar-image.fra1.digitaloceanspaces.com/personel/' + localUser.image;
			this.user.isim = localUser.kullaniciAdi + ' ' + localUser.kullaniciSoyAd
			this.userUpdate.username = localUser.kullaniciAdi
			this.takvimListesi()
			this.loginService = new LoginService();
			eventListener.$on('satisciDatas',(data)=>{
				this.profileSatisciDatas = data
				this.isNotification += this.profileSatisciDatas.length
			})
			
		}
	}
</script>

<style scoped>
	.divImg>img{
		border-radius: 5px;
		transform: scale(1.4);
	}
	.cikisLink{
		text-decoration: none;
		color:#fff;
		padding-top:-1px;
		transition:0.1s 0s linear all;
	}
	#signOut:hover .cikisLink{
		color:#979797;
	}
	
</style>