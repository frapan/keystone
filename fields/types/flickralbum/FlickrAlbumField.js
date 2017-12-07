import Field from '../Field';
import React from 'react';
import Select from 'react-select';
import { FormInput } from '../../../admin/client/App/elemental';

/**
 * TODO:
 * - Custom path support
 */

module.exports = Field.create({

	displayName: 'FlickrAlbumField',
	statics: {
		type: 'FlickrAlbum',
	},

	valueChanged (newValue) {
		if (!typeof newValue === 'string') {
			newValue = String(newValue);
		}
		this.props.onChange({
			path: this.props.path,
			value: newValue,
		});
	},

	renderValue () {
		const { ops, value } = this.props;
		const selected = ops.find(opt => opt.value === value);

		return (
			<FormInput noedit>
				{selected ? selected.label : null}
			</FormInput>
		);
	},

	renderField () {
		const { numeric, ops, path, value: val } = this.props;
		
		// TODO: This should be natively handled by the FlickrAlbum component
		const options = (numeric)
			? ops.map(function (i) {
				return { label: i.label, value: String(i.value) };
			})
			: ops;
		const value = (typeof val === 'number')
			? String(val)
			: val;

		return (
			<div>
				{/* This input element fools Safari's autocorrect in certain situations that completely break react-select */}
				<input type="text" style={{ position: 'absolute', width: 1, height: 1, zIndex: -1, opacity: 0 }} tabIndex="-1"/>
				<Select
					simpleValue
					name={this.getInputName(path)}
					value={value}
					options={options}
					onChange={this.valueChanged}
					wrapperStyle={{width:'85%', float:'left'}}
				/>
				<div style={{marginLeft: '10px', float: 'left', width: '45px'}}>
					<a href="/reload-flickr-albums">Reload albums</a>
				</div>
				<div style={{clear: 'both'}}></div>
			</div>
		);
	},

});
