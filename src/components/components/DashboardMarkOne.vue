 <template >
<div class="p-grid p-fluid dashboard "  v-if="ad == 'Huseyin' ?  false : 'visibility: hidden'" >
	<!--Mark00001-->
	<div class="p-col-12 p-lg-12px " id="radioButton"  >
		<div class="p-grid p-justify-center" >
			<div class="p-col-4 p-lg-4px"  v-if="kullanici_test ==  true ?  false : 'visibility: hidden' " >
				<RadioButton id="rapor3"   name="rapor3" value="Musterim" v-model="rapor"  />
				<label for="rapor3" class="p-radiobutton-label">Müşterilerim</label>
			</div>
			<div class="p-col-4 p-lg-3px" v-if="kullanici_test1 ==  true ?  false : 'visibility: hidden' ">
				<RadioButton id="rapor1" :disabled="dis_detay" name="rapor1" value="Mekmar" v-model="rapor"  />
				<label for="rapor1" class="p-radiobutton-label">Mekmar</label>
			</div>
			<div class="p-col-4 p-lg-3px" v-if="kullanici_test1 ==  true ?  false : 'visibility: hidden' ">
				<RadioButton id="rapor2"  :disabled="dis_detay"    name="rapor2" value="Hepsi" v-model="rapor" />
				<label for="rapor2" class="p-radiobutton-label">Hepsi</label>
			</div>
		</div>
	</div>
	<div class="p-col-12 p-lg-3 p-md-4 is-center" id="topKalan" style="" > 
	
		<div class="card summary ">
	
			<span class="title">R1 : Gelen Sipariş</span>
			<span class="detail">{{getGelenSiparisOzet.aylik.ay}}</span>
			<div  v-if="rapor == 'Mekmar' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			</div>
			
			<div v-if="rapor == 'Hepsi' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			</div>

			<div v-if="rapor == 'Musterim' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			</div>
			
			<span v-if="rapor == 'Mekmar' ? true : false" class="count visitors"><a href="https://goz.mekmar.com/raporlar/siparisOzetRapor" target="_blank" rel="noopener noreferrer" style="color :white"> {{formatPrice(getGelenSiparisOzet.aylik.mekmar )}}  </a> </span>
			<button v-if="rapor == 'Hepsi' ? true : false" class="count visitors"  @click="siparis_sec_ay()">  {{formatPrice(getGelenSiparisOzet.aylik.hepsi )}} </button>
           <button  v-if="rapor == 'Musterim' ? true : false" class="count visitors"  @click="kullanici_sip_ay()" >  {{formatPrice(this.musteriSip.fobAy )}}</button>
		</div>
		<div class="card summary"  v-if="rapor == 'Musterim' ?  ''  :'visibility: hidden'  ">
			<span class="title">R3 : Aylık Ortalama</span>
			
				<span v-if="rapor == 'Mekmar' ? true : false" class="count visitor"> &emsp;{{formatPrice(getGelenSiparisOzet.aylik.ortlamaMekmarAy )}}</span>
				<span  v-if="rapor == 'Hepsi' ? true : false" class="count visitor"> {{formatPrice(getGelenSiparisOzet.aylik.ortalamaHepsiAy )}}</span>
		</div>
	<div class="card summary">
			<span class="title">R5 : Yüklenen Sipariş</span>
			<span class="detail">{{getGelenSiparisOzet.aylik.ay}}</span>
			<div v-if="rapor == 'Mekmar' ? true : false" class="p-offset-8 stil" >
                <span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
			</div>
			<div v-if="rapor == 'Hepsi' ? true : false" class="p-offset-8 stil" >
				<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
			</div>
			<div v-if="rapor == 'Musterim' ? true : false" class="p-offset-8 stil" >
				<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
			</div>
			<span v-if="rapor == 'Mekmar' ? true : false" class="count purchases"> <a href="https://goz.mekmar.com/raporlar/yuklemeRapor" target="_blank" rel="noopener noreferrer" style="color :white">{{formatPrice(getYuklenenSiparisOzet.aylik.mekmar)}} </a> </span>

			
			<span v-if="rapor == 'Hepsi' ? true : false" class="count purchases"><a href="https://goz.mekmar.com/raporlar/yuklemeRapor" target="_blank" rel="noopener noreferrer" style="color :white">{{formatPrice(getYuklenenSiparisOzet.aylik.hepsi)}}  </a> </span>
		<span v-if="rapor == 'Musterim' ? true : false" class="count purchases" @click="kullanici_sevk_ay()" >{{formatPrice(this.musteriSip.DdpAy)}} </span>
		</div>
		<div class="card summary"  v-if="rapor == 'Musterim' ?  ''  : 'visibility: hidden'  ">
			<span class="title">R7 : Aylık Ortalama</span>
			
				<span v-if="rapor == 'Mekmar' ? true : false" class="count purchase"> &emsp;{{formatPrice(getGelenSiparisOzet.yillik.yortlamaMekmarAy )}}</span>
				<span  v-if="rapor == 'Hepsi' ? true : false" class="count purchase"> {{formatPrice(getGelenSiparisOzet.yillik.yortalamaHepsiAy) }}</span>
		</div>
		<div class="card summary"  v-if="rapor == 'Musterim' ?  ''  : 'display:none'  ">
	
			<span class="title">R10 : Efes Gelen Sipariş</span>
			<span class="detail">{{getGelenSiparisOzet.aylik.ay}}</span>
			<div  v-if="rapor == 'Mekmar' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			</div>
			
			<div v-if="rapor == 'Hepsi' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			</div>
			<div v-if="rapor == 'Musterim' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			</div>
            <button   v-if="rapor == 'Mekmar' ? true : false" class="count revenue"  @click="sip_efes_mekmar_ay()"> {{formatPrice(getGelenSiparisOzet.aylik.gelenAylikEfes )}}</button>
			<button   v-if="rapor == 'Hepsi' ? true : false" class="count revenue"  @click="sip_efes_hepsi_ay()"> {{formatPrice(getGelenSiparisOzet.aylik.gelenAylikEfesHepsi )}}</button>
           <button   v-if="rapor == 'Musterim' ? true : false" class="count revenue" > {{formatPrice(this.musteriSip.EfesFobAy )}}</button>
		</div>
	
		<div class="card summary"  v-if="rapor == 'Musterim' ?  ''  : 'display:none'  ">
			<span class="title">R12 : Efes Yüklenen Sipariş</span>
			<span class="detail">{{getGelenSiparisOzet.aylik.ay}}</span>
			<div v-if="rapor == 'Mekmar' ? true : false" class="p-offset-8 stil" >
    <span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
			</div>
			<div v-if="rapor == 'Hepsi' ? true : false" class="p-offset-8 stil" >
 <span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
			</div>
			<div v-if="rapor == 'Musterim' ? true : false" class="p-offset-8 stil" >
 <span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
			</div>
			<button   v-if="rapor == 'Mekmar' ? true : false" class="count box"  @click="sevk_efes_mekmar_ay()">{{formatPrice(getYuklenenSiparisOzet.aylik.yuklenenAylikEfes)}}</button>
		
			
			<button   v-if="rapor == 'Hepsi' ? true : false" class="count box"  @click="sevk_efes_hepsi_ay()">{{formatPrice(getYuklenenSiparisOzet.aylik.yuklenenAylikEfesHepsi)}}</button>
		<button   v-if="rapor == 'Musterim' ? true : false" class="count box"  >{{formatPrice(this.musteriSip.EfesDdpAy)}}</button>
		</div>
		
   </div>
	<div class="p-col-12 p-lg-3 is-center"  >
		<div class="card summary">
			<span class="title">R2 : Gelen Sipariş</span>
			<span class="detail">{{getGelenSiparisOzet.yillik.yil  +" "+ (getGelenSiparisOzet.aylik.ay_int-1) + "/12"}}</span>
			<div v-if="rapor == 'Mekmar' ? true : false" class="p-offset-8 stil" >
				<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			
		</div>
			<div v-if="rapor == 'Hepsi' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			</div>

			<div v-if="rapor == 'Musterim' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			</div>

			<span  v-if="rapor == 'Mekmar' ? true : false" class="count visitors"><a href="https://goz.mekmar.com/raporlar/siparisOzetRapor" target="_blank" rel="noopener noreferrer" style="color :white"> {{formatPrice(getGelenSiparisOzet.yillik.mekmar) }} </a> </span>
			<button   v-if="rapor == 'Hepsi' ? true : false" class="count visitors"  @click="siparis_sec()"> 
			{{formatPrice(getGelenSiparisOzet.yillik.hepsi)}}  </button>
			<button    v-if="rapor == 'Musterim' ? true : false" class="count visitors"  @click="kullanici_sip_yil()" > 
			{{formatPrice(this.musteriSip.FobYil )}}  </button>
		</div>
		<div class="card summary"  v-if="rapor == 'Musterim' ?  ''  : 'display:none'  ">
			<span class="title">R4 : Yıl Sonu Tahmini</span>
			
				<span v-if="rapor == 'Mekmar' ? true : false" class="count visitor"> &emsp;{{formatPrice(getGelenSiparisOzet.aylik.ortalamaMekmarYillik) }}</span>
				<span  v-if="rapor == 'Hepsi' ? true : false" class="count visitor"> {{formatPrice(getGelenSiparisOzet.aylik.ortalamaHepsiYillik)}}</span>
		</div>
		<div class="card summary">
			<span class="title">R6 : Yüklenen Sipariş</span>
			<span class="detail">{{getGelenSiparisOzet.yillik.yil  +" "+ (getGelenSiparisOzet.aylik.ay_int-1) + "/12"}}</span>
			<div v-if="rapor == 'Mekmar' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
		</div>
			<div v-if="rapor == 'Hepsi' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
			</div>
			<div v-if="rapor == 'Musterim' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
			</div>
			<span  v-if="rapor == 'Mekmar' ? true : false"  class="count purchases"><a href="https://goz.mekmar.com/raporlar/yuklemeRapor" target="_blank" rel="noopener noreferrer" style="color :white">{{formatPrice(getYuklenenSiparisOzet.yillik.mekmar) }} </a></span>
			<span  v-if="rapor == 'Hepsi' ? true : false"  class="count purchases"><a href="https://goz.mekmar.com/raporlar/yuklemeRapor" target="_blank" rel="noopener noreferrer" style="color :white">{{formatPrice(getYuklenenSiparisOzet.yillik.hepsi)}} </a></span>
		<span  v-if="rapor == 'Musterim' ? true : false"  class="count purchases" @click="kullanici_sevk_yil()"> {{formatPrice(this.musteriSip.DdpYil)}} </span>
		</div> 
		
       <div class="card summary"  v-if="rapor == 'Musterim' ?  ''  : 'display:none'  ">
			<span class="title">R8 : Yıl Sonu Tahmini</span>
			
				<span v-if="rapor == 'Mekmar' ? true : false" class="count purchase"> &emsp;{{formatPrice(getGelenSiparisOzet.yillik.yortalamaMekmarYillik)}}</span>
				<span  v-if="rapor == 'Hepsi' ? true : false" class="count purchase"> {{formatPrice(getGelenSiparisOzet.yillik.yortalamaHepsiYillik) }}</span>
		</div>
		<div class="card summary"  v-if="rapor == 'Musterim' ?  ''  : 'display:none'  ">
			<span class="title">R11 : Efes Gelen Sipariş</span>
			<span class="detail">{{getGelenSiparisOzet.yillik.yil  +" "+ (getGelenSiparisOzet.aylik.ay_int-1) + "/12"}}</span>
			<div v-if="rapor == 'Mekmar' ? true : false" class="p-offset-8 stil" >
				<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			
		</div>
			<div v-if="rapor == 'Hepsi' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			</div>
			<div v-if="rapor == 'Musterim' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">FOB</span>
			</div>
			<button    v-if="rapor == 'Mekmar' ? true : false" class="count revenue"  @click="sip_efes_mekmar_yil()">{{formatPrice(getGelenSiparisOzet.yillik.gelenEfes) }}</button>
			<button    v-if="rapor == 'Hepsi' ? true : false" class="count revenue"  @click="sip_efes_hepsi_yil()">{{formatPrice(getGelenSiparisOzet.yillik.gelenEfesHepsi)}}</button>
		<button    v-if="rapor == 'Musterim' ? true : false" class="count revenue" >{{formatPrice(this.musteriSip.EfesFobYil)}}</button>
		</div>
	
			<div class="card summary"  v-if="rapor == 'Musterim' ?  ''  : 'display:none'  ">
			<span class="title">R13 : Efes Yüklenen Sipariş</span>
			<span class="detail">{{getGelenSiparisOzet.yillik.yil  +" "+ (getGelenSiparisOzet.aylik.ay_int-1) + "/12"}}</span>
			<div v-if="rapor == 'Mekmar' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
		</div>
			<div v-if="rapor == 'Hepsi' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
			</div>
			<div v-if="rapor == 'Musterim' ? true : false" class="p-offset-8 stil" >
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: right; margin-top:-10px; margin-left:10px" class="p-offset-1">DDP</span>
			</div>
			<button    v-if="rapor == 'Mekmar' ? true : false"  class="count box"  @click="sevk_efes_mekmar_yil()">{{formatPrice(getYuklenenSiparisOzet.yillik.yuklenenEfes) }}</button>
			<button   v-if="rapor == 'Hepsi' ? true : false"  class="count box"  @click="sevk_efes_hepsi_yil()">{{formatPrice(getYuklenenSiparisOzet.yillik.yuklenenEfesHepsi)}}</button>
			<button   v-if="rapor == 'Musterim' ? true : false"  class="count box"  >{{formatPrice(this.musteriSip.EfesDdpYil)}}</button>
		</div> 
		
	</div>
	<div class="p-col-12 p-lg-5"  v-if="rapor == 'Musterim' ?  ''  : 'display:none'" >
		<div  class="card" style="height:499px;">
			<span class="title" >R14 </span>
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:115px;" class="p-offset-1"> {{this.past}}</span>		
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:140px;" class="p-offset-1">{{this.year}}</span>
			<br><br>
			<span style="color:white;font-weight:bold;color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:1%" class="p-offset-1">Yüklenen : </span>
			<span v-if="rapor == 'Mekmar' ? true : false" style="color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:80px " class="p-offset-1"><span style="font-weight:bold;">14A : </span><a href="https://goz.mekmar.com/raporlar/yuklemeRapor" target="_blank" rel="noopener noreferrer" style="color :#414141"> {{formatPrice(getYuklenenSiparisOzet.yillik.GecenDdp)}}</a></span>
			<span v-if="rapor == 'Hepsi' ? true : false" style="color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:80px " class="p-offset-1"><span style="font-weight:bold;">14A : </span><a href="https://goz.mekmar.com/raporlar/yuklemeRapor" target="_blank" rel="noopener noreferrer" style="color :#414141">{{formatPrice(getYuklenenSiparisOzet.yillik.GecenDdpHepsi) }} </a></span>
			<span v-if="rapor == 'Musterim' ? true : false" style="color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:80px " class="p-offset-1"><span style="font-weight:bold;">14A : </span>{{formatPrice(this.musteriSip.R14A) }} </span>
			<span  v-if="rapor == 'Mekmar' ? true : false" style="color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:55px;" class="p-offset-1"><span style="font-weight:bold;">14C : </span><a href="https://goz.mekmar.com/raporlar/yuklemeRapor" target="_blank" rel="noopener noreferrer" style="color :#414141">{{formatPrice(getYuklenenSiparisOzet.yillik.mekmar+getYuklenenSiparisOzet.aylik.mekmar) }}</a></span>
			<span  v-if="rapor == 'Hepsi' ? true : false" style="color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:55px;" class="p-offset-1"><span style="font-weight:bold;">14C : </span><a href="https://goz.mekmar.com/raporlar/yuklemeRapor" target="_blank" rel="noopener noreferrer" style="color :#414141">{{formatPrice(getYuklenenSiparisOzet.aylik.hepsi+getYuklenenSiparisOzet.yillik.hepsi)}}</a></span>
			<span  v-if="rapor == 'Musterim' ? true : false" style="color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:55px;" class="p-offset-1"><span style="font-weight:bold;">14C : </span><a href="https://goz.mekmar.com/raporlar/yuklemeRapor" target="_blank" rel="noopener noreferrer" style="color :#414141">{{formatPrice(this.musteriSip.DdpAy+this.musteriSip.DdpYil)}}</a></span>
			<br>
			<span style="color:white;font-weight:bold; color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:1%" class="p-offset-1">Gelen Sipariş : </span>	
			
			<span v-if="rapor == 'Mekmar' ? true : false" style=" color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:53px" class="p-offset-1"><span style="font-weight:bold;">14B: </span> <span style="color:#414141;"><a href="https://goz.mekmar.com/raporlar/siparisOzetRapor" target="_blank" rel="noopener noreferrer" style="color :#6e6816">{{formatPrice(getGelenSiparisOzet.yillik.GecenFob)}}</a></span></span>
			<span v-if="rapor == 'Hepsi' ? true : false"  style="color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:53px" class="p-offset-1"><span style="font-weight:bold;">14B: </span> <span style="color:#414141;">{{formatPrice(getGelenSiparisOzet.yillik.GecenFobHepsi)}}</span></span>
			<span v-if="rapor == 'Musterim' ? true : false"  style="color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:53px" class="p-offset-1"><span style="font-weight:bold;">14B: </span> <span style="color:#414141;">{{formatPrice(this.musteriSip.R14B)}}</span></span>
			<span  v-if="rapor == 'Mekmar' ? true : false" style="color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:65px;" class="p-offset-1"><span style="font-weight:bold;">14D : </span> <span style="color:#414141;"><a href="https://goz.mekmar.com/raporlar/siparisOzetRapor" target="_blank" rel="noopener noreferrer" style="color :#6e6816">{{formatPrice(getGelenSiparisOzet.aylik.mekmar+getGelenSiparisOzet.yillik.mekmar) }}</a></span></span>
			<span  v-if="rapor == 'Hepsi' ? true : false" style="color:BLACK;font-size:12px;float: center;margin-top:-10px; margin-left:65px;" class="p-offset-1"><span style="font-weight:bold;">14D : </span><span style="color:#414141;">{{formatPrice(getGelenSiparisOzet.aylik.hepsi+getGelenSiparisOzet.yillik.hepsi) }}</span></span>
		<span  v-if="rapor == 'Musterim' ? true : false" style="color:BLACK;font-size:12px;margin-top:-10px; margin-left:65px;" class="p-offset-1"><span style="font-weight:bold;">14D : </span><span style="color:#414141;">{{formatPrice(this.musteriSip.fobAy+this.musteriSip.FobYil) }}</span></span>
			<br><br>
			<Chart v-if="rapor == 'Mekmar' ? true : false" type="line" :data="getSiparisGrafikMekmar" />
			<Chart v-if="rapor == 'Mekmar' ? false : true" type="line" :data="getSiparisGrafikHepsi" />
			
		</div>
		
	
	</div>
	<!--Mark00001-->


	
	<Button label="Devamı için tıklayınız." class="devamButonu" @click="customComp='dashboardMarkThree',isButton=false" v-if="isButton"></Button>
	<component :is='customComp'>

	</component>
