export default ( { app, store }, inject ) => {

	const clone = structure => {

		return JSON.parse( JSON.stringify( structure ) );

	}

	const commit = ( name, value ) => {

		store.commit( 'set', { name, value } );

		return;

	}

	const select = name => {

		let path = name.split( '.' );

		if ( path.length === 1 ) return clone( store.state[ 'game' ][ path[ 0 ] ] );
		if ( path.length === 2 ) return clone( store.state[ 'game' ][ path[ 0 ] ][ path[ 1 ] ] );
		if ( path.length === 3 ) return clone( store.state[ 'game' ][ path[ 0 ] ][ path[ 1 ] ][ path[ 2 ] ] );
		if ( path.length === 4 ) return clone( store.state[ 'game' ][ path[ 0 ] ][ path[ 1 ] ][ path[ 2 ] ][ path[ 3 ] ] );
		if ( path.length === 5 ) return clone( store.state[ 'game' ][ path[ 0 ] ][ path[ 1 ] ][ path[ 2 ] ][ path[ 3 ] ][ path[ 4 ] ] );

	}

	inject( 'clone', clone );
	inject( 'commit', commit );
	inject( 'select', select );

}