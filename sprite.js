const nsg = require('node-sprite-generator');

nsg({
	layout: 'packed',
	compositor: 'jimp',
	src: ['items/*.png'],
	spritePath: 'docs/assets/items.png',
	stylesheetPath: 'docs/assets/items.css',
	stylesheet: 'css',
	stylesheetOptions: {
		prefix: 'item-',
		nameMapping: (name) =>  name
				.slice(6)
				.slice(0, -4)
				.toLowerCase()
				.replace(/ /g, '-')
				.replace(/[\',\(\)&\.]/g, '')
				.replace(/--/g, '-')
	},
}, (err) => {
	console.log(err, 'node-sprite-generator done');
});
