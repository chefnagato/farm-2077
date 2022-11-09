<template>

	<div class="game">
		
		<slot></slot>

	</div>

</template>

<script>

	import LZString from 'lz-string'

	export default {

		mounted() {

			let loadingData = localStorage.getItem( 'data' );

			if ( !!loadingData ) {

				loadingData = JSON.parse( LZString.decompressFromBase64( loadingData ) );

				this.$store.commit( 'load', loadingData );

			}

			this.$commit( 'ready', true );

		}

	}

</script>

<style>

	.game {

		position: fixed;

		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		overflow: hidden;

	}

</style>