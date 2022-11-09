<script>

	import LZString from 'lz-string'

	export default {

		render: () => false,

		data: () => ( {

			timer: null,

			now: Date.now(),
			
			worker: null,

			savingInterval: 0,

		} ),

		mounted() {

			this.worker = new Worker( window.URL.createObjectURL( new Blob( [
				
				"onmessage = function tick() { postMessage( 'tick' ); requestAnimationFrame( tick ) }"

			] ) ) );

			this.worker.addEventListener( "message", this.onTick );

			this.worker.postMessage( "tick" );

		},

		beforeDestroy() {

			cancelAnimationFrame( this.timer );

		},

		methods: {

			onTick() {

				let deltaTime = ( Date.now() - this.now ) / 1000;

				this.save( deltaTime );

				this.$nuxt.$emit( 'tick', deltaTime );

			 	this.now = Date.now();

			},

			save( deltaTime = 0 ) {

				this.savingInterval += deltaTime;

				if ( this.savingInterval < 5 ) return;

				this.savingInterval = 0;

				let savingData = LZString.compressToBase64( JSON.stringify( this.$store.state.game ) );

				localStorage.setItem( 'data', savingData );

			}

		},

	}

</script>