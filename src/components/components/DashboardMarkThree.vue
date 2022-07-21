 <template >
<div class="p-grid p-fluid dashboard"  v-if="ad == 'Huseyin' ?  false : 'visibility: hidden'" >
	<!--Mark00002-->
		
	<div  class="card" >
		<span class="title" style="font-size:14px;">R15 : Konteyner Takip Listesi</span>
		
		<div class="column is-10 is-centered rapor" style="margin-left:100px;">
			<DataTable mekmarTakip
			:value="this.rapor == 'Musterim' ? takiplistem : (this.rapor == 'Mekmar' ? mekmarTakip : hepsiTakip)"
			
			:loading="loading"
			:scrollable="true" 
			scrollHeight="190px"
			dateKey="id"
			
			
			>
			<Column field="sira" header="#" headerStyle="width:10px" bodyStyle="text-align:center;align-items:center">
					<template #body="slotProps">
						{{slotProps.data.sira}}
					</template>
			</Column>
			
			<Column field="musteriadi" header="Müşteri Adı" headerStyle="width:20px" bodyStyle="text-align:center;">
					<template #body="slotProps">
						{{slotProps.data.musteriadi}}
					</template>
				</Column>
				<Column field="siparisno" header="PO" headerStyle="width:20px" bodyStyle="text-align:center;align-items:center">
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
				<Column field="eta" header="Eta" headerStyle="width:20px;" bodyStyle="text-align:center;">
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
				
			<Column field="kalan_alacak" header="Kalan Alacak" headerStyle="width:20px;" bodyStyle="text-align:center;">
					<template #body="slotProps">
						{{formatPrice(slotProps.data.kalan_alacak) }}
					</template>
				</Column>
				
			</DataTable>
			<br>
			
		</div>

		
	</div>
	
	<!--Mark00002-->
	<div  class="card" v-if="rapor == 'Musterim' ?  'display:none'  :''  " >
			<span class="title" style="font-size:14px;">Finans Takip Listesi</span>
			
			<div class="column is-11 is-centered rapor" style="margin-left:100px;">
                <DataTable mekmarTakip
				:value="this.rapor == 'Musterim' ? finansTakiplistem :  '' "
               
                :loading="loading"
                :scrollable="true" 
                scrollHeight="190px"
                dateKey="id"
               
               
                >
				<Column field="musteriAdi" header="Müşteri Adı" headerStyle="width:20px" bodyStyle="text-align:center;align-items:center">
                        <template #body="slotProps">
                            {{slotProps.data.musteriAdi}}
                        </template>
                </Column>
				
			
                  <Column field="siparisno" header="PO" headerStyle="width:10px" bodyStyle="text-align:center;align-items:center">
                        <template #body="slotProps">
                            {{slotProps.data.siparisno}}
                        </template>
                    </Column>
                    <Column field="siparisDurum" header="Status" headerStyle="width:10px;" bodyStyle="text-align:center;">
                        <template #body="slotProps">
                            {{slotProps.data.siparisDurum}}
                        </template>
                    </Column>
                     <Column field="pesinat" header="Peşinat" headerStyle="width:15px;" bodyStyle="text-align:center;">
                        <template #body="slotProps">
                            {{formatPrice(slotProps.data.pesinat)}}
                        </template>
                    </Column>
					
					
                   <Column field="mal_bedeli" header="Sipariş Total" headerStyle="width:15px;background-color :#58D68D;" bodyStyle="text-align:center;">
                        <template #body="slotProps">
                            {{formatPrice(slotProps.data.mal_bedeli)}}
                        </template>
                    </Column>
				
				<Column field="siparisSahibi" header="Sipariş S." headerStyle="width:8px;" bodyStyle="text-align:center;">
                        <template #body="slotProps">
                            {{slotProps.data.siparisSahibi}}
                        </template>
                    </Column>
						<Column field="operasyon" header="Operasyon S." headerStyle="width:8px;" bodyStyle="text-align:center;">
                        <template #body="slotProps">
                            {{slotProps.data.operasyon}}
                        </template>
                    </Column>
                  
				<Column field="kalan_bedel" header="BAKİYE" headerStyle="width:10px;" bodyStyle="text-align:center;">
                        <template #body="slotProps">
                          <div :class="slotProps.data.kalan_bedel > 0 ? 'yesil' : 'kirmizi' ">  {{formatPrice(slotProps.data.kalan_bedel) }} </div>
                        </template>
                    </Column>
                  
                </DataTable>
                <br>
                
            </div>

			
	</div>
	<div class="p-col-12 p-lg-4" v-if="rapor == 'Musterim' ?  ''  : 'display:none'  ">
		<div class="card">
		
			<h4 v-text-center style="font-weight:bold;" >R16 : {{getGelenSiparisOzet.yillik.yil}}'de Yapılan Sevkiyatın Üreticilere Göre Dağılımı</h4><br>
			<DataTable
			class="p-datatable-responsive"
			:value="rapor == 'Mekmar' ? getSiparisYuklenenMekmar : getSiparisYuklenenHepsi"
			:scrollable="true" 
            scrollHeight="248px"
			:loading="loading"
			:selection.sync="select_sevk"
			@row-select="sevk_sec($event)" 
			selectionMode="single"
			>
				<Column field="Firma" header="Firma" headerStyle="width:120px">
					<template #body="slotProps">
						{{slotProps.data.Firma}}
					</template>
				</Column>
				<Column   field="miktar" header="Miktar (m2)" headerStyle="width:110px" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{formatDecimal(slotProps.data.miktar)}}
					</template>
					<template  #footer>
						{{formatDecimal(sevkiyatToplam)}}
					</template>
				</Column>
				
			
				<Column   field="total" header="Amount" headerStyle="width:110px" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{ formatPrice(slotProps.data.total) }}
					</template>
					<template  #footer>
						{{ formatPrice(sevkiyatAmount)}}
					</template>
					
				</Column>
			</DataTable>
			<Dialog :visible.sync="is_form1"  :header.sync="siparisFormBaslik"  :modal="true">
            <div class="columns">
                <div class="column is-12" >
                    <SevkDetay  />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form5"  :header.sync="siparisFormBaslik"   :modal="true">
            <div class="columns">
                <div class="column is-12" >
                    <SevkHepsiDetay />
                </div>
            </div>
        </Dialog>
		</div>
	</div>

	<div class="p-col-12 p-lg-4" v-if="rapor == 'Musterim' ?  ''  : 'display:none'  ">
		<div class="card">
			<h4 v-text-center style="font-weight:bold;" >R17 : {{getGelenSiparisOzet.yillik.yil}}'deki Hali Hazırdaki Siparişlerin Üretici Dağılımı</h4><br>
			
			<DataTable
			class="p-datatable-responsive"
			:value="rapor == 'Mekmar' ? getSiparisUretimMekmar : getSiparisUretimHepsi"
			:scrollable="true" 
            scrollHeight="248px"
			:selection.sync="select_uretim"
			@row-select="uretim_sec($event)" 
			selectionMode="single"
			>
				<Column field="Firma" header="Firma" headerStyle="width:120px">
					<template #body="slotProps">
						{{slotProps.data.Firma}}
					</template>
				</Column>
				<Column field="miktar" header="Miktar (m2)" headerStyle="width:110px" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{formatDecimal(slotProps.data.miktar)}}
					</template>
					<template  #footer>
						{{formatDecimal(uretimToplam)}}
					</template>
				</Column>
				<Column field="total" header="Amount" headerStyle="width:110px" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{formatPrice (slotProps.data.total) }}
		
					</template> 
					<template  #footer>
						{{ formatPrice(uretimAmount )}}
					</template>
				</Column>
			</DataTable>
			<Dialog :visible.sync="is_form2"  :header.sync="uretimFormBaslik"  :modal="true">
            <div class="columns">
                <div class="column is-12" >
                    <UretimDetay  />
                </div>
            </div>
        </Dialog>
			<Dialog :visible.sync="is_form6"  :header.sync="uretimFormBaslik"  :modal="true">
            <div class="columns">
                <div class="column is-12" >
                    <UretimHepsiDetay  />
                </div>
            </div>
        </Dialog>
		
		</div>
	</div>
	

	<div class="p-col-12 p-lg-4" v-if="rapor == 'Musterim' ?  ''  : 'display:none'  "  >
		<div class="card">
			<h5 v-text-center style="font-weight:bold;" >R18 : {{getGelenSiparisOzet.yillik.yil}}'deki Mevcut Siparişlerin Müşterilere Göre Dağılımı</h5><br>
			
			<DataTable
			class="p-datatable-responsive"
			:value="rapor == 'Mekmar' ? getMusteriUretim.mekmar : getMusteriUretim.hepsi"
			:scrollable="true" 
            scrollHeight="248px"
			:selection.sync="select_musteri"
			@row-select="musteri_sec($event)" 
			selectionMode="single"
			>
				<Column field="Firma" header="Firma"  headerStyle="width:140px">
					<template #body="slotProps">
						{{slotProps.data.Firma}}
					</template>
				</Column>
				<Column field="miktar" header="Miktar (m2)" headerStyle="width:110px" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{formatDecimal(slotProps.data.miktar)}}
					</template>
					<template  #footer>
						{{formatDecimal(uretimToplam )}}
					</template>
				</Column>
					<Column field="total" header="Amount"  headerStyle="width:110px" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{ formatPrice(slotProps.data.total )}}
					</template>
					<template  #footer>
						{{formatPrice(uretimAmount) }}
					</template>
				</Column>
			</DataTable>
		
		</div>
	</div>
	<div class="p-col-12 p-lg-6"  v-if="rapor == 'Musterim' ?  ''  : 'display:none'  " >
		<div class="card" >
		
		<h3 v-text-center style="font-weight:bold;" >R19 : Yüklenmiş Konteyner Bazlı Finans Raporu</h3><br>

			<DataTable
			class="p-datatable-responsive"
			:value="this.rapor == 'Mekmar' ? this.mekmar_finans1 : this.hepsi_finans"
			:scrollable="true" 
            scrollHeight="248px"
		
			
			>
				<Column field="musteriadi" header="Müşteri" headerStyle="width:10%">
					<template #body="slotProps">
						{{slotProps.data.musteriadi}}
					</template>
				</Column>
				<Column header="Açık Po Fatura Toplamı" fields="kapanmayan_siparis" headerStyle="width:8%" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{formatPrice(slotProps.data.kapanmayan_siparis) }} 
					</template>
					<template #footer>
						{{formatPrice(siparis_bedel )}}
					</template>
						
					
				</Column>
				<Column field="kapanmayan_odenen" header="Açık Po için Ödemeler" headerStyle="width:8%" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{formatPrice(slotProps.data.kapanmayan_odenen) }} 
					</template>
						<template #footer>
						{{formatPrice(odenen )}}
					</template>
					
				</Column>
			
				<Column field="kapanmayan_kalan" header="Açık Po için Kalan Alacak" headerStyle="width:10%" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{ formatPrice(slotProps.data.kapanmayan_kalan )}}
					</template>
					<template #footer>
						{{formatPrice(genel_bakiye )}}
					</template>
				</Column>
			</DataTable>
		</div>
	</div>
		<Dialog :visible.sync="is_form3"  :header.sync="musteriFormBaslik"  :modal="true">
					<div class="columns">
						<div class="column is-12" style="height: 800px;background-color:#f4f4f4; " >
							<MusteriDetay  />
						</div>
					</div>
		</Dialog>
		<Dialog :visible.sync="is_form7"  :header.sync="musteriFormBaslik"  :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; ">
                    <MusteriHepsiDetay  />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form8"   :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; ">
                    <GelenSiparisAyrintiList  />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form9"   :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; " >
                    <GelenSiparisAylik />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form9"   :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; " >
                    <GelenSiparisAylik />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form11"   :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; " >
                    <SipEfesAyMekmar />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form12"   :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; " >
                    <SipEfesAyHepsi />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form13"   :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; ">
                    <SipEfesYilMekmar />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form14"   :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; ">
                    <SipEfesYilHepsi />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form15"   :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; ">
                    <SevkEfesAyMekmar />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form16"   :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; " >
                    <SevkEfesAyHepsi />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form17"   :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; ">
                    <SevkEfesYilMekmar />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form18"   :modal="true">
            <div class="columns">
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; ">
                    <SevkEfesYilHepsi />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form19"   :modal="true">
            <div class="columns"  >
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; " >
                    <SipMusteriAyMekmar />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form20"   :modal="true">
            <div class="columns" >
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; " >
                    <SipMusteriYilMekmar />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form21"   :modal="true">
            <div class="columns"   >
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; " >
                    <SevkMusteriAy />
                </div>
            </div>
        </Dialog>
		<Dialog :visible.sync="is_form22"   :modal="true">
            <div class="columns" >
                <div class="column is-12" style="height: 800px;background-color:#f4f4f4; ">
                    <SevkMusteriYil />
                </div>
            </div>
        </Dialog>
	<div class="p-col-12 p-lg-3"  v-if="rapor == 'Musterim' ?  ''  : 'display:none'  ">
		<div class="card" style="height:370px">
			<h3 v-text-center style="font-weight:bold;" >Takipteki {{getGelenSiparisOzet.aylik.ay}} Ayına Ait Teklifler</h3><br>
			<DataTable
			class="p-datatable-responsive"
			:value="getTeklifRapor.aylik"
			:selection.sync="select_teklif"
			@row-select="teklif_sec($event)" 
			selectionMode="single"
			>
				<Column field="adi" header="Adi">
					<template #body="slotProps">
						{{slotProps.data.adi}}
					</template>
				</Column>
				<Column field="teklifSayisi" header="T" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{slotProps.data.teklifSayisi}}
					</template>
					<template #footer>
						{{getTeklifAylikTeklifSayisi}}
					</template>
				</Column>
			<!--	<Column field="proformaSayisi" header="P" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{slotProps.data.proformaSayisi}}
					</template>
					<template #footer>
						{{getTeklifAylikProformaSayisi}}
					</template>
				</Column>-->
			</DataTable>
				<Dialog :visible.sync="is_form4"  :style="{width: '1000px', height : '1000px'}" :header.sync="teklifFormBaslik"  :modal="true">
            <div class="columns">
                <div class="column is-12" >
                    <TeklifAylikDetay/>
                </div>
            </div>
        </Dialog>
		</div>
	</div>
	<div class="p-col-12 p-lg-3"  v-if="rapor == 'Musterim' ?  ''  : 'display:none'  ">
		<div class="card"  style="height:370px">
				<h3 v-text-center style="font-weight:bold;" >{{getGelenSiparisOzet.yillik.yil}}'deki Tüm Teklifler</h3><br>
		
			<DataTable
			class="p-datatable-responsive"
			:value="getTeklifRapor.yillik"
			>
				<Column field="adi" header="Adi" >
					<template #body="slotProps">
						{{slotProps.data.adi}}
					</template>
				</Column>
				<Column field="teklifSayisi" header="T" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{slotProps.data.teklifSayisi}}
					</template>
					<template #footer>
						{{getTeklifYillikTeklifSayisi}}
					</template>
				</Column>
				<Column field="proformaSayisi" header="P" bodyStyle="text-align:center">
					<template #body="slotProps">
						{{slotProps.data.proformaSayisi}}
					</template>
					<template #footer>
						{{getTeklifYillikProformaSayisi}}
					</template>
				</Column>
			</DataTable>
		</div>
	</div>

