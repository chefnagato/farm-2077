import Vue from 'vue'

export default {

	set: ( state, payload ) => {

		let path = payload.name.split( '.' );

		switch ( path.length ) {

			case 1: Vue.set( state[ 'game' ], path[ 0 ], payload.value ); break;
			case 2: Vue.set( state[ 'game' ][ path[ 0 ] ], path[ 1 ], payload.value ); break;
			case 3: Vue.set( state[ 'game' ][ path[ 0 ] ][ path[ 1 ] ], path[ 2 ], payload.value ); break;
			case 4: Vue.set( state[ 'game' ][ path[ 0 ] ][ path[ 1 ] ][ path[ 2 ] ], path[ 3 ], payload.value ); break;
			case 5: Vue.set( state[ 'game' ][ path[ 0 ] ][ path[ 1 ] ][ path[ 2 ] ][ path[ 3 ] ], path[ 4 ], payload.value ); break;

			default: break;

		}

	},

	load: ( state, data ) => {

		Vue.set( state, 'game', data );

	},

}