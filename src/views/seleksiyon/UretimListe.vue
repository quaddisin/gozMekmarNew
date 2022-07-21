<template>
    <section style="margin-left:-15px;">
        <div class="columns is-multiline" v-if="isDesktop">
            <div class="urunSecmeBolumu">
                <Dropdown class="urunSecmeDropdown" v-model="selectedUrun" :options="urunler" :filter="true"
                    optionLabel="name" placeholder="Ürün Seç" />
                <Button class="urunSecmeDropdown" @click="isSelected" label="Göster"></Button>

            </div>
            <div class="column is-3 inputTextArama">

                <InputText v-model="filters['global']" placeholder="Genel Arama" />

            </div>
            <br>
            <div class="column is-12 seleksiyon-list" style="margin-left:8px;margin-top:-30px" v-if="slk_enb_mekmar">
                <DataTable :value="seleksiyon_mekmar_uretimlist" :filters.sync="filters" :paginator="true" :rows="20"
                    dataKey="id" selectionMode="single" :selection="select_uretim" ref="seleksiyon_data"
                    @filter="filter_data_change($event)" @row-select="uretimSec($event)">
                    <Column field="kasa_no" header="No" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            <div :class="slotProps.data.disarda ==  true ? 'disarda_css' : '' ">
                                {{slotProps.data.kasa_no}} </div>
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kasa_no']" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="tarih" header="Tarih" bodyStyle="text-align:center" headerStyle="width:80px;">
                        <template #body="slotProps">
                            {{slotProps.data.tarih}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['tarih']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kategori" header="Kategori" bodyStyle="text-align:center" headerStyle="width:100px;">
                        <template #body="slotProps">
                            {{slotProps.data.kategori}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kategori']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="ocak" header="Ocak" bodyStyle="text-align:center" headerStyle="width:70px;">
                        <template #body="slotProps">
                            {{slotProps.data.ocak}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['ocak']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="tedarikci" header="Kimden" bodyStyle="text-align:left" headerStyle="width:70px;">
                        <template #body="slotProps">
                            {{slotProps.data.tedarikci}}

                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['tedarikci']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="urunadi" header="Ürün" headerStyle="width:100px;">
                        <template #body="slotProps">

                            <div v-if='slotProps.data.urunadi.includes("Vein Cut")' style="color:red">
                                {{slotProps.data.urunadi}}

                            </div>
                            <div v-else>
                                {{slotProps.data.urunadi}}
                            </div>




                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['urunadi']" class="p-column-filter" />
                        </template>
                        <template #footer>

                            {{adet_kasa}}
                        </template>
                    </Column>
                    <Column field="kenarislem" header="İşlem Adı" bodyStyle="text-align:left"
                        headerStyle="width:150px;">
                        <template #body="slotProps">
                            {{slotProps.data.kenarislem}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kenarislem']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="en" header="E" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.en}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['en']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="boy" header="B" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.boy}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['boy']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kenar" header="K" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.kenar}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kenar']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kasaadet" header="K.Adet" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.kasaadet}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kasaadet']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kutuadet" header="Kutu" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.kutuadet}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kutuadet']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="m2" header="M2" bodyStyle="text-align:center" headerStyle="width:60px;">
                        <template #body="slotProps">
                            {{slotProps.data.m2}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['m2']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_m2 )}}
                        </template>
                    </Column>
                    <Column field="adet" header="Adet" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.adet}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['adet']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_adet)}}
                        </template>
                    </Column>
                    <Column field="mt" header="Mt" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.mt}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['mt']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_mt )}}
                        </template>
                    </Column>
                    <Column field="ton" header="Ton" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.ton}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['ton']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_ton )}}
                        </template>
                    </Column>
                    <Column field="kutu" header="Kutu" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.kutu == true" style="backgroundColor:greenyellow">
                                ✓
                            </div>
                            <div v-else style="backgroundColor:red;color:white">
                                X
                            </div>
                        </template>

                    </Column>
                    <Column field="bagli" header="Baglı" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.bagli == true" style="backgroundColor:greenyellow">
                                ✓
                            </div>
                            <div v-else style="backgroundColor:red;color:white">
                                X
                            </div>
                        </template>
                    </Column>
                    <Column field="siparisaciklama" header="Po" bodyStyle="text-align:center" headerStyle="width:90px;">
                        <template #body="slotProps">
                            {{slotProps.data.siparisaciklama}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['siparisaciklama']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="aciklama" header="Not" bodyStyle="text-align:center" headerStyle="width:70px">
                        <template #body="slotProps">
                            {{slotProps.data.aciklama}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['aciklama']" class="p-column-filter" />
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="column is-12 seleksiyon-list" style="margin-left:8px;margin-top:-30px" v-else-if="slk_enb_dis">
                <DataTable :value="seleksiyon_dis_uretimlist.disUretim" :filters.sync="filters" :paginator="true"
                    :rows="20" dataKey="id" selectionMode="single" :selection="select_uretim" ref="seleksiyon_data"
                    @filter="filter_data_change($event)" @row-select="uretimSec($event)">
                    <Column field="kasa_no" header="No" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            <div :class="slotProps.data.disarda ==  true ? 'disarda_css' : '' ">
                                {{slotProps.data.kasa_no}} </div>
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kasa_no']" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="tarih" header="Tarih" bodyStyle="text-align:center" headerStyle="width:80px;">
                        <template #body="slotProps">
                            {{slotProps.data.tarih}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['tarih']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kategori" header="Kategori" bodyStyle="text-align:center" headerStyle="width:100px;">
                        <template #body="slotProps">
                            {{slotProps.data.kategori}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kategori']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="ocak" header="Ocak" bodyStyle="text-align:center" headerStyle="width:70px;">
                        <template #body="slotProps">
                            {{slotProps.data.ocak}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['ocak']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="tedarikci" header="Kimden" bodyStyle="text-align:left" headerStyle="width:70px;">
                        <template #body="slotProps">
                            {{slotProps.data.tedarikci}}

                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['tedarikci']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="urunadi" header="Ürün" headerStyle="width:100px;">
                        <template #body="slotProps">

                            <div v-if='slotProps.data.urunadi.includes("Vein Cut")' style="color:red">
                                {{slotProps.data.urunadi}}

                            </div>
                            <div v-else>
                                {{slotProps.data.urunadi}}
                            </div>




                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['urunadi']" class="p-column-filter" />
                        </template>
                        <template #footer>

                            {{ seleksiyon_dis_uretimlist.slk_dis_kasa_top }}
                        </template>
                    </Column>
                    <Column field="kenarislem" header="İşlem Adı" bodyStyle="text-align:left"
                        headerStyle="width:150px;">
                        <template #body="slotProps">
                            {{slotProps.data.kenarislem}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kenarislem']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="en" header="E" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.en}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['en']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="boy" header="B" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.boy}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['boy']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kenar" header="K" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.kenar}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kenar']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kasaadet" header="K.Adet" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.kasaadet}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kasaadet']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kutuadet" header="Kutu" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.kutuadet}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kutuadet']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="m2" header="M2" bodyStyle="text-align:center" headerStyle="width:60px;">
                        <template #body="slotProps">
                            {{slotProps.data.m2}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['m2']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_m2 )}}
                        </template>
                    </Column>
                    <Column field="adet" header="Adet" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.adet}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['adet']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_adet)}}
                        </template>
                    </Column>
                    <Column field="mt" header="Mt" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.mt}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['mt']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_mt )}}
                        </template>
                    </Column>
                    <Column field="ton" header="Ton" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.ton}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['ton']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_ton )}}
                        </template>
                    </Column>
                    <Column field="kutu" header="Kutu" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.kutu == true" style="backgroundColor:greenyellow">
                                ✓
                            </div>
                            <div v-else style="backgroundColor:red;color:white">
                                X
                            </div>
                        </template>

                    </Column>
                    <Column field="bagli" header="Baglı" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.bagli == true" style="backgroundColor:greenyellow">
                                ✓
                            </div>
                            <div v-else style="backgroundColor:red;color:white">
                                X
                            </div>
                        </template>
                    </Column>
                    <Column field="siparisaciklama" header="Po" bodyStyle="text-align:center" headerStyle="width:90px;">
                        <template #body="slotProps">
                            {{slotProps.data.siparisaciklama}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['siparisaciklama']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="aciklama" header="Not" bodyStyle="text-align:center" headerStyle="width:70px">
                        <template #body="slotProps">
                            {{slotProps.data.aciklama}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['aciklama']" class="p-column-filter" />
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="column is-12 seleksiyon-list" style="margin-left:8px;margin-top:-30px"
                v-else-if="slk_enb_mekmer_dis">
                <DataTable :value="seleksiyon_mekmer_dis_uretimlist" :filters.sync="filters" :paginator="true"
                    :rows="20" dataKey="id" selectionMode="single" :selection="select_uretim" ref="seleksiyon_data"
                    @filter="filter_data_change($event)" @row-select="uretimSec($event)">
                    <Column field="kasa_no" header="No" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            <div :class="slotProps.data.disarda ==  true ? 'disarda_css' : '' ">
                                {{slotProps.data.kasa_no}} </div>
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kasa_no']" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="tarih" header="Tarih" bodyStyle="text-align:center" headerStyle="width:80px;">
                        <template #body="slotProps">
                            {{slotProps.data.tarih}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['tarih']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kategori" header="Kategori" bodyStyle="text-align:center" headerStyle="width:100px;">
                        <template #body="slotProps">
                            {{slotProps.data.kategori}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kategori']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="ocak" header="Ocak" bodyStyle="text-align:center" headerStyle="width:70px;">
                        <template #body="slotProps">
                            {{slotProps.data.ocak}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['ocak']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="tedarikci" header="Kimden" bodyStyle="text-align:left" headerStyle="width:70px;">
                        <template #body="slotProps">
                            {{slotProps.data.tedarikci}}

                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['tedarikci']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="urunadi" header="Ürün" headerStyle="width:100px;">
                        <template #body="slotProps">

                            <div v-if='slotProps.data.urunadi.includes("Vein Cut")' style="color:red">
                                {{slotProps.data.urunadi}}

                            </div>
                            <div v-else>
                                {{slotProps.data.urunadi}}
                            </div>




                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['urunadi']" class="p-column-filter" />
                        </template>
                        <template #footer>

                            {{adet_kasa}}
                        </template>
                    </Column>
                    <Column field="kenarislem" header="İşlem Adı" bodyStyle="text-align:left"
                        headerStyle="width:150px;">
                        <template #body="slotProps">
                            {{slotProps.data.kenarislem}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kenarislem']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="en" header="E" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.en}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['en']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="boy" header="B" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.boy}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['boy']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kenar" header="K" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.kenar}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kenar']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kasaadet" header="K.Adet" bodyStyle="text-align:center" headerStyle="width:50px;">
                        <template #body="slotProps">
                            {{slotProps.data.kasaadet}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kasaadet']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kutuadet" header="Kutu" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.kutuadet}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kutuadet']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="m2" header="M2" bodyStyle="text-align:center" headerStyle="width:60px;">
                        <template #body="slotProps">
                            {{slotProps.data.m2}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['m2']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_m2 )}}
                        </template>
                    </Column>
                    <Column field="adet" header="Adet" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.adet}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['adet']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_adet)}}
                        </template>
                    </Column>
                    <Column field="mt" header="Mt" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.mt}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['mt']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_mt )}}
                        </template>
                    </Column>
                    <Column field="ton" header="Ton" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            {{slotProps.data.ton}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['ton']" class="p-column-filter" />
                        </template>
                        <template #footer>
                            {{formatDecimal(toplam_ton )}}
                        </template>
                    </Column>
                    <Column field="kutu" header="Kutu" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.kutu == true" style="backgroundColor:greenyellow">
                                ✓
                            </div>
                            <div v-else style="backgroundColor:red;color:white">
                                X
                            </div>
                        </template>

                    </Column>
                    <Column field="bagli" header="Baglı" bodyStyle="text-align:center" headerStyle="width:40px;">
                        <template #body="slotProps">
                            <div v-if="slotProps.data.bagli == true" style="backgroundColor:greenyellow">
                                ✓
                            </div>
                            <div v-else style="backgroundColor:red;color:white">
                                X
                            </div>
                        </template>
                    </Column>
                    <Column field="siparisaciklama" header="Po" bodyStyle="text-align:center" headerStyle="width:90px;">
                        <template #body="slotProps">
                            {{slotProps.data.siparisaciklama}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['siparisaciklama']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="aciklama" header="Not" bodyStyle="text-align:center" headerStyle="width:70px">
                        <template #body="slotProps">
                            {{slotProps.data.aciklama}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['aciklama']" class="p-column-filter" />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
        <div class="columns is-multiline" v-else-if="!isDesktop">
            <br>

            <div class="column is-12 seleksiyon-list">
                <DataTable :value="!slk_enb_mekmar ? seleksiyon_dis_uretimlist : seleksiyon_mekmar_uretimlist"
                    :filters.sync="filters" :paginator="true" :rows="20" dataKey="id" selectionMode="single"
                    :selection="select_uretim" ref="seleksiyon_data" @filter="filter_data_change($event)"
                    @row-select="uretimSec($event)">
                    <Column field="kasa_no" header="No" bodyStyle="text-align:center;font-size:6px;font-weight:bold;"
                        headerStyle="width:13%;;font-size:10px;">
                        <template #body="slotProps">
                            <div :class="slotProps.data.disarda ==  true ? 'disarda_css' : ''">
                                {{slotProps.data.kasa_no}} </div>
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kasa_no']" class="p-column-filter" />
                        </template>
                    </Column>

                    <Column field="urunadi" header="Ürün"
                        bodyStyle="text-align:center;padding-left:5px;font-size:6px;font-weight:bold;"
                        headerStyle="width:10%;;font-size:8px;">
                        <template #body="slotProps">

                            <div v-if='slotProps.data.urunadi.includes("Vein Cut")' style="color:red">
                                {{slotProps.data.urunadi}}

                            </div>
                            <div v-else>
                                {{slotProps.data.urunadi}}
                            </div>




                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['urunadi']" class="p-column-filter" />
                        </template>
                        <template #footer>

                            {{adet_kasa}}
                        </template>
                    </Column>
                    <Column field="kenarislem" header="İşlem Adı"
                        bodyStyle="text-align:center;padding-left:0px;font-size:6px;font-weight:bold;"
                        headerStyle="width:21%;;font-size:10px;">
                        <template #body="slotProps">
                            {{slotProps.data.kenarislem}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kenarislem']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="en" header="E"
                        bodyStyle="text-align:center;padding-left:1px;font-size:6px;font-weight:bold;"
                        headerStyle="width:9%;;font-size:10px;">
                        <template #body="slotProps">
                            {{slotProps.data.en}}
                        </template>
                        <template #filter style="margin-left:-5px;">
                            <InputText type="text" v-model="filters['en']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="boy" header="B"
                        bodyStyle="text-align:center;padding-left:1px;font-size:6px;font-weight:bold;"
                        headerStyle="width:9%;;font-size:10px;">
                        <template #body="slotProps">
                            {{slotProps.data.boy}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['boy']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kenar" header="K"
                        bodyStyle="text-align:center;padding-left:3px;font-size:6px;font-weight:bold;"
                        headerStyle="width:9%;;font-size:10px;">
                        <template #body="slotProps">
                            {{slotProps.data.kenar}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['kenar']" class="p-column-filter" />
                        </template>
                    </Column>
                    <Column field="kasaadet" header="K.A"
                        bodyStyle="text-align:center;padding-left:3px;font-size:6px;font-weight:bold;"
                        headerStyle="width:23px;font-size:8px;">
                        <template #body="slotProps">
                            {{slotProps.data.kasaadet}}
                        </template>
                    </Column>
                    <Column field="kutuadet" header="Kutu"
                        bodyStyle="text-align:center;padding-left:1px;font-size:6px;font-weight:bold;"
                        headerStyle="width:23px;font-size:8px;padding-left:2px;">
                        <template #body="slotProps">
                            {{slotProps.data.kutuadet}}
                        </template>
                    </Column>
                    <Column field="m2" header="M2"
                        bodyStyle="text-align:center;padding-left:3px;font-size:6px;font-weight:bold;"
                        headerStyle="width:22px;font-size:8px;">
                        <template #body="slotProps">
                            {{slotProps.data.m2}}
                        </template>

                    </Column>
                    <Column field="adet" header="Adet"
                        bodyStyle="text-align:center;padding-left:3px;font-size:6px;font-weight:bold;"
                        headerStyle="width:22px;font-size:8px;;padding-left:2px;">
                        <template #body="slotProps">
                            {{slotProps.data.adet}}
                        </template>

                    </Column>
                    <Column field="aciklama" header="Not"
                        bodyStyle="text-align:center;padding-left:3px;font-size:6px;font-weight:bold;"
                        headerStyle="width:45px;font-size:8px;">
                        <template #body="slotProps">
                            {{slotProps.data.aciklama}}
                        </template>
                        <template #filter>
                            <InputText type="text" v-model="filters['aciklama']" class="p-column-filter" />
                        </template>
                    </Column>
                </DataTable>
            </div>

        </div>

        <Dialog :visible.sync="is_uretimform" :style="{width : '1500px'}" header="Seleksiyon Form" :modal="true">
            <section>
                <div class="container">
                    <div class="columns">
                        <div v-if="select_uretim" class="column is-12">
                            <UretimForm :kayitstatu="false" :kasano="select_uretim.kasa_no"
                                @seleksiyon_form_kapat="is_uretimform = false" />
                        </div>
                    </div>
                </div>
            </section>
        </Dialog>



        <Dialog :visible.sync="is_filterForm" :style="{width : '1500px'}" header="Seleksiyon Form" :modal="true">
            <section>
                <div class="container">
                    <div class="columns">
                        <DataTable :value="filterProducts" :filters.sync="filters2" :paginator="true" :rows="20"
                            dataKey="id" selectionMode="single" :selection="select_uretim" ref="seleksiyon_data"
                            @filter="filter_data_change2($event)" @row-select="uretimSec($event)">
                            <Column field="kasa_no" header="No" bodyStyle="text-align:center" headerStyle="width:50px;">
                                <template #body="slotProps">
                                    <div :class="slotProps.data.disarda ==  true ? 'disarda_css' : '' ">
                                        {{slotProps.data.kasa_no}} </div>
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['kasa_no']" class="p-column-filter" />
                                </template>
                            </Column>

                            <Column field="tarih" header="Tarih" bodyStyle="text-align:center"
                                headerStyle="width:80px;">
                                <template #body="slotProps">
                                    {{slotProps.data.tarih}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['tarih']" class="p-column-filter" />
                                </template>
                            </Column>
                            <Column field="kategori" header="Kategori" bodyStyle="text-align:center"
                                headerStyle="width:100px;">
                                <template #body="slotProps">
                                    {{slotProps.data.kategori}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['kategori']" class="p-column-filter" />
                                </template>
                            </Column>
                            <Column field="ocak" header="Ocak" bodyStyle="text-align:center" headerStyle="width:70px;">
                                <template #body="slotProps">
                                    {{slotProps.data.ocak}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['ocak']" class="p-column-filter" />
                                </template>
                            </Column>
                            <Column field="tedarikci" header="Kimden" bodyStyle="text-align:left"
                                headerStyle="width:70px;">
                                <template #body="slotProps">
                                    {{slotProps.data.tedarikci}}

                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['tedarikci']" class="p-column-filter" />
                                </template>
                            </Column>
                            <Column field="urunadi" header="Ürün" headerStyle="width:100px;">
                                <template #body="slotProps">

                                    <div v-if='slotProps.data.urunadi.includes("Vein Cut")' style="color:red">
                                        {{slotProps.data.urunadi}}

                                    </div>
                                    <div v-else>
                                        {{slotProps.data.urunadi}}
                                    </div>




                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['urunadi']" class="p-column-filter" />
                                </template>
                                <template #footer>

                                    {{adet_kasa}}
                                </template>
                            </Column>
                            <Column field="kenarislem" header="İşlem Adı" bodyStyle="text-align:left"
                                headerStyle="width:150px;">
                                <template #body="slotProps">
                                    {{slotProps.data.kenarislem}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['kenarislem']" class="p-column-filter" />
                                </template>
                            </Column>
                            <Column field="en" header="E" bodyStyle="text-align:center" headerStyle="width:50px;">
                                <template #body="slotProps">
                                    {{slotProps.data.en}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['en']" class="p-column-filter" />
                                </template>
                            </Column>
                            <Column field="boy" header="B" bodyStyle="text-align:center" headerStyle="width:50px;">
                                <template #body="slotProps">
                                    {{slotProps.data.boy}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['boy']" class="p-column-filter" />
                                </template>
                            </Column>
                            <Column field="kenar" header="K" bodyStyle="text-align:center" headerStyle="width:50px;">
                                <template #body="slotProps">
                                    {{slotProps.data.kenar}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['kenar']" class="p-column-filter" />
                                </template>
                            </Column>
                            <Column field="kasaadet" header="K.Adet" bodyStyle="text-align:center"
                                headerStyle="width:50px;">
                                <template #body="slotProps">
                                    {{slotProps.data.kasaadet}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['kasaadet']" class="p-column-filter" />
                                </template>
                            </Column>
                            <Column field="kutuadet" header="Kutu" bodyStyle="text-align:center"
                                headerStyle="width:40px;">
                                <template #body="slotProps">
                                    {{slotProps.data.kutuadet}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['kutuadet']" class="p-column-filter" />
                                </template>
                            </Column>
                            <Column field="m2" header="M2" bodyStyle="text-align:center" headerStyle="width:60px;">
                                <template #body="slotProps">
                                    {{slotProps.data.m2}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['m2']" class="p-column-filter" />
                                </template>
                                <template #footer>
                                    {{formatDecimal(toplam_m2 )}}
                                </template>
                            </Column>
                            <Column field="adet" header="Adet" bodyStyle="text-align:center" headerStyle="width:40px;">
                                <template #body="slotProps">
                                    {{slotProps.data.adet}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['adet']" class="p-column-filter" />
                                </template>
                                <template #footer>
                                    {{formatDecimal(toplam_adet)}}
                                </template>
                            </Column>
                            <Column field="mt" header="Mt" bodyStyle="text-align:center" headerStyle="width:40px;">
                                <template #body="slotProps">
                                    {{slotProps.data.mt}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['mt']" class="p-column-filter" />
                                </template>
                                <template #footer>
                                    {{formatDecimal(toplam_mt )}}
                                </template>
                            </Column>
                            <Column field="ton" header="Ton" bodyStyle="text-align:center" headerStyle="width:40px;">
                                <template #body="slotProps">
                                    {{slotProps.data.ton}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['ton']" class="p-column-filter" />
                                </template>
                                <template #footer>
                                    {{formatDecimal(toplam_ton )}}
                                </template>
                            </Column>
                            <Column field="kutu" header="Kutu" bodyStyle="text-align:center" headerStyle="width:40px;">
                                <template #body="slotProps">
                                    <div v-if="slotProps.data.kutu == true" style="backgroundColor:greenyellow">
                                        ✓
                                    </div>
                                    <div v-else style="backgroundColor:red;color:white">
                                        X
                                    </div>
                                </template>

                            </Column>
                            <Column field="bagli" header="Baglı" bodyStyle="text-align:center"
                                headerStyle="width:40px;">
                                <template #body="slotProps">
                                    <div v-if="slotProps.data.bagli == true" style="backgroundColor:greenyellow">
                                        ✓
                                    </div>
                                    <div v-else style="backgroundColor:red;color:white">
                                        X
                                    </div>
                                </template>
                            </Column>
                            <Column field="siparisaciklama" header="Po" bodyStyle="text-align:center"
                                headerStyle="width:90px;">
                                <template #body="slotProps">
                                    {{slotProps.data.siparisaciklama}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['siparisaciklama']"
                                        class="p-column-filter" />
                                </template>
                            </Column>
                            <Column field="aciklama" header="Not" bodyStyle="text-align:center"
                                headerStyle="width:70px">
                                <template #body="slotProps">
                                    {{slotProps.data.aciklama}}
                                </template>
                                <template #filter>
                                    <InputText type="text" v-model="filters2['aciklama']" class="p-column-filter" />
                                </template>
                            </Column>
                        </DataTable>
                    </div>
                </div>
            </section>
        </Dialog>


    </section>


</template>
<script>
import { mapGetters } from 'vuex';
import UretimForm from './UretimForm'
import socket from '../../service/SocketService'
export default {
    
    components : {

        UretimForm
    },
    created(){
        const genislik = window.innerWidth;
        if(genislik < 600){
            this.isDesktop = false
        }
        

        this.toplam_guncelle()

        

        socket.siparis.on('seleksiyon_yenikayit_emit', data => {

            this.$store.dispatch('seleksiyon_yenikayit_act',data)
            this.toplam_guncelle()
        })

        socket.siparis.on('seleksiyon_kayitguncelle_emit',data => {
            
            this.$store.dispatch('seleksiyon_guncelle_act',data)
            this.$refs.seleksiyon_data.value = !this.slk_enb_mekmar ? this.seleksiyon_dis_uretimlist : this.seleksiyon_mekmar_uretimlist
            this.toplam_guncelle()
        })

        socket.siparis.on('seleksiyon_kayitsil_emit',kasa_id => {

            this.$store.dispatch('seleksiyon_kayitsil_act',kasa_id)
            this.$refs.seleksiyon_data.value = !this.slk_enb_mekmar ? this.seleksiyon_dis_uretimlist : this.seleksiyon_mekmar_uretimlist
            this.toplam_guncelle()
        })

        socket.siparis.on('seleksiyon_coklukayit_emit',kasa_list => {

            this.$store.dispatch('seleksiyon_coklukayit_act',kasa_list)
            this.$refs.seleksiyon_data.value = !this.slk_enb_mekmar ? this.seleksiyon_dis_uretimlist : this.seleksiyon_mekmar_uretimlist
          
            this.toplam_guncelle()
        })
    },
    
    computed : {

        ...mapGetters([
            'seleksiyon_uretimlist',
            'seleksiyon_mekmar_uretimlist',
            'seleksiyon_dis_uretimlist',
            'seleksiyon_mekmer_dis_uretimlist',
            'slk_enb_mekmar',
            'slk_enb_dis',
            'slk_enb_mekmer_dis',
            'seleksiyon_dis_top_kasa'
        ]),

        sort_seleksiyon_uretimlist(){

          
           return this.liste(this.seleksiyon_uretimlist)
        }
        
    },
    data(){

        return {
            isProductNew:false,
            isDesktop:true,
            filters : {},
            filters2:{},
            select_uretim : null,
            is_mekmar : true,
            is_uretimform : false,
            toplam_m2 : 0,
            toplam_mt : 0,
            toplam_adet : 0,
            toplam_ton : 0,
            adet_kasa :0,
            short_data:[],
            activeColor:'black',
            urn_adi:'Vein Cut',
            urn_adi2:'Silver Com',
            selectedUrun: null,
            is_filterForm:false,
            filterProducts:[],
            urunler: [
                {name: 'Classic Vein Cut'},
                {name:'Silver Vein Cut'},
                {name:'Mina Rustic Vein Cut '},
                {name:'Classic Light'},
                {name:'Classic Mina'},
                {name:'Desert Silver'},
                {name:'Ela'},
                {name:'Emerald Beige'},
                {name:'Emerald Light'},
                {name:'Gold'},
                {name:'Gold Vein Cut'},
                {name:'Golden Ink'},
                {name:'Golden Ink Vein Cut'},
                {name:'Ivory Rustic'},
                {name:'Latte'},
                {name:'Medium'},
                {name:'Medium Com'},
                {name:'Mina Rustic'},
                {name:'Mix'},
                {name:'Noche'},
                {name:'Noche Com'},
                {name:'Noche Vein Com'},
                {name:'Noche Vein Cut'},
                {name:'Onyx'},
                {name:'Pablo'},
                {name:'Pablo Vein Cut'},
                {name:'Picasso Ivory'},
                {name:'Romano'},
                {name:'Safir Hrktl'},
                {name:'Scabos'},
                {name:'Scott Rustic'},
                {name:'Silver Com'},
                {name:'Silver Com Vein Cut'},
                {name:'Silver Corner'},
                {name:'Silver Dark Vein Cut'},
                {name:'Silver Grey'},
                {name:'Silver Picasso'},
                {name:'Silver Rustic'},
                {name:'Silver Rustic Vein Cut'},
                {name:'Storm Noche'},
                {name:'Storm Noche Kristalli'},
                {name:'Storm Noche Vein Cut'},
                {name:'Thula Mix'},
                {name:'Tuscany Mix'},
                {name:'Valencia'},
                {name:'Volcano'},
                {name:'Volcano Mix'},
                {name:'Volcano Vein Cut'},
                {name:'Walnut Mix'},
                {name:'Walnut Vein Cut'},
                {name:'Classic Cubic'},
                {name:'Classic Panel'},
                {name:'Classic Vein Cut 3D'},
                {name:'Gold Beige Panel'},
                {name:'Gold Classic'},
                {name:'Ivory'},
                {name:'Noche Beige Corner'},
                {name:'Noche Beige Panel'},
                {name:'Noche Panel'},
                {name:'Philadelphia Panel'},
                {name:'Red'},
                {name:'Rustic'},
                {name:'Silver Cubic Mix'},
                {name:'Sultana'},
                
            ]
        }
    },
    mounted() {
    },
    methods : {
        
        
        formatDecimal(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return   val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
          },
          isSelected(){
            this.filterProducts=[]
            this.is_filterForm = true
            for(var i in this.seleksiyon_mekmar_uretimlist){
                if(this.selectedUrun.name == 'Classic Vein Cut'){
                    if(this.seleksiyon_mekmar_uretimlist[i].urunadi == this.selectedUrun.name || this.seleksiyon_mekmar_uretimlist[i].urunadi == 'Cream Vein Cut'){
                    this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i])
                   }
                }else if(this.selectedUrun.name=='Classic Mina'){
                    if(this.seleksiyon_mekmar_uretimlist[i].urunadi == this.selectedUrun.name || this.seleksiyon_mekmar_uretimlist[i].urunadi == 'Beige' || this.seleksiyon_mekmar_uretimlist[i].urunadi == 'Classic' || this.seleksiyon_mekmar_uretimlist[i].urunadi=='Denizli Beige' || this.seleksiyon_mekmar_uretimlist[i].urunadi=='Mina'){
                    this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i])
                   }
                }
                else if(this.selectedUrun.name=='Classic Light'){
                    if(this.seleksiyon_mekmar_uretimlist[i].urunadi == this.selectedUrun.name || this.seleksiyon_mekmar_uretimlist[i].urunadi == 'Cream'|| this.seleksiyon_mekmar_uretimlist[i].urunadi == 'Onyx'){
                    this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i])
                   }
                }else if(this.selectedUrun.name=='Ela'){
                    if(this.seleksiyon_mekmar_uretimlist[i].urunadi == this.selectedUrun.name || this.seleksiyon_mekmar_uretimlist[i].urunadi == 'Elia'){
                    this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i])
                   }
                }else if(this.selectedUrun.name=='Gold Vein Cut'){
                    if(this.seleksiyon_mekmar_uretimlist[i].urunadi == this.selectedUrun.name || this.seleksiyon_mekmar_uretimlist[i].urunadi == 'Yellow Vein Cut'){
                    this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i])
                   }
                }else if(this.selectedUrun.name=='Picasso Ivory'){
                    if(this.seleksiyon_mekmar_uretimlist[i].urunadi == this.selectedUrun.name || this.seleksiyon_mekmar_uretimlist[i].urunadi == 'Picasso'){
                    this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i])
                   }
                }else if(this.selectedUrun.name=='Silver Grey'){
                    if(this.seleksiyon_mekmar_uretimlist[i].urunadi == this.selectedUrun.name || this.seleksiyon_mekmar_uretimlist[i].urunadi == 'Silver'){
                    this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i])
                   }
                }else if(this.selectedUrun.name=='Silver Rustic Vein Cut'){
                    if(this.seleksiyon_mekmar_uretimlist[i].urunadi == this.selectedUrun.name || this.seleksiyon_mekmar_uretimlist[i].urunadi == 'Silver Com Vein Cut'){
                    this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i])
                   }
                }

                
                
                
                else{
                    if(this.seleksiyon_mekmar_uretimlist[i].urunadi == this.selectedUrun.name){
                    this.filterProducts.push(this.seleksiyon_mekmar_uretimlist[i])
                   }
                }
                
                
            }
            this.toplam_islem(this.filterProducts)

        },
        sort_list(liste){
            return liste.sort((a,b) => {return a.kasano - b.kasano})
        },
        uretimSec(event){

            this.select_uretim = event.data;
           
            this.$store.dispatch('seleksiyonSelectItemActions')          
            this.is_uretimform = true
        },
        
        toplam_islem(liste){
            this.toplam_m2 = 0
            this.toplam_mt = 0
            this.toplam_adet = 0
            this.toplam_ton = 0 
            this.adet_kasa = liste.length

            for(let key in liste){

                const item = liste[key]
                this.toplam_m2 = this.toplam_m2 + item.m2
 
                this.toplam_adet += item.adet 
                this.toplam_mt += item.mt 
                this.toplam_ton += item.ton 
            }
        },
        
        filter_data_change(event){
            

            this.toplam_islem(event.filterValue)
            return 1

        },
        filter_data_change2(event){
            this.toplam_islem(event.filterValue)
            return 1
        },
        


        toplam_guncelle(){

            const data = !this.slk_enb_mekmar ? this.seleksiyon_dis_uretimlist : this.seleksiyon_mekmar_uretimlist

            this.toplam_islem(data)
        }
    }
}
</script>
<style  scoped>
    .p-datatable{

        font-size: 10px;
    }
    .disarda_css {
        background-color:#F0FFFF ;
        color :	#1434A4;
    }
    .urunSecmeBolumu{
        margin-left:21px;
        margin-bottom:-65px;
        padding-top: 12px;
    }
    .urunSecmeDropdown{
        width:200px;
    }
    
    .inputTextArama{
        margin-left:82.5%; 
        margin-top:0%;
    }
    

    

</style>