<!--	<div class="p-col-12 p-lg-6">
		<div class="card">
			<h1 v-text-center >Teklifler</h1>
			<Chart  type="horizontalBar" :data="getTeklifRapor.grafik" />
			
		</div>
	</div>-->
	
	

	<div class="p-col-12 p-lg-4" >
		<div class="card">
			<SiteYeniUrunler />
		</div>
	</div>
	<div class="p-col-12 p-lg-4">
		<div class="card">
			<div class="column is-12">
                <h2 class="has-text-centered subtitle">Yeni Eklenen Siparişler   </h2>
            </div>
          
            <div class="column is-12 rapor">
                <DataTable
				:value="this.rapor == 'Mekmar' ? siparis_listesi_mekmar : siparis_listesi"
               
                :loading="loading"
                :scrollable="true" 
                scrollHeight="359px"
                dateKey="id"
                @kisitliSiparisSecim="siparisSecim($event)"
               
                >
                  <Column field="id" header="ID" headerStyle="width:30px" bodyStyle="text-align:center;align-items:center">
                        <template #body="slotProps">
                            {{slotProps.data.id}}
                        </template>
                    </Column>
                    <Column field="order" header="Orders" headerStyle="width:50px;" bodyStyle="text-align:left;">
                        <template #body="slotProps">
                            {{slotProps.data.order}}
                        </template>
                    </Column>
                    <Column  header="Genel Tutar" headerStyle="width:150px;">
                        <template #body="slotProps">
                            {{slotProps.data.fob  | toCurrency}} (F) + {{slotProps.data.ddp  | toCurrency}} (Diğer) = <span style="font-weight: bold;">{{slotProps.data.toplam  | toCurrency}} </span>(C/D)
                        </template>
                    </Column>
                    <Column field="brand" header="Proforma" headerStyle="width:30px" bodyStyle="text-align:center">
                    <template #body="slotProps">
                        <Button type="button" 
                         :disabled="slotProps.data.durum != -1  ? false : true"
                        @click="proformaDowload(slotProps.data.id)"   icon="fas fa-cloud-download-alt" class="p-button-success" style="margin-right: .5em"></Button>
                    </template>
                </Column>
                  
                        
                   
                </DataTable>
                <br>
                
            </div>
		</div>
	</div>
	<div class="p-col-12 p-lg-4"  >
		<div class="card">
			<DataTable :value="anaSayfaDegisiklikData" :resizableColumns="true" columnResizeMode="fit" showGridlines responsiveLayout="scroll" :rows="10"
				paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :paginator="true"
			
			>
                <Column field="degisiklikTarihi" header="Degişiklik Tarihi" ></Column>
                <Column field="degisiklikYapan" header="Degişiklik Yapan" headerStyle="width:15%;" bodyStyle="text-align:center;"></Column>
                <Column field="yapilanDegisiklik" header="Yapılan Değişiklik"></Column>
            </DataTable>
			<Button @click="anaSayfaDegisiklikAll" label="All"></Button>
		</div>
	</div>
	<Dialog :visible.sync="is_main_all_form" :modal="true">
			<div class="card">
				<div class="columns">
					<div class="column is-4">
						<Dropdown  v-model="selectedYear" :options="years" optionLabel="year" placeholder="Select a Year" @change="isYearsSelected" style="width:150px;" />
						<Dropdown  v-model="selectedMonth" :options="months" optionLabel="ay" placeholder="Select a Month" @change="isMonthsSelected" style="width:150px;" :disabled="is_form_year" />
					</div>
				</div>
				
				
				
			
			<DataTable :value="anaSayfaDegisiklikDataAllFilter" :resizableColumns="true" columnResizeMode="fit" showGridlines responsiveLayout="scroll" :rows="20"
				paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                :paginator="true"
			
			>
                <Column field="degisiklikTarihi" header="Degişiklik Tarihi" ></Column>
                <Column field="degisiklikYapan" header="Degişiklik Yapan" headerStyle="width:15%;" bodyStyle="text-align:center;"></Column>
                <Column field="yapilanDegisiklik" header="Yapılan Değişiklik"></Column>

            </DataTable>
		</div>
	</Dialog>
	