</div>
	
	
	

</template>

<script>
import service from '../service/AnasayfaRapor';
import { mapGetters } from 'vuex';
import DashboardMarkThree from './DashboardMarkThree.vue'
export default { 
	
	data() {
		return {
			ad : null,
			kullanici_test : false,
			year : 0,
			past :  0 ,
			musteriSip : [],
			mekmarTakip :[],
			hepsiTakip :[],
			rapor : 'Musterim',
			customComp:'',
			isButton:true
			
			
		
		}

	},
	components : {
		'dashboardMarkThree':DashboardMarkThree
	},
	computed: {

		...mapGetters([
			'getGelenSiparisOzet',
			'getSiparisGrafikMekmar',
			'getSiparisGrafikHepsi',
			'getYuklenenSiparisOzet',
						
		]),
	},
	created() {
		const d = new Date()
        this.year = d.getFullYear()
		this.past = this.year -1
		const username = ( this.$store.getters.getUser).toUpperCase();
		const username2 = ( this.$store.getters.getUser).toLowerCase();
		this.ad = username[0]+username2.substring(1)
		service.getAnasayfaMusteriList().then(data => {
			
			this.musteriSip = data.KullaniciSiparis[0]
			this.takiplistem = data.TakipList
			
			
			
				}) 
		
			
		service.getAnasayfaTakipListe().then(data => {
	
			this.mekmarTakip = data.mekmar_takiplist
			this.hepsiTakip = data.hepsi_takiplist
			this.$store.dispatch('loadEnd')
			}) 
		
		

				

	
		
		if( this.ad == 'Sema' || this.ad == 'Ozlem' || this.ad == 'Hakan' ){
					
					this.rapor = 'Musterim'
					this.dis_detay = true;
					this.kullanici_test1 = true;
				}
			
		else{
				this.dis_detay = false;
				this.rapor = 'Mekmar'

				if (this.ad == 'Fatih' || this.ad == 'Mehmet')
					{
						this.kullanici_test = true;
					}
				
			}
		
        
	},
	mounted() {
	},
	methods : {
		
		sevk_efes_hepsi_ay(){
			this.$store.dispatch('loadBegin')
			service.getAnasayfaSiparisListe().then(data => {
			
				this.$store.dispatch('hepsi_sevk_ay_ayrinti_efes_act',data.sevk_ay_hepsi_efes)
				this.is_form16= true 
				this.$store.dispatch('loadEnd') 
	
           
            })
         },
		sevk_efes_mekmar_ay(){
			this.$store.dispatch('loadBegin')
			service.getAnasayfaSiparisListe().then(data => {
			
				this.$store.dispatch('mekmar_sevk_ay_ayrinti_efes_act',data.sevk_ay_mekmar_efes)
				this.is_form15= true
				this.$store.dispatch('loadEnd') 
				
           
            })
		},
		siparis_sec_ay(){
				this.$store.dispatch('loadBegin')
			service.getAnasayfaSiparisListe().then(data => {
			
					data.siparis_ayrinti_yil = null
          
					this.$store.dispatch('anasayfa_siparis_ay_ayrinti_act',data.siparis_ayrinti_ay)
					
					this.is_form9= true 
					this.$store.dispatch('loadEnd')  
	
           
            })
         },
		kullanici_sip_ay(){
			this.$store.dispatch('loadBegin')
			service.getAnasayfaMusteriList().then(data => {
				this.$store.dispatch('kullanici_sipAy_act',data.AylikSiparis)
				this.is_form19= true 
				this.$store.dispatch('loadEnd')
            })
         },
		kullanici_sevk_ay(){
			this.$store.dispatch('loadBegin')
			service.getAnasayfaMusteriList().then(data => {
			
				this.$store.dispatch('kullanici_sevkAy_act',data.AylikSevk)
				this.is_form21= true 
				
				this.$store.dispatch('loadEnd') 
	
           
            })
         },
		sip_efes_mekmar_ay(){
			this.$store.dispatch('loadBegin')
			service.getAnasayfaSiparisListe().then(data => {
	
					this.$store.dispatch('mekmar_sip_ay_ayrinti_efes_act',data.sip_ay_mekmar_efes)
					this.is_form11= true 
					this.$store.dispatch('loadEnd')
		
			
				})
         },
		sip_efes_hepsi_ay(){
             this.$store.dispatch('loadBegin')
		service.getAnasayfaSiparisListe().then(data => {
			
				this.$store.dispatch('hepsi_sip_ay_ayrinti_efes_act',data.sip_ay_hepsi_efes)
				this.is_form12= true 
				this.$store.dispatch('loadEnd')
	
           
            })
         }, 
		formatDecimal(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
	
           
		formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return "$" +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },	  
	},

	
	
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
	.devamButonu{
		background-color: #484444;
		transition:all 1.2s 0s cubic-bezier(0,1.69,.12,-0.76);
	}
	.devamButonu:hover{
		background-color:#63d4b9;
	}

	#topKalan{
		margin-left:65px;
	}
	@media screen and (max-width:600px) {
		#topKalan{
			margin-left:0px;
		}
		
	}
	#radioButton{
		margin-left:200px;
	}
	@media screen and (max-width:600px){
		#radioButton{
			margin-left:40px;
		}
	}

	
</style>