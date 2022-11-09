<template>

	<canvas class="canvas" id="canvas"></canvas>

</template>

<script>

	export default {

		data: () => ( {

			handle: null,

			ctx: null,

			images: [],

		} ),

		mounted() {

			this.render();

		},

		methods: {

			scale( value = 0 ) {

				return ( value * this.$select( 'map.unit' ) );

			},

			scaleX( value = 0 ) {

				return ( ( value - this.$select( 'map.dx' ) ) * this.$select( 'map.unit' ) );

			},

			scaleY( value = 0 ) {

				return ( ( value - this.$select( 'map.dy' ) ) * this.$select( 'map.unit' ) );

			},

			render() {

				if ( false === !!this.handle ) {

					this.handle = document.querySelector( '#canvas' );

					this.ctx = this.handle.getContext( '2d' );

					this.images[ 0 ] = new Image();
					this.images[ 0 ].src = require( './tiles/tile-01.png' );

					this.images[ 1 ] = new Image();
					this.images[ 1 ].src = require( './tiles/tile-02.png' );


				}

				this.handle.width = this.scale( this.$select( 'map.unitsX' ) );
				this.handle.height = this.scale( this.$select( 'map.unitsY' ) );
				this.handle.style.width = `${ this.scale( this.$select( 'map.unitsX' ) ) }px`;
				this.handle.style.height = `${ this.scale( this.$select( 'map.unitsY' ) ) }px`;

				this.ctx.clearRect( 0, 0, this.handle.width, this.handle.height );

				this.ctx.fillStyle = '#090';
				for ( let object of this.$select( 'map.objects' ) ) {

					this.ctx.fillRect( 

						this.scaleX( object.x ),
						this.scaleY( object.y ),
						this.scale( object.w ),
						this.scale( object.h )

					);

				}

				this.ctx.fillStyle = '#f00';
				this.ctx.fillRect( 

					this.scaleX( this.$select( 'player.x' ) ),
					this.scaleY( this.$select( 'player.y' ) ),
					this.scale( 1 ),
					this.scale( 1 )

				);

			},

		},

		watch: {

			'$store.state.game': {

				handler( newValue, oldValue ) {

					this.render();

				},
				deep: true,

			},

		},

	}

</script>

<style>

	#canvas {

		position: fixed;
		background: #000;

		top: 50%;
		left: 50%;
		transform: translateX( -50% ) translateY( -50% );

	}

</style>

