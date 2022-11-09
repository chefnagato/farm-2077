<template>

	<div class="map" id="map" @click="onClick">

		<template v-if="$select( 'ready' )">

			<slot></slot>

		</template>

	</div>

</template>

<script>

	import PF from 'pathfinding'

	export default {

		data: () => ( {

			handle: null,

			finder: null,

			bounds: null,

			grid: null,

			objects: [],

			bbox: { lt: { x: 0, y: 0, }, rb: { x: 0, y: 0, }, },

			readyTimeout: null,

			ready: false,

			tiles: [],

		} ),

		mounted() {

			this.finder = new PF.AStarFinder( { allowDiagonal: true, dontCrossCorners: true } );

			this.handle = document.querySelector( '#map' );

			addEventListener( 'resize', this.onResize );

			this.onResize();

		},

		methods: {

			onResize() {

				if ( false === !!this.$select( 'ready' ) ) {

					this.readyTimeout = setTimeout( () => {

						this.onResize();

					}, 200 );

					return;

				}

				this.ready = true;

				this.bounds = this.handle.getBoundingClientRect();

				this.$commit( 'map.unitsY', 24 );

				this.$commit( 'map.unit', Math.ceil( this.bounds.height / this.$select( 'map.unitsY' ) ) );

				this.$commit( 'map.unitsX', Math.ceil( this.bounds.width / this.$select( 'map.unit' ) ) );

				let minSide = this.$select( 'map.unitsX' ) < this.$select( 'map.unitsY' ) ? this.$select( 'map.unitsX' ) : this.$select( 'map.unitsY' );

				this.$commit( 'map.unitsBound', Math.max( 2, Math.ceil( ( minSide / 2 ) - 2 ) ) );

				this.$commit( 'map.dx', this.$select( 'player.x' ) - ( this.$select( 'map.unitsX' ) / 2 ) + 0.5 );

				this.$commit( 'map.dy', this.$select( 'player.y' ) - ( this.$select( 'map.unitsY' ) / 2 ) + 0.5 );

				this.getObjects();

			},

			onClick( e ) {

				let x = Math.floor( ( e.x + ( this.$select( 'map.dx' ) * this.$select( 'map.unit' ) ) ) / this.$select( 'map.unit' ) );
				let y = Math.floor( ( e.y + ( this.$select( 'map.dy' ) * this.$select( 'map.unit' ) ) ) / this.$select( 'map.unit' ) );

				let path = this.$select( 'player.path' );

				if ( path.length > 1 ) path = [ path[ 0 ] ];

				let sx = Math.floor( this.$select( 'player.x' ) - this.$select( 'map.dx' ) );
				let sy = Math.floor( this.$select( 'player.y' ) - this.$select( 'map.dy' ) );
				let ex = Math.floor( x - this.$select( 'map.dx' ) );
				let ey = Math.floor( y - this.$select( 'map.dy' ) );

				this.getGrid();

				let walk = this.finder.findPath( sx, sy, ex, ey, this.grid );

				walk.forEach( point => {

					path.push( [ Math.ceil( point[ 0 ] + this.$select( 'map.dx' ) ), Math.ceil( point[ 1 ] + this.$select( 'map.dy' ) ) ] );

				} );

				this.$commit( 'player.path', path );

			},

			getBbox() {

				this.bbox.lt.x = Math.floor( this.$select( 'map.dx' ) );
				this.bbox.lt.y = Math.floor( this.$select( 'map.dy' ) );
				this.bbox.rb.x = Math.ceil( this.bbox.lt.x + this.$select( 'map.unitsX' ));
				this.bbox.rb.y = Math.ceil( this.bbox.lt.y + this.$select( 'map.unitsY' ) );

			},

			getObjects() {

				this.getBbox();

				this.objects = [];

				this.objects = this.$select( 'map.objects' );

			},

			getGrid() {

				this.grid = new PF.Grid( this.$select( 'map.unitsX' ), this.$select( 'map.unitsY' ) );

				for ( let object of this.objects ) {

					for ( let x = object.x; x < object.x + object.w; x++ ) {

						for ( let y = object.y; y < object.y + object.h; y++ ) {

							let ox = Math.floor( x - this.$select( 'map.dx' ) );

							let oy = Math.floor( y - this.$select( 'map.dy' ) );

							if (

								   ox > 0 
								&& ox < this.$select( 'map.unitsX' )
								&& oy > 0
								&& oy < this.$select( 'map.unitsY' ) ) {

								this.grid.setWalkableAt( Math.floor( x - this.$select( 'map.dx' ) ), Math.floor( y - this.$select( 'map.dy' ) ), false );

							}

						}

					}

				}
				
			},

		},

		watch: {

			'$store.state.game.map.dx': {

				handler( newValue, oldValue ) {

					if ( Math.round( newValue ) !== Math.round( oldValue ) ) {

						this.getObjects();

					}

				}

			}

		},

	}

</script>

<style>

	.map {

		position: fixed;

		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		background: #000;
		color: #fff;
		overflow: hidden;

	}

	.map, .map * { box-sizing: border-box;  }

</style>