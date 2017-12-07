var demand = require('must');
var FlickrAlbumType = require('../FlickrAlbumType');

exports.initList = function (List) {
	List.add({
		flickralbum: { type: FlickrAlbumType, options: 'one, two, three' },
		nested: {
			flickralbum: { type: FlickrAlbumType, options: 'one, two, three' },
		},
		extraProps: { type: FlickrAlbumType, options: [
			{ value: 'one', label: 'One', custom: '1' },
			{ value: 'two', label: 'Two', custom: '2' },
		] },
		numeric: { type: FlickrAlbumType, numeric: true, options: [
			{ value: 1, label: 'one' },
			{ value: 2, label: 'two' },
			{ value: 3, label: 'three' },
		] },
		emptyStringFlickrAlbum: { type: FlickrAlbumType, options: [
			{ value: '', label: '' },
			{ value: 'two', label: 'Two' },
		] },
	});
};

exports.testFieldType = function (List) {
	describe('invalid options', function () {
		it('should throw when no options are passed', function (done) {
			try {
				List.add({
					noOptions: { type: FlickrAlbumType },
				});
			} catch (err) {
				demand(err.message).eql('FlickrAlbum fields require an options array.');
				done();
			}
		});
	});

	describe('validateInput', function () {
		it('should validate top level flickralbums', function (done) {
			List.fields.flickralbum.validateInput({
				flickralbum: 'one',
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should validate nested flickralbums', function (done) {
			List.fields['nested.flickralbum'].validateInput({
				nested: {
					flickralbum: 'one',
				},
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should validate undefined input', function (done) {
			List.fields.flickralbum.validateInput({
				flickralbum: undefined,
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should validate null input', function (done) {
			List.fields.flickralbum.validateInput({
				flickralbum: null,
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should validate an empty string', function (done) {
			List.fields.flickralbum.validateInput({
				flickralbum: '',
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should validate an empty string if specified as an option', function (done) {
			List.fields.emptyStringFlickrAlbum.validateInput({
				emptyStringFlickrAlbum: '',
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should invalidate numbers', function (done) {
			List.fields.flickralbum.validateInput({
				flickralbum: 1,
			}, function (result) {
				demand(result).be.false();
				done();
			});
		});

		it('should validate numbers when numeric is set to true', function (done) {
			List.fields.numeric.validateInput({
				numeric: 1,
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should validate number strings when numeric is set to true', function (done) {
			List.fields.numeric.validateInput({
				numeric: '1',
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should invalidate non existing options', function (done) {
			List.fields.flickralbum.validateInput({
				flickralbum: 'four',
			}, function (result) {
				demand(result).be.false();
				done();
			});
		});

		it('should invalidate two selected options', function (done) {
			List.fields.flickralbum.validateInput({
				flickralbum: 'one, two',
			}, function (result) {
				demand(result).be.false();
				done();
			});
		});

		it('should invalidate true', function (done) {
			List.fields.flickralbum.validateInput({
				flickralbum: true,
			}, function (result) {
				demand(result).be.false();
				done();
			});
		});

		it('should invalidate false', function (done) {
			List.fields.flickralbum.validateInput({
				flickralbum: false,
			}, function (result) {
				demand(result).be.false();
				done();
			});
		});
	});

	describe('validateRequiredInput', function () {
		it('should validate a selected option', function (done) {
			var testItem = new List.model();
			List.fields.flickralbum.validateRequiredInput(testItem, {
				flickralbum: 'one',
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should validate a nested flickralbum', function (done) {
			var testItem = new List.model();
			List.fields['nested.flickralbum'].validateRequiredInput(testItem, {
				nested: {
					flickralbum: 'one',
				},
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should validate a nested flickralbum with a flat path', function (done) {
			List.fields.flickralbum.validateInput({
				'nested.flickralbum': ['a', 'b'],
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should invalidate an empty string', function (done) {
			var testItem = new List.model();
			List.fields.flickralbum.validateRequiredInput(testItem, {
				flickralbum: '',
			}, function (result) {
				demand(result).be.false();
				done();
			});
		});

		it('should invalidate undefined', function (done) {
			var testItem = new List.model();
			List.fields.flickralbum.validateRequiredInput(testItem, {
				flickralbum: undefined,
			}, function (result) {
				demand(result).be.false();
				done();
			});
		});

		it('should validate undefined if a value exists', function (done) {
			var testItem = new List.model({
				flickralbum: 'one',
			});
			List.fields.flickralbum.validateRequiredInput(testItem, {
				flickralbum: undefined,
			}, function (result) {
				demand(result).be.true();
				done();
			});
		});

		it('should invalidate null', function (done) {
			var testItem = new List.model();
			List.fields.flickralbum.validateRequiredInput(testItem, {
				flickralbum: null,
			}, function (result) {
				demand(result).be.false();
				done();
			});
		});

		it('should invalidate an empty string even if specified as an option', function (done) {
			var testItem = new List.model();
			List.fields.emptyStringFlickrAlbum.validateRequiredInput(testItem, {
				emptyStringFlickrAlbum: '',
			}, function (result) {
				demand(result).be.false();
				done();
			});
		});
	});

	describe('updateItem', function () {
		it('should update top level fields', function (done) {
			var testItem = new List.model();
			List.fields.flickralbum.updateItem(testItem, {
				flickralbum: 'one',
			}, function () {
				demand(testItem.flickralbum).be('one');
				done();
			});
		});

		it('should update nested fields', function (done) {
			var testItem = new List.model();
			List.fields['nested.flickralbum'].updateItem(testItem, {
				nested: {
					flickralbum: 'one',
				},
			}, function () {
				demand(testItem.nested.flickralbum).be('one');
				done();
			});
		});

		it('should update nested fields with flat paths', function (done) {
			var testItem = new List.model();
			List.fields['nested.flickralbum'].updateItem(testItem, {
				'nested.flickralbum': 'one',
			}, function () {
				demand(testItem.nested.flickralbum).be('one');
				done();
			});
		});
	});

	describe('addFilterToQuery', function () {
		it('should filter by an array', function () {
			var result = List.fields.flickralbum.addFilterToQuery({
				value: ['Some', 'strings'],
			});
			demand(result.flickralbum).eql({
				$in: ['Some', 'strings'],
			});
		});

		it('should support inverted mode for an array', function () {
			var result = List.fields.flickralbum.addFilterToQuery({
				value: ['Some', 'strings'],
				inverted: true,
			});
			demand(result.flickralbum).eql({
				$nin: ['Some', 'strings'],
			});
		});

		it('should filter by a string', function () {
			var result = List.fields.flickralbum.addFilterToQuery({
				value: 'a string',
			});
			demand(result.flickralbum).eql('a string');
		});

		it('should support inverted mode for a string', function () {
			var result = List.fields.flickralbum.addFilterToQuery({
				value: 'a string',
				inverted: true,
			});
			demand(result.flickralbum).eql({
				$ne: 'a string',
			});
		});

		it('should filter by existance if no value exists', function () {
			var result = List.fields.flickralbum.addFilterToQuery({});
			demand(result.flickralbum).eql({
				$in: ['', null],
			});
		});

		it('should filter by non-existance if no value exists', function () {
			var result = List.fields.flickralbum.addFilterToQuery({
				inverted: true,
			});
			demand(result.flickralbum).eql({
				$nin: ['', null],
			});
		});
	});

	it('should format values with the label of the option', function () {
		var testItem = new List.model({
			flickralbum: 'one',
		});
		demand(List.fields.flickralbum.format(testItem)).be('One');
	});

	it('should pluck custom properties from the selected option', function () {
		var testItem = new List.model({
			extraProps: 'two',
		});
		demand(testItem._.extraProps.pluck('custom')).be('2');
	});

	it('should have the label in nameLabel', function () {
		var testItem = new List.model({
			extraProps: 'two',
		});
		demand(testItem.extraPropsLabel).be('Two');
	});

	it('should have the current data in nameData', function () {
		var testItem = new List.model({
			extraProps: 'two',
		});
		demand(testItem.extraPropsData).eql({
			value: 'two', label: 'Two', custom: '2',
		});
	});

	it('should have the options in nameOption', function () {
		var testItem = new List.model({
			extraProps: 'two',
		});
		demand(testItem.extraPropsOptions).eql([
			{ value: 'one', label: 'One', custom: '1' },
			{ value: 'two', label: 'Two', custom: '2' },
		]);
	});

	it('should have the options map in nameOptionsMap', function () {
		var testItem = new List.model({
			extraProps: 'two',
		});
		demand(testItem.extraPropsOptionsMap).eql({
			one: {
				value: 'one', label: 'One', custom: '1',
			},
			two: {
				value: 'two', label: 'Two', custom: '2',
			},
		});
	});

	it('should return a blank string when formatting an undefined value', function () {
		var testItem = new List.model();
		demand(List.fields.flickralbum.format(testItem)).be('');
	});

	it('should return a shallow clone of the options', function () {
		var clonedOps = List.fields.flickralbum.cloneOps();
		demand(clonedOps).eql(List.fields.flickralbum.ops);
		demand(clonedOps).not.equal(List.fields.flickralbum.ops);
	});
};
