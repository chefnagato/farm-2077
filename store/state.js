export default () => ( {

	game: {

		ready: false,

		keys: {

			up: false,
			down: false,
			left: false,
			right: false,

		},

		player: {

			x: -10,
			y: 0,
			z: 0,
			w: 1,
			h: 1,

			path: [],

			speed: {

				current: 0,
				max: 1,

			},

		},

		map: {

			dx: 0,

			dy: 0,

			unit: 0,

			unitsX: 0,

			unitsY: 0,

			unitsBound: 0,

			objects: [

				{ x: -15, y: 2, w: 2, h: 2 },
				{ x: -10, y: -7, w: 5, h: 3 },

			],

		},

	},

} );