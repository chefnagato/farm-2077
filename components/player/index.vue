<script>

	export default {

		render: () => false,

		mounted() {

			this.$nuxt.$on( 'tick', this.onTick );

		},

		beforeDestroy() {

			this.$nuxt.$off( 'tick' );			

		},

		methods: {

			onTick( deltaTime = 0 ) {

				this.move( deltaTime );

			},

			move( deltaTime = 0 ) {

				let path = this.$select( 'player.path' );

				if ( false === Boolean( path.length ) ) return;

				if ( this.$select( 'player.x' ) === path[ 0 ][ 0 ] && this.$select( 'player.y' ) === path[ 0 ][ 1 ] ) {

					path.splice( 0, 1 );

					this.$commit( 'player.path', path );

					return;

				}

				this.moveLeft( this.$select( 'player.x' ), path[ 0 ][ 0 ], deltaTime );
				this.moveRight( this.$select( 'player.x' ), path[ 0 ][ 0 ], deltaTime );
				this.moveUp( this.$select( 'player.y' ), path[ 0 ][ 1 ], deltaTime );
				this.moveDown( this.$select( 'player.y' ), path[ 0 ][ 1 ], deltaTime );

			},

			moveLeft( from, to, deltaTime = 0 ) {

				if ( from <= to ) return;

				this.$commit( 'player.x', Math.max( from - 5*deltaTime, to ) );

				this.$commit( 'map.dx', Math.min( this.$select( 'map.dx' ), this.$select( 'player.x' ) - this.$select( 'map.unitsBound' ) ) );

			},

			moveRight( from, to, deltaTime = 0 ) {

				if ( from >= to ) return;

				this.$commit( 'player.x', Math.min( from + 5*deltaTime, to ) );

				this.$commit( 'map.dx', Math.max( this.$select( 'map.dx' ), this.$select( 'player.x' ) - this.$select( 'map.unitsX' ) + this.$select( 'map.unitsBound' ) + 1 ) );

			},

			moveUp( from, to, deltaTime = 0 ) {

				if ( from <= to ) return;

				this.$commit( 'player.y', Math.max( from - 5*deltaTime, to ) );

				this.$commit( 'map.dy', Math.min( this.$select( 'map.dy' ), this.$select( 'player.y' ) - this.$select( 'map.unitsBound' ) ) );

			},

			moveDown( from, to, deltaTime = 0 ) {

				if ( from >= to ) return;

				this.$commit( 'player.y', Math.min( from + 5*deltaTime, to ) );

				this.$commit( 'map.dy', Math.max( this.$select( 'map.dy' ), this.$select( 'player.y' ) - this.$select( 'map.unitsY' ) + this.$select( 'map.unitsBound' ) + 1 ) );

			},

		},

	}

</script>