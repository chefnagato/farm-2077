<script>

	export default {

		render: () => false,

		created() {

			addEventListener( 'keydown', this.onKeyDown );
			addEventListener( 'keyup', this.onKeyUp );

		},

		methods: {

			onKeyDown( e ) {

				if ( e.keyCode === 38 ) this.$commit( 'keys.up', true );
				if ( e.keyCode === 40 ) this.$commit( 'keys.down', true );
				if ( e.keyCode === 37 ) this.$commit( 'keys.left', true );
				if ( e.keyCode === 39 ) this.$commit( 'keys.right', true );

			},

			onKeyUp( e ) {

				if ( e.keyCode === 38 ) this.$commit( 'keys.up', false );
				if ( e.keyCode === 40 ) this.$commit( 'keys.down', false );
				if ( e.keyCode === 37 ) this.$commit( 'keys.left', false );
				if ( e.keyCode === 39 ) this.$commit( 'keys.right', false );

			},

		},

	}

</script>