</div>
	
	
	

</template>

<script>
import CarService from '../service/CarService';
import EventService from '../service/EventService';
import serviceFinans from '../service/FinansService';
import service from '../service/AnasayfaRapor';
import serviceRapor from '../service/RaporService'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { mapGetters } from 'vuex';
import SiteYeniUrunler from '../components/raporlar/SiteYeniUrunler'
import socket from '../service/SocketService';
import SevkDetay from '../views/anasayfa/SevkDetay'
import SevkHepsiDetay from '../views/anasayfa/SevkHepsiDetay'
import UretimDetay from '../views/anasayfa/UretimDetay'
import UretimHepsiDetay from '../views/anasayfa/UretimHepsiDetay'
import MusteriDetay from '../views/anasayfa/MusteriDetay'
import MusteriHepsiDetay from '../views/anasayfa/MusteriHepsiDetay'
import GelenSiparisAyrintiList from '../views/anasayfa/GelenSiparisAyrintiList'
import GelenSiparisAylik from '../views/anasayfa/GelenSiparisAylik'
import TeklifAylikDetay from '../views/anasayfa/TeklifAylikDetay'
import SevkEfesYilHepsi from '../views/anasayfa/SevkEfesYilHepsi'
import SevkEfesYilMekmar from '../views/anasayfa/SevkEfesYilMekmar'
import SevkEfesAyHepsi from '../views/anasayfa/SevkEfesAyHepsi'
import SevkEfesAyMekmar from '../views/anasayfa/SevkEfesAyMekmar'
import SipEfesYilHepsi from '../views/anasayfa/SipEfesYilHepsi'
import SipEfesYilMekmar from '../views/anasayfa/SipEfesYilMekmar'
import SipEfesAyHepsi from '../views/anasayfa/SipEfesAyHepsi'
import SipEfesAyMekmar from '../views/anasayfa/SipEfesAyMekmar'
import SipMusteriAyMekmar from '../views/anasayfa/SipMusteriAyMekmar'
import SipMusteriYilMekmar from '../views/anasayfa/SipMusteriYilMekmar'
import SevkMusteriYil from '../views/anasayfa/SevkMusteriYil'
import SevkMusteriAy from '../views/anasayfa/SevkMusteriAy'
import raporService from '../service/RaporService'
export default { 
	
	data() {
		return {
			anaSayfaDegisiklikDataAllFilter: null,
			is_form_year:true,
			years: [
				{'year':'2022'}
			],
			months: [
				
			],
			selectedMonth: "",
			selectedYear:"",
			is_main_all_form:false,
			anaSayfaDegisiklikData: null,
			anaSayfaDegisiklikDataAll:null,
			year : 0,
			past :  0 ,
			tasksCheckbox: [],
			aylist :[],
			ad : null,
			select_sip_buyil : null,
			loading : false,
			mekmar_finans : [],
			hepsi_finans : [],
			mekmar_finans1 : [],
			select_sevk : null ,
			select_uretim : null ,
			select_musteri : null,
			select_teklif : null,
			konteyner_list_hepsi : false,
			siparis_listesi : null,
			dis_detay : true,
			siparis_listesi_mekmar : null,
			is_form1 : false,
			is_form2 : false,
			is_form3 : false,
			is_form4 : false,
			is_form5 : false,
			is_form6 : false,
			is_form7 : false,
			is_form8 : false,
			is_form9 : false,
			is_form10 : false,
			is_form11 : false,
			is_form12 : false,
			is_form13 : false,
			is_form14 : false,
			is_form15 : false,
			is_form16 : false,
			is_form17 : false,
			is_form18 : false,
			is_form19 : false,
			is_form20 : false,
			is_form21 : false,
			is_form22 : false,
			kullanici_test : false,
			siparis_bedel : 0,
			odenen : 0,
			genel_bakiye : 0,
			kullanici_test1 : false,
			siparisFormBaslik : '',
			dropdownCity: null,
			uretimFormBaslik : null,
			musteriFormBaslik : null,
			teklifFormBaslik : null,
			options: {
			plugins:[dayGridPlugin, timeGridPlugin, interactionPlugin],
				defaultDate: '2019-01-01',
				header: {
					left: 'prev,next',
					center: 'title',
					right: 'dayGridMonth,timeGridWeek,timeGridDay'
				},
				editable: true
			},
			musteriSip : [],
		takiplistem : [],
		finansTakiplistem : [],
		events: null,
			mekmarTakip :[],
			hepsiTakip :[],
			lineData: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'First Dataset',
						data: [65, 59, 80, 81, 56, 55, 40],
						fill: false,
						backgroundColor: '#2f4860',
						borderColor: '#2f4860'
					},
					{
						label: 'Second Dataset',
						data: [28, 48, 40, 19, 86, 27, 90],
						fill: false,
						backgroundColor: '#00bb7e',
						borderColor: '#00bb7e'
					}
				]
			},
			basicData : {
				labels : ['Mart20','Şubat20','Ocak20','Aralık19','Kasım19','Ekim19','Eylül19','Ağustos19','Temmuz19','Haziran19','Mayıs19','Nisan19','Mart19'],
				datasets : [

					{
						label : 'Yüklenenler',
						data : [176,199,242,354,264,187,291,255,408,92,303,186,146],
						fill: false,
						backgroundColor: '#2f4860',
						borderColor: '#2f4860'
					},
					{
						label: 'Gelen Sipariş',
						data: [188,375,237,319,188,327,187,137,502,225,301,226,203],
						fill: false,
						backgroundColor: '#00bb7e',
						borderColor: '#00bb7e'
					},
				
				],
				grafikData : {

					datasets : this.siparisDataset,
					labels : this.siparisLabels
				}
			},
			rapor : 'Musterim',
			
			
		
		}
	},
	components : {
		SiteYeniUrunler,
	
		SevkDetay,
		SevkHepsiDetay,
		UretimDetay,
		UretimHepsiDetay,
		MusteriDetay,
		MusteriHepsiDetay,
		TeklifAylikDetay,
		GelenSiparisAyrintiList,
		GelenSiparisAylik,
		//efes ayrinti
		SevkEfesYilHepsi,
		SevkEfesYilMekmar,
		SevkEfesAyHepsi,
		SevkEfesAyMekmar,
		SipEfesYilHepsi,
		SipEfesYilMekmar,
		SipEfesAyHepsi,
		SipEfesAyMekmar,
		SipMusteriAyMekmar,
		SipMusteriYilMekmar,
		SevkMusteriAy,
		SevkMusteriYil
	

	},
	carService: null,
	eventService: null,
	watch: {
		rapor(){
			
			this.finansDegisim()
		}
	},
	computed: {

		...mapGetters([
			'getGelenSiparisOzet',
			'getYuklenenSiparisOzet',
			'getYuklenenSiparisAlacak',
			'getSiparisUretimHepsi',
			'getSiparisUretimMekmar',
			'getSiparisUretimToplamMekmar',
			'getSiparisUretimToplamHepsi',
			'getSiparisYuklenenMekmar',
			'getSiparisYuklenenHepsi',
			'getSiparisYuklenenToplamMekmar',
			'getSiparisUretimAmountHepsi',
			'getSiparisYuklenenAmountHepsi',
			'getSiparisUretimAmountMekmar',
			'getSiparisYuklenenAmountMekmar',
			'getSiparisYuklenenToplamHepsi',
			'getSiparisYuklenenGrafikList',
			'getTeklifRapor',
			'getTeklifAylikTeklifSayisi',
			'getTeklifAylikProformaSayisi',
			'getTeklifYillikTeklifSayisi', 
			'getTeklifYillikProformaSayisi',
			'getFinansRapor',
			'getFinansMekmarToplam',
			'getFinansMekmarEPesinat',
			'getFinansMekmarYPesinat',
			'getFinansHepsiEPesinat',
			'getFinansHepsiYPesinat',
			'getFinansHepsiToplam',
			'getSiparisGrafikMekmar',
			'getSiparisGrafikHepsi',
			'getMusteriUretim'			
		]),
		uretimToplam(){
           
			if(this.rapor == 'Mekmar') return this.getSiparisUretimToplamMekmar;
          
			return this.getSiparisUretimToplamHepsi;
			
		},
		uretimAmount(){
           
			if(this.rapor == 'Mekmar') return this.getSiparisUretimAmountMekmar;
          
			return this.getSiparisUretimAmountHepsi;
			
		},
		
		sevkiyatToplam(){

			if(this.rapor == 'Mekmar') return this.getSiparisYuklenenToplamMekmar;

			return this.getSiparisYuklenenToplamHepsi;
		},
		sevkiyatAmount(){

			if(this.rapor == 'Mekmar') return this.getSiparisYuklenenAmountMekmar;

			return this.getSiparisYuklenenAmountHepsi;
		},
		finansToplam(){

			if(this.rapor == 'Mekmar') return this.mekmar_finans1;
           
			return this.getFinansHepsiToplam;
		},
		eskiPesinatToplam(){

			if(this.rapor == 'Mekmar') return this.getFinansMekmarEPesinat;

			return this.getFinansHepsiEPesinat;
		},
		yeniPesinatToplam(){

			if(this.rapor == 'Mekmar') return this.getFinansMekmarYPesinat;
            
			return this.getFinansHepsiYPesinat;
		},
		
	},
	created() {
		this.degisiklikAnaSayfaList();
        const d = new Date()
        this.year = d.getFullYear()
		this.past = this.year -1

		const username = ( this.$store.getters.getUser).toUpperCase();
		const username2 = ( this.$store.getters.getUser).toLowerCase();
		this.ad = username[0]+username2.substring(1)
	
		
		
        this.carService = new CarService();
		this.eventService = new EventService();
		service.getAnasayfaMusteriList().then(data => {
			
			this.musteriSip = data.KullaniciSiparis[0]
			this.takiplistem = data.TakipList
			
			
			
				}) 
        service.getFinansTakipListesi().then(data => {
			
			
			this.finansTakiplistem = data
			
			
			
				}) 				
		serviceFinans.getKonteynerAnaListe(this.year).then(data => {
			

			this.mekmar_finans = [...data.konteyner_list.filter(x=>x.marketing === 'Mekmar')]
			
			this.hepsi_finans = [...data.konteyner_list.filter(x=>x.genel_bakiye > 10 )]

			this.mekmar_finans1 = [...this.mekmar_finans.filter(x=>x.genel_bakiye > 10)]
			
			if (this.rapor == "Mekmar"){
					this.toplam_islem(this.mekmar_finans1)
			}
			else if(this.rapor != "Mekmar") {
				
				this.toplam_islem(this.hepsi_finans)
			}
		
		
		})
		this.$store.dispatch('loadBegin')
		
			
		service.getAnasayfaTakipListe().then(data => {
	
		this.mekmarTakip = data.mekmar_takiplist
		this.hepsiTakip = data.hepsi_takiplist
		this.$store.dispatch('loadEnd')
			}) 
		
		

				

		serviceRapor.getYeniSiparisList().then(data => {
			
			this.siparis_listesi = data.liste
			this.siparis_listesi_mekmar = data.mekmar_liste
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
		socket.siparis.on('anaSayfaDegisiklikEmit', data => {
			this.anaSayfaDegisiklikData = data
		})
		this.carService.getCarsSmall().then(data => this.dataTableCars = data);
	
		this.eventService.getEvents().then(data => this.events = data);
       
		
		let afId = this.$route.query['af_id'];
        if (afId) {
            let today = new Date();
            let expire = new Date();
            expire.setTime(today.getTime() + 3600000*24*7);
            document.cookie = 'primeaffiliateid=' + afId + ';expires=' + expire.toUTCString() + ';path=/; domain:primefaces.org';
        } 
		
	},
	methods: {
		isMonthsSelected(event) {
	
			this.anaSayfaDegisiklikDataAllFilter = this.anaSayfaDegisiklikDataAllYear.filter(x => x.month == event.value.ay)
		},
		isYearsSelected(event) {
			this.is_form_year = false
			this.anaSayfaDegisiklikDataAllYear = this.anaSayfaDegisiklikDataAll.filter(x => x.year == event.value.year)
			raporService.getYuklemeAyListesi(parseInt(this.year)).then(data => {
				this.months = data
			})
		},
		anaSayfaDegisiklikAll() {
			serviceRapor.getAnaSayfaDegisiklikListAll().then(data => {
				this.anaSayfaDegisiklikDataAll = data
				this.anaSayfaDegisiklikDataAllFilter = data
			})
			this.is_main_all_form = true
		},
		degisiklikAnaSayfaList() {
			serviceRapor.getAnaSayfaDegisiklikList().then(data => {
				this.anaSayfaDegisiklikData = data
			})
		}
		,
		finansDegisim(){
			
			if (this.rapor == "Mekmar"){
					this.toplam_islem(this.mekmar_finans1)
			}
			else if(this.rapor != "Mekmar") {
			
				this.toplam_islem(this.hepsi_finans)
			}

		},
		toplam_islem(liste){

            this.siparis_bedel = 0 
            this.odenen = 0
            this.genel_bakiye = 0
           
            

            for(let key in liste){

                const item = liste[key]

             this.siparis_bedel += item.kapanmayan_siparis
             this.odenen += item.kapanmayan_odenen 
			this.genel_bakiye += item.kapanmayan_kalan 
               
            }
        },
     
		evrak_indir(dosya_link,dosya_adi){

                    this.$store.dispatch('loadBegin')
                    const link = document.createElement('a')
                    link.href = dosya_link
                    
                    link.setAttribute('download',`${dosya_adi}.pdf`)
                    document.body.appendChild(link)
                    link.click()
                    this.$store.dispatch('loadEnd')
                  
         },
       
        proformaDowload(id){
         
			if (this.rapor=='Mekmar') this.evrak_indir(this.siparis_listesi_mekmar[id-1].link,'Proforma')
			
			else   this.evrak_indir(this.siparis_listesi[id-1].link,'Proforma')
          //  this.evrak_indir(this.siparis_listesi[id].link,'Proforma')
       
        
      
          
                  
        },
		formatDecimal(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
	
           
		formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return "$" +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
        sevk_sec(event){
               this.$store.dispatch('loadBegin')

                this.select_sevk = event.data
				
           
            service.getAnasayfaSevkDetay(this.select_sevk.Firma).then(data => {
             if (this.rapor == 'Mekmar')
                   { 
					this.$store.dispatch('anasayfa_sevk_data_yukle_act',data)
					this.is_form1 = true }
			else
			{this.$store.dispatch('anasayfa_sevk_hepsi_yukle_act',data)	
			
            this.is_form5 = true}
			this.siparisFormBaslik = this.select_sevk.Firma +"  -  " +this.rapor
            this.$store.dispatch('loadEnd')
           
            })
          }, 
		uretim_sec(event){
               this.$store.dispatch('loadBegin')

                this.select_uretim = event.data
				
           
            service.getAnasayfaSevkDetay(this.select_uretim.Firma).then(data => {
             if (this.rapor == 'Mekmar')
                   { 
					
					this.$store.dispatch('anasayfa_uretim_data_yukle_act',data) 
					this.is_form2= true }
			else{
			this.$store.dispatch('anasayfa_uretim_hepsi_yukle_act',data)	
			
				this.is_form6 = true
			}		
			this.uretimFormBaslik = this.select_uretim.Firma +"  -  " +this.rapor
            this.$store.dispatch('loadEnd')
           
            })
          },
		siparis_sec(){
				this.$store.dispatch('loadBegin')
              
            service.getAnasayfaSiparisListe().then(data => {
	
                  
                    this.$store.dispatch('anasayfa_siparis_ayrinti_act',data.siparis_ayrinti_yil) 
					this.is_form8= true 
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
		kullanici_sip_yil(){
			this.$store.dispatch('loadBegin')
			service.getAnasayfaMusteriList().then(data => {
			
				this.$store.dispatch('kullanici_sipYil_act',data.YillikSiparis)
				
				this.is_form20= true 
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
		
		siparis_sec_ay(){
				this.$store.dispatch('loadBegin')
			service.getAnasayfaSiparisListe().then(data => {
			
					data.siparis_ayrinti_yil = null
          
					this.$store.dispatch('anasayfa_siparis_ay_ayrinti_act',data.siparis_ayrinti_ay)
					
					this.is_form9= true 
					this.$store.dispatch('loadEnd')  
	
           
            })
         },
		sevk_efes_mekmar_yil(){
				this.$store.dispatch('loadBegin')
		service.getAnasayfaSiparisListe().then(data => {
			this.$store.dispatch('mekmar_sevk_yil_ayrinti_efes_act',data.sevk_yil_mekmar_efes)
					
					this.is_form17= true
					this.$store.dispatch('loadEnd')  
	
           
            })
         },
		sevk_efes_hepsi_yil(){
			this.$store.dispatch('loadBegin')
			service.getAnasayfaSiparisListe().then(data => {
			
				this.$store.dispatch('hepsi_sevk_yil_ayrinti_efes_act',data.sevk_yil_hepsi_efes)
				this.is_form18= true 
				this.$store.dispatch('loadEnd') 
	
           
            })
         },
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
		sip_efes_hepsi_yil(){
			this.$store.dispatch('loadBegin')
		service.getAnasayfaSiparisListe().then(data => {
			
				this.$store.dispatch('hepsi_sip_yil_ayrinti_efes_act',data.sip_yil_hepsi_efes)
				this.is_form14= true 
				this.$store.dispatch('loadEnd')
	
           
            })
         }, 
	sip_efes_mekmar_yil(){
            this.$store.dispatch('loadBegin')
		service.getAnasayfaSiparisListe().then(data => {
			
			this.$store.dispatch('mekmar_sip_yil_ayrinti_efes_act',data.sip_yil_mekmar_efes)
			this.is_form13= true 
             this.$store.dispatch('loadEnd')
         
            })
         }, 
       musteri_sec(event){
               this.$store.dispatch('loadBegin')

                this.select_musteri = event.data
				
           
            service.getAnasayfaSevkDetay(this.select_musteri.Firma).then(data => {
             if (this.rapor == 'Mekmar')
                   { 
				this.$store.dispatch('anasayfa_musteri_data_yukle_act',data) 
				this.is_form3 = true}
			else {
				this.$store.dispatch('anasayfa_musteri_hepsi_yukle_act',data)
				this.is_form7 = true	
			}	
			
			this.musteriFormBaslik = this.select_musteri.Firma +"  -  " +this.rapor
           
            this.$store.dispatch('loadEnd')
           
            })
          },
		teklif_sec(event){
               this.$store.dispatch('loadBegin')

                this.select_teklif = event.data
				
           
            service.getAnasayfaTeklifDetay(this.select_teklif.adi).then(data => {
            
			this.$store.dispatch('anasayfa_teklif_mekmar_ayrinti_act',data)	
			this.teklifFormBaslik = this.select_teklif.adi
            this.is_form4 = true
            this.$store.dispatch('loadEnd')
           
            })
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


	
</style>