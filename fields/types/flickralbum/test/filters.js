var demand = require('must');
var FlickrAlbumType = require('../FlickrAlbumType');

exports.initList = function (List) {
	List.add({
		textFlickrAlbum: { type: FlickrAlbumType, options: 'one, two, three' },
		numericFlickrAlbum: { type: FlickrAlbumType, numeric: true, options: [
			{ value: 0, label: 'Zero' },
			{ value: 1, label: 'One' },
			{ value: 2, label: 'Two' },
		] },
	});
};

exports.getTestItems = function () {
	return [
		{},
		{ textFlickrAlbum: '', numericFlickrAlbum: 0 },
		{ textFlickrAlbum: 'one', numericFlickrAlbum: 1 },
		{ textFlickrAlbum: 'two', numericFlickrAlbum: 2 },
		{ textFlickrAlbum: 'three' },
	];
};

exports.testFilters = function (List, filter) {

	describe('text values', function () {

		it('should find exact text matches', function (done) {
			filter({
				textFlickrAlbum: {
					value: 'one',
				},
			}, 'textFlickrAlbum', function (results) {
				demand(results).eql(['one']);
				done();
			});
		});

		it('should invert exact text matches', function (done) {
			filter({
				textFlickrAlbum: {
					inverted: true,
					value: 'one',
				},
			}, 'textFlickrAlbum', function (results) {
				demand(results).eql([undefined, undefined, 'two', 'three']);
				done();
			});
		});

		it('should find multiple text matches', function (done) {
			filter({
				textFlickrAlbum: {
					value: ['one', 'two'],
				},
			}, 'textFlickrAlbum', function (results) {
				demand(results).eql(['one', 'two']);
				done();
			});
		});

		it('should invert multiple text matches', function (done) {
			filter({
				textFlickrAlbum: {
					inverted: true,
					value: ['one', 'two'],
				},
			}, 'textFlickrAlbum', function (results) {
				demand(results).eql([undefined, undefined, 'three']);
				done();
			});
		});

		it('should find empty text matches', function (done) {
			filter({
				textFlickrAlbum: {
					value: '',
				},
			}, 'textFlickrAlbum', function (results) {
				demand(results).eql([undefined, undefined]);
				done();
			});
		});

		it('should invert empty text matches', function (done) {
			filter({
				textFlickrAlbum: {
					inverted: true,
					value: '',
				},
			}, 'textFlickrAlbum', function (results) {
				demand(results).eql(['one', 'two', 'three']);
				done();
			});
		});

	});

	describe('numeric values', function () {

		it('should find exact numeric matches', function (done) {
			filter({
				numericFlickrAlbum: {
					value: 1,
				},
			}, 'numericFlickrAlbum', function (results) {
				demand(results).eql([1]);
				done();
			});
		});

		it('should invert exact numeric matches', function (done) {
			filter({
				numericFlickrAlbum: {
					inverted: true,
					value: 1,
				},
			}, 'numericFlickrAlbum', function (results) {
				demand(results).eql([undefined, 0, 2, undefined]);
				done();
			});
		});

		it('should find multiple numeric matches', function (done) {
			filter({
				numericFlickrAlbum: {
					value: [1, 2],
				},
			}, 'numericFlickrAlbum', function (results) {
				demand(results).eql([1, 2]);
				done();
			});
		});

		it('should invert multiple numeric matches', function (done) {
			filter({
				numericFlickrAlbum: {
					inverted: true,
					value: [1, 2],
				},
			}, 'numericFlickrAlbum', function (results) {
				demand(results).eql([undefined, 0, undefined]);
				done();
			});
		});

		it('should find empty numeric matches', function (done) {
			filter({
				numericFlickrAlbum: {
					value: '',
				},
			}, 'numericFlickrAlbum', function (results) {
				demand(results).eql([undefined, undefined]);
				done();
			});
		});

		it('should invert empty numeric matches', function (done) {
			filter({
				numericFlickrAlbum: {
					inverted: true,
					value: '',
				},
			}, 'numericFlickrAlbum', function (results) {
				demand(results).eql([0, 1, 2]);
				done();
			});
		});

	});

	describe('combined values', function () {

		it('should find combined text and numeric matches', function (done) {
			filter({
				textFlickrAlbum: {
					value: 'one',
				},
				numericFlickrAlbum: {
					value: 1,
				},
			}, 'textFlickrAlbum', function (results) {
				demand(results).eql(['one']);
				done();
			});
		});

		it('should combine with inverted matches', function (done) {
			filter({
				textFlickrAlbum: {
					value: 'one',
				},
				numericFlickrAlbum: {
					inverted: true,
					value: 2,
				},
			}, 'textFlickrAlbum', function (results) {
				demand(results).eql(['one']);
				done();
			});
		});

		it('should combine with inverted negating matches', function (done) {
			filter({
				textFlickrAlbum: {
					value: 'one',
				},
				numericFlickrAlbum: {
					inverted: true,
					value: 1,
				},
			}, 'textFlickrAlbum', function (results) {
				demand(results).eql([]);
				done();
			});
		});

	});
};
