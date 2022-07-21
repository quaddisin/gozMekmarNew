<template>
	<div class="layout-footer">
		<ProgressSpinner v-text-center v-if="getProgressBar"  />
		<span v-if="!getProgressBar" class="footer-text" style="margin-right: 5px"></span>
		<img v-if="!getProgressBar" src="https://mekmar-image.fra1.cdn.digitaloceanspaces.com/logo/logo-mekmar.png" alt="sigma" width="80"/>
		<span class="footer-text" style="margin-left: 5px"></span>
	</div>
	
</template>

<script>
import  { mapGetters } from 'vuex';
import ProgressSpinner from 'primevue/progressspinner';
	export default {
		name: "AppFooter",
		computed : {
			...mapGetters(['getProgressBar'])

		},
		components : {

			ProgressSpinner
		},
		
	}
</script>

<style scoped>

</style>