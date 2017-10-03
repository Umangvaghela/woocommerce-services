/**
 * External dependencies
 */
import React, { PropTypes } from 'react';
import { includes } from 'lodash';

/**
 * Internal dependencies
 */
import Dropdown from 'components/dropdown';

const CountryDropdown = ( props ) => {
	const valuesMap = {};
	Object.keys( props.countriesData ).forEach( ( countryCode ) => {
		if ( props.allowedCountries && ! includes( props.allowedCountries, countryCode ) ) {
			return;
		}

		valuesMap[ countryCode ] = props.countriesData[ countryCode ].name;
	} );
	return (
		<Dropdown
			{ ...props }
			valuesMap={ valuesMap }
			/>
	);
};

CountryDropdown.propTypes = {
	id: PropTypes.string.isRequired,
	countriesData: PropTypes.object.isRequired,
	title: PropTypes.string,
	description: PropTypes.string,
	value: PropTypes.string.isRequired,
	updateValue: PropTypes.func.isRequired,
	allowedCountries: PropTypes.array,
	error: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.bool,
	] ),
	className: PropTypes.string,
};

export default CountryDropdown;
