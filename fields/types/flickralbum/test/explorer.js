process.stdout.write('explorer');
module.exports = {
	Field: require('../FlickrAlbumField'),
	Filter: require('../FlickrAlbumFilter'),
	readme: require('fs').readFileSync('./fields/types/flickralbum/Readme.md', 'utf8'),
	section: 'Miscellaneous',
	spec: [{
		label: 'Text FlickrAlbum',
		path: 'textFlickrAlbum',
		ops: [
			{ label: 'Caramel', value: 'caramel' },
			{ label: 'Chocolate', value: 'chocolate' },
			{ label: 'Strawberry', value: 'strawberry' },
			{ label: 'Vanilla', value: 'vanilla' },
		],
		value: 'chocolate',
	}],
